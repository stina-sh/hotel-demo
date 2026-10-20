(() => {
  'use strict';
  const script = document.currentScript;
  const siteRoot = new URL('../', script.src);
  const route = path => new URL(path.replace(/^\//, ''), siteRoot).href;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const insertDiagram = (el, type) => {
    if (window.SPEVisuals) el.innerHTML = SPEVisuals.diagram(type);
  };
  $$('[data-diagram]').forEach(el => insertDiagram(el, el.dataset.diagram));
  $$('.need-tab').forEach(tab => tab.setAttribute('aria-pressed', String(tab.classList.contains('active'))));

  if ('IntersectionObserver' in window && !reduced) {
    document.documentElement.classList.add('motion-ready');
    const revealEntries = entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
        groupObserver.unobserve(entry.target);
      }
    });
    const observer = new IntersectionObserver(revealEntries, { threshold: 0.13, rootMargin: '0px 0px -22px 0px' });
    const groupObserver = new IntersectionObserver(revealEntries, { threshold: 0.02, rootMargin: '0px 0px -22px 0px' });
    $$('.reveal').forEach(el => (el.matches('.professional-services') ? groupObserver : observer).observe(el));
    const visualObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      entry.target.classList.toggle('is-offscreen', !entry.isIntersecting);
    }), { rootMargin: '100px' });
    $$('.mechanism').forEach(el => visualObserver.observe(el));
  }

  const menu = $('#mobile-menu');
  const menuToggle = $('.menu-toggle');
  function closeMenu() { menu.hidden = true; menuToggle.setAttribute('aria-expanded', 'false'); }
  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menu.hidden = expanded;
    menuToggle.setAttribute('aria-expanded', String(!expanded));
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (!menu.hidden && !menu.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
  });

  const needData = {
    open: ['Retrouver votre accès', 'Porte claquée ou verrouillée : précisez la situation et votre adresse.', 'ouverture-de-porte/', 'Ouverture de porte', 'lock'],
    cylinder: ['Repartir sur une bonne fermeture', 'Usure, perte de clés, emménagement : décrivez votre serrure et les changements envisagés.', 'changement-de-serrure/', 'Changement de serrure', 'cylinder'],
    door: ['Une protection à votre mesure', 'Porte existante à renforcer ou nouveau bloc-porte : préparons les bonnes questions.', 'porte-blindee/', 'Porte blindée', 'door']
  };
  $$('.need-tab').forEach((tab, index) => tab.addEventListener('click', () => {
    const data = needData[tab.dataset.need];
    $$('.need-tab').forEach(t => {t.classList.toggle('active', t === tab); t.setAttribute('aria-pressed', String(t === tab));});
    $('#need-heading').textContent = data[0];
    $('#need-description').textContent = data[1];
    $('#need-link').href = route(data[2]);
    $('#need-request').dataset.request = data[3];
    $('.panel-status').textContent = `0${index + 1}`;
    insertDiagram($('.mechanism-panel .mechanism'), data[4]);
    const panel = $('.mechanism-panel');
    if (!reduced) panel.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 600, easing: 'cubic-bezier(.16,1,.3,1)' });
  }));
  $('.mechanism-toggle')?.addEventListener('click', e => {
    const button = e.currentTarget;
    const panel = $('.mechanism-panel');
    const active = !panel.classList.contains('activated');
    panel.classList.toggle('activated', active);
    button.setAttribute('aria-pressed', String(active));
    button.firstChild.textContent = active ? 'Revenir au rythme initial ' : 'Activer le mécanisme ';
    panel.getAnimations({ subtree: true }).forEach(animation => { if (animation.effect?.target !== panel) animation.updatePlaybackRate(active ? 1.8 : 1); });
  });

  const dialog = $('.request-dialog');
  const form = $('#request-form');
  const steps = $$('.form-step', form);
  const progress = $$('.request-progress > span');
  const next = $('#request-next');
  const back = $('#request-back');
  const error = $('.form-error');
  const result = $('.request-result');
  const config = window.SPE_CONFIG || {};
  let stage = 0;
  let opener = null;
  let requestSummary = '';
  const storageKey = 'spe-request-draft-v1';

  function saveDraft() {
    const values = Object.fromEntries(new FormData(form));
    delete values.consent;
    try {sessionStorage.setItem(storageKey, JSON.stringify(values));} catch (_) {}
  }
  function restoreDraft() {
    try {
      const values = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
      Object.entries(values).forEach(([key, value]) => {
        const input = form.elements.namedItem(key);
        if (!input) return;
        if (key === 'when') $(`input[name="when"][value="${value === 'Dès que possible' ? 'Dès que possible' : 'Sur rendez-vous'}"]`, form).checked = true;
        else input.value = value;
      });
    } catch (_) {}
  }
  function renderStage() {
    steps.forEach((step, i) => {step.hidden = i !== stage;});
    progress.forEach((p, i) => p.classList.toggle('active', i <= stage));
    $('#request-title').textContent = ['Votre besoin.', 'Votre situation.', 'Restons en contact.'][stage];
    next.innerHTML = stage === 2 ? `${config.contactMode === 'endpoint' ? 'Envoyer ma demande' : 'Préparer mon message'} <span>↗</span>` : 'Continuer <span>↗</span>';
    back.hidden = stage === 0;
    error.textContent = '';
  }
  function resetView() {stage = 0; form.hidden = false; result.hidden = true; renderStage();}
  function openRequest(need = '', district = '') {
    closeMenu();
    opener = document.activeElement;
    resetView();
    restoreDraft();
    if (need && $$('option', form.elements.service).some(o => o.value === need)) form.elements.service.value = need;
    if (district) form.elements.postcode.value = `750${String(district).padStart(2, '0')}`;
    dialog.showModal();
  }
  $$('[data-request]').forEach(button => button.addEventListener('click', () => openRequest(button.dataset.request)));
  $$('[data-district]').forEach(button => button.addEventListener('click', () => openRequest('', button.dataset.district)));
  $('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const rect = dialog.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => {opener?.focus();});
  form.addEventListener('input', saveDraft);
  back.addEventListener('click', () => {stage = Math.max(0, stage - 1);renderStage();});
  $('.clear-draft').addEventListener('click', () => {
    try {sessionStorage.removeItem(storageKey);} catch (_) {}
    form.reset();stage = 0;renderStage();error.textContent = 'Votre brouillon a été effacé.';
  });
  $('.request-reset').addEventListener('click', resetView);
  form.noValidate = true;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const invalid = $$('input,select,textarea', steps[stage]).find(input => !input.checkValidity());
    if (invalid) {invalid.reportValidity();error.textContent = 'Vérifiez les champs de cette étape pour continuer.';return;}
    saveDraft();
    if (stage < 2) {stage += 1;renderStage();$('input,select,textarea', steps[stage])?.focus();return;}
    const values = Object.fromEntries(new FormData(form));
    requestSummary = `Demande Serrurier Paris Express\n\nPrestation : ${values.service}\nQuand : ${values.when}\nCode postal : ${values.postcode}\nSituation : ${values.message}\n\nNom : ${values.name}\nTéléphone : ${values.phone}\nE-mail : ${values.email}\nConsentement de contact : accepté`;
    const mailto = `mailto:${config.contactEmail || 'contact@serrurier-paris-express.com'}?subject=${encodeURIComponent('Demande — ' + values.service)}&body=${encodeURIComponent(requestSummary)}`;
    $('#mailto-link').href = mailto;
    if (config.contactMode === 'endpoint' && config.contactEndpoint) {
      next.disabled = true;error.textContent = 'Envoi de votre demande…';
      try {
        const url = new URL(config.contactEndpoint, location.href);
        if (url.protocol !== 'https:' && !['localhost','127.0.0.1'].includes(url.hostname)) throw new Error('invalid_endpoint');
        const response = await fetch(url.href, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...values,source:'serrurier-paris-express',consent:true})});
        if (!response.ok) throw new Error('delivery_failed');
        form.hidden = true;result.hidden = false;
        $('h2', result).innerHTML = 'Votre demande<br>est envoyée.';
        $('p', result).textContent = 'Votre demande a été transmise au service. Pour une intervention urgente, contactez-nous directement par téléphone.';
        $('#mailto-link').hidden = true;
        try {sessionStorage.removeItem(storageKey);} catch (_) {}
      } catch (_) {
        error.textContent = 'L’envoi direct n’a pas abouti. Vous pouvez préparer un e-mail ou nous appeler.';
        const fallback = document.createElement('a');fallback.className='text-button';fallback.href=mailto;fallback.textContent='Ouvrir ma messagerie ↗';error.append(document.createElement('br'),fallback);
      } finally {next.disabled = false;}
    } else {
      form.hidden = true;result.hidden = false;
      $('h2', result).innerHTML = 'Votre message<br>est prêt.';
      $('p', result).textContent = 'Ouvrez votre messagerie pour terminer l’envoi de votre demande. Vous pouvez aussi copier le récapitulatif ou nous appeler.';
      $('#mailto-link').hidden = false;
    }
  });
  $('#copy-request').addEventListener('click', async e => {
    try {await navigator.clipboard.writeText(requestSummary);e.currentTarget.textContent = 'Récapitulatif copié ✓';}
    catch (_) {e.currentTarget.textContent = 'Copie indisponible — utilisez votre messagerie.';}
  });
  $('#mailto-link').addEventListener('click', () => {try {sessionStorage.removeItem(storageKey);} catch (_) {}});

  const guide = $('#guide-panel');
  const guideToggle = $('.guide-toggle');
  function toggleGuide(show) {guide.hidden = !show;guideToggle.setAttribute('aria-expanded',String(show));}
  guideToggle.addEventListener('click', () => toggleGuide(guide.hidden));
  $('.guide-head button').addEventListener('click', () => toggleGuide(false));
  const guideAnswers = {
    urgent: ['Pour une porte claquée, verrouillée ou une perte de clés, le téléphone est le plus direct. Préparez votre adresse et le type de porte. Le délai et le prix sont confirmés au téléphone.', 'Appeler le 01 79 72 56 57 ↗', 'tel:+33179725657'],
    price: ['Le prix dépend de la porte, de la serrure, du matériel et des horaires. Consultez les repères tarifaires puis faites confirmer votre devis avant l’intervention.', 'Comprendre les tarifs ↗', route('tarif-serrurier/')],
    security: ['Porte existante à renforcer, bloc-porte ou contrôle d’accès : le bon choix commence par l’examen de votre entrée et de vos usages.', 'Explorer les solutions ↗', route('porte-blindee/')]
  };
  $$('[data-guide]').forEach(button => button.addEventListener('click', () => {
    const data = guideAnswers[button.dataset.guide];
    const area = $('.guide-messages');
    area.textContent = '';
    const text = document.createElement('p');text.textContent = data[0];
    const a = document.createElement('a');a.href = data[2];a.className='text-button';a.textContent=data[1];
    area.append(text,a);
  }));
  if (location.pathname.replace(/\/$/,'').endsWith('/devis')) openRequest();
})();

