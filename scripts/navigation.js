// Navigation handler for the FSG Generator

// Page routing configuration
const pages = {
  'stronghold': 'pages/stronghold.html',
  'ruined-portal': 'pages/ruined-portal.html',
  'ranked': 'pages/ranked.html',
  'packless-stronghold': 'pages/packless-stronghold.html',
  'village': 'pages/village.html',
  'classic': 'pages/classic.html',
  'structureless': 'pages/structureless.html',
  'desert-temple': 'pages/desert-temple.html',
  'help': 'pages/help.html',
  'tutorials': 'pages/tutorials.html',
  'resources': 'pages/resources.html'
};

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupMiscToggle();
  setupModalHandlers();
  setupModalButtons(); 
});

function setupNavigation() {
  // Add click handlers to all buttons with data-page attribute
  const navButtons = document.querySelectorAll('[data-page]');
  
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const page = button.getAttribute('data-page');
      
      // Check if it's a modal page
      if (page === 'stats') {
        document.getElementById('statsModal').classList.add('show');
        loadStats();
      } else if (page === 'credits') {
        document.getElementById('creditsModal').classList.add('show');
      } else {
        // Navigate to page
        navigateTo(page);
      }
    });
  });
}

function setupMiscToggle() {
  const miscToggle = document.getElementById('miscToggle');
  const miscExpanded = document.getElementById('miscExpanded');
  
  if (miscToggle && miscExpanded) {
    miscToggle.addEventListener('click', (e) => {
      e.preventDefault();
      miscToggle.classList.toggle('active');
      miscExpanded.classList.toggle('show');
    });
  }
}

function setupModalHandlers() {
  // Close modal when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
      }
    });
  });
}

function navigateTo(pageName) {
  const pageUrl = pages[pageName];
  
  if (pageUrl) {
    window.location.href = pageUrl;
  } else {
    console.error(`Page not found: ${pageName}`);
  }
}

// Modal functions
function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('show');
}

async function loadStats() {
  const STATS_URL = 'https://script.google.com/macros/s/AKfycbxMxZ9zStBmy6ERJk1ne6_-zH8eOEce5ISf_wcWYmq2tHYhrwKmNSaYZ_LzDYEHQn3mIQ/exec';
  
  try {
    const response = await fetch(STATS_URL);
    const data = await response.json();
    
    // Update stats
    document.getElementById('totalSeeds').textContent = data.total || 0;
    document.getElementById('strongholdCount').textContent = data.stronghold || 0;
    document.getElementById('ruinedPortalCount').textContent = data.ruinedPortal || 0;
    document.getElementById('villageCount').textContent = data.village || 0;
    document.getElementById('classicCount').textContent = data.classic || 0;
    document.getElementById('otherCount').textContent = data.other || 0;
    
    document.getElementById('statsLoading').style.display = 'none';
    document.getElementById('statsContent').style.display = 'block';
  } catch (error) {
    document.getElementById('statsLoading').textContent = 'Failed to load stats. Please try again later.';
    console.error('Error loading stats:', error);
  }
}

function setupModalButtons() {
  const statsBtn = document.getElementById('statsBtn');
  const creditsBtn = document.getElementById('creditsBtn');
  
  if (statsBtn) {
    statsBtn.addEventListener('click', () => {
      document.getElementById('statsModal').classList.add('show');
      loadStats();
    });
  }
  
  if (creditsBtn) {
    creditsBtn.addEventListener('click', () => {
      document.getElementById('creditsModal').classList.add('show');
    });
  }
  
  // Close modal when clicking outside
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('show');
      }
    });
  });
}
