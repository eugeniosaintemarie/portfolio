// Simple menu toggle without jQuery dependency
(function() {
  'use strict';
  
  function init() {
    var body = document.body;
    var menu = document.getElementById('menu');
    var menuToggle = document.querySelector('a[href="#menu"]');
    
    // Ensure menu has inner wrapper with correct structure
    var menuInner = menu.querySelector('.inner');
    if (!menuInner) {
      // Create wrapper for inner content
      var wrapper = document.createElement('div');
      wrapper.className = 'inner';
      
      // Move all direct children to wrapper
      while (menu.firstChild) {
        wrapper.appendChild(menu.firstChild);
      }
      menu.appendChild(wrapper);
      menuInner = wrapper;
    }
    
    // Ensure close button exists
    if (!menu.querySelector('.close')) {
      var closeBtn = document.createElement('a');
      closeBtn.className = 'close';
      closeBtn.href = '#menu';
      closeBtn.textContent = 'Close';
      menuInner.appendChild(closeBtn);
    }
    
    // Menu state management
    menu._isLocked = false;
    
    menu._lock = function() {
      if (menu._isLocked) return false;
      menu._isLocked = true;
      setTimeout(function() {
        menu._isLocked = false;
      }, 350);
      return true;
    };
    
    menu._toggle = function() {
      if (menu._lock()) {
        body.classList.toggle('is-menu-visible');
      }
    };
    
    menu._show = function() {
      if (menu._lock()) {
        body.classList.add('is-menu-visible');
      }
    };
    
    menu._hide = function() {
      if (menu._lock()) {
        body.classList.remove('is-menu-visible');
      }
    };
    
    // Event handlers
    if (menuToggle) {
      menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        menu._toggle();
      });
    }
    
    // Close menu when clicking outside (on the dark overlay)
    document.addEventListener('click', function(e) {
      if (body.classList.contains('is-menu-visible')) {
        if (!menuInner.contains(e.target) && e.target !== menuToggle) {
          menu._hide();
        }
      }
    });
    
    // Also close menu when clicking directly on #menu (dark overlay)
    menu.addEventListener('click', function(e) {
      if (body.classList.contains('is-menu-visible')) {
        if (!menuInner.contains(e.target)) {
          menu._hide();
        }
      }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 27) {
        menu._hide();
      }
    });
    
    // Close menu when clicking on close button
    var closeBtn = menu.querySelector('.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        menu._hide();
      });
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
