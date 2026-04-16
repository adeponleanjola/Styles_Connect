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

const SYSTEM_PROMPT = `You are the friendly AI assistant for StyleConnect...`; 


document.getElementById('heroSearch').addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
});

// Initial Render
renderPros(professionals);
