  //  StyleConnect — app.js


// Data
const professionals = [
  {
    name: "Adaeze Hair Studio",
    role: "Hair Stylist",
    dist: "0.3km",
    rating: 5,
    tags: ["Braiding", "Weaves", "Natural Hair"],
    price: "₦3,500",
    emoji: "💇‍♀️",
    bg: "#FFF5EC",
    available: true
  },
  {
    name: "Glam by Temi",
    role: "Makeup Artist",
    dist: "0.7km",
    rating: 4,
    tags: ["Bridal", "Editorial", "Everyday"],
    price: "₦8,000",
    emoji: "💄",
    bg: "#F5F0FF",
    available: true
  },
  {
    name: "Nail Bar by Chisom",
    role: "Nail Technician",
    dist: "1.2km",
    rating: 5,
    tags: ["Gel", "Acrylic", "Nail Art"],
    price: "₦4,500",
    emoji: "💅",
    bg: "#FFF0F5",
    available: true
  },
  {
    name: "Kings Barbershop",
    role: "Barber",
    dist: "1.5km",
    rating: 5,
    tags: ["Fade", "Cuts", "Beard Trim"],
    price: "₦2,500",
    emoji: "💈",
    bg: "#EFF5FF",
    available: false
  },
  {
    name: "Lash Lounge",
    role: "Lash & Brow Specialist",
    dist: "1.8km",
    rating: 4,
    tags: ["Lash Extensions", "Brow Tint", "Waxing"],
    price: "₦6,000",
    emoji: "👁️",
    bg: "#F5FFFC",
    available: true
  },
  {
    name: "Henna by Zainab",
    role: "Henna Artist",
    dist: "2.1km",
    rating: 5,
    tags: ["Bridal Henna", "Arabic", "Indo"],
    price: "₦5,000",
    emoji: "🌿",
    bg: "#F5FFF0",
    available: true
  },
  {
    name: "Ink & Soul Studio",
    role: "Tattoo Artist",
    dist: "2.5km",
    rating: 4,
    tags: ["Fine Line", "Traditional", "Custom"],
    price: "₦15,000",
    emoji: "🎨",
    bg: "#1A1208",
    color: "#fff",
    available: false
  },
  {
    name: "Pierce by Dami",
    role: "Professional Piercer",
    dist: "2.8km",
    rating: 5,
    tags: ["Ear", "Nose", "Aftercare"],
    price: "₦3,000",
    emoji: "💎",
    bg: "#FFFFF0",
    available: true
  }
];

const allPros = [...professionals];


// Render Professionals
function renderPros(list) {
  const grid = document.getElementById('prosGrid');
  grid.innerHTML = list.map(p => `
    <div class="pro-card">
      <div class="pro-card-img" style="background:${p.bg}">
        <span style="font-size:3.5rem">${p.emoji}</span>
        ${p.available ? '<div class="availability-dot"></div>' : ''}
      </div>
      <div class="pro-card-body">
        <h3>${p.name}</h3>
        <div class="pro-card-meta">${p.role} · ${p.dist}</div>
        <div class="stars">${'★'.repeat(p.rating)}${'☆'.repeat(5 - p.rating)}</div>
        <div class="pro-tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="pro-card-footer">
          <span class="price">From ${p.price}</span>
          <button class="book-btn" onclick="openModal('${p.name}')">Book</button>
        </div>
      </div>
    </div>
  `).join('');
}


// Filter / Search
function filterPros(type) {
  const filtered = allPros.filter(p =>
    p.tags.some(t => t.toLowerCase().includes(type.toLowerCase())) ||
    p.role.toLowerCase().includes(type.toLowerCase())
  );
  document.getElementById('professionals').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => renderPros(filtered.length ? filtered : allPros), 300);
  showToast(`Showing ${type} professionals`);
}

function handleSearch() {
  const q = document.getElementById('heroSearch').value.trim().toLowerCase();
  if (!q) return;

  const filtered = allPros.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.role.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  );

  document.getElementById('professionals').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => renderPros(filtered.length ? filtered : allPros), 300);
  showToast(filtered.length
    ? `Found ${filtered.length} result(s)`
    : 'No exact match — showing all'
  );
}

// Allow Enter key to trigger search
document.getElementById('heroSearch').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});


// Modal
function openModal(name) {
  const accountTriggers = ['Customer', 'Professional', 'Join Free'];
  document.getElementById('modalTitle').textContent = accountTriggers.includes(name)
    ? 'Create Account'
    : `Book – ${name}`;

  // Default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.getElementById('dateInput').value = tomorrow.toISOString().split('T')[0];

  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


// Time Slots
function selectSlot(el) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}


// Booking Confirmation
function confirmBooking() {
  closeModal();
  showToast("✅ Booking confirmed! You'll receive a reminder.");
}


// Toast Notification
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}


