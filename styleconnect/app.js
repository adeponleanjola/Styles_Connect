/* ─────────────────────────────────────────
   StyleConnect — app.js
   Group 10 · SEN201
───────────────────────────────────────── */

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const professionals = [
  {
    name: "Nefertiti Hairplace",
    role: "Hair Stylist",
    dist: "0.3km",
    rating: 5,
    tags: ["Braiding", "Quick Weaves", "Natural Hair"],
    price: "₦3,500",
    emoji: "💇‍♀️",
    bg: "#EFF5FF",
    available: true
  },
  {
    name: "Glam & Glow artistry",
    role: "Makeup Artist",
    dist: "0.7km",
    rating: 4,
    tags: ["Bridal", "Editorial", "Shoots"],
    price: "₦20,000",
    emoji: "💄",
    bg: "#EFF5FF",
    available: true
  },
  {
    name: "The Blush Bar",
    role: "Nail Technician",
    dist: "1.2km",
    rating: 5,
    tags: ["Gel", "Acrylic", "Biab"],
    price: "₦8,500",
    emoji: "💅",
    bg: "#EFF5FF",
    available: true
  },
  {
    name: "The Ballers Den",
    role: "Barber",
    dist: "1.5km",
    rating: 5,
    tags: ["Fade", "Cuts", "Beard Trim"],
    price: "₦4,500",
    emoji: "💈",
    bg: "#EFF5FF",
    available: false
  },
  {
    name: "Maison Muse",
    role: "Lash & Brow Specialist",
    dist: "1.8km",
    rating: 4,
    tags: ["Lash Extensions", "Brow Tint", "Waxing"],
    price: "₦6,000",
    emoji: "👁️",
    bg: "#EFF5FF",
    available: true
  },
  {
    name: "AhennaStudio",
    role: "Henna Artist",
    dist: "2.1km",
    rating: 5,
    tags: ["Bridal Henna", "Arabic", "Indo"],
    price: "₦5,000",
    emoji: "🌿",
    bg: "#EFF5FF",
    available: true
  },
  {
    name: "InkVictus",
    role: "Tattoo Artist",
    dist: "2.5km",
    rating: 4,
    tags: ["Fine Line", "Traditional", "Custom"],
    price: "₦15,000",
    emoji: "🎨",
    bg: "#EFF5FF",
    color: "#fff",
    available: false
  },
  {
    name: "Sting studio",
    role: "Professional Piercer",
    dist: "2.8km",
    rating: 5,
    tags: ["Face", "Dermal", "Body"],
    price: "₦6,000",
    emoji: "💎",
    bg: "#EFF5FF",
    available: true
  }
];

const allPros = [...professionals];


/* ══════════════════════════════════════════
   RENDER PROFESSIONALS
══════════════════════════════════════════ */
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


/* ══════════════════════════════════════════
   FILTER / SEARCH
══════════════════════════════════════════ */
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


/* ══════════════════════════════════════════
   MODAL
══════════════════════════════════════════ */
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


/* ══════════════════════════════════════════
   TIME SLOTS
══════════════════════════════════════════ */
function selectSlot(el) {
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}


/* ══════════════════════════════════════════
   BOOKING CONFIRMATION
══════════════════════════════════════════ */
function confirmBooking() {
  closeModal();
  showToast("✅ Booking confirmed! You'll receive a reminder.");
}


/* ══════════════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════════════ */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}


/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
renderPros(professionals);
