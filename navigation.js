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
  'credits': 'pages/credits.html',
  'help': 'pages/help.html',
  'tutorials': 'pages/tutorials.html',
  'resources': 'pages/resources.html',
  'stats': 'pages/stats.html'
};

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupMiscToggle();
});

function setupNavigation() {
  // Add click handlers to all buttons with data-page attribute
  const navButtons = document.querySelectorAll('[data-page]');
  
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const page = button.getAttribute('data-page');
      navigateTo(page);
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

function navigateTo(pageName) {
  const pageUrl = pages[pageName];
  
  if (pageUrl) {
    window.location.href = pageUrl;
  } else {
    console.error(`Page not found: ${pageName}`);
  }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
  if (e.state && e.state.page) {
    navigateTo(e.state.page);
  }
});