/* Individual architectural studies for every service route. Decorative, not installation instructions. */
(() => {
  let sequence=0;
  const original=window.EPEVisuals.diagram;
  const path=(d,c='')=>`<path d="${d}" class="vpx-line ${c}"/>`;
  const text=(x,y,s,c='')=>`<text x="${x}" y="${y}" class="vpx-label ${c}">${s.replace(/&/g,'&amp;')}</text>`;
  const dims=(x=80,y=55,w=300,h=280)=>`<g class="vpx-dim">${path(`M${x-20} ${y}v${h}M${x-26} ${y}h12M${x-26} ${y+h}h12M${x} ${y+h+22}h${w}M${x} ${y+h+16}v12M${x+w} ${y+h+16}v12`)}</g>`;
  const rect=(x,y,w,h,c='vpx-frame')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="${c}"/>`;
  const glass=(id,x,y,w,h,c='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" class="vpx-glass ${c}" fill="url(#${id}-glass)"/>`;
  const reflection=(x,y,h=110)=>path(`M${x} ${y}v${h}M${x+12} ${y}v${h*.58}`,'vpx-reflection');
  const simple=id=>`
    ${text(90,28,'SIMPLE VITRAGE · ÉTUDE DU PROFIL','vpx-title')}${dims(90,58,275,280)}
    <g class="vpx-profile-assemble">${rect(90,58,275,280)}${rect(107,75,241,246,'vpx-inset')}${glass(id,121,89,213,218)}${reflection(139,107,116)}${path('M90 58l17 17M365 58l-17 17M90 338l17-17M365 338l-17-17','vpx-detail')}</g>
    <g class="vpx-section-profile" transform="translate(450 84)">${rect(0,0,57,214,'vpx-profile')}${rect(13,20,32,174,'vpx-inset')}${rect(23,32,5,150,'vpx-glass-solid')}${path('M0 0l13 20M57 0L45 20M0 214l13-20M57 214l-12-20','vpx-detail')}${text(-2,244,'COUPE DE PRINCIPE')}${path('M28 107h62','vpx-callout')}${text(96,111,'VERRE')}</g>
    ${path('M122 90h212v218','vpx-edge-run')}
  `;
  const double=id=>`
    ${text(90,28,'DOUBLE VITRAGE · COMPOSITION ISOLANTE','vpx-title')}
    <g class="vpx-double-back">${glass(id,224,61,95,273)}${path('M224 61l15-12h95l-15 12M319 61l15-12v273l-15 12','vpx-detail')}</g>
    <g class="vpx-double-gap">${rect(193,73,25,249,'vpx-spacer')}${rect(183,73,8,249,'vpx-spacer-dark')}${path('M191 83v229','vpx-dotted')}</g>
    <g class="vpx-double-front">${glass(id,117,85,95,273)}${path('M117 85l15-12h95l-15 12M212 85l15-12v273l-15 12','vpx-detail')}${reflection(133,105,125)}</g>
    <g class="vpx-heat-flow">${path('M31 122h76M31 173h76M31 224h76','vpx-warm-ray')}${path('M342 122h76M342 173h76M342 224h76','vpx-cool-ray')}</g>
    ${path('M318 92h68l42-38h148M218 193h168l42-4h148M211 310h175l42 44h148','vpx-callout')}${text(439,45,'VERRE EXTÉRIEUR')}${text(439,180,'ESPACE INTERCALAIRE')}${text(439,374,'VERRE INTÉRIEUR')}
  `;
  const passage=id=>`
    ${text(78,28,'VITRAGE AVEC PASSAGE TECHNIQUE','vpx-title')}${dims(78,55,309,289)}
    ${rect(78,55,309,289)}${glass(id,93,70,279,259)}${reflection(112,91,135)}
    <g class="vpx-aperture"><circle cx="267" cy="194" r="62" class="vpx-aperture-ring"/><circle cx="267" cy="194" r="49" class="vpx-aperture-inner"/><circle cx="267" cy="194" r="40" class="vpx-aperture-outline"/>${path('M218 194h98M267 145v98','vpx-axis')}</g>
    <g class="vpx-duct">${path('M268 159h123q48 0 48 48v78','vpx-duct-back')}${path('M268 159h123q48 0 48 48v78','vpx-duct-front')}${path('M288 146v27M311 146v27M335 146v27M359 146v27M382 146v27M409 154l-12 21M433 177l-23 12M452 209h-27M452 233h-27M452 258h-27','vpx-duct-ribs')}</g>
    ${path('M330 110h91l31-29h118','vpx-callout')}${text(459,72,'PASSAGE ADAPTÉ')}${text(421,326,'COMPATIBILITÉ À ÉTUDIER')}
  `;
  const survitrage=id=>`
    ${text(83,28,'SURVITRAGE · COUCHE COMPLÉMENTAIRE','vpx-title')}${rect(83,56,280,280)}${rect(98,71,250,250,'vpx-inset')}${glass(id,112,85,222,222)}${reflection(128,101,117)}
    <g class="vpx-secondary-pane">${rect(137,79,280,280,'vpx-secondary-frame')}${glass(id,150,92,254,254)}${reflection(171,112,135)}${path('M137 79l13 13M417 79l-13 13M137 359l13-13M417 359l-13-13','vpx-detail')}</g>
    ${path('M422 122h36l25-26h110M421 297h40l24 28h108','vpx-callout')}${text(485,86,'CADRE RAPPORTÉ')}${text(485,345,'MENUISERIE EXISTANTE')}
    <path d="M152 94h250v252" class="vpx-line vpx-edge-run"/>
  `;
  const rayures=id=>`
    ${text(82,28,'EXAMEN ET TRAITEMENT DES RAYURES','vpx-title')}${rect(82,55,314,281)}${glass(id,96,69,286,253)}${reflection(113,85,118)}
    <g class="vpx-scratches">${path('M156 126l115 103M180 113l113 101M174 151l79 71','vpx-scratch')}</g>
    <g class="vpx-polish-head"><ellipse cx="240" cy="195" rx="52" ry="17" class="vpx-polish-pad"/><path d="M201 187v-37h77v37" class="vpx-polish-housing"/>${rect(218,128,43,21,'vpx-profile')}${path('M277 160h49q25 0 25 25v42','vpx-tool-cable')}</g>
    <g class="vpx-inspection"><circle cx="492" cy="147" r="53" class="vpx-lens"/>${path('M528 183l43 49','vpx-lens-handle')}${path('M462 130l44 39M478 113l41 39','vpx-scratch-detail')}</g>
    ${text(432,268,'ÉTAT DU VERRE')}${text(432,292,'PROFONDEUR DES MARQUES')}${text(432,316,'FAISABILITÉ DU TRAITEMENT')}
  `;
  const posefenetre=id=>`
    ${text(71,28,'POSE DE FENÊTRE · ÉTUDE DU SUPPORT','vpx-title')}
    <g class="vpx-wall">${rect(69,55,329,292,'vpx-masonry')}${rect(101,82,265,239,'vpx-opening')}${path('M69 112h31M69 177h31M69 242h31M367 112h31M367 177h31M367 242h31M146 55v26M227 55v26M309 55v26M146 322v25M227 322v25M309 322v25','vpx-masonry-joints')}</g>
    <g class="vpx-fitting-frame">${rect(102,83,263,237)}${glass(id,117,98,109,207)}${glass(id,241,98,109,207)}${rect(229,95,10,213,'vpx-mullion')}${path('M248 196h12','vpx-handle')}${reflection(134,117,95)}${reflection(316,180,102)}</g>
    <g class="vpx-level"><rect x="449" y="95" width="27" height="226" rx="3" class="vpx-level-body"/><rect x="455" y="173" width="15" height="48" rx="7" class="vpx-level-vial"/><circle cx="462.5" cy="197" r="5" class="vpx-level-bubble"/>${path('M452 125h21M452 290h21','vpx-detail')}</g>
    ${path('M398 77h79l20-20h95','vpx-callout')}${text(501,47,'SUPPORT')}${text(446,355,'APLOMB & AJUSTEMENT')}
  `;
  const rabotage=id=>`
    ${text(84,28,'FENÊTRE BOIS · EXAMEN DES AJUSTEMENTS','vpx-title')}${rect(84,54,296,280,'vpx-timber')}${glass(id,107,77,250,234)}${path('M96 66h272v256H96zM98 319h267M98 325h267','vpx-timber-grain')}${reflection(125,96,115)}
    <g class="vpx-fitting-clearance">${path('M107 310h250','vpx-clearance')}${path('M110 317h243','vpx-edge-run')}</g>
    <g class="vpx-carpentry-plane"><path d="M176 271h114l16 32H165z" class="vpx-plane-base"/><path d="M190 271v-29h32v29M249 271v-39h23v39" class="vpx-plane-grips"/>${path('M174 300h127','vpx-plane-blade')}</g>
    ${path('M381 294h61l29 28h115M382 94h59l30-30h115','vpx-callout')}${text(477,54,'ÉTAT DU BOIS')}${text(477,343,'JEU DE FERMETURE')}
  `;
  const cremone=id=>`
    ${text(94,28,'CRÉMONE · MÉCANISME DE FERMETURE','vpx-title')}
    ${rect(90,53,118,292,'vpx-profile')}${rect(109,66,79,266,'vpx-inset')}${path('M119 79v238M178 79v238','vpx-detail')}
    <g class="vpx-cremone-rod-top">${rect(144,49,10,118,'vpx-metal')}${path('M146 49V37h30v11','vpx-lock-hook')}</g>
    <g class="vpx-cremone-rod-bottom">${rect(144,219,10,127,'vpx-metal')}${path('M146 345v13h30v-11','vpx-lock-hook')}</g>
    <g class="vpx-cremone-gear"><rect x="126" y="157" width="46" height="78" rx="3" class="vpx-gearbox"/><circle cx="149" cy="196" r="20" class="vpx-gear-ring"/><g class="vpx-handle-turn">${path('M149 196h77','vpx-handle')}${path('M215 196h15','vpx-handle-end')}</g><circle cx="149" cy="196" r="6" class="vpx-metal"/></g>
    <g class="vpx-cremone-exploded"><rect x="358" y="105" width="79" height="175" rx="5" class="vpx-inset"/><rect x="372" y="121" width="51" height="143" rx="2" class="vpx-profile"/><circle cx="397" cy="193" r="30" class="vpx-gear-ring"/>${path('M397 163v13M397 211v12M367 193h12M415 193h12M376 172l9 9M409 205l9 9M376 214l9-9M409 181l9-9','vpx-gear-teeth')}<circle cx="397" cy="193" r="12" class="vpx-metal"/></g>
    ${path('M209 196h110l30-30','vpx-callout')}${text(336,78,'RÉFÉRENCE DU MÉCANISME')}${text(336,321,'TRINGLERIE & TRANSMISSION')}
  `;
  const toit=id=>`
    ${text(83,29,'FENÊTRE DE TOIT · CONFIGURATION DU BÂTIMENT','vpx-title')}
    <path d="M57 300L267 57l300 105-210 223z" class="vpx-roof"/>
    ${path('M92 300L282 76M122 315L310 87M151 329L338 97M181 340L366 108M211 352L394 118M239 364L421 128M87 266l303 105M117 230l302 105M147 195l303 105M177 161l303 105M207 126l303 105','vpx-roof-tiles')}
    <path d="M166 252l119-137 155 54-119 137z" class="vpx-roof-opening"/>
    <g class="vpx-roof-window" data-hinge-edge="285,115 440,169"><path d="M166 252l119-137 155 54-119 137z" class="vpx-window-roof-frame"/><path d="M185 246l104-117 131 46-103 116z" class="vpx-glass" fill="url(#${id}-glass)"/>${path('M218 229l61-69M230 234l38-43','vpx-reflection')}${path('M296 280l17 6','vpx-handle')}</g>
    <g class="vpx-roof-hinges">${path('M299 120l16 5.6M410 158.5l16 5.6','vpx-roof-hinge')}${path('M304 117l-4 11M420 157.5l-4 11','vpx-detail')}</g>
    ${path('M440 170h70l28-31h66','vpx-callout')}${text(490,118,'OUVERTURE EN TOITURE')}
  `;
  const vitrophanie=id=>`
    ${text(72,28,'VITROPHANIE · DÉCOR ET SIGNALÉTIQUE','vpx-title')}${rect(72,55,321,289)}${glass(id,87,70,291,259)}${reflection(105,88,117)}
    <g class="vpx-film-decoration"><rect x="92" y="171" width="281" height="114" class="vpx-frosted-film"/>${path('M108 202h93M108 214h156M108 226h127','vpx-signage')}<circle cx="328" cy="228" r="22" class="vpx-sign-circle"/>${path('M308 228h40M328 208v40','vpx-sign-grid')}</g>
    <g class="vpx-film-roll"><path d="M91 171h282v25H91z" class="vpx-film-roll-body"/><ellipse cx="372" cy="183" rx="8" ry="13" class="vpx-film-roll-end"/></g>
    ${path('M394 132h51l24-28h125M394 259h51l24 29h125','vpx-callout')}${text(473,94,'VISIBILITÉ')}${text(473,310,'INTIMITÉ & IDENTITÉ')}
  `;
  const film=id=>`
    ${text(80,28,'FILM SOLAIRE · EXPOSITION ET COMPATIBILITÉ','vpx-title')}${rect(173,65,193,279)}${glass(id,188,80,163,249)}${reflection(206,99,116)}
    <g class="vpx-solar-film">${glass(id,193,87,153,236,'vpx-film-tint')}</g>
    <g class="vpx-solar-incoming">${path('M35 112h125M35 169h125M35 226h125','vpx-solar-warm')}</g><g class="vpx-solar-outgoing">${path('M379 112h142M379 169h142M379 226h142','vpx-solar-cool')}</g>
    ${path('M141 105l17 7-17 7M141 162l17 7-17 7M141 219l17 7-17 7','vpx-arrow-warm')}${path('M505 105l17 7-17 7M505 162l17 7-17 7M505 219l17 7-17 7','vpx-arrow-cool')}
    <circle cx="89" cy="310" r="22" class="vpx-sun"/>${path('M89 274v-12M89 346v12M53 310H41M125 310h12M64 285l-9-9M114 335l9 9M64 335l-9 9M114 285l9-9','vpx-sun-rays')}${text(410,299,'EXPOSITION')}${text(410,321,'TYPE DE VITRAGE')}${text(410,343,'OBJECTIF DE CONFORT')}
  `;
  const vitrine=id=>`
    ${text(64,28,'VITRINE · FAÇADE COMMERCIALE','vpx-title')}
    <g class="vpx-shop-frame">${rect(62,80,510,260,'vpx-shop-wall')}${rect(82,110,470,213,'vpx-opening')}${path('M62 64h510v37H62z','vpx-shop-sign')}${glass(id,94,122,291,189)}${glass(id,401,122,139,189)}${rect(388,110,10,213,'vpx-mullion')}${path('M420 216h24','vpx-handle')}${path('M62 340h510M75 351h484','vpx-detail')}</g>
    <g class="vpx-shop-reflection">${path('M111 143l-1 141M123 143l-1 82M361 165l-1 124M519 151v109','vpx-reflection')}</g>
    <path d="M96 123h288v188" class="vpx-line vpx-edge-run"/>${text(93,379,'ACCÈS · DIMENSIONS · CONDITIONS DE POSE')}
  `;
  const veranda=id=>`
    ${text(72,28,'VÉRANDA · STRUCTURE ET VITRAGES','vpx-title')}
    <g class="vpx-veranda-base">${path('M74 312l260 57 229-125-260-54z','vpx-veranda-floor')}${path('M74 154l260 58 229-125-260-54z','vpx-veranda-roof')}${path('M74 154v158l260 57V212M334 369l229-125V87','vpx-veranda-post')}</g>
    <g class="vpx-veranda-glass"><path d="M84 171v131l238 52V226zM346 226v127l205-114V110z" class="vpx-glass" fill="url(#${id}-glass)"/>${path('M151 181v146M226 199v146M416 168v156M488 127v157','vpx-veranda-post')}${path('M147 158l224-121M223 177l225-121M304 194L524 73','vpx-veranda-roof-bars')}${path('M104 190v86M118 194v53M367 242v78M380 235v51','vpx-reflection')}</g>
    <path d="M76 154l258 58L563 87" class="vpx-line vpx-edge-run"/>${text(75,398,'STRUCTURE EXISTANTE · EXPOSITION · COMPOSITION DES VERRES')}
  `;
  const studies={simple,double,passage,survitrage,rayures,posefenetre,rabotage,cremone,toit,vitrophanie,film,vitrine,veranda};
  function diagram(type){if(!studies[type])return original(type);const id=`vpx-detail-${++sequence}`;return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" class="epe-visual vpx-study vpx-${type}" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}-glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#b5e0db" stop-opacity=".65"/><stop offset=".45" stop-color="#edf6ff" stop-opacity=".23"/><stop offset="1" stop-color="#aabfdf" stop-opacity=".5"/></linearGradient></defs>${studies[type](id)}</svg>`;}
  window.EPEVisuals.diagram=diagram;window.EPEVisuals.types.push(...Object.keys(studies));
})();
