import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-key')
    SQLALCHEMY_DATABASE_URI = 'sqlite:///styleconnect.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')