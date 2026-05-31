from app.extensions import db
import uuid

class MenuItem(db.Model):
    __tablename__ = 'menu_items'

    id            = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    category_id   = db.Column(db.String(36), db.ForeignKey('categories.id'), nullable=False)
    restaurant_id = db.Column(db.String(36), db.ForeignKey('restaurants.id'), nullable=False)
    name          = db.Column(db.Text, nullable=False)
    description   = db.Column(db.Text)
    image         = db.Column(db.Text)
    food_type     = db.Column(db.Text)
    badge         = db.Column(db.Text)
    is_active     = db.Column(db.Boolean, default=True)
    sort_order    = db.Column(db.Integer, default=0)
    created_at    = db.Column(db.DateTime, server_default=db.func.now())

    prices = db.relationship('ItemPrice', backref='item',
                             order_by='ItemPrice.sort_order', lazy='joined',
                             cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id':          self.id,
            'category_id': self.category_id,
            'name':        self.name,
            'description': self.description,
            'image':       self.image,
            'food_type':   self.food_type,
            'badge':       self.badge,
            'prices': [p.to_dict() for p in self.prices],
        }