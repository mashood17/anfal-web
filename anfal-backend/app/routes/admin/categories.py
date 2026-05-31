from flask              import Blueprint, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions     import db
from app.models         import Category
from app.utils.response import success, error
import uuid

bp = Blueprint('admin_categories', __name__, url_prefix='/api/admin/categories')

def get_restaurant_id():
    return get_jwt_identity().get('restaurant_id')

@bp.route('', methods=['GET'])
@jwt_required()
def list_categories():
    cats = (Category.query
            .filter_by(restaurant_id=get_restaurant_id())
            .order_by(Category.sort_order)
            .all())
    return success([c.to_dict() for c in cats])

@bp.route('', methods=['POST'])
@jwt_required()
def create_category():
    body = request.get_json()
    cat  = Category(
        id=str(uuid.uuid4()),
        restaurant_id=get_restaurant_id(),
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
    cat  = Category.query.filter_by(
        id=cat_id, restaurant_id=get_restaurant_id()
    ).first_or_404()
    body = request.get_json()
    cat.name        = body.get('name',        cat.name)
    cat.banner      = body.get('banner',      cat.banner)
    cat.description = body.get('description', cat.description)
    cat.sort_order  = body.get('sort_order',  cat.sort_order)
    cat.is_active   = body.get('is_active',   cat.is_active)
    db.session.commit()
    return success(cat.to_dict())

@bp.route('/<cat_id>', methods=['DELETE'])
@jwt_required()
def delete_category(cat_id):
    cat = Category.query.filter_by(
        id=cat_id, restaurant_id=get_restaurant_id()
    ).first_or_404()
    db.session.delete(cat)
    db.session.commit()
    return success({ 'deleted': cat_id })