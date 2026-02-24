import { initAnimations } from './animations.js';

let currentLang = 'fr';
let translations = {};

const emailRegex = new RegExp('^[\\w.-]+@[\\w.-]+\\.\\w+$');

async function loadTranslations() {
    try {
        const response = await fetch('translations.json');
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('Failed to load translations');
    }
}

function applyTranslations() {
    document.documentElement.lang = currentLang;
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = currentLang === 'fr' ? 'EN' : 'FR';
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    applyTranslations();
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput && !emailRegex.test(emailInput.value)) {
                alert(currentLang === 'fr' ? 'Veuillez entrer un courriel valide.' : 'Please enter a valid email.');
                return;
            }
            
            alert(currentLang === 'fr' ? 'Message envoyé avec succès!' : 'Message sent successfully!');
            form.reset();
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    loadTranslations();
    initAnimations();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
});
