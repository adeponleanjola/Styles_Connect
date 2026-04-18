from app import create_app, db
from app.models import Stylist

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()
    
    stylists = [
        Stylist(name="Adaeze Hair Studio", role="Hair Stylist",
                location="Lagos Island", distance="0.3km", rating=5,
                price="₦3,500", emoji="💇‍♀️", available=True,
                tags="Braiding,Weaves,Natural Hair"),
        
        Stylist(name="Glam by Temi", role="Makeup Artist",
        location="Lagos Island", distance="0.7km", rating=4,
        price="₦8,000", emoji="💄", available=True,
        tags="Bridal,Editorial,Everyday"),

Stylist(name="Nail Bar by Chisom", role="Nail Technician",
        location="Lagos Island", distance="1.2km", rating=5,
        price="₦4,500", emoji="💅", available=True,
        tags="Gel,Acrylic,Nail Art"),

Stylist(name="Kings Barbershop", role="Barber",
        location="Lekki", distance="1.5km", rating=5,
        price="₦2,500", emoji="💈", available=False,
        tags="Fade,Cuts,Beard Trim"),

Stylist(name="Lash Lounge", role="Lash & Brow Specialist",
        location="Lekki", distance="1.8km", rating=4,
        price="₦6,000", emoji="👁️", available=True,
        tags="Lash Extensions,Brow Tint,Waxing"),

Stylist(name="Henna by Zainab", role="Henna Artist",
        location="Surulere", distance="2.1km", rating=5,
        price="₦5,000", emoji="🌿", available=True,
        tags="Bridal Henna,Arabic,Indo"),

Stylist(name="Ink & Soul Studio", role="Tattoo Artist",
        location="Yaba", distance="2.5km", rating=4,
        price="₦15,000", emoji="🎨", available=False,
        tags="Fine Line,Traditional,Custom"),

Stylist(name="Pierce by Dami", role="Professional Piercer",
        location="Yaba", distance="2.8km", rating=5,
        price="₦3,000", emoji="💎", available=True,
        tags="Ear,Nose,Aftercare"),
    ]
    
    db.session.add_all(stylists)
    db.session.commit()
    print("Database seeded successfully!")