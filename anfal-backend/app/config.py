import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY         = os.getenv('FLASK_SECRET_KEY', 'dev-secret')
    SQLALCHEMY_DATABASE_URI     = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS   = {
        'pool_pre_ping': True,       # Recover from dropped connections
        'pool_recycle':  300,
    }
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:5173').split(',')

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config = {
    'development': DevelopmentConfig,
    'production':  ProductionConfig,
    'default':     DevelopmentConfig,
}