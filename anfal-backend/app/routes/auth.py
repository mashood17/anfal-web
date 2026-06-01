from flask              import Blueprint, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models         import AdminUser, Restaurant
from app.extensions     import db
from app.utils.response import success, error
import os

bp = Blueprint('auth', __name__, url_prefix='/api/auth')


@bp.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if not body:
        return error('Invalid request', 400)

    email    = body.get('email', '').strip().lower()
    password = body.get('password', '')

    user = AdminUser.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return error('Invalid email or password', 401)

    # Store only the user ID string as identity — simple and safe
    token = create_access_token(identity=user.id)

    return success({ 'token': token, 'user': user.to_dict() })


@bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user    = AdminUser.query.get(user_id)
    if not user:
        return error('User not found', 404)
    return success(user.to_dict())


@bp.route('/seed-admin', methods=['POST'])
def seed_admin():
    email    = os.getenv('ADMIN_EMAIL')
    password = os.getenv('ADMIN_PASSWORD')

    if AdminUser.query.filter_by(email=email).first():
        return error('Admin already exists', 400)

    restaurant = Restaurant.query.filter_by(slug='anfal').first()
    user = AdminUser(
        email=email,
        restaurant_id=restaurant.id if restaurant else None,
        role='manager',
    )
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return success({ 'message': 'Admin created', 'email': email })