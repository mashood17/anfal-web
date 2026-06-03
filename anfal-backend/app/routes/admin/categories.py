from flask              import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions     import db
from app.models         import Category, AdminUser
from app.utils.response import success, error
import uuid

bp = Blueprint('admin_categories', __name__, url_prefix='/api/admin/categories')


def get_restaurant_id():
    user_id = get_jwt_identity()
    user    = AdminUser.query.get(user_id)
    return user.restaurant_id if user else None


@bp.route('', methods=['GET'])
@jwt_required()
def list_categories():
    rid = get_restaurant_id()
    if not rid:
        return error('Unauthorized', 401)
    cats = (Category.query
            .filter_by(restaurant_id=rid)
            .order_by(Category.sort_order)
            .all())
    return success([c.to_dict() for c in cats])


@bp.route('', methods=['POST'])
@jwt_required()
def create_category():
    rid  = get_restaurant_id()
    body = request.get_json()
    cat  = Category(
        id=str(uuid.uuid4()),
        restaurant_id=rid,
        name=body['name'],
        banner=body.get('banner'),
        description=body.get('description'),
        sort_order=body.get('sort_order', 0),
    )
    db.session.add(cat)
    db.session.commit()
    return success(cat.to_dict(), 201)


@bp.route('/<cat_id>', methods=['PUT'])
@jwt_required()
def update_category(cat_id):
    rid  = get_restaurant_id()
    cat  = Category.query.filter_by(id=cat_id, restaurant_id=rid).first_or_404()
    body = request.get_json()
    cat.name        = body.get('name',        cat.name)
    cat.banner      = body.get('banner',      cat.banner)
    cat.description = body.get('description', cat.description)
    cat.sort_order  = body.get('sort_order',  cat.sort_order)
    cat.is_active   = body.get('is_active',   cat.is_active)
    db.session.commit()
    return success(cat.to_dict())

@bp.route('/reorder', methods=['POST'])
@jwt_required()
def reorder_categories():
    rid = get_restaurant_id()
    body = request.get_json()

    order = body.get('order', [])

    for item in order:
        cat = Category.query.filter_by(
            id=item['id'],
            restaurant_id=rid
        ).first()

        if cat:
            cat.sort_order = item['sort_order']

    db.session.commit()

    return success({
        'updated': len(order)
    })


@bp.route('/<cat_id>', methods=['DELETE'])
@jwt_required()
def delete_category(cat_id):
    rid = get_restaurant_id()
    cat = Category.query.filter_by(id=cat_id, restaurant_id=rid).first_or_404()
    db.session.delete(cat)
    db.session.commit()
    return success({ 'deleted': cat_id })