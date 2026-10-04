/* Samiha7 static review catalog. No external services or browser persistence. */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const state = { catalog: null, variant: null, revision: 'after', viewId: null, in3d: false, viewerToken: 0 };
  const manifestURL = new URL('catalog.json', document.baseURI);
  let modelViewerReady;

  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  };
  const safeURL = (path) => {
    if (!path || typeof path !== 'string' || /^(?:[a-z]+:|\/|\\)/i.test(path) || path.split('/').includes('..')) return null;
    const url = new URL(path, manifestURL);
    return url.origin === manifestURL.origin ? url.href : null;
  };
  const byteSize = (bytes) => Number.isFinite(bytes) ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : null;
  const displayResult = (item) => item.result || (item.status === 'pending' ? 'Pending QA' : 'Review required');
  const viewsFor = () => (state.variant.views?.[state.revision] || []).filter(view => safeURL(view.src));

  function updateTabs() {
    $('variant-tabs').replaceChildren();
    state.catalog.variants.forEach(variant => {
      const selected = variant.id === state.variant.id;
      const button = make('button', 'variant-tab');
      button.type = 'button'; button.id = `tab-${variant.id}`;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', String(selected));
      button.setAttribute('aria-controls', 'variant-panel');
      button.tabIndex = selected ? 0 : -1;
      button.append(make('span', 'tab-number', variant.number));
      const label = make('span', 'tab-text');
      label.append(make('span', null, `Designer${variant.number}`), make('strong', null, variant.name));
      button.append(label);
      button.addEventListener('click', () => selectVariant(variant.id));
      button.addEventListener('keydown', event => {
        const variants = state.catalog.variants;
        const index = variants.findIndex(item => item.id === variant.id);
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % variants.length;
        else if (event.key === 'ArrowLeft') next = (index + variants.length - 1) % variants.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = variants.length - 1;
        else return;
        event.preventDefault(); selectVariant(variants[next].id);
        $(`tab-${variants[next].id}`).focus();
      });
      $('variant-tabs').append(button);
    });
    $('variant-panel').setAttribute('aria-labelledby', `tab-${state.variant.id}`);
  }

  function close3d() {
    state.in3d = false; state.viewerToken += 1;
    $('model-stage').replaceChildren(); $('model-stage').hidden = true;
    $('view-image-wrap').hidden = false;
    $('open-3d').hidden = false; $('close-3d').hidden = true;
  }

  function showEmpty(title, message) {
    const empty = $('stage-empty'); empty.replaceChildren();
    const symbol = make('span', 'empty-symbol', '◇'); symbol.setAttribute('aria-hidden', 'true');
    empty.append(symbol, make('h3', null, title), make('p', null, message));
    empty.hidden = false; $('main-image').hidden = true;
  }

  function renderView() {
    if (!state.variant) return;
    close3d();
    const variant = state.variant;
    const views = viewsFor();
    const view = views.find(item => item.id === state.viewId) || views[0];
    state.viewId = view?.id || null;
    $('stage-variant').textContent = `Designer${variant.number}`;
    $('stage-state').textContent = state.revision === 'after' ? 'Revision' : 'Original';
    $('show-after').setAttribute('aria-pressed', String(state.revision === 'after'));
    $('show-before').setAttribute('aria-pressed', String(state.revision === 'before'));
    $('open-3d').disabled = state.revision !== 'after' || !safeURL(variant.preview?.glb);
    $('open-3d').title = state.revision === 'before' ? 'Interactive 3D is available for the revision only' : variant.preview?.glb ? 'Load the interactive preview on demand' : 'Interactive preview pending';
    $('view-format').textContent = 'Native CAD derivative';
    $('view-tabs').replaceChildren();
    for (const item of views) {
      const button = make('button', null, item.label);
      button.type = 'button'; button.setAttribute('aria-pressed', String(item.id === state.viewId));
      button.addEventListener('click', () => { state.viewId = item.id; renderView(); });
      $('view-tabs').append(button);
    }
    if (!view) {
      $('main-image').removeAttribute('src');
      showEmpty(state.revision === 'after' ? 'Revision views pending' : 'Original views pending', 'The final render will appear here after it has been matched to the native CAD file.');
      $('image-caption').textContent = 'No unverified image is substituted for this variant.';
      $('view-badge').hidden = true;
    } else {
      const main = $('main-image'); const expected = safeURL(view.src);
      main.hidden = false; $('stage-empty').hidden = true;
      main.alt = view.alt || `Designer${variant.number} ${variant.name}, ${state.revision === 'after' ? 'revision' : 'original'}, ${view.label.toLowerCase()}`;
      main.onerror = () => { if (main.src === expected) showEmpty('This view could not load', 'Try another angle or refresh the page. The native CAD file remains the review reference.'); };
      main.onload = () => { if (main.src === expected) { main.hidden = false; $('stage-empty').hidden = true; } };
      main.src = expected;
      $('image-caption').textContent = view.caption || 'Illustrative appearance. The native 3DM is the CAD review reference.';
      $('view-badge').textContent = view.provisional ? 'Provisional preview · final file match pending' : (view.badge || '');
      $('view-badge').hidden = !($('view-badge').textContent);
    }
    $('view-announcement').textContent = `Designer${variant.number}, ${state.revision === 'after' ? 'revision' : 'original'}${view ? `, ${view.label}` : ', views pending'}`;
  }

  function renderDetails() {
    const variant = state.variant;
    $('model-number').textContent = `Designer${variant.number}`;
    $('model-name').textContent = variant.name;
    $('model-summary').textContent = variant.summary;
    $('critical-note').textContent = variant.criticalNote || '';
    $('critical-note').hidden = !variant.criticalNote;
    $('variant-facts').replaceChildren();
    for (const fact of variant.facts || []) {
      const box = make('div', 'fact');
      box.append(make('strong', null, fact.value ?? 'Pending'), make('span', null, fact.label));
      $('variant-facts').append(box);
    }
    $('measurements').replaceChildren();
    for (const item of variant.measurements || []) {
      const row = make('div', 'measurement'); const value = make('dd');
      value.append(make('span', 'measure-target', item.target), make('span', `measure-result ${item.status || 'pending'}`, displayResult(item)));
      row.append(make('dt', null, item.label), value);
      if (item.note) row.append(make('dd', 'measure-note', item.note));
      $('measurements').append(row);
    }
    const native = variant.downloads?.native;
    const nativeURL = safeURL(native?.href);
    $('native-download').hidden = !nativeURL; $('native-pending').hidden = Boolean(nativeURL);
    if (nativeURL) {
      $('native-download').href = nativeURL;
      $('native-download').download = native.fileName || '';
      $('native-meta').textContent = [native.fileName, byteSize(native.bytes)].filter(Boolean).join(' · ');
    } else {
      $('native-download').removeAttribute('href');
      $('native-meta').textContent = native?.pendingNote || 'Final native file and identity check pending';
    }
    $('changes').replaceChildren();
    for (const change of variant.changes || []) {
      const li = make('li');
      if (typeof change === 'string') li.textContent = change;
      else { li.append(make('strong', null, change.title + ' '), document.createTextNode(change.detail || '')); }
      $('changes').append(li);
    }
    $('qa-list').replaceChildren();
    for (const check of variant.qa || []) {
      const li = make('li'); const dot = make('span', `qa-dot ${check.status || 'review'}`); dot.setAttribute('aria-hidden', 'true');
      const body = make('div'); body.append(make('strong', null, check.label));
      if (check.detail) body.append(make('p', null, check.detail));
      li.append(dot, body); $('qa-list').append(li);
    }
    $('exceptions').replaceChildren();
    for (const exception of variant.limitations || []) $('exceptions').append(make('p', null, exception));
    $('source-note').textContent = variant.source?.note || 'Original source geometry is retained as the comparison reference. Preview appearance is illustrative.';
    const identities = $('file-identities'); identities.replaceChildren();
    const entries = [
      ['Original 3DM SHA-256', variant.source?.sha256],
      ['Revision 3DM SHA-256', native?.sha256],
      ['Preview GLB SHA-256', variant.preview?.sha256]
    ];
    for (const [label, hash] of entries) {
      identities.append(make('dt', null, label), make('dd', null, hash || 'Identity pending final manifest'));
    }
    $('evidence-links').replaceChildren();
    for (const link of [...(state.catalog.evidence || []), ...(variant.evidence || [])]) {
      const url = safeURL(link.href); if (!url) continue;
      const anchor = make('a', null, link.label); anchor.href = url;
      if (link.download) anchor.download = '';
      else { anchor.target = '_blank'; anchor.rel = 'noopener'; }
      $('evidence-links').append(anchor);
    }
  }

  function selectVariant(id) {
    const variant = state.catalog.variants.find(item => item.id === id);
    if (!variant) return;
    state.variant = variant;
    updateTabs(); renderDetails(); renderView();
  }

  function loadModelViewer() {
    if (customElements.get('model-viewer')) return Promise.resolve();
    if (modelViewerReady) return modelViewerReady;
    modelViewerReady = new Promise((resolve, reject) => {
      const url = safeURL(state.catalog.modelViewerScript);
      if (!url) { reject(new Error('Local model viewer unavailable')); return; }
      const script = document.createElement('script'); script.type = 'module'; script.src = url;
      const timer = setTimeout(() => reject(new Error('Model viewer timed out')), 20000);
      script.onerror = () => { clearTimeout(timer); reject(new Error('Model viewer could not load')); };
      customElements.whenDefined('model-viewer').then(() => { clearTimeout(timer); resolve(); });
      document.head.append(script);
    });
    return modelViewerReady;
  }

  async function show3d() {
    const variant = state.variant;
    const url = safeURL(variant.preview?.glb);
    if (!url || state.revision !== 'after') return;
    close3d(); state.in3d = true;
    const token = state.viewerToken;
    $('open-3d').hidden = true; $('close-3d').hidden = false;
    $('view-image-wrap').hidden = true; $('stage-empty').hidden = true;
    $('model-stage').hidden = false; $('view-tabs').replaceChildren();
    $('view-format').textContent = 'Drag to rotate · scroll to zoom';
    $('image-caption').textContent = `Loading the interactive display derivative${byteSize(variant.preview.bytes) ? ` (${byteSize(variant.preview.bytes)})` : ''}…`;
    $('view-badge').textContent = variant.preview.provisional ? 'Provisional preview · final file match pending' : 'Display derivative · review native CAD';
    $('view-badge').hidden = false;
    const loading = make('div', 'model-error');
    loading.append(make('strong', null, 'Loading 3D view'), make('p', null, 'The preview is downloaded only when you open it.'));
    $('model-stage').append(loading);
    try {
      await loadModelViewer();
      if (state.viewerToken !== token || !state.in3d) return;
      const viewer = document.createElement('model-viewer');
      viewer.setAttribute('src', url);
      viewer.setAttribute('alt', `Interactive revision of Designer${variant.number}, ${variant.name}. Drag to rotate and pinch or scroll to zoom.`);
      viewer.setAttribute('camera-controls', '');
      viewer.setAttribute('touch-action', 'pan-y');
      viewer.setAttribute('interaction-prompt', 'none');
      viewer.setAttribute('shadow-intensity', '0.7');
      viewer.setAttribute('exposure', '1');
      viewer.setAttribute('camera-orbit', variant.preview.cameraOrbit || '35deg 65deg auto');
      viewer.setAttribute('field-of-view', '28deg');
      if (safeURL(variant.preview.poster)) viewer.setAttribute('poster', safeURL(variant.preview.poster));
      const failed = () => {
        if (state.viewerToken !== token) return;
        const error = make('div', 'model-error'); error.append(make('strong', null, '3D preview unavailable'), make('p', null, 'Return to still views. The native 3DM download is available separately.'));
        $('model-stage').replaceChildren(error); $('image-caption').textContent = 'This browser could not display the GLB preview.';
      };
      viewer.addEventListener('error', failed);
      viewer.addEventListener('load', () => {
        if (state.viewerToken !== token) return;
        $('image-caption').textContent = variant.preview.caption || 'Drag to rotate. Pinch or scroll to zoom. This tessellated display preview does not certify manufacturability.';
        $('view-announcement').textContent = `Interactive preview loaded for Designer${variant.number}`;
      });
      $('model-stage').replaceChildren(viewer);
    } catch (_) {
      if (state.viewerToken !== token) return;
      const error = make('div', 'model-error'); error.append(make('strong', null, '3D preview unavailable'), make('p', null, 'Return to still views. No additional software is needed to review the images.'));
      $('model-stage').replaceChildren(error); $('image-caption').textContent = 'The local 3D viewer could not load.';
    }
  }

  $('show-after').addEventListener('click', () => { state.revision = 'after'; renderView(); });
  $('show-before').addEventListener('click', () => { state.revision = 'before'; renderView(); });
  $('open-3d').addEventListener('click', show3d);
  $('close-3d').addEventListener('click', renderView);

  fetch(manifestURL, { cache: 'no-cache' }).then(response => {
    if (!response.ok) throw new Error('Catalog fetch failed'); return response.json();
  }).then(catalog => {
    if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.variants) || !catalog.variants.length) throw new Error('Unsupported catalog');
    state.catalog = catalog;
    selectVariant(catalog.defaultVariant || catalog.variants[0].id);
  }).catch(() => {
    $('load-error').hidden = false; $('variant-panel').hidden = true;
  });
})();
