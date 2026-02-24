const translations = {
  en: {
    nav: {
      about: "About",
      categories: "Categories",
      why: "Why Us",
      reviews: "Reviews",
      contact: "Contact"
    },
    hero: {
      headline: "Freshness You Can Taste.",
      subheadline: "Your neighborhood grocery store in Longueuil.",
      buttonVisit: "Visit Us Today",
      buttonCall: "Call Now"
    },
    about: {
      title: "About Us",
      text: "Marché Idrees is your trusted local grocery store offering fresh produce, quality halal meats, international products, and everyday essentials — all with friendly neighborhood service."
    },
    categories: {
      title: "Featured Categories",
      items: [
        "Fresh Produce",
        "Halal Meats",
        "International Products",
        "Dairy & Eggs",
        "Snacks & Beverages"
      ]
    },
    why: {
      title: "Why Choose Us",
      items: [
        "Premium Quality Products",
        "Friendly Customer Service",
        "Convenient Location",
        "Affordable Prices"
      ]
    },
    reviews: {
      title: "What Our Customers Say",
      rating: "5.0 ★ Based on 6 reviews",
      cards: [
        {
          name: "John D.",
          text: "Amazing fresh produce and friendly staff. My go-to grocery store in Longueuil!"
        },
        {
          name: "Sarah M.",
          text: "Great selection of halal meats and international products. Highly recommended."
        },
        {
          name: "Michael P.",
          text: "Affordable prices, clean store, and excellent service. 5 stars!"
        }
      ]
    },
    contact: {
      title: "Location & Contact",
      addressLabel: "Address",
      phoneLabel: "Phone",
      hoursLabel: "Opening Hours",
      hours: "Open daily – Closes at 8:00 PM",
      form: {
        name: "Your Name",
        email: "Your Email",
        message: "Your Message",
        submit: "Send Message",
        success: "Message sent successfully!"
      }
    },
    footer: {
      tagline: "Marché Idrees — Serving Longueuil with Freshness & Care.",
      copyright: "© 2026 Marché Idrees. All rights reserved."
    }
  },
  fr: {
    nav: {
      about: "À propos",
      categories: "Catégories",
      why: "Pourquoi nous",
      reviews: "Avis",
      contact: "Contact"
    },
    hero: {
      headline: "La fraîcheur que vous pouvez goûter.",
      subheadline: "Votre épicerie de quartier à Longueuil.",
      buttonVisit: "Nous visiter",
      buttonCall: "Appeler maintenant"
    },
    about: {
      title: "À propos",
      text: "Marché Idrees est votre épicerie locale de confiance offrant des fruits et légumes frais, des viandes halal de qualité, des produits internationaux et tous vos essentiels du quotidien — avec un service chaleureux et professionnel."
    },
    categories: {
      title: "Catégories populaires",
      items: [
        "Fruits & légumes frais",
        "Viandes halal",
        "Produits internationaux",
        "Produits laitiers & œufs",
        "Collations & boissons"
      ]
    },
    why: {
      title: "Pourquoi nous choisir",
      items: [
        "Produits de qualité supérieure",
        "Service à la clientèle exceptionnel",
        "Emplacement pratique",
        "Prix abordables"
      ]
    },
    reviews: {
      title: "Ce que disent nos clients",
      rating: "5.0 ★ sur 6 avis",
      cards: [
        {
          name: "Jean D.",
          text: "Des produits frais incroyables et un personnel accueillant. Mon épicerie préférée à Longueuil !"
        },
        {
          name: "Sarah M.",
          text: "Excellent choix de viandes halal et de produits internationaux. Je recommande vivement."
        },
        {
          name: "Michael P.",
          text: "Des prix abordables, un magasin propre et un excellent service. 5 étoiles !"
        }
      ]
    },
    contact: {
      title: "Emplacement & Contact",
      addressLabel: "Adresse",
      phoneLabel: "Téléphone",
      hoursLabel: "Heures d'ouverture",
      hours: "Ouvert tous les jours – Ferme à 20h",
      form: {
        name: "Votre nom",
        email: "Votre email",
        message: "Votre message",
        submit: "Envoyer le message",
        success: "Message envoyé avec succès !"
      }
    },
    footer: {
      tagline: "Marché Idrees — Au service de Longueuil avec fraîcheur et qualité.",
      copyright: "© 2026 Marché Idrees. Tous droits réservés."
    }
  }
};

let currentLang = localStorage.getItem('language') || 'fr';

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => {
    if (acc == null) return undefined;
    const arrayMatch = part.match(new RegExp('(\\w+)\\[(\\d+)\\]'));
    if (arrayMatch) {
      const arr = acc[arrayMatch[1]];
      const idx = parseInt(arrayMatch[2]);
      return arr ? arr[idx] : undefined;
    }
    return acc[part];
  }, obj);
}

function updateContent(lang) {
  const t = translations[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const value = getNestedValue(t, key);
    if (value !== undefined) el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    const value = getNestedValue(t, key);
    if (value !== undefined) el.placeholder = value;
  });
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) langToggle.textContent = lang === 'fr' ? 'EN' : 'FR';
  localStorage.setItem('language', lang);
}

const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    }
  });
});

const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');
if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => {
      formSuccess.classList.add('hidden');
    }, 3000);
  });
}

const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
  langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    updateContent(currentLang);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
  updateContent(currentLang);
});
