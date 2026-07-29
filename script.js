/* ==========================================================================
   ADIDAS ELEVATE — CORE INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Variant Data Registry
  // ------------------------------------------------------------------------
  const variants = {
    phantom: {
      id: 'phantom',
      title: 'ELEVATE PHANTOM',
      price: 300,
      bgLayerId: 'bgPhantom',
      logo: 'assets/logo_wh.png',
      footerLogo: 'assets/logo_sn2.png',
      themeClass: 'theme-phantom',
      accentColor: '#b88d55'
    },
    dune: {
      id: 'dune',
      title: 'ELEVATE DUNE',
      price: 280,
      bgLayerId: 'bgDune',
      logo: 'assets/logo_sn3.png',
      footerLogo: 'assets/logo_sn5.png',
      themeClass: 'theme-dune',
      accentColor: '#f7e5cd'
    },
    slate: {
      id: 'slate',
      title: 'ELEVATE SLATE',
      price: 280,
      bgLayerId: 'bgSlate',
      logo: 'assets/logo_bl.png',
      footerLogo: 'assets/logo_bl2.png',
      themeClass: 'theme-slate',
      accentColor: '#000000'
    },
    frost: {
      id: 'frost',
      title: 'ELEVATE FROST',
      price: 290,
      bgLayerId: 'bgFrost',
      logo: 'assets/logo_bl.png',
      footerLogo: 'assets/logo_bl2.png',
      themeClass: 'theme-frost',
      accentColor: '#0F172A'
    }
  };

  let currentVariant = 'phantom';
  let currentSlide = 1;

  // Initialize initial dynamic scrollbar style tag
  if (!document.getElementById('dynamic-scrollbar-css')) {
    const initScrollbarStyle = document.createElement('style');
    initScrollbarStyle.id = 'dynamic-scrollbar-css';
    initScrollbarStyle.textContent = `
      ::-webkit-scrollbar-track { background: #16191e !important; }
      ::-webkit-scrollbar-thumb { background: #b88d55 !important; border-radius: 5px; border: 2px solid #16191e !important; }
    `;
    document.head.appendChild(initScrollbarStyle);
  }

  // ------------------------------------------------------------------------
  // 2. DOM Elements
  // ------------------------------------------------------------------------
  const bgLayers = document.querySelectorAll('.hero-bg-layer');
  const variantLabelText = document.getElementById('variantLabelText');
  const headerLogoImg = document.getElementById('headerLogoImg');
  const dotBtns = document.querySelectorAll('.color-dot-btn');

  // Slide Elements
  const slideNum01 = document.getElementById('slideNum01');
  const slideNum02 = document.getElementById('slideNum02');
  const slideProgress = document.getElementById('slideProgress');
  const slideTrack = document.getElementById('slideTrack');

  // Cart Drawer Elements
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const cartCountBadge = document.getElementById('cartCountBadge');
  const cartDrawerCount = document.getElementById('cartDrawerCount');

  // Reservation Modal Elements
  const btnReserve = document.getElementById('btnReserve');
  const reserveModal = document.getElementById('reserveModal');
  const closeReserveBtn = document.getElementById('closeReserveBtn');
  const reserveForm = document.getElementById('reserveForm');
  const sizeBtns = document.querySelectorAll('.size-btn');
  const modalColorwaySelector = document.getElementById('modalColorwaySelector');

  // Info Modal Elements
  const infoModal = document.getElementById('infoModal');
  const closeInfoModalBtn = document.getElementById('closeInfoModalBtn');
  const infoModalTag = document.getElementById('infoModalTag');
  const infoModalTitle = document.getElementById('infoModalTitle');
  const infoModalBody = document.getElementById('infoModalBody');

  // Navigation Links
  const navStore = document.getElementById('navStore');
  const navAbout = document.getElementById('navAbout');
  const navContact = document.getElementById('navContact');
  const btnLearn = document.getElementById('btnLearn');

  // ------------------------------------------------------------------------
  // 3. Variant Switcher Engine
  // ------------------------------------------------------------------------
  function switchVariant(variantId) {
    if (!variants[variantId] || currentVariant === variantId) return;

    currentVariant = variantId;
    const data = variants[variantId];

    // 1. Update Body & Root Theme Class and Dynamic Scrollbar
    document.body.className = data.themeClass;
    document.documentElement.className = data.themeClass;

    const scrollbarStyles = {
      phantom: `
        ::-webkit-scrollbar-track { background: #16191e !important; }
        ::-webkit-scrollbar-thumb { background: #b88d55 !important; border-radius: 5px; border: 2px solid #16191e !important; }
      `,
      dune: `
        ::-webkit-scrollbar-track { background: #bb895a !important; }
        ::-webkit-scrollbar-thumb { background: #34271C !important; border-radius: 5px; border: 2px solid #bb895a !important; }
      `,
      slate: `
        ::-webkit-scrollbar-track { background: #989898 !important; }
        ::-webkit-scrollbar-thumb { background: #000000 !important; border-radius: 5px; border: 2px solid #989898 !important; }
      `,
      frost: `
        ::-webkit-scrollbar-track { background: #f1f1f1 !important; }
        ::-webkit-scrollbar-thumb { background: #0f172a !important; border-radius: 5px; border: 2px solid #f1f1f1 !important; }
      `
    };

    let scrollbarStyleTag = document.getElementById('dynamic-scrollbar-css');
    if (!scrollbarStyleTag) {
      scrollbarStyleTag = document.createElement('style');
      scrollbarStyleTag.id = 'dynamic-scrollbar-css';
      document.head.appendChild(scrollbarStyleTag);
    }
    if (scrollbarStyles[variantId]) {
      scrollbarStyleTag.textContent = scrollbarStyles[variantId];
    }

    // 2. Update Header, Connector & Footer Logo Images
    const headerLogoImg = document.getElementById('headerLogoImg');
    const mobileNavLogoEl = document.getElementById('mobileNavLogo');
    const connectorLogo = document.querySelector('.connector-logo');
    const footerLogo = document.querySelector('.footer-logo');

    if (headerLogoImg && data.logo) headerLogoImg.src = data.logo;
    if (connectorLogo && data.logo) connectorLogo.src = data.logo;
    if (footerLogo) footerLogo.src = data.footerLogo || data.logo;

    // 3. Cross-fade Background Layers
    bgLayers.forEach(layer => {
      if (layer.id === data.bgLayerId) {
        layer.classList.add('active');
      } else {
        layer.classList.remove('active');
      }
    });

    // 4. Fade & Update Bottom Right Variant Label Text Only
    variantLabelText.style.opacity = '0';
    setTimeout(() => {
      variantLabelText.innerHTML = data.title.split('').join(' &nbsp; ');
      variantLabelText.style.opacity = '1';
    }, 200);

    // 5. Update Color Picker Dots UI
    dotBtns.forEach(btn => {
      const v = btn.getAttribute('data-variant');
      if (v === variantId) {
        btn.classList.add('active');
        if (!btn.querySelector('.active-ring')) {
          const ring = document.createElement('span');
          ring.className = 'active-ring';
          btn.appendChild(ring);
        }
      } else {
        btn.classList.remove('active');
        const ring = btn.querySelector('.active-ring');
        if (ring) ring.remove();
      }
    });

    // 6. Update Modal Selector
    updateModalColorwayUI();
  }

  // Bind click listeners to dot buttons
  dotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.getAttribute('data-variant');
      switchVariant(v);
    });
  });

  // Bind click listeners to colorway cards in store section
  document.querySelectorAll('[data-select-variant]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const v = btn.getAttribute('data-select-variant');
      switchVariant(v);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ------------------------------------------------------------------------
  // 4. Slide Switcher (01 / 02 Indicator)
  // ------------------------------------------------------------------------
  function setSlide(slideNumber) {
    currentSlide = slideNumber;
    if (slideNumber === 1) {
      slideProgress.style.left = '0%';
      slideNum01.classList.add('active');
      slideNum02.classList.remove('active');
    } else {
      slideProgress.style.left = '50%';
      slideNum02.classList.add('active');
      slideNum01.classList.remove('active');
    }
  }

  slideNum01.addEventListener('click', () => setSlide(1));
  slideNum02.addEventListener('click', () => setSlide(2));
  slideTrack.addEventListener('click', () => setSlide(currentSlide === 1 ? 2 : 1));

  // ------------------------------------------------------------------------
  // 5. Shopping Cart State & Management
  // ------------------------------------------------------------------------
  let cart = [
    {
      id: 'phantom',
      title: 'Elevate Phantom',
      size: 'US 10',
      price: 300,
      quantity: 1,
      image: 'assets/Ele_Phantom.png'
    },
    {
      id: 'dune',
      title: 'Elevate Dune',
      size: 'US 9.5',
      price: 280,
      quantity: 1,
      image: 'assets/Ele_dune.png'
    }
  ];

  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<div class="empty-cart-msg"><p>Your shopping cart is currently empty.</p></div>`;
    } else {
      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            <p style="font-size:0.75rem; color: var(--text-muted);">Size: ${item.size}</p>
            <p class="cart-item-price">$${item.price}.00</p>
            <div class="cart-item-qty">
              <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
            </div>
          </div>
          <button class="remove-item-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button>
        `;
        cartItemsContainer.appendChild(cartItemEl);
      });
    }

    cartSubtotal.textContent = `$${total.toFixed(2)}`;
    cartCountBadge.textContent = count;
    cartDrawerCount.textContent = count;
  }

  // Cart Qty Adjustments & Removal
  cartItemsContainer.addEventListener('click', (e) => {
    const qtyBtn = e.target.closest('.qty-btn');
    const removeBtn = e.target.closest('.remove-item-btn');

    if (qtyBtn) {
      const index = parseInt(qtyBtn.getAttribute('data-index'));
      const action = qtyBtn.getAttribute('data-action');
      if (action === 'increase') {
        cart[index].quantity += 1;
      } else if (action === 'decrease') {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
      }
      renderCart();
    }

    if (removeBtn) {
      const index = parseInt(removeBtn.getAttribute('data-index'));
      cart.splice(index, 1);
      renderCart();
    }
  });

  // Toggle Cart Drawer
  cartToggleBtn.addEventListener('click', () => {
    cartOverlay.classList.add('active');
    cartOverlay.setAttribute('aria-hidden', 'false');
  });

  closeCartBtn.addEventListener('click', () => {
    cartOverlay.classList.remove('active');
    cartOverlay.setAttribute('aria-hidden', 'true');
  });

  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
      cartOverlay.classList.remove('active');
      cartOverlay.setAttribute('aria-hidden', 'true');
    }
  });

  // Add to cart from grid cards
  document.querySelectorAll('[data-add-cart]').forEach(btn => {
    btn.addEventListener('click', () => {
      const variantKey = btn.getAttribute('data-add-cart');
      const v = variants[variantKey];
      
      const existing = cart.find(item => item.id === variantKey);
      if (existing) {
        existing.quantity += 1;
      } else {
        const imageMap = {
          phantom: 'assets/Ele_Phantom.png',
          dune: 'assets/Ele_dune.png',
          slate: 'assets/Ele_slate.png',
          frost: 'assets/Ele_frost.png'
        };
        cart.push({
          id: v.id,
          title: v.title,
          size: 'US 10',
          price: v.price,
          quantity: 1,
          image: imageMap[v.id] || 'assets/Ele_Phantom.png'
        });
      }
      renderCart();
      showToast(`<i class="fa-solid fa-circle-check"></i> Added ${v.title} to Cart`);
    });
  });

  // Checkout Button
  document.getElementById('btnCheckout').addEventListener('click', () => {
    if (cart.length === 0) {
      showToast(`<i class="fa-solid fa-circle-exclamation"></i> Your cart is empty.`);
      return;
    }
    showToast(`<i class="fa-solid fa-circle-check"></i> Order Processed! Thank you for purchasing.`);
    cart = [];
    renderCart();
    cartOverlay.classList.remove('active');
  });

  // Initial render
  renderCart();

  // ------------------------------------------------------------------------
  // 6. Reservation Modal
  // ------------------------------------------------------------------------
  let selectedSize = 'US 10';

  btnReserve.addEventListener('click', () => {
    updateModalColorwayUI();
    reserveModal.classList.add('active');
    reserveModal.setAttribute('aria-hidden', 'false');
  });

  closeReserveBtn.addEventListener('click', () => {
    reserveModal.classList.remove('active');
    reserveModal.setAttribute('aria-hidden', 'true');
  });

  reserveModal.addEventListener('click', (e) => {
    if (e.target === reserveModal) {
      reserveModal.classList.remove('active');
      reserveModal.setAttribute('aria-hidden', 'true');
    }
  });

  // Size buttons selection
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.getAttribute('data-size');
    });
  });

  function updateModalColorwayUI() {
    modalColorwaySelector.innerHTML = '';
    Object.keys(variants).forEach(key => {
      const v = variants[key];
      const pill = document.createElement('div');
      pill.className = `color-option-pill ${key === currentVariant ? 'active' : ''}`;
      pill.textContent = v.title.replace('ELEVATE ', '');
      pill.addEventListener('click', () => {
        switchVariant(key);
      });
      modalColorwaySelector.appendChild(pill);
    });
  }

  reserveForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const reservationCode = 'ADIDAS-ELV-' + Math.floor(100000 + Math.random() * 900000);
    
    showToast(`<i class="fa-solid fa-circle-check"></i> Reservation Confirmed! Code: ${reservationCode}`);
    reserveModal.classList.remove('active');
    reserveForm.reset();
  });

  // ------------------------------------------------------------------------
  // 7. Info Modals (Store, About Us, Contact Us)
  // ------------------------------------------------------------------------
  function openInfoModal(title, tag, contentHtml) {
    infoModalTitle.textContent = title;
    infoModalTag.textContent = tag;
    infoModalBody.innerHTML = contentHtml;
    infoModal.classList.add('active');
    infoModal.setAttribute('aria-hidden', 'false');
  }

  closeInfoModalBtn.addEventListener('click', () => {
    infoModal.classList.remove('active');
    infoModal.setAttribute('aria-hidden', 'true');
  });

  infoModal.addEventListener('click', (e) => {
    if (e.target === infoModal) {
      infoModal.classList.remove('active');
      infoModal.setAttribute('aria-hidden', 'true');
    }
  });

  navStore.addEventListener('click', (e) => {
    e.preventDefault();
    const el = document.getElementById('store');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  navAbout.addEventListener('click', (e) => {
    e.preventDefault();
    openInfoModal(
      'Future of Performance Footwear',
      'BRAND MANIFESTO',
      `
        <p style="margin-bottom:15px; line-height:1.6; color: var(--text-muted);">Adidas Elevate represents the pinnacle of digital light synthesis. Engineered using liquid resin 3D printing technology, every millimeter of the lattice sole is calculated to respond to human foot mechanics.</p>
        <p style="margin-bottom:15px; line-height:1.6; color: var(--text-muted);">Developed over 5 years of laboratory biomechanical research with world-class runners, the Elevate series delivers 40% higher energy return than traditional EVA midsoles while using 100% zero-waste manufacturing.</p>
        <div style="background: rgba(169, 132, 82, 0.1); padding: 15px; border-radius: 8px; border: 1px solid var(--accent-gold); color: var(--accent-gold); font-size: 0.9rem;">
          <strong>Core Innovation:</strong> 3D-Printed Liquid Resin + Primeknit Sustainability.
        </div>
      `
    );
  });

  navContact.addEventListener('click', (e) => {
    e.preventDefault();
    openInfoModal(
      'Contact Concierge',
      'CUSTOMER SUPPORT',
      `
        <p style="margin-bottom:20px; color: var(--text-muted);">Have questions regarding sizing, custom reservations, or order tracking? Reach out to our dedicated Elevate Concierge team.</p>
        <form id="contactFormSubmit" style="display:flex; flex-direction:column; gap:12px;">
          <input type="text" placeholder="Your Name" required style="padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px;">
          <input type="email" placeholder="Your Email" required style="padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px;">
          <textarea placeholder="Your Message" rows="3" required style="padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); color:#fff; border-radius:6px;"></textarea>
          <button type="submit" style="padding:14px; background:#a98452; color:#000; font-weight:800; border-radius:30px; border:none; cursor:pointer;">SEND MESSAGE</button>
        </form>
      `
    );

    setTimeout(() => {
      const cForm = document.getElementById('contactFormSubmit');
      if (cForm) {
        cForm.addEventListener('submit', (ev) => {
          ev.preventDefault();
          showToast(`<i class="fa-solid fa-circle-check"></i> Message sent to Concierge.`);
          infoModal.classList.remove('active');
        });
      }
    }, 100);
  });

  // Wishlist buttons handler
  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = btn.querySelector('i');
      if (icon.classList.contains('fa-regular')) {
        icon.classList.remove('fa-regular');
        icon.classList.add('fa-solid');
        icon.style.color = '#E53E3E';
        showToast(`<i class="fa-solid fa-heart" style="color:#E53E3E;"></i> Saved to Wishlist!`);
      } else {
        icon.classList.remove('fa-solid');
        icon.classList.add('fa-regular');
        icon.style.color = 'inherit';
        showToast(`<i class="fa-regular fa-heart"></i> Removed from Wishlist.`);
      }
    });
  });

  // VIP Club Join button
  const btnJoinClub = document.getElementById('btnJoinClub');
  if (btnJoinClub) {
    btnJoinClub.addEventListener('click', () => {
      updateModalColorwayUI();
      reserveModal.classList.add('active');
      reserveModal.setAttribute('aria-hidden', 'false');
      showToast(`<i class="fa-solid fa-crown"></i> Welcome to ADIDAS ELEVATE CLUB VIP!`);
    });
  }

  // Colorways showcase Add to Cart buttons
  document.querySelectorAll('.color-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.color-card');
      const title = card ? card.querySelector('.color-card-title').textContent : 'Colorway Sneaker';
      showToast(`<i class="fa-solid fa-cart-plus"></i> Added ${title} to Cart!`);
    });
  });

  // Video play button handler
  const videoPlayBtn = document.querySelector('.video-play-btn');
  if (videoPlayBtn) {
    videoPlayBtn.addEventListener('click', () => {
      showToast(`<i class="fa-solid fa-circle-play"></i> Playing Adidas Elevate New Collection Reel...`);
    });
  }

  // Modern Editorial section handlers
  const btnExploreAll = document.getElementById('btnExploreAll');
  if (btnExploreAll) {
    btnExploreAll.addEventListener('click', () => {
      document.getElementById('store').scrollIntoView({ behavior: 'smooth' });
    });
  }

  const openLifestyleReserveBtn = document.getElementById('openLifestyleReserveBtn');
  if (openLifestyleReserveBtn) {
    openLifestyleReserveBtn.addEventListener('click', () => {
      updateModalColorwayUI();
      reserveModal.classList.add('active');
      reserveModal.setAttribute('aria-hidden', 'false');
    });
  }

  const modernSubscribeForm = document.getElementById('modernSubscribeForm');
  if (modernSubscribeForm) {
    modernSubscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast(`<i class="fa-solid fa-envelope-circle-check"></i> Subscribed! Thank you for joining the Adidas motion club.`);
      e.target.reset();
    });
  }

  // Footer colorway links
  document.querySelectorAll('[data-switch]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const variant = link.getAttribute('data-switch');
      switchVariant(variant);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast(`<i class="fa-solid fa-envelope-circle-check"></i> Subscribed to Adidas Elevate updates!`);
      e.target.reset();
    });
  }

  // ------------------------------------------------------------------------
  // 8. Toast Helper
  // ------------------------------------------------------------------------
  function showToast(messageHtml) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = messageHtml;
    
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ------------------------------------------------------------------------
  // 9. Snappy High-Performance Motion Observer
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.bestseller-card, .loco-card, .editorial-card, .motion-card, .mosaic-item, .section-header, .editorial-header-row, .vip-club-container, .lifestyle-text-panel, .tech-card');
  
  revealElements.forEach((el, idx) => {
    el.classList.add('reveal-on-scroll');
    const delayClass = `stagger-${(idx % 4) + 1}`;
    el.classList.add(delayClass);
  });

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px 0px 0px'
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => scrollObserver.observe(el));

  // 3D Magnetic Tilt Effect for Cards
  const tiltCards = document.querySelectorAll('.bestseller-card, .loco-card, .editorial-card, .motion-card');
  tiltCards.forEach(card => {
    card.classList.add('figma-tilt-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ------------------------------------------------------------------------
  // 10. Scroll To Top (Up Button) Handler
  // ------------------------------------------------------------------------
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    const toggleScrollBtn = () => {
      if (window.scrollY > 250) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', toggleScrollBtn, { passive: true });
    toggleScrollBtn();

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 11. Hamburger Menu & Mobile Navigation Overlay
  // ------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('[data-close-nav]');
  const mobileReserveBtn = document.getElementById('mobileReserveBtn');
  const mobileNavLogo = document.getElementById('mobileNavLogo');

  function openMobileNav() {
    mobileNavOverlay.classList.add('is-open');
    mobileNavOverlay.setAttribute('aria-hidden', 'false');
    hamburgerBtn.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNavOverlay.classList.remove('is-open');
    mobileNavOverlay.setAttribute('aria-hidden', 'true');
    hamburgerBtn.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      if (mobileNavOverlay.classList.contains('is-open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  // Close nav when any nav link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Mobile reserve button opens the reservation modal
  if (mobileReserveBtn && reserveModal) {
    mobileReserveBtn.addEventListener('click', () => {
      closeMobileNav();
      setTimeout(() => {
        updateModalColorwayUI();
        reserveModal.classList.add('active');
        reserveModal.setAttribute('aria-hidden', 'false');
      }, 400);
    });
  }

  // Keep mobile nav logo in sync with theme switches
  const originalSwitchVariant = switchVariant;
  // Wrap switchVariant to also update mobile nav logo
  dotBtns.forEach(btn => {
    // Already registered above; mobile dots are captured by querySelectorAll('.color-dot-btn')
  });

  // ------------------------------------------------------------------------
  // 12. Mobile Background Image Switcher
  // ------------------------------------------------------------------------
  // On mobile (≤768px) swap each hero layer to the mobile background image
  function applyMobileBackgrounds() {
    const isMobile = window.innerWidth <= 768;
    const heroBgLayers = document.querySelectorAll('.hero-bg-layer');

    heroBgLayers.forEach(layer => {
      const desktopBg = layer.getAttribute('data-desktop-bg') || layer.style.backgroundImage;
      const mobileBg = layer.getAttribute('data-mobile-bg');

      // Cache the original desktop bg once
      if (!layer.getAttribute('data-desktop-bg')) {
        // Extract url string from inline style
        const currentBg = layer.style.backgroundImage; // e.g. url('...')
        layer.setAttribute('data-desktop-bg', currentBg);
      }

      if (isMobile && mobileBg) {
        layer.style.backgroundImage = `url('${mobileBg}')`;
      } else {
        // Restore desktop background
        const savedDesktop = layer.getAttribute('data-desktop-bg');
        if (savedDesktop) {
          layer.style.backgroundImage = savedDesktop;
        }
      }
    });
  }

  // Run on load
  applyMobileBackgrounds();

  // Re-run on resize (throttled)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyMobileBackgrounds, 150);
  }, { passive: true });

});