/* Coordinated movement stays subordinate to the actual customer actions. */
(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const phone='<svg class="inline-phone live-phone" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 3 4 4-2 3c1 3 3 5 6 6l3-2 4 4c-2 5-6 4-10 1S2 10 3 6Z"/><path class="phone-wave" d="M15 3a6 6 0 0 1 6 6M15 7a2 2 0 0 1 2 2"/></svg>';
 document.querySelectorAll('a[href^="tel:"]').forEach(a=>{
  const svg=a.querySelector('svg');
  if(svg) svg.classList.add('live-phone');
  else a.insertAdjacentHTML('afterbegin',phone);
 });
 document.querySelectorAll('[data-brand]').forEach(button=>button.addEventListener('click',()=>{
  const field=document.querySelector('#request-form textarea[name="message"]');
  const line=`Marque concernée : ${button.dataset.brand}.`;
  if(field&&!field.value.includes(line)){field.value=field.value?`${line}\n${field.value}`:line;field.dispatchEvent(new Event('input',{bubbles:true}));}
 }));
 document.querySelectorAll('.professional-service').forEach((el,i)=>el.style.setProperty('--service-order',i%3));
 document.querySelectorAll('.district-grid button').forEach((el,i)=>el.style.setProperty('--district-order',i%20));
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
   if(e.isIntersecting){e.target.classList.add('motion-active');observer.unobserve(e.target);}
  }),{threshold:.17});
  document.querySelectorAll('.process article,.brand-section,.district-grid').forEach(el=>observer.observe(el));
 }
 document.querySelectorAll('.review-window').forEach(viewport=>{
  const count=Number(viewport.dataset.reviewCount)||1;
  const track=viewport.querySelector('.review-track');
  const cards=[...track.children];
  const button=viewport.parentElement.querySelector('.review-motion-toggle');
  let stride=0,phase=0,last=0,inView=false,paused=false;
  const written=new Set();
  cards.forEach(card=>{
   const p=card.querySelector('.review-copy');
   const text=p.dataset.reviewText;
   if(!text)return;
   p.textContent='';
   let index=0;
   text.split(/(\s+)/).forEach(part=>{
    if(/^\s+$/.test(part)){p.append(document.createTextNode(part));return;}
    const span=document.createElement('span');span.textContent=part;span.style.setProperty('--word',index++);p.append(span);
   });
   p.style.setProperty('--ink-step',`${Math.max(130,Math.min(350,4000/Math.max(index,1)))}ms`);
  });
  function measure(){
   if(cards.length<2)return;
   stride=cards[1].offsetLeft-cards[0].offsetLeft;
   if(stride<=0)stride=cards[0].getBoundingClientRect().width+17;
  }
  function write(card,delay=0){
   if(written.has(card))return;
   written.add(card);
   card.style.animationDelay=delay+'ms';
   card.classList.add('is-writing');
  }
  measure();
  if('ResizeObserver' in window)new ResizeObserver(measure).observe(viewport);
  else window.addEventListener('resize',measure,{passive:true});
  if('IntersectionObserver' in window){
   new IntersectionObserver(entries=>entries.forEach(e=>{inView=e.isIntersecting;last=0;}),{threshold:.1}).observe(viewport);
  } else inView=true;
  button?.addEventListener('click',()=>{
   paused=!paused;button.textContent=paused?'Reprendre le défilement':'Mettre en pause';button.setAttribute('aria-pressed',String(paused));last=0;
  });
  let focused=false;
  track.addEventListener('focusin',e=>{focused=true;last=0;const card=e.target.closest('.review-card');if(card&&stride){phase=cards.indexOf(card)%count;viewport.scrollLeft=0;track.style.transform=`translate3d(${-phase*stride}px,0,0)`;}});
  track.addEventListener('focusout',()=>{focused=false;last=0;});
  if(reduced){cards.forEach(card=>card.classList.add('is-writing'));return;}
  function frame(time){
   if(!inView||paused||focused||document.hidden||!stride){last=0;requestAnimationFrame(frame);return;}
   const dt=last?Math.min((time-last)/1000,.05):0;last=time;
   phase=(phase+dt*.28) % count;
   track.style.transform=`translate3d(${-phase*stride}px,0,0)`;
   const width=viewport.clientWidth;
   cards.forEach((card,i)=>{
    const left=i*stride-phase*stride;
    if(left<width && left+stride>0)write(card);
    else if(left+stride<0 || left>width+stride){written.delete(card);card.classList.remove('is-writing');}
   });
   requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
 });
})();
