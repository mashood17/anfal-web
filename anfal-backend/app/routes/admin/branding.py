from flask              import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions     import db
from app.models         import Restaurant, RestaurantSettings
from app.utils.response import success, error
import uuid

bp = Blueprint('admin_branding', __name__, url_prefix='/api/admin/branding')


def get_restaurant_id():
    return get_jwt_identity().get('restaurant_id')


@bp.route('', methods=['GET'])
@jwt_required()
def get_branding():
    restaurant = Restaurant.query.get_or_404(get_restaurant_id())
    return success(restaurant.to_dict())


@bp.route('', methods=['PUT'])
@jwt_required()
def update_branding():
    restaurant = Restaurant.query.get_or_404(get_restaurant_id())
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
            restaurant_id=get_restaurant_id()
        )
        db.session.add(settings)

    settings.hero_images = body.get('hero_images', settings.hero_images)
    settings.whatsapp    = body.get('whatsapp',    settings.whatsapp)
    settings.instagram   = body.get('instagram',   settings.instagram)

    db.session.commit()
    return success(restaurant.to_dict())