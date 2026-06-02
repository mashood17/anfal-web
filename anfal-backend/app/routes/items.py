from flask import Blueprint, request
from sqlalchemy.orm import joinedload

from app.models import MenuItem
from app.utils.response import success, error

bp = Blueprint('items', __name__, url_prefix='/api/items')


@bp.route('', methods=['GET'])
def get_items():
    restaurant_id = request.args.get('restaurant_id')
    if not restaurant_id:
        return error('restaurant_id required', 400)

    items = (
        MenuItem.query
        .options(joinedload(MenuItem.prices))
        .filter_by(
            restaurant_id=restaurant_id,
            is_active=True
        )
        .order_by(MenuItem.sort_order)
        .all()
    )

    return success([i.to_dict() for i in items])


@bp.route('/featured', methods=['GET'])
def get_featured():
    restaurant_id = request.args.get('restaurant_id')
    if not restaurant_id:
        return error('restaurant_id required', 400)

    items = (
        MenuItem.query
        .options(joinedload(MenuItem.prices))
        .filter(
            MenuItem.restaurant_id == restaurant_id,
            MenuItem.badge.in_([
                'best_seller',
                'chef_special',
                'popular'
            ]),
            MenuItem.is_active == True,
        )
        .order_by(MenuItem.sort_order)
        .limit(6)
        .all()
    )

    return success([i.to_dict() for i in items])