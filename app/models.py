from app import db 

class Stylist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable = False)
    role = db.Column(db.String(50), nullable = False)
    location = db.Column(db.String(100), nullable = False)
    distance = db.Column(db.String(20))
    rating = db.Column(db.Integer, default = 5)
    price = db.Column(db.String(30))
    emoji = db.Column(db.String(10))
    available = db.Column(db.Boolean, default = True)
    tags = db.Column(db.String(200))
    
    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'location' : self.location,
            'distance' : self.distance,
            'rating' : self.rating,
            'price' : self.price,
            'emoji' : self.emoji,
            'available' : self.available,
            'tags' : self.tags.split(',') if self.tags else []
        }
    
class Review(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    stylist_id = db.Column(db.Integer, db.ForeignKey('stylist.id'))
    reviewer_name = db.Column(db.String(100))
    comment = db.Column(db.Text)
    rating = db.Column(db.Integer)