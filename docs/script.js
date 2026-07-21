const navToggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('global-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const header = document.querySelector('.site-header');
let previousScroll = window.scrollY;

window.addEventListener('scroll', () => {
  if (!header) return;
  const current = window.scrollY;
  if (current > previousScroll && current > 140) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  previousScroll = current;
});

const slides = document.querySelectorAll('.slide');
let slideIndex = 0;

function showSlide(index) {
  if (!slides.length) return;
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

if (slides.length) {
  showSlide(slideIndex);

  const next = document.querySelector('[data-slide="next"]');
  const prev = document.querySelector('[data-slide="prev"]');

  if (next) {
    next.addEventListener('click', () => {
      slideIndex = (slideIndex + 1) % slides.length;
      showSlide(slideIndex);
    });
  }

  if (prev) {
    prev.addEventListener('click', () => {
      slideIndex = (slideIndex - 1 + slides.length) % slides.length;
      showSlide(slideIndex);
    });
  }

  setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }, 6000);
}

const faqButtons = document.querySelectorAll('.faq-q');
faqButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const answer = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', String(!expanded));
    if (answer) {
      answer.hidden = expanded;
    }
  });
});

const revealTargets = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealTargets.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((el) => observer.observe(el));
}

const contactForm = document.getElementById('contact-form');
const complete = document.getElementById('complete-message');
const contactEndpoint = 'https://script.google.com/macros/s/AKfycbz8nQtgzjTod-dosd5kmXxBCP_4HGhS-t6sFqzP_WcITgXXXDwod2w1FGs0UesCqjr7Ng/exec';
if (contactForm && complete) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }

    complete.hidden = true;
    complete.textContent = '';

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      if (!response) {
        throw new Error('送信に失敗しました。時間をおいて再度お試しください。');
      }

      complete.textContent = '送信完了しました。内容を確認のうえご連絡します。';
      complete.hidden = false;
      contactForm.reset();
    } catch (error) {
      complete.textContent = `送信エラー: ${error.message}`;
      complete.hidden = false;
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

const linePopup = document.getElementById('line-popup');
const linePopupClose = document.querySelector('.line-popup-close');

if (linePopup) {
  const dismissed = sessionStorage.getItem('line-popup-dismissed');
  if (!dismissed) {
    setTimeout(() => {
      linePopup.hidden = false;
    }, 4000);
  }

  if (linePopupClose) {
    linePopupClose.addEventListener('click', () => {
      linePopup.hidden = true;
      sessionStorage.setItem('line-popup-dismissed', '1');
    });
  }
}

const serviceMenuOpen = document.getElementById('service-menu-open');
const serviceMenuModal = document.getElementById('service-menu-modal');
const serviceMenuClose = document.getElementById('service-menu-close');

if (serviceMenuOpen && serviceMenuModal) {
  serviceMenuModal.hidden = true;
  serviceMenuOpen.setAttribute('aria-expanded', 'false');

  const openServiceMenu = () => {
    serviceMenuModal.hidden = false;
    serviceMenuOpen.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeServiceMenu = () => {
    serviceMenuModal.hidden = true;
    serviceMenuOpen.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  serviceMenuOpen.addEventListener('click', openServiceMenu);

  if (serviceMenuClose) {
    serviceMenuClose.addEventListener('click', closeServiceMenu);
  }

  serviceMenuModal.addEventListener('click', (event) => {
    if (event.target === serviceMenuModal) {
      closeServiceMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !serviceMenuModal.hidden) {
      closeServiceMenu();
    }
  });
}