// Chatbot Functions 
let chatHistory = [];
let chatOpen = false;
let ANTHROPIC_KEY = localStorage.getItem('sc_api_key') || '';

// System Prompt
const SYSTEM_PROMPT = `You are the friendly AI assistant for StyleConnect, a beauty and grooming booking platform in Nigeria. 

You help customers:
- Find the right beauty professionals (hair stylists, makeup artists, nail techs, barbers, lash specialists, henna artists, tattoo artists, piercers)
- Understand how the booking process works
- Learn about pricing ranges and what to expect from services
- Navigate the platform

Professionals on the platform include:
- Adaeze Hair Studio (Hair Stylist, braiding/weaves, from ₦3,500, 0.3km away)
- Glam by Temi (Makeup Artist, bridal/editorial, from ₦8,000, 0.7km away)
- Nail Bar by Chisom (Nail Technician, gel/acrylic, from ₦4,500, 1.2km away)
- Kings Barbershop (Barber, fades/cuts, from ₦2,500, 1.5km away)
- Lash Lounge (Lash & Brow Specialist, from ₦6,000, 1.8km away)
- Henna by Zainab (Henna Artist, bridal henna, from ₦5,000, 2.1km away)
- Ink & Soul Studio (Tattoo Artist, from ₦15,000, 2.5km away)
- Pierce by Dami (Professional Piercer, from ₦3,000, 2.8km away)

Keep responses short, warm, and helpful. Use simple language. When recommending a professional, mention their name, specialty, and price. Always encourage the user to click "Book" on their profile card.`;

// ── Initialize Chatbot ──
function initChatbot() {
  if (ANTHROPIC_KEY) {
    document.getElementById('apiKeyBanner').style.display = 'none';
    document.getElementById('chatInput').disabled = false;
    document.getElementById('chatSendBtn').disabled = false;
  } else {
    document.getElementById('chatInput').disabled = true;
    document.getElementById('chatSendBtn').disabled = true;
  }

  // Show unread notification after a delay
  setTimeout(() => {
    if (!chatOpen) {
      document.getElementById('chatUnread').style.display = 'block';
    }
  }, 3000);
}

// ── Toggle Chat Window ──
function toggleChat() {
  chatOpen = !chatOpen;
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.classList.toggle('open', chatOpen);
  
  document.getElementById('chatUnread').style.display = 'none';
  
  if (chatOpen) {
    document.getElementById('chatInput').focus();
  }
}

// ── Save Anthropic API Key ──
function saveApiKey() {
  const key = document.getElementById('apiKeyInput').value.trim();
  
  if (!key.startsWith('sk-ant-')) {
    alert("Invalid Anthropic API key. It should start with 'sk-ant-'");
    return;
  }

  ANTHROPIC_KEY = key;
  localStorage.setItem('sc_api_key', key);

  document.getElementById('apiKeyBanner').style.display = 'none';
  document.getElementById('chatInput').disabled = false;
  document.getElementById('chatSendBtn').disabled = false;
  document.getElementById('chatInput').focus();
}

// ── Send Suggestion from Chips ──
function sendSuggestion(btn) {
  document.getElementById('chatInput').value = btn.textContent;
  document.getElementById('chatSuggestions').style.display = 'none';
  sendChatMessage();
}

// ── Send Chat Message ──
async function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();

  if (!text || !ANTHROPIC_KEY) return;

  // Hide suggestions after first interaction
  document.getElementById('chatSuggestions').style.display = 'none';

  // Add user message
  appendChatMsg('user', text);
  chatHistory.push({ role: 'user', content: text });
  input.value = '';

  // Disable input during processing
  input.disabled = true;
  document.getElementById('chatSendBtn').disabled = true;

  // Show typing indicator
  const typingEl = appendTypingIndicator();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',   // Fast & affordable model
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: chatHistory
      })
    });

    const data = await response.json();
    typingEl.remove();

    if (data.error) {
      appendChatMsg('assistant', `⚠️ ${data.error.message}`);
    } else {
      const reply = data.content[0].text;
      appendChatMsg('assistant', reply);
      chatHistory.push({ role: 'assistant', content: reply });
    }

  } catch (err) {
    typingEl.remove();
    appendChatMsg('assistant', '⚠️ Sorry, something went wrong. Please check your API key and internet connection.');
  }

  // Re-enable input
  input.disabled = false;
  document.getElementById('chatSendBtn').disabled = false;
  input.focus();
}

// ── Helper Functions ──
function appendChatMsg(role, text) {
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.textContent = text;
  
  const container = document.getElementById('chatMessages');
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function appendTypingIndicator() {
  const div = document.createElement('div');
  div.className = 'chat-msg typing';
  div.innerHTML = `
    <div class="typing-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  
  const container = document.getElementById('chatMessages');
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  
  return div;
}

// Initialize when script loads
initChatbot();

// Initial Render
renderPros(professionals);
