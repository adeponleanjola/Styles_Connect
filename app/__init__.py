from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    
    from app.routes.stylists import stylists_bp
    from app.routes.search import search_bp
    from app.routes.chat import chat_bp
    
    app.register_blueprint(stylists_bp)
    app.register_blueprint(search_bp)
    app.register_blueprint(chat_bp)
    
    with app.app_context():
        db.create_all()
        
    return app