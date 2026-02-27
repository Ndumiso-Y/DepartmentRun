import './style.css'

// Initialize Lucide icons
if (window.lucide) {
    window.lucide.createIcons();
}

// Data
const products = [
    {
        id: 1,
        name: "Grey Crop",
        category: "apparel",
        price: 300.00,
        options: 4,
        image: "Images/6ng22dm98617d7v.jpeg", // Replacing Unsplash with local images where appropriate
        description: "Performance crop top with moisture-wicking fabric. Perfect for hot summer runs."
    },
    {
        id: 2,
        name: "DEPARTMENT Night Run Series",
        category: "services",
        price: 75.00,
        duration: "1 hr 20 mins",
        image: "Images/8s022bhnxqn14v3.jpeg",
        description: "Weekly night running group. Safety lights provided. All paces welcome."
    },
    {
        id: 3,
        name: "Founders Original",
        category: "apparel",
        price: 350.00,
        options: 5,
        image: "Images/l8q22bhmypkr86j.jpeg",
        description: "The original DEPARTMENT running tee. Lightweight, breathable, iconic."
    },
    {
        id: 4,
        name: "DEPT Trainer",
        category: "apparel",
        price: 300.00,
        options: 8,
        image: "Images/pg522bh6qb1hj2d.jpeg",
        description: "Training shorts with phone pocket and reflective details."
    },
    {
        id: 5,
        name: "Headwrap",
        category: "accessories",
        price: 90.00,
        options: 1,
        image: "Images/qhv224g14d90k3q.jpeg",
        description: "Moisture-wicking headwrap. Keeps sweat out of your eyes in style."
    },
    {
        id: 6,
        name: "Womens Crop",
        category: "apparel",
        price: 300.00,
        options: 8,
        image: "Images/wk6228kp7xbg8mt.jpeg",
        description: "Relaxed fit crop with dropped shoulders. Street to track ready."
    }
];

const runs = [
    {
        date: "SAT, FEB 28",
        title: "Long Run Saturday",
        distance: "15-21km",
        time: "05:30 AM",
        location: "Kock Street Start",
        spots: 12,
        type: "Endurance",
        intensity: "Moderate"
    },
    {
        date: "MON, MAR 02",
        title: "Coffee Run Social",
        distance: "5km",
        time: "06:00 AM",
        location: "Department HQ",
        spots: 25,
        type: "Social",
        intensity: "Easy"
    },
    {
        date: "TUE, MAR 03",
        title: "Tempo Tuesday",
        distance: "8-10km",
        time: "05:45 AM",
        location: "Rustenburg Stadium",
        spots: 20,
        type: "Performance",
        intensity: "Hard"
    },
    {
        date: "THU, MAR 05",
        title: "Hill Repeats",
        distance: "6-8km",
        time: "05:45 AM",
        location: "Waterfall East",
        spots: 15,
        type: "Strength",
        intensity: "Hard"
    },
    {
        date: "FRI, MAR 06",
        title: "Community 5K",
        distance: "5km",
        time: "06:00 AM",
        location: "Civic Centre",
        spots: 40,
        type: "Community",
        intensity: "Social"
    }
];

let cart = [];
let currentModalProduct = null;

