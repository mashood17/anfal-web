from flask import Blueprint
from app.models    import Restaurant
from app.utils.response import success, error

bp = Blueprint('restaurants', __name__, url_prefix='/api/restaurants')

@bp.route('/<slug>', methods=['GET'])
def get_restaurant(slug):
    restaurant = Restaurant.query.filter_by(slug=slug, is_active=True).first()
    if not restaurant:
        return error('Restaurant not found', 404)
    return success(restaurant.to_dict())