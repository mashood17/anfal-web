from flask              import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.orm     import joinedload
from app.extensions     import db
from app.models         import MenuItem, ItemPrice, AdminUser
from app.utils.response import success, error
import uuid

bp = Blueprint('admin_items', __name__, url_prefix='/api/admin/items')


def get_restaurant_id():
    user_id = get_jwt_identity()
    user    = AdminUser.query.get(user_id)
    return user.restaurant_id if user else None


@bp.route('', methods=['GET'])
@jwt_required()
def list_items():
    rid = get_restaurant_id()

    if not rid:
        return error('Unauthorized', 401)

    items = (
        MenuItem.query
        .options(joinedload(MenuItem.prices))
        .filter_by(restaurant_id=rid)
        .order_by(MenuItem.sort_order)
        .all()
    )

    return success([i.to_dict() for i in items])


@bp.route('', methods=['POST'])
@jwt_required()
def create_item():
    rid    = get_restaurant_id()
    body   = request.get_json()
    prices = body.pop('prices', [])

    item = MenuItem(
        id=str(uuid.uuid4()),
        restaurant_id=rid,
        category_id=body['category_id'],
        name=body['name'],
        description=body.get('description'),
        image=body.get('image'),
        food_type=body.get('food_type'),
        badge=body.get('badge'),
        sort_order=body.get('sort_order', 0),
    )
    db.session.add(item)

    for i, p in enumerate(prices):
        db.session.add(ItemPrice(
            id=str(uuid.uuid4()),
            menu_item_id=item.id,
            label=p['label'],
            price=p['price'],
            sort_order=i,
        ))

    db.session.commit()
    return success(item.to_dict(), 201)


@bp.route('/<item_id>', methods=['PUT'])
@jwt_required()
def update_item(item_id):
    rid    = get_restaurant_id()
    item   = MenuItem.query.filter_by(id=item_id, restaurant_id=rid).first_or_404()
    body   = request.get_json()
    prices = body.pop('prices', None)

    item.name        = body.get('name',        item.name)
    item.description = body.get('description', item.description)
    item.image       = body.get('image',       item.image)
    item.food_type   = body.get('food_type',   item.food_type)
    item.badge       = body.get('badge',       item.badge)
    item.category_id = body.get('category_id', item.category_id)
    item.sort_order  = body.get('sort_order',  item.sort_order)
    item.is_active   = body.get('is_active',   item.is_active)

    if prices is not None:
        ItemPrice.query.filter_by(menu_item_id=item.id).delete()
        for i, p in enumerate(prices):
            db.session.add(ItemPrice(
                id=str(uuid.uuid4()),
                menu_item_id=item.id,
                label=p['label'],
                price=p['price'],
                sort_order=i,
            ))

    db.session.commit()
    return success(item.to_dict())


@bp.route('/<item_id>', methods=['DELETE'])
@jwt_required()
def delete_item(item_id):
    rid  = get_restaurant_id()
    item = MenuItem.query.filter_by(id=item_id, restaurant_id=rid).first_or_404()
    db.session.delete(item)
    db.session.commit()
    return success({ 'deleted': item_id })