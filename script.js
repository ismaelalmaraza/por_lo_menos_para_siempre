'use strict';

// CONFIGURACIÓN: sustituye esta dirección por el enlace REAL de tu libro.
// Ejemplo: 'https://www.amazon.com.mx/dp/TU_ASIN'
const AMAZON_URL = '';

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  const modal = document.getElementById('excerptModal');
  const modalClose = modal.querySelector('.modal-close');
  let previousFocus = null;

  document.getElementById('year').textContent = new Date().getFullYear();

  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
  }));

  function openModal() {
    previousFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    previousFocus?.focus();
  }

  document.querySelectorAll('[data-open-excerpt]').forEach(button => {
    button.addEventListener('click', openModal);
  });
  modal.querySelectorAll('[data-close]').forEach(element => {
    element.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    if (event.key === 'Tab' && !modal.hidden) {
      const focusables = [...modal.querySelectorAll('a[href],button:not([disabled])')];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  document.querySelectorAll('.amazon-link').forEach(link => {
    if (AMAZON_URL) {
      link.href = AMAZON_URL;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.addEventListener('click', event => {
        if (link.closest('#comprar')) {
          event.preventDefault();
          alert('Configura AMAZON_URL en script.js con el enlace real del libro antes de publicar.');
        }
      });
    }
  });
});
