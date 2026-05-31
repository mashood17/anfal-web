from flask import Flask
from app.config     import config
from app.extensions import db, migrate, cors
from flask_jwt_extended import JWTManager
import os

def create_app(env=None):
    env = env or os.getenv('FLASK_ENV', 'development')
    app = Flask(__name__)
    app.config.from_object(config[env])
    app.config['JWT_SECRET_KEY']      = os.getenv('JWT_SECRET_KEY', 'dev-jwt-secret')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False  # Set expiry in production

    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(
        app,
        origins=app.config['CORS_ORIGINS'],
        supports_credentials=True,
        allow_headers=['Content-Type', 'Authorization'],
        methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    )
    JWTManager(app)

    # Public routes
    from app.routes import restaurants_bp, categories_bp, items_bp
    app.register_blueprint(restaurants_bp)
    app.register_blueprint(categories_bp)
    app.register_blueprint(items_bp)

    # Auth
    from app.routes.auth import bp as auth_bp
    app.register_blueprint(auth_bp)

    # Upload
    from app.routes.upload import bp as upload_bp
    app.register_blueprint(upload_bp)

    # Admin CRUD
    from app.routes.admin import categories_bp as admin_cat_bp
    from app.routes.admin import items_bp      as admin_items_bp
    from app.routes.admin import branding_bp   as admin_brand_bp
    app.register_blueprint(admin_cat_bp)
    app.register_blueprint(admin_items_bp)
    app.register_blueprint(admin_brand_bp)

    @app.route('/api/health')
    def health():
        return { 'status': 'ok' }

    return app