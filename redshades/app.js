(() => {
  'use strict';
  const root = document.documentElement;
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  root.classList.add('js-ready');
  menu.hidden = false;
  const closeMenu = () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.querySelector('span').textContent = '+';
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.querySelector('span').textContent = open ? '−' : '+';
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      menu.focus();
    }
  });
  const mobileMenu = matchMedia('(max-width: 860px)');
  mobileMenu.addEventListener('change', closeMenu);

  // The static atlas is readable without JavaScript; shared content refreshes its text.
  const shared = Array.isArray(window.REDC2_CONTENT) ? window.REDC2_CONTENT : [];
  const panels = [...document.querySelectorAll('.explorer-panel')];
  panels.forEach(panel => {
    const topic = shared.find(item => item.id === panel.dataset.contentId);
    if (!topic || !Array.isArray(topic.items) || !topic.items.length) return;
    const list = panel.querySelector('.component-list');
    const fragment = document.createDocumentFragment();
    topic.items.forEach((item, index) => {
      const detail = document.createElement('details');
      detail.className = 'component';
      detail.open = index === 0;
      const summary = document.createElement('summary');
      if (item.id) {
        const badge = document.createElement('span');
        badge.className = 'term-badge';
        badge.textContent = item.id;
        summary.append(badge);
      }
      const title = document.createElement('span');
      title.textContent = item.title;
      summary.append(title);
      const body = document.createElement('p');
      const term = (window.REDSHADES_GLOSSARY || []).find(entry => entry.id === item.id);
      body.textContent = term?.role || item.description;
      if (term) {
        const boundary = document.createElement('span');
        boundary.className = 'component-boundary';
        boundary.textContent = 'Boundary: ' + term.boundary + '.';
        body.append(boundary);
      }
      detail.append(summary, body);
      fragment.append(detail);
    });
    list.replaceChildren(fragment);
    if (topic.paragraphs?.[0]) panel.querySelector('.explorer-summary > p').textContent = topic.paragraphs[0];
  });
  const controls = document.querySelector('.explorer-controls');
  const tabs = [...controls.querySelectorAll('button')];
  controls.hidden = false;
  controls.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    panels[index].tabIndex = 0;
  });
  const selectGroup = (index, focus = false) => {
    tabs.forEach((tab, current) => {
      const selected = current === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels[current].hidden = !selected;
    });
    if (focus) tabs[index].focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectGroup(index));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (['ArrowRight', 'ArrowDown'].includes(event.key)) next = (index + 1) % tabs.length;
      else if (['ArrowLeft', 'ArrowUp'].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectGroup(next, true);
    });
  });
  selectGroup(0);

  // Citation links reveal their bibliography before the browser resolves the anchor.
  const bibliography = document.querySelector('.bibliography');
  const revealReference = hash => {
    if (hash.startsWith('#ref-')) bibliography.open = true;
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#ref-"]');
    if (link) revealReference(link.hash);
  });
  window.addEventListener('hashchange', () => revealReference(location.hash));
  revealReference(location.hash);
  if (location.hash.startsWith('#ref-')) {
    requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
  }

  const captures = [...document.querySelectorAll('[data-gallery]')];
  const dialog = document.querySelector('.image-dialog');
  let currentImage = 0;
  let opener = null;
  const showCapture = index => {
    currentImage = (index + captures.length) % captures.length;
    const capture = captures[currentImage];
    document.getElementById('dialog-title').textContent = capture.dataset.title;
    document.getElementById('dialog-caption').textContent = capture.dataset.caption;
    const image = document.getElementById('dialog-image');
    image.src = capture.href;
    image.alt = capture.querySelector('img').alt;
    dialog.classList.toggle('diagram-view', capture.href.endsWith('.svg'));
    dialog.classList.remove('actual-size');
    dialog.querySelector('[data-image-zoom]').setAttribute('aria-pressed', 'false');
    dialog.querySelector('[data-image-zoom]').textContent = 'Actual size';
    dialog.querySelector('.dialog-viewport').scrollTo(0, 0);
    document.getElementById('original-image').href = capture.href;
  };
  if (typeof dialog.showModal === 'function') {
    captures.forEach((capture, index) => {
      capture.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        opener = capture;
        showCapture(index);
        dialog.showModal();
        document.body.classList.add('dialog-open');
        dialog.querySelector('.dialog-close').focus();
      });
    });
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-image-zoom]').addEventListener('click', event => {
      const zoomed = dialog.classList.toggle('actual-size');
      event.currentTarget.setAttribute('aria-pressed', String(zoomed));
      event.currentTarget.textContent = zoomed ? 'Fit view' : 'Actual size';
    });
    dialog.querySelector('[data-image-prev]').addEventListener('click', () => showCapture(currentImage - 1));
    dialog.querySelector('[data-image-next]').addEventListener('click', () => showCapture(currentImage + 1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'Tab') {
        const focusable = [...dialog.querySelectorAll('button, a[href]')].filter(element => !element.disabled && element.getClientRects().length);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showCapture(currentImage + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      opener?.focus({preventScroll: true});
    });
  }

  const sectionLinks = [...nav.querySelectorAll('a')];
  const sections = sectionLinks.map(link => document.querySelector(link.hash));
  let scheduled = false;
  const updateNavigation = () => {
    scheduled = false;
    let active = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= 150) active = index;
    });
    if (scrollY + innerHeight >= document.documentElement.scrollHeight - 4) active = sections.length - 1;
    sectionLinks.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  addEventListener('scroll', () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(updateNavigation);
    }
  }, {passive: true});
  updateNavigation();
})();
