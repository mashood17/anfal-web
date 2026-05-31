from flask              import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt
from app.utils.response import success, error
from supabase           import create_client
import os, uuid, mimetypes

bp = Blueprint('upload', __name__, url_prefix='/api/upload')

ALLOWED_TYPES = {'image/jpeg', 'image/png', 'image/webp'}
BUCKET        = os.getenv('SUPABASE_BUCKET', 'media')

def get_supabase():
    return create_client(
        os.getenv('SUPABASE_URL'),
        os.getenv('SUPABASE_SERVICE_KEY'),
    )


@bp.route('', methods=['POST'])
@jwt_required()
def upload_image():
    if 'file' not in request.files:
        return error('No file provided', 400)

    file      = request.files['file']
    print("FILENAME:", file.filename)
    print("CONTENT TYPE:", file.content_type)
    print("CONTENT LENGTH:", request.content_length)
    mime_type = file.content_type

    if mime_type not in ALLOWED_TYPES:
        return error('Only JPEG, PNG, WebP allowed', 400)

    # Build storage path: media/anfal/items/uuid.webp
    claims = get_jwt()

    restaurant_id = claims.get("restaurant_id", "global")  
    folder        = request.form.get('folder', 'general')  # items | categories | hero | logos
    ext           = mimetypes.guess_extension(mime_type) or '.jpg'
    filename      = f"{uuid.uuid4()}{ext}"
    path          = f"{restaurant_id}/{folder}/{filename}"

    supabase = get_supabase()
    file.seek(0)
    file_data = file.read()

    print("FILE SIZE:", len(file_data))

    print("FILE SIZE:", len(file_data))

    result = supabase.storage.from_(BUCKET).upload(
        path,
        file_data,
        {
            "content-type": mime_type,
            "upsert": "false"
        }
    )

    print("UPLOAD RESULT:", result)

    # Return the public URL + the path (store path in DB, not full URL)
    public_url = f"{os.getenv('SUPABASE_URL')}/storage/v1/object/public/{BUCKET}/{path}"

    return success({
        'path':       path,
        'public_url': public_url,
    })