from flask import Blueprint, jsonify, request
# import anthropic
# import os



chat_bp = Blueprint('chat', __name__)

@chat_bp.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '').lower()

    # ── REAL CLAUDE INTEGRATION (uncomment when API key is available) ──
    # client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))
    # claude_response = client.messages.create(
    #     model="claude-sonnet-4-20250514",
    #     max_tokens=1024,
    #     system="""You are StyleConnect's AI assistant. 
    #     StyleConnect is a platform that connects users with beauty and grooming 
    #     professionals in Lagos, Nigeria. Help users find barbers, hair stylists, 
    #     nail technicians, makeup artists, tattoo artists, lash technicians and 
    #     henna artists near them. Keep responses short, friendly and helpful.""",
    #     messages=[
    #         {"role": "user", "content": message}
    #     ]
    # )
    # response = claude_response.content[0].text
    # return jsonify({'response': response})
    # ───────────────────────────────────────────────────────────────────

    # MOCK RESPONSES (remove when Claude API is active)
    if 'barber' in message or 'haircut' in message or 'fade' in message:
        response = "I found some great barbers near you! Kings Barbershop offers fades from ₦2,500 and is highly rated."
    elif 'nail' in message:
        response = "For nail services, Nail Bar by Chisom is excellent! They offer gel and acrylic sets from ₦4,500."
    elif 'makeup' in message or 'glam' in message:
        response = "Glam by Temi is a top rated makeup artist near you, specialising in bridal looks from ₦8,000."
    elif 'hair' in message or 'braids' in message or 'weave' in message:
        response = "Adaeze Hair Studio is highly rated for braids and weaves, starting from ₦3,500!"
    elif 'lash' in message or 'brow' in message:
        response = "Lash Lounge is near you and offers lash extensions and brow tints from ₦6,000."
    elif 'henna' in message:
        response = "Henna by Zainab specialises in bridal and arabic henna designs from ₦5,000."
    elif 'tattoo' in message:
        response = "Ink & Soul Studio does fine line and custom tattoos from ₦15,000."
    elif 'hello' in message or 'hi' in message or 'hey' in message:
        response = "Hi! I'm StyleConnect's assistant. I can help you find barbers, hair stylists, nail techs, makeup artists and more near you. What are you looking for?"
    else:
        response = "I can help you find beauty and grooming professionals near you! Try asking about barbers, nail techs, hair stylists, makeup artists, or lash technicians."

    return jsonify({'response': response})