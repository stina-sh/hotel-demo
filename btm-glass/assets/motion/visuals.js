/* Architectural glazing studies. Decorative principle drawings, not installation instructions. */
(() => {
  let index=0;
  const line=(d,cls='')=>`<path d="${d}" class="vpe-line ${cls}"/>`;
  const note=(x,y,text,cls='')=>`<text x="${x}" y="${y}" class="vpe-note ${cls}">${text}</text>`;
  const defs=id=>`<defs><linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b4d9ce" stop-opacity=".42"/><stop offset=".45" stop-color="#e3f2ed" stop-opacity=".2"/><stop offset="1" stop-color="#90b6b1" stop-opacity=".36"/></linearGradient><pattern id="${id}-hatch" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 6L6 0" fill="none" stroke="#91a99e" stroke-width=".5"/></pattern></defs>`;
  const dimensions=()=>`<g class="vpe-dimensions">${line('M77 43V329M70 43h14M70 329h14M100 354h316M100 347v14M416 347v14')}${note(94,375,'DIMENSIONS CONFIRMÉES AVANT FABRICATION')}</g>`;
  const windowStudy=id=>`
    ${dimensions()}
    <g class="vpe-window-assembly vpe-assemble-frame">
      <g class="vpe-window-frame"><rect x="100" y="43" width="316" height="286" class="vpe-frame-fill"/><path d="M112 55h292v262H112z" class="vpe-frame-inner"/><path d="M124 67h125v238H124z" fill="url(#${id}-glass)" class="vpe-glass-line"/>${line('M252 55h12v262h-12z','vpe-mullion')}${line('M100 43l12 12M416 43l-12 12M100 329l12-12M416 329l-12-12','vpe-frame-detail')}${line('M144 87l-8 104M155 87l-5 62','vpe-reflection')}</g>
      <g class="vpe-window-leaf" data-hinge-axis="267"><path d="M267 67h125v238H267z" class="vpe-window-sash"/><path d="M275 75h109v222H275z" fill="url(#${id}-glass)" class="vpe-glass-line"/>${line('M267 67l8 8M392 67l-8 8M267 305l8-8M392 305l-8-8','vpe-frame-detail')}<rect x="378" y="175" width="5" height="24" rx="1.5" class="vpe-metal"/>${line('M380 186h-16','vpe-handle')}${line('M367 164l-9 119','vpe-reflection')}</g>
      <g class="vpe-window-hinges" data-hinge-axis="267"><rect x="263" y="108" width="8" height="18" rx="2" class="vpe-hinge"/><rect x="263" y="248" width="8" height="18" rx="2" class="vpe-hinge"/>${line('M262 112h10M262 122h10M262 252h10M262 262h10','vpe-hinge-pin')}</g>
    </g>
    ${line('M417 100h41l18-22h68M417 218h41l18 22h68','vpe-callout')}${note(476,68,'MENUISERIE')}${note(476,259,'FERMETURE')}${note(100,23,'ÉTUDE DE FENÊTRE','vpe-heading')}
  `;
  const glassStudy=id=>`
    <g class="vpe-glass-structure"><path d="M116 53l239 31v242l-239-31z" fill="url(#${id}-glass)" class="vpe-glass-main"/>${line('M116 53l10-7 239 31-10 7M355 84l10-7v242l-10 7','vpe-glass-edge')}${line('M135 77l199 26v199l-199-26z','vpe-glass-outline')}${line('M154 95v110M165 97v71M316 185v96','vpe-reflection')}</g>
    <g class="vpe-dimensions">${line('M91 57v239M85 57h12M85 296h12M119 348l236 30M119 342v12M355 372v12')}${note(122,26,'VERRE SUR MESURE','vpe-heading')}</g>
    ${line('M355 118h63l24-24h104M355 202h73l14 14h104M355 281h55l32 35h104','vpe-callout')}${note(447,85,'USAGE')}${note(447,237,'ÉPAISSEUR')}${note(447,337,'SUPPORT')}
    <path d="M118 54l237 31v241" class="vpe-line vpe-edge-current"/>
  `;
  const glazingStudy=id=>`
    <g class="vpe-pane-layer vpe-layer-back"><path d="M200 38l200 58v241l-200-58z" class="vpe-glass-main" fill="url(#${id}-glass)"/>${line('M200 38l9-6 200 58-9 6M400 96l9-6v241l-9 6','vpe-glass-edge')}</g>
    <g class="vpe-spacer"><path d="M166 65l200 58v241l-200-58z" fill="none" stroke="#71978a" stroke-width="5"/><path d="M174 76l184 53v224l-184-53z" fill="url(#${id}-hatch)" opacity=".13"/></g>
    <g class="vpe-pane-layer vpe-layer-front"><path d="M128 52l200 58v241l-200-58z" class="vpe-glass-main" fill="url(#${id}-glass)"/>${line('M128 52l9-6 200 58-9 6M328 110l9-6v241l-9 6','vpe-glass-edge')}${line('M151 85v104M164 90v63M306 227v91','vpe-reflection')}</g>
    ${line('M329 141h74l35-37h108M365 229h39l34 0h108M128 254H78v-51','vpe-callout')}${note(442,92,'COMPOSITION')}${note(442,248,'INTERCALAIRE')}${note(29,186,'VITRAGE')}${note(128,25,'COMPOSITION DU VITRAGE','vpe-heading')}
  `;
  const repairStudy=id=>`
    <g class="vpe-assemble-frame"><rect x="100" y="42" width="288" height="286" class="vpe-frame-fill"/><rect x="114" y="56" width="260" height="258" class="vpe-frame-inner"/><rect x="124" y="66" width="240" height="238" fill="url(#${id}-glass)" class="vpe-glass-line"/></g>
    <g class="vpe-old-pane">${line('M249 164l-26-35-22-10-5-28M249 164l34-19 16 8 34-23M249 164l-22 34 8 24-15 43M249 164l37 37 32 9','vpe-fracture')}</g>
    <g class="vpe-replacement-pane"><rect x="124" y="66" width="240" height="238" class="vpe-glass-main" fill="url(#${id}-glass)"/>${line('M142 85v106M154 85v67M344 180v102','vpe-reflection')}</g>
    <g class="vpe-lifting-tool"><ellipse cx="197" cy="183" rx="29" ry="11" class="vpe-tool-rubber"/><ellipse cx="289" cy="183" rx="29" ry="11" class="vpe-tool-rubber"/>${line('M197 180v-33h92v33','vpe-tool-handle')}${line('M203 148h80','vpe-tool-grip')}</g>
    <g class="vpe-repair-notes">${line('M412 81h130M412 159h130M412 237h130','vpe-callout')}${note(412,69,'01  CONSTAT')}${note(412,147,'02  MESURES')}${note(412,225,'03  REMPLACEMENT')}</g>
    ${dimensions()}${note(100,23,'REMPLACEMENT DU VITRAGE','vpe-heading')}
  `;
  const drawings={glass:glassStudy,window:windowStudy,glazing:glazingStudy,repairglass:repairStudy};
  function diagram(type='glass') { const id=`vpe-structure-${++index}`;const draw=drawings[type]||glassStudy;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" class="epe-visual vpe-technical vpe-study-${type}" aria-hidden="true" focusable="false">${defs(id)}${draw(id)}</svg>`; }
  const iconPaths = {
    bolt: '<path d="M13.5 2L5 13h6l-1 9L19 10h-6z"/>',
    phone: '<path d="M7 3H4.5A1.5 1.5 0 003 4.6C3.6 13.2 10.8 20.4 19.4 21a1.5 1.5 0 001.6-1.5V17l-5-2-1.6 2a15.4 15.4 0 01-7.3-7.3L9 8z"/><path class="epe-icon-ring" d="M15 3a6 6 0 016 6M15 7a2 2 0 012 2"/>',
    arrow: '<path d="M4 12h15M13 5l7 7-7 7"/>',
    'arrow-up-right': '<path d="M5 19L19 5M5 5h14v14"/>',
    check: '<path d="M5 12l4 4L19 6"/>',
    plus: '<path d="M12 4v16M4 12h16"/>',
    minus: '<path d="M4 12h16"/>',
    close: '<path d="M5 5l14 14M19 5L5 19"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    shield: '<path d="M12 2l8 3v6q0 7-8 11-8-4-8-11V5z"/><path d="M8 12l3 3 5-6"/>',
    pin: '<path d="M19 10c0 6-7 12-7 12S5 16 5 10a7 7 0 1114 0z"/><circle cx="12" cy="9" r="2.5"/>',
    menu: '<path d="M3 7h18M3 12h18M3 17h18"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    plug: '<path d="M8 2v6M16 2v6M5 8h14v4a7 7 0 01-7 7v3M8 19h8"/>',
    light: '<path d="M8 15a6 6 0 118 0l-1 2H9zM9 20h6M10 23h4M12 1V0M3 5L1 3M21 5l2-2"/>',
    send: '<path d="M22 2L9 15M22 2l-7 20-6-7-7-6z"/>',
    chat: '<path d="M21 11.5a8.5 8.5 0 01-8.5 8.5H6l-4 2 1.5-5A8.5 8.5 0 1121 11.5z"/><path d="M7 9h10M7 13h6"/>',
    circuit: '<path d="M3 7h6l3 5h9M3 17h6l3-5M17 3v5M17 16v5"/><circle cx="3" cy="7" r="1"/><circle cx="3" cy="17" r="1"/><circle cx="21" cy="12" r="1"/>',
    chevron: '<path d="M8 4l8 8-8 8"/>',
    star: '<path d="M12 2l3 6.5 7 .9-5.2 5 1.3 7.1L12 18l-6.1 3.5 1.3-7.1L2 9.4l7-.9z"/>',
    home: '<path d="M2 11L12 3l10 8M5 9v12h14V9M9 21v-7h6v7"/>',
  };
  function icon(name = 'bolt') {
    return `<svg class="epe-icon epe-icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconPaths[name] || iconPaths.bolt}</svg>`;
  }
  window.EPEVisuals={diagram,icon,types:Object.keys(drawings)};
})();
