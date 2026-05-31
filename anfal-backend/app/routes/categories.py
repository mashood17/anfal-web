from flask import Blueprint, request
from app.models    import Category
from app.utils.response import success, error

bp = Blueprint('categories', __name__, url_prefix='/api/categories')

@bp.route('', methods=['GET'])
def get_categories():
    restaurant_id = request.args.get('restaurant_id')
    if not restaurant_id:
        return error('restaurant_id required', 400)

    categories = (
        Category.query
        .filter_by(restaurant_id=restaurant_id, is_active=True)
        .order_by(Category.sort_order)
        .all()
    )
    return success([c.to_dict() for c in categories])