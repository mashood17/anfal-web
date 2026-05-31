from flask            import Blueprint, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models       import AdminUser
from app.extensions   import db
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

    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            'email': user.email,
            'role': user.role,
            'restaurant_id': user.restaurant_id,
        }
    )

    return success({ 'token': token, 'user': user.to_dict() })


@bp.route('/me', methods=['GET'])
@jwt_required()
def me():
    identity = get_jwt_identity()
    return success(identity)


# One-time seed endpoint — remove after first use in production
@bp.route('/seed-admin', methods=['POST'])
def seed_admin():
    email    = os.getenv('ADMIN_EMAIL')
    password = os.getenv('ADMIN_PASSWORD')

    if AdminUser.query.filter_by(email=email).first():
        return error('Admin already exists', 400)

    # Get Anfal restaurant id
    from app.models import Restaurant
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