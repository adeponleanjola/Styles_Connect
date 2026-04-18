from flask import Blueprint, jsonify, render_template
from app.models import Stylist

stylists_bp = Blueprint('stylists', __name__)

@stylists_bp.route('/api/stylists', methods=['GET'])
def get_stylists():
    stylists = Stylist.query.all()
    return jsonify([s.to_dict() for s in stylists])

@stylists_bp.route('/api/stylists/<int:id>', methods=['GET'])
def get_stylist(id):
    stylist = Stylist.query.get_or_404(id)
    return jsonify(stylist.to_dict())

@stylists_bp.route('/')
def index():
    return render_template('index.html')