// UI Rendering Functions
function renderProducts(filter = 'all') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

    grid.innerHTML = filtered.map(product => `
        <div class="group hover-lift bg-dept-gray overflow-hidden cursor-pointer" onclick="openQuickView(${product.id})">
            <div class="relative h-80 overflow-hidden">
                <img src="${product.image}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="${product.name}">
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                <button class="absolute bottom-4 right-4 w-12 h-12 bg-dept-accent text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all" onclick="event.stopPropagation(); quickAddToCart(${product.id})">
                    <i data-lucide="plus" class="w-6 h-6"></i>
                </button>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h3 class="font-display text-lg font-bold group-hover:text-dept-accent transition-colors">${product.name}</h3>
                    <span class="font-display font-bold">R ${product.price.toFixed(2)}</span>
                </div>
                <p class="text-white/40 text-sm capitalize">${product.category} ${product.options ? `• ${product.options} options` : product.duration ? `• ${product.duration}` : ''}</p>
            </div>
        </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
}

function renderRuns() {
    const container = document.getElementById('runs-list');
    if (!container) return;

    container.innerHTML = runs.map((run, index) => `
        <div class="bg-black/10 backdrop-blur-sm border border-black/5 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:bg-black/20 transition-all cursor-pointer group rounded-lg">
            <div class="flex items-center gap-8 flex-1">
                <div class="text-center min-w-[100px] flex flex-col items-center">
                    <div class="text-xs font-bold text-black/50 uppercase tracking-widest mb-1">${run.date.split(', ')[0]}</div>
                    <div class="text-3xl font-display font-bold leading-none">${run.date.split(', ')[1]}</div>
                </div>
                <div class="h-16 w-px bg-black/10 hidden md:block"></div>
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="px-2 py-0.5 bg-black/10 rounded text-[10px] font-bold uppercase tracking-tighter">${run.type}</span>
                        <span class="px-2 py-0.5 ${run.intensity === 'Hard' ? 'bg-black text-white' : 'bg-black/5 text-black/60'} rounded text-[10px] font-bold uppercase tracking-tighter">${run.intensity}</span>
                    </div>
                    <h3 class="font-display text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">${run.title}</h3>
                    <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-black/70">
                        <span class="flex items-center gap-1.5"><i data-lucide="map-pin" class="w-4 h-4"></i> ${run.location}</span>
                        <span class="flex items-center gap-1.5"><i data-lucide="clock" class="w-4 h-4"></i> ${run.time}</span>
                        <span class="flex items-center gap-1.5"><i data-lucide="route" class="w-4 h-4"></i> ${run.distance}</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-6 w-full md:w-auto">
                <div class="text-right hidden sm:block">
                    <div class="text-xs font-bold text-black/40 uppercase">Availability</div>
                    <div class="text-sm font-bold text-black/80">${run.spots} spots left</div>
                </div>
                <button class="flex-1 md:flex-none px-8 py-3 bg-black text-white font-display font-bold hover:bg-white hover:text-black transition-all shadow-lg hover:shadow-black/20 active:scale-95">
                    RESERVE SPOT
                </button>
            </div>
        </div>
    `).join('');
    if (window.lucide) window.lucide.createIcons();
}

// Global scope functions for HTML onclicks
window.toggleCart = () => {
    const overlay = document.getElementById('cart-overlay');
    const drawer = document.getElementById('cart-drawer');
    const isOpen = !drawer.classList.contains('translate-x-full');

    if (isOpen) {
        overlay.classList.add('pointer-events-none');
        overlay.querySelector('.bg-black/60').classList.remove('opacity-100');
        drawer.classList.add('translate-x-full');
    } else {
        overlay.classList.remove('pointer-events-none');
        overlay.querySelector('.bg-black/60').classList.add('opacity-100');
        drawer.classList.remove('translate-x-full');
    }
};

window.quickAddToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
    window.toggleCart();
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
};

function updateCart() {
    const count = document.getElementById('cart-count');
    const items = document.getElementById('cart-items');
    const total = document.getElementById('cart-total');

    count.textContent = cart.length;

    if (cart.length === 0) {
        items.innerHTML = '<p class="text-white/40 text-center py-12">Your cart is empty</p>';
        total.textContent = 'R 0.00';
    } else {
        const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
        items.innerHTML = cart.map((item, index) => `
            <div class="flex gap-4 mb-4 pb-4 border-b border-white/10">
                <img src="${item.image}" class="w-20 h-20 object-cover" alt="">
                <div class="flex-1">
                    <h4 class="font-display font-bold">${item.name}</h4>
                    <p class="text-white/40 text-sm">R ${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${index})" class="text-white/40 hover:text-dept-accent transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
        `).join('');
        total.textContent = `R ${totalPrice.toFixed(2)}`;
        if (window.lucide) window.lucide.createIcons();
    }
}

window.openQuickView = (productId) => {
    const product = products.find(p => p.id === productId);
    currentModalProduct = product;

    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-category').textContent = product.category.toUpperCase();
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = `R ${product.price.toFixed(2)}`;

    const optionsDiv = document.getElementById('modal-options');
    if (product.category === 'apparel') {
        optionsDiv.innerHTML = `
            <label class="block text-sm font-medium mb-2">Size</label>
            <div class="flex gap-2">
                ${['S', 'M', 'L', 'XL'].map(size => `
                    <button class="w-12 h-12 border border-white/20 hover:border-dept-accent hover:text-dept-accent transition-colors font-medium">${size}</button>
                `).join('')}
            </div>
        `;
    } else {
        optionsDiv.innerHTML = '';
    }

    const modal = document.getElementById('quick-view-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeQuickView = () => {
    const modal = document.getElementById('quick-view-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    currentModalProduct = null;
};

window.addToCartFromModal = () => {
    if (currentModalProduct) {
        cart.push(currentModalProduct);
        updateCart();
        window.closeQuickView();
        window.toggleCart();
    }
};

window.toggleMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('translate-x-full');
};

window.scrollGallery = (direction) => {
    const container = document.getElementById('gallery-scroll');
    container.scrollBy({ left: direction * 400, behavior: 'smooth' });
};

window.handleSubscribe = (e) => {
    e.preventDefault();
    alert('Welcome to the club! Check your email for confirmation.');
    e.target.reset();
};

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderRuns();

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('bg-dept-black/95', 'shadow-lg');
        } else {
            navbar.classList.remove('bg-dept-black/95', 'shadow-lg');
        }
    });

    // Filter functionality
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-white', 'text-black');
                b.classList.add('border-white/20');
            });
            e.target.classList.add('active', 'bg-white', 'text-black');
            e.target.classList.remove('border-white/20');
            renderProducts(e.target.dataset.filter);
        });
    });
});
