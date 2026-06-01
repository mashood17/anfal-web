from flask              import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions     import db
from app.models         import Restaurant, RestaurantSettings, AdminUser
from app.utils.response import success, error
import uuid

bp = Blueprint('admin_branding', __name__, url_prefix='/api/admin/branding')


def get_restaurant_id():
    user_id = get_jwt_identity()
    user    = AdminUser.query.get(user_id)
    return user.restaurant_id if user else None


@bp.route('', methods=['GET'])
@jwt_required()
def get_branding():
    rid = get_restaurant_id()
    if not rid:
        return error('Unauthorized', 401)
    restaurant = Restaurant.query.get_or_404(rid)
    return success(restaurant.to_dict())


@bp.route('', methods=['PUT'])
@jwt_required()
def update_branding():
    rid        = get_restaurant_id()
    restaurant = Restaurant.query.get_or_404(rid)
    body       = request.get_json()

    restaurant.name    = body.get('name',    restaurant.name)
    restaurant.tagline = body.get('tagline', restaurant.tagline)
    restaurant.phone   = body.get('phone',   restaurant.phone)
    restaurant.address = body.get('address', restaurant.address)
    restaurant.logo    = body.get('logo',    restaurant.logo)

    settings = restaurant.settings
    if not settings:
        settings = RestaurantSettings(
            id=str(uuid.uuid4()),
            restaurant_id=rid
        )
        db.session.add(settings)

    settings.hero_images = body.get('hero_images', settings.hero_images)
    settings.whatsapp    = body.get('whatsapp',    settings.whatsapp)
    settings.instagram   = body.get('instagram',   settings.instagram)

    db.session.commit()
    return success(restaurant.to_dict())