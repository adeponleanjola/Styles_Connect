# StyleConnect 💇‍♀️💈💅

> Connecting customers with beauty and grooming professionals seamlessly.

StyleConnect is an AI-powered web platform that helps users in Lagos find nearby beauty and grooming professionals — barbers, hair stylists, nail technicians, makeup artists, tattoo artists, lash technicians, henna artists and more — all in one place.

Built for the **CBC @ UNILAG Hackathon 2026** by Group 10.

---

## The Problem

Finding reliable beauty professionals in Lagos is frustrating. People rely on scattered Instagram pages, word-of-mouth and unreliable Google searches. Skilled professionals also struggle to reach new customers beyond their immediate network.

StyleConnect fixes this.

---

## Features

- 🔍 **Smart Search** — find professionals by service type and location powered by a real database
- 👤 **Professional Profiles** — ratings, pricing, availability and service tags
- 🤖 **AI Style Assistant** — Claude-powered chatbot that recommends professionals based on natural language requests
- 📍 **Map View** — see professionals near you visually
- 📅 **Booking System** — book appointments directly through the platform
- 🏪 **List Your Business** — service providers can register on the platform
- 🔔 **Real-time Toast Notifications** — instant feedback on searches and bookings

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, Flask |
| Database | SQLite, SQLAlchemy |
| AI | Claude API (Anthropic) |
| Frontend | HTML, CSS, Vanilla JavaScript |
| Version Control | Git, GitHub |

---

## Project Structure

```
styleconnect/
├── app/
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── stylists.py     # Stylist routes + homepage
│   │   ├── search.py       # Search route
│   │   └── chat.py         # Claude chatbot route (backup)
│   ├── __init__.py         # App factory
│   ├── models.py           # Database models
│   ├── static/
│   │   ├── app.js          # Frontend logic
│   │   └── style.css       # Styles and animations
│   └── templates/
│       └── index.html      # Main page
├── config.py               # App configuration
├── run.py                  # Entry point
├── seed.py                 # Database seeder
├── requirements.txt        # Python dependencies
└── .env                    # Secret keys (not in repo)
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/remmy-cod3s/styleconnect.git
cd styleconnect
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Set up environment variables
Create a `.env` file in the root folder:
```
SECRET_KEY=your-secret-key-here
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

### 4. Seed the database
```bash
python seed.py
```
You should see: `Database seeded successfully!`

### 5. Run the app
```bash
python run.py
```

Open your browser and go to `http://127.0.0.1:5000`

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Homepage |
| GET | `/api/stylists` | Get all stylists |
| GET | `/api/stylists/<id>` | Get a single stylist |
| GET | `/api/search?q=barber` | Search stylists by query |
| POST | `/api/chat` | AI chatbot response (backup) |

---

## Using the AI Chatbot

The StyleConnect AI assistant is powered by Claude. To use it:

1. Click the chat bubble at the bottom right of the page
2. Enter your Anthropic API key when prompted
3. Ask the assistant anything — e.g. *"I need a barber that does fades"* or *"Where can I find a nail tech near me?"*

Get a free API key at [console.anthropic.com](https://console.anthropic.com)

---

## Team — Group 10

| Name | Role |
|---|---|
| Remon |Flask, Database, API Routes |
| Dapo | Team Lead — Strategy, Pitch & Presentation |
| Anjola | HTML, CSS, JavaScript |
| Oma | Branding, Styling |

---

## Hackathon

**CBC @ UNILAG Hackathon 2026**
University of Lagos · Claude Builders Club

*Theme: Building Tomorrow — AI Solutions for a Resilient World*
