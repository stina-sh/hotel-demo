/* Portable browser interactions. No framework, tracker, remote font, or server dependency. */
(() => {
  'use strict';
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const base = window.VPE_BASE || './';
  const config = { mode: 'preview', quoteEndpoint: '', email: 'contact@vitrier-paris-express.com', ...window.VPE_CONFIG };
  const visuals = window.EPEVisuals;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let artObserver;

  function icons(parent = document) {
    $$('[data-icon]:not([data-ready])', parent).forEach(el => {
      el.innerHTML = visuals.icon(el.dataset.icon);
      el.dataset.ready = 'true';
      el.setAttribute('aria-hidden', 'true');
    });
  }
  function draw(el, type) {
    if (!el) return;
    el.innerHTML = visuals.diagram(type);
    el.dataset.diagram = type;
    const svg = $('svg', el);
    if (artObserver && svg) { svg.classList.add('is-paused'); artObserver.observe(svg); }
  }
  if ('IntersectionObserver' in window) {
    artObserver = new IntersectionObserver(entries => {
      entries.forEach(({ target, isIntersecting }) => target.classList.toggle('is-paused', !isIntersecting));
    }, { rootMargin: '150px' });
  }
  $$('[data-diagram]').forEach(el => draw(el, el.dataset.diagram));
  $$('.vpe-dossier-svg, .glass-expertise').forEach(target => { if (artObserver) { target.classList.add('is-paused'); artObserver.observe(target); } });
  icons();

  const reveals = $$('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const onReveal = entries => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) {
          target.classList.add('is-visible');
          observer.unobserve(target);
          studyObserver.unobserve(target);
        }
      });
    };
    const observer = new IntersectionObserver(onReveal, { threshold: .06, rootMargin: '0px 0px -25px 0px' });
    // Tall grids reveal as soon as their first card enters a narrow viewport.
    const studyObserver = new IntersectionObserver(onReveal, { threshold: .015, rootMargin: '0px 0px -10px 0px' });
    reveals.forEach(el => (el.matches('.glass-expertise-section, .glass-composition-section') ? studyObserver : observer).observe(el));
  } else reveals.forEach(el => el.classList.add('is-visible'));

  const motionToggle = $('.motion-toggle');
  let motionPaused = false;
  try { motionPaused = localStorage.getItem('vpe-motion-paused') === 'true'; } catch (_) { /* Storage may be disabled. */ }
  function setMotion(paused) {
    motionPaused = paused;
    document.body.classList.toggle('motion-paused', paused);
    motionToggle?.setAttribute('aria-pressed', String(paused));
    if (motionToggle) motionToggle.textContent = paused ? 'Reprendre les animations' : 'Mettre les animations en pause';
    try { localStorage.setItem('vpe-motion-paused', String(paused)); } catch (_) { /* The preference remains valid this visit. */ }
  }
  setMotion(motionPaused);
  motionToggle?.addEventListener('click', () => setMotion(!motionPaused));

  const dropdown = $('.nav-dropdown');
  const trigger = $('.nav-trigger');
  function closeDropdown() { dropdown?.classList.remove('is-open'); trigger?.setAttribute('aria-expanded', 'false'); }
  trigger?.addEventListener('click', () => {
    const open = !dropdown.classList.contains('is-open');
    dropdown.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('click', event => { if (dropdown && !dropdown.contains(event.target)) closeDropdown(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeDropdown(); });
  const menuToggle = $('.menu-toggle');
  const mobileMenu = $('.mobile-menu');
  function closeMobile() {
    mobileMenu?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.classList.remove('nav-open');
  }
  menuToggle?.addEventListener('click', () => {
    const open = !mobileMenu.classList.contains('is-open');
    mobileMenu.style.top = `${$('.header').getBoundingClientRect().bottom}px`;
    mobileMenu.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('nav-open', open);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMobile(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) closeMobile(); });

  const dialog = $('.quote-dialog');
  const form = $('.quote-form');
  const next = $('.quote-next');
  const back = $('.quote-back');
  const submit = $('.quote-submit');
  const error = $('.form-error');
  let step = 1;
  let quoteLauncher;
  function setStep(value) {
    step = value;
    $$('.quote-step').forEach(el => { el.hidden = Number(el.dataset.step) !== value; });
    back.hidden = value === 1;
    next.hidden = value === 3;
    submit.hidden = value !== 3;
    $('.step-indicator').textContent = `0${value} / 03`;
    $('.quote-progress i').style.width = `${value / 3 * 100}%`;
    error.textContent = '';
    dialog.scrollTop = 0;
  }
  function openQuote(topic, launcher) {
    closeMobile();
    quoteLauncher = launcher;
    form.reset();
    $$('.field [aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
    $('.quote-success').hidden = true;
    $('.quote-progress').hidden = false;
    $('.form-actions').hidden = false;
    $('.quote-form').dataset.topic = topic || '';
    if (topic) {
      let value = '';
      if (/bris|dépannage|remplacement simple/i.test(topic)) value = 'Vitre brisée / dépannage';
      else if (/fenêtre|fenêtre|crémone|rabotage/i.test(topic)) value = 'Fenêtre / fermeture';
      else if (/vitrine|commerce|film|vitrophanie/i.test(topic)) value = 'Vitrine / commerce';
      else if (/véranda/i.test(topic)) value = 'Véranda';
      else if (/vitrage|verre|installation|survitrage/i.test(topic)) value = 'Installation / double vitrage';
      $$('input[name="service"]').forEach(radio => { radio.checked = radio.value === value; });
      const arrondissement = topic.match(/Paris (\d{1,2})e/);
      if (arrondissement) form.elements.postcode.value = `750${arrondissement[1].padStart(2, '0')}`;
    }
    submit.childNodes[0].textContent = config.mode === 'live' && config.quoteEndpoint ? 'Envoyer ma demande' : 'Préparer ma demande';
    setStep(1);
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  function closeQuote() { dialog.close(); }
  document.addEventListener('click', event => {
    const quote = event.target.closest('[data-quote]');
    if (quote) { event.preventDefault(); openQuote(quote.dataset.quote, quote); }
  });
  $('.dialog-close').addEventListener('click', closeQuote);
  dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); quoteLauncher?.focus(); });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeQuote();
  });
  function validateStep() {
    const fields = $$('input,select,textarea', $(`.quote-step[data-step="${step}"]`));
    let invalid;
    fields.forEach(field => {
      const valid = field.checkValidity();
      field.setAttribute('aria-invalid', String(!valid));
      if (!valid && !invalid) invalid = field;
    });
    if (!invalid) { error.textContent = ''; return true; }
    const messages = { service: 'Choisissez le sujet de votre demande.', postcode: 'Indiquez un code postal de 5 chiffres.', timing: 'Précisez le délai souhaité.', message: 'Décrivez votre demande en au moins 10 caractères.', name: 'Indiquez votre nom.', phone: 'Indiquez un numéro de téléphone valide.', email: 'Indiquez une adresse e-mail valide.', consent: 'Votre accord est nécessaire pour utiliser ces informations dans le cadre de la demande.' };
    error.textContent = messages[invalid.name] || 'Complétez les informations demandées.';
    invalid.focus();
    return false;
  }
  next.addEventListener('click', () => { if (validateStep()) setStep(Math.min(3, step + 1)); });
  back.addEventListener('click', () => setStep(Math.max(1, step - 1)));
  form.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA' && step < 3) { event.preventDefault(); next.click(); }
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (step < 3) { next.click(); return; }
    if (!validateStep()) return;
    const payload = Object.fromEntries(new FormData(form));
    payload.topic = form.dataset.topic;
    payload.source = 'vitrier-paris-express';
    payload.consent = payload.consent === 'on';
    const body = `Bonjour,\n\nJe souhaite vous contacter pour : ${payload.service}.\n${payload.topic ? 'Sujet : ' + payload.topic + '\n' : ''}Code postal : ${payload.postcode}\nDélai souhaité : ${payload.timing}\n\n${payload.message}\n\nNom : ${payload.name}\nTéléphone : ${payload.phone}\nE-mail : ${payload.email}\n\nAccord pour le traitement de cette demande : oui.\n\nJe peux joindre mes photos à cet e-mail.`;
    const mail = $('.quote-email');
    mail.href = `mailto:${config.email}?subject=${encodeURIComponent('Demande vitrerie — ' + payload.service)}&body=${encodeURIComponent(body)}`;
    if (config.mode === 'live' && config.quoteEndpoint) {
      submit.disabled = true;
      error.textContent = '';
      try {
        const response = await fetch(config.quoteEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error('Delivery failed');
        $('.success-message').textContent = 'Votre demande a été transmise. Vous pouvez aussi nous appeler pour préciser votre situation.';
        mail.hidden = true;
        $('.quote-success>.form-hint').hidden = true;
      } catch (_) {
        error.textContent = 'La demande n’a pas pu être transmise. Réessayez ou appelez le 01 79 75 79 22.';
        submit.disabled = false;
        return;
      }
      submit.disabled = false;
    } else {
      $('.success-message').textContent = 'Votre récapitulatif est prêt. Poursuivez l’échange par e-mail ou appelez-nous.';
      mail.hidden = false;
      $('.quote-success>.form-hint').hidden = false;
    }
    $$('.quote-step').forEach(el => { el.hidden = true; });
    $('.quote-progress').hidden = true;
    $('.form-actions').hidden = true;
    $('.quote-success').hidden = false;
    dialog.scrollTop = 0;
    $('.quote-success h2').tabIndex = -1;
    $('.quote-success h2').focus();
  });

  const reviewStage = $('.review-ribbon');
  if (reviewStage) {
    const viewport = $('[data-review-viewport]', reviewStage);
    const track = $('[data-review-track]', reviewStage);
    const originalCards = $$('[data-review-card]', track);
    const count = originalCards.length;
    const speed = 0.32;
    let offset = 0, stride = 1, cardWidth = 1, viewportWidth = 1, columns = 4, lastFrame = 0;
    let explicitPause = false, focused = false, inView = false, keyboardInput = false, initialInk = true;
    // Three copies make the final-to-first crossing identical without recycling a visible card.
    for (let copy = 1; copy < 3; copy++) originalCards.forEach(card => {
      const duplicate = card.cloneNode(true);
      duplicate.setAttribute('aria-hidden', 'true');
      duplicate.dataset.reviewCopy = String(copy);
      $$('a,button,input', duplicate).forEach(control => { control.tabIndex = -1; });
      track.append(duplicate);
    });
    const cards = $$('[data-review-card]', track);
    const wasVisible = new WeakMap();
    function beginInk(card, delay = 0) {
      if (reduceMotion.matches || motionPaused) return;
      card.classList.remove('is-writing');
      card.style.setProperty('--ink-start', `${delay}ms`);
      void card.offsetWidth;
      card.classList.add('is-writing');
    }
    function stopped() { return explicitPause || focused || !inView || document.hidden || motionPaused || reduceMotion.matches; }
    function render(replay = false) {
      track.style.transform = `translate3d(${-offset}px,0,0)`;
      cards.forEach((card, index) => {
        const left = index * stride - offset;
        const visible = left < viewportWidth && left + cardWidth > 0;
        if (replay && visible && !wasVisible.get(card)) beginInk(card, initialInk ? Math.min(index, columns - 1) * 160 : 0);
        if (replay) wasVisible.set(card, visible);
      });
      if (replay) initialInk = false;
    }
    function measure() {
      const progress = offset / stride;
      columns = Number(getComputedStyle(reviewStage).getPropertyValue('--review-columns')) || 4;
      viewportWidth = viewport.clientWidth;
      const gap = Number.parseFloat(getComputedStyle(track).gap) || 16;
      cardWidth = Math.max(1, (viewportWidth - gap * (columns - 1)) / columns);
      stride = cardWidth + gap;
      offset = (progress % Math.max(1, count)) * stride;
      reviewStage.style.setProperty('--review-card-width', `${cardWidth}px`);
      reviewStage.dataset.visibleCount = String(columns);
      reviewStage.dataset.cardsPerSecond = String(speed);
      reviewStage.dataset.motionMode = 'continuous';
      render(false);
    }
    function tick(time) {
      const delta = lastFrame ? Math.min(time - lastFrame, 80) : 0;
      lastFrame = time;
      const paused = stopped();
      reviewStage.classList.toggle('is-paused', paused);
      if (!paused && count > 1) {
        offset = (offset + delta / 1000 * stride * speed) % (count * stride);
        render(true);
      }
      requestAnimationFrame(tick);
    }
    $('[data-review-pause]', reviewStage)?.addEventListener('click', event => {
      explicitPause = !explicitPause;
      if (explicitPause) cards.forEach(card => card.classList.remove('is-writing'));
      event.currentTarget.setAttribute('aria-pressed', String(explicitPause));
      $('[data-review-pause-label]', event.currentTarget).textContent = explicitPause ? 'Reprendre' : 'Pause';
      event.currentTarget.setAttribute('aria-label', explicitPause ? 'Reprendre les témoignages' : 'Mettre les témoignages en pause');
    });
    document.addEventListener('keydown', event => { if (event.key === 'Tab') keyboardInput = true; });
    document.addEventListener('pointerdown', () => { keyboardInput = false; });
    reviewStage.addEventListener('focusin', event => {
      focused = true;
      const card = event.target.closest('[data-review-card]');
      if (card && keyboardInput) {
        const index = originalCards.indexOf(card);
        if (index >= 0) {
          const left = index * stride - offset;
          if (left < 0 || left + cardWidth > viewportWidth) {
            offset = columns >= count ? 0 : index * stride;
            render(false);
          }
        }
      }
    });
    reviewStage.addEventListener('focusout', event => { focused = reviewStage.contains(event.relatedTarget); });
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, {threshold:.05}).observe(reviewStage);
    else inView = true;
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(viewport);
    else window.addEventListener('resize', measure);
    measure();
    requestAnimationFrame(tick);
  }

  const guide = $('.guide-panel');
  const guideLaunch = $('.guide-launch');
  function setGuide(open) {
    guide.hidden = !open;
    guideLaunch.setAttribute('aria-expanded', String(open));
    if (open) $('.guide-close').focus();
    else guideLaunch.focus();
  }
  guideLaunch.addEventListener('click', () => setGuide(guide.hidden));
  $('.guide-close').addEventListener('click', () => setGuide(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !guide.hidden) setGuide(false); });
  const advice = {
    broken: { text: 'Gardez vos distances avec les éclats de verre. Décrivez le bris au téléphone : une protection temporaire et le remplacement adapté peuvent être étudiés. Le délai est confirmé selon votre adresse et le vitrage.', path: 'depannage-vitrerie/', label: 'Préparer le dépannage' },
    price: { text: 'Le prix dépend du verre, de ses dimensions, de la pose, de l’accès et des horaires. Un devis détaillé permet de confirmer le montant avant votre accord.', path: 'tarif-vitrier/', label: 'Consulter les repères' },
    window: { text: 'Précisez le matériau de votre fenêtre et ce qui bloque : poignée, fermeture, frottement. Une photo du mécanisme peut aider à préparer l’échange.', path: 'fenetres/', label: 'Explorer les fenêtres' },
    project: { text: 'Notez vos dimensions approximatives, l’usage du verre et le rendu souhaité. Une cloison, une vitrine ou une véranda se prépare d’abord avec ces quelques détails.', path: 'installation-vitrerie/', label: 'Découvrir les installations' }
  };
  $$('[data-guide]').forEach(button => button.addEventListener('click', () => {
    const data = advice[button.dataset.guide];
    const messages = $('.guide-messages');
    messages.replaceChildren();
    const message = document.createElement('div');
    const paragraph = document.createElement('p');
    paragraph.textContent = data.text;
    const link = document.createElement('a');
    link.className = 'text-link'; link.href = base + data.path; link.textContent = data.label;
    const span = document.createElement('span'); span.dataset.icon = 'arrow-up-right'; link.append(span);
    message.append(paragraph, link); messages.append(message); icons(message);
    message.scrollIntoView({ behavior: reduceMotion.matches || motionPaused ? 'instant' : 'smooth', block: 'nearest' });
  }));
})();
