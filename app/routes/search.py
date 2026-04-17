from flask import Blueprint, jsonify, request
from app.models import Stylist

search_bp = Blueprint('search', __name__)

@search_bp.route('/api/search', methods=['GET'])
def search():
    query = request.args.get('q','').lower()
    location = request.args.get('location', '').lower()
    
    stylists = Stylist.query.all()
    results = []
    
    for stylist in stylists:
        name_match = query in stylist.name.lower()
        role_match = query in stylist.role.lower()
        tags_match = query in stylist.tags.lower() if stylist.tags else False
        location_match = location in stylist.location.lower() if location else True
        
        if (name_match or role_match or tags_match) and location_match:
            results.append(stylist.to_dict())
            
    return jsonify(results)