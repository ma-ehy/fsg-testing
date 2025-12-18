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

// Create audio objects for chest sounds
const chestOpenSound = new Audio('./chest_open.ogg');
const chestCloseSound = new Audio('./chest_close.ogg');

// Create audio object for menu clicks
const menuClickSound = new Audio('./menu_click.ogg');

// Create audio objects for each mode
const modesSounds = {
  'stronghold': new Audio('./stronghold.ogg'),
  'ruined-portal': new Audio('./ruined_portal.ogg'),
  'ranked': new Audio('./ranked.ogg'),
  'packless-stronghold': new Audio('./packless_stronghold.ogg'),
  'village': new Audio('./village.ogg'),
  'classic': new Audio('./classic.ogg'),
  'structureless': new Audio('./structureless.ogg'),
  'desert-temple': new Audio('./desert_temple.ogg')
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
        menuClickSound.currentTime = 0;
        menuClickSound.play();
        document.getElementById('statsModal').classList.add('show');
        loadStats();
      } else if (page === 'credits') {
        menuClickSound.currentTime = 0;
        menuClickSound.play();
        document.getElementById('creditsModal').classList.add('show');
      } else if (page === 'help' || page === 'tutorials' || page === 'resources') {
        // Play menu click for resource buttons and wait before navigating
        menuClickSound.currentTime = 0;
        menuClickSound.play();
        setTimeout(() => {
          navigateTo(page);
        }, 300); // Adjust delay as needed (300ms = 0.3 seconds)
      } else {
        // Play mode-specific sound for filter buttons and wait before navigating
        if (modesSounds[page]) {
          modesSounds[page].currentTime = 0;
          modesSounds[page].play();
          setTimeout(() => {
            navigateTo(page);
          }, 700); // Adjust delay as needed 
        } else {
          navigateTo(page);
        }
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
      
      // Play appropriate sound based on state
      if (miscExpanded.classList.contains('show')) {
        chestOpenSound.currentTime = 0; // Reset to start
        chestOpenSound.play();
      } else {
        chestCloseSound.currentTime = 0; // Reset to start
        chestCloseSound.play();
      }
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

function loadStats() {
  document.getElementById('statsLoading').style.display = 'none';
  document.getElementById('statsContent').style.display = 'block';
}

function setupModalButtons() {
  const statsBtn = document.getElementById('statsBtn');
  const creditsBtn = document.getElementById('creditsBtn');
  
  if (statsBtn) {
    statsBtn.addEventListener('click', () => {
      menuClickSound.currentTime = 0;
      menuClickSound.play();
      document.getElementById('statsModal').classList.add('show');
      loadStats();
    });
  }
  
  if (creditsBtn) {
    creditsBtn.addEventListener('click', () => {
      menuClickSound.currentTime = 0;
      menuClickSound.play();
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
