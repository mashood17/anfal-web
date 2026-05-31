from app.extensions import db
import uuid

class Category(db.Model):
    __tablename__ = 'categories'

    id            = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    restaurant_id = db.Column(db.String(36), db.ForeignKey('restaurants.id'), nullable=False)
    name          = db.Column(db.Text, nullable=False)
    banner        = db.Column(db.Text)
    description   = db.Column(db.Text)
    sort_order    = db.Column(db.Integer, default=0)
    is_active     = db.Column(db.Boolean, default=True)
    created_at    = db.Column(db.DateTime, server_default=db.func.now())

    items = db.relationship('MenuItem', backref='category', lazy='dynamic')

    def to_dict(self):
        return {
            'id':          self.id,
            'name':        self.name,
            'banner':      self.banner,
            'description': self.description,
            'sort_order':  self.sort_order,
        }