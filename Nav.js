// ── Loads navbar.html into #nav-container and sets active link ──
(function(){
  fetch('navbar.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('nav-container').innerHTML = html;

      // Set active link based on current page filename
      const page = location.pathname.split('/').pop() || 'home.html';
      const map = {
        'home.html':    'nl-home',
        'shop.html':    'nl-shop',
        'order.html':   'nl-order',
        'contact.html': 'nl-contact',
      };
      const activeId = map[page];
      if(activeId){
        const el = document.getElementById(activeId);
        if(el) el.classList.add('active');
      }

      // Wire cart button if it exists on this page
      const cartBtn = document.getElementById('nav-cart-btn');
      if(cartBtn && typeof toggleCart === 'function'){
        cartBtn.addEventListener('click', toggleCart);
      }

      // Refresh badge on load
      refreshNavBadge();
    });
})();

function refreshNavBadge(){
  const cart = JSON.parse(localStorage.getItem('th_cart') || '[]');
  const n = cart.reduce((s,i) => s + i.qty, 0);
  const badge = document.getElementById('nav-cart-badge');
  if(badge){
    badge.textContent = n;
    badge.style.display = n ? 'flex' : 'none';
  }
}