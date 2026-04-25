(function() {
  'use strict';
  
  function init() {
    var body = document.body;
    var menu = document.getElementById('menu');
    var menuToggle = document.querySelector('a[href="#menu"]');
    
    var menuInner = menu.querySelector('.inner');
    if (!menuInner) {
      var wrapper = document.createElement('div');
      wrapper.className = 'inner';
      
      while (menu.firstChild) {
        wrapper.appendChild(menu.firstChild);
      }
      menu.appendChild(wrapper);
      menuInner = wrapper;
    }
    
    if (!menu.querySelector('.close')) {
      var closeBtn = document.createElement('a');
      closeBtn.className = 'close';
      closeBtn.href = '#menu';
      closeBtn.textContent = 'Close';
      menuInner.appendChild(closeBtn);
    }
    
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
    
    if (menuToggle) {
      menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        menu._toggle();
      });
    }
    
    document.addEventListener('click', function(e) {
      if (body.classList.contains('is-menu-visible')) {
        if (!menuInner.contains(e.target) && e.target !== menuToggle) {
          menu._hide();
        }
      }
    });
    
    menu.addEventListener('click', function(e) {
      if (body.classList.contains('is-menu-visible')) {
        if (!menuInner.contains(e.target)) {
          menu._hide();
        }
      }
    });
    
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 27) {
        menu._hide();
      }
    });
    
    var closeBtn = menu.querySelector('.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        menu._hide();
      });
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
