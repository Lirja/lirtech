// Mobile nav toggle
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navMenu');
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a.navlink').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  // ---- Cart logic ----
  const WHATSAPP_NUMBER = '258868581810';
  let cart = [];

  const cartToggle = document.getElementById('cartToggle');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const cartItemsEl = document.getElementById('cartItems');
  const cartEmptyEl = document.getElementById('cartEmpty');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartCountEl = document.getElementById('cartCount');
  const cartCheckoutBtn = document.getElementById('cartCheckout');

  function fmtMT(n){
    return n.toLocaleString('pt-PT') + ' MT';
  }

  function openCart(){
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  }
  function closeCart(){
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }
  cartToggle.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  function addToCart(name, price){
    const existing = cart.find(i => i.name === name);
    if(existing){
      existing.qty += 1;
    } else {
      cart.push({name, price, qty: 1});
    }
    renderCart();
    showToast(name + ' adicionado ao carrinho');
  }

  function changeQty(name, delta){
    const item = cart.find(i => i.name === name);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0){
      cart = cart.filter(i => i.name !== name);
    }
    renderCart();
  }

  function removeItem(name){
    cart = cart.filter(i => i.name !== name);
    renderCart();
  }

  function renderCart(){
    const totalItems = cart.reduce((s,i) => s + i.qty, 0);
    cartCountEl.textContent = totalItems;

    if(cart.length === 0){
      cartItemsEl.innerHTML = '';
      cartItemsEl.appendChild(cartEmptyEl);
      cartCheckoutBtn.disabled = true;
    } else {
      cartCheckoutBtn.disabled = false;
      cartItemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="ci-info">
            <div class="ci-name">${item.name}</div>
            <div class="ci-price">${fmtMT(item.price)} x ${item.qty} = ${fmtMT(item.price * item.qty)}</div>
          </div>
          <div class="ci-qty">
            <button data-action="dec" data-name="${item.name}" aria-label="Diminuir">−</button>
            <span>${item.qty}</span>
            <button data-action="inc" data-name="${item.name}" aria-label="Aumentar">+</button>
            <button class="ci-remove" data-action="remove" data-name="${item.name}" aria-label="Remover">🗑</button>
          </div>
        </div>
      `).join('');
    }

    const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
    cartTotalEl.textContent = fmtMT(total);
  }

  cartItemsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if(!btn) return;
    const name = btn.dataset.name;
    if(btn.dataset.action === 'inc') changeQty(name, 1);
    if(btn.dataset.action === 'dec') changeQty(name, -1);
    if(btn.dataset.action === 'remove') removeItem(name);
  });

  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price, 10);
      addToCart(name, price);
      openCart();
    });
  });

  cartCheckoutBtn.addEventListener('click', () => {
    if(cart.length === 0) return;
    let msg = 'Olá LIR TECH! Gostaria de encomendar:%0A%0A';
    cart.forEach(item => {
      msg += `• ${item.name} — Qtd: ${item.qty} — ${fmtMT(item.price * item.qty)}%0A`;
    });
    const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
    msg += `%0ATotal: ${fmtMT(total)}%0A%0APor favor confirmem disponibilidade e entrega.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  });

  // ---- Toast ----
  let toastTimer;
  function showToast(text){
    let toast = document.getElementById('toast');
    if(!toast){
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.id = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    clearTimeout(toastTimer);
    requestAnimationFrame(() => toast.classList.add('show'));
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
  }

  renderCart();
