from app.extensions import db
import uuid, bcrypt

class AdminUser(db.Model):
    __tablename__ = 'admin_users'

    id            = db.Column(db.String(36), primary_key=True,
                              default=lambda: str(uuid.uuid4()))
    email         = db.Column(db.Text, nullable=False, unique=True)
    password_hash = db.Column(db.Text, nullable=False)
    restaurant_id = db.Column(db.String(36),
                              db.ForeignKey('restaurants.id'), nullable=True)
    # nullable = super admin (future SaaS: has access to all restaurants)
    role          = db.Column(db.Text, default='manager')
    created_at    = db.Column(db.DateTime, server_default=db.func.now())

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(
            password.encode(), bcrypt.gensalt()
        ).decode()

    def check_password(self, password):
        return bcrypt.checkpw(
            password.encode(), self.password_hash.encode()
        )

    def to_dict(self):
        return {
            'id':            self.id,
            'email':         self.email,
            'role':          self.role,
            'restaurant_id': self.restaurant_id,
        }