from app.extensions import db
import uuid

class Restaurant(db.Model):
    __tablename__ = 'restaurants'

    id         = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name       = db.Column(db.Text, nullable=False)
    slug       = db.Column(db.Text, nullable=False, unique=True)
    logo       = db.Column(db.Text)
    tagline    = db.Column(db.Text)
    phone      = db.Column(db.Text)
    address    = db.Column(db.Text)
    is_active  = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    settings   = db.relationship('RestaurantSettings', backref='restaurant', uselist=False)
    categories = db.relationship('Category', backref='restaurant', lazy='dynamic')

    def to_dict(self):
        return {
            'id':       self.id,
            'name':     self.name,
            'slug':     self.slug,
            'logo':     self.logo,
            'tagline':  self.tagline,
            'phone':    self.phone,
            'address':  self.address,
            'settings': self.settings.to_dict() if self.settings else {},
        }


class RestaurantSettings(db.Model):
    __tablename__ = 'restaurant_settings'

    id            = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    restaurant_id = db.Column(db.String(36), db.ForeignKey('restaurants.id'), unique=True)
    hero_images   = db.Column(db.ARRAY(db.Text), default=[])
    whatsapp      = db.Column(db.Text)
    instagram     = db.Column(db.Text)
    updated_at    = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            'hero_images': self.hero_images or [],
            'whatsapp':    self.whatsapp,
            'instagram':   self.instagram,
        }