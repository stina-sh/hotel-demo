/* Three original process studies: inspection, quotation and a confirmed visit. */
(() => {
  const visuals = window.SPEVisuals;
  if (!visuals?.diagram) return;
  const previousDiagram = visuals.diagram;
  let sequence = 0;

  const studies = {
    plansurvey(id) {
      return `<defs><clipPath id="${id}-door-clip"><rect x="119" y="70" width="208" height="286" rx="2"/></clipPath></defs>
        <path d="M100 368V48h246v320h-16V65H116v303Z" fill="url(#${id}-steel)"/>
        <rect x="119" y="70" width="208" height="286" fill="#344d5d"/>
        <path d="M132 82h182v260H132Z" fill="#607886" stroke="#bacbd4" stroke-width="1.3"/>
        <path d="M144 95h158v101H144Zm0 116h158v117H144Z" fill="#506b7a" stroke="#8299a6" stroke-width="1.2"/>
        <path d="M120 102h7v27h-7m0 162h7v27h-7" fill="url(#${id}-brass)"/>
        <rect x="285" y="199" width="20" height="72" rx="8" fill="url(#${id}-steel)"/>
        <circle cx="295" cy="222" r="8" fill="#263f50"/>
        <path d="M295 222h-40" stroke="url(#${id}-brass)" stroke-width="8" stroke-linecap="round"/>
        <path d="M293 242h5v15h-5Z" fill="#233b4a"/>
        <g clip-path="url(#${id}-door-clip)"><g class="hp-survey-scan"><rect x="120" y="105" width="207" height="29" fill="#81c9c3" fill-opacity=".14" stroke="none"/><path d="M120 133h207" stroke="#a5e3da" stroke-width="2"/></g></g>
        <g fill="none" stroke="#6d929c" stroke-width="1.2"><path d="M78 69v288m-7-288h14m-14 288h14M120 385h207m-207-7v14m207-14v14"/><path d="m75 78 6-9 0 9m-6 270 6 9v-9M128 382l-8 3 8 3m191-6 8 3-8 3"/></g>
        <path d="M307 230h48l32-46h47" fill="none" stroke="#9db4bf" stroke-dasharray="5 6" stroke-width="1.4"/>
        <g transform="translate(397 87)">
          <rect x="16" y="68" width="159" height="150" rx="6" fill="#3b5362" stroke="#7894a2"/>
          <rect x="30" y="81" width="131" height="122" rx="3" fill="#243e4e"/>
          <path d="M48 103h94v65H48Z" fill="url(#${id}-steel)"/>
          <circle cx="95" cy="136" r="25" fill="url(#${id}-brass)"/><circle cx="95" cy="136" r="15" fill="#2b4554" stroke="#d9bf99"/>
          <path d="M92 125h6v21h-6Z" fill="#071f30"/>
          <path d="M42 190h107M42 193h107" stroke="#839da9" stroke-width=".8"/>
          <path d="M26 245v-42H9v-18h187v18h-15v42h-13v-42H39v42Z" fill="url(#${id}-steel)"/>
          <path d="M40 190h122" stroke="#284656"/>
          <g stroke="#567585" stroke-width="1">${Array.from({ length: 15 }, (_, i) => `<path d="M${44 + i * 8} 187v${i % 5 === 0 ? 11 : 6}"/>`).join('')}</g>
          <g class="hp-survey-jaw"><path d="M104 179h34v66h-13v-42h-21Z" fill="url(#${id}-steel)"/><rect x="106" y="185" width="23" height="12" rx="2" fill="#193b4b"/><path d="M111 191h12" stroke="#9edbd1" stroke-width="2"/></g>
          <path d="M45 53h101m-101-6v12m101-12v12" fill="none" stroke="#8ba8b5" stroke-width="1.1"/>
        </g>
        <g fill="#8caaaF" stroke="none"><circle cx="422" cy="155" r="2"/><circle cx="562" cy="155" r="2"/><circle cx="422" cy="296" r="2"/><circle cx="562" cy="296" r="2"/></g>`;
    },
    quoteplan(id) {
      return `<path d="M145 47h351l17 16v306H145Z" fill="#56717f" stroke="#385260"/>
        <rect x="155" y="57" width="348" height="304" rx="3" fill="#e5eceb" stroke="#9aafb7"/>
        <path d="M167 69h324v280H167Z" fill="#f4f4ec" stroke="#b7c7ca" stroke-width=".8"/>
        <path d="M268 47v-9h120v9h21v29H247V47Z" fill="url(#${id}-steel)"/>
        <rect x="285" y="44" width="86" height="14" rx="7" fill="#4a6471"/>
        <path d="M184 109h48m-48 7h82" stroke="#1f4c60" stroke-width="4"/>
        <path d="M412 106h61m-46 9h46" stroke="#9bb0b7" stroke-width="2"/>
        <path d="M184 135h289M184 203h289M184 271h289" stroke="#b8c9cc" stroke-width="1.2"/>
        <g fill="#d8e5e2" stroke="#6c928e" stroke-width="1.5"><rect x="185" y="151" width="25" height="25" rx="3"/><rect x="185" y="219" width="25" height="25" rx="3"/></g>
        <g fill="none" stroke="#4e6a76" stroke-width="2.2" stroke-linecap="round"><path d="M230 154h119m-119 13h76M230 222h119m-119 13h76"/><path d="M407 167h64m-64 68h64" stroke="#a0b4bc"/></g>
        <g fill="none" stroke="#427b77" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path class="hp-quote-check hp-quote-check-one" pathLength="1" d="m191 163 6 6 15-17"/><path class="hp-quote-check hp-quote-check-two" pathLength="1" d="m191 231 6 6 15-17"/></g>
        <g fill="none" stroke="#294d60" stroke-width="3" stroke-linecap="round"><path class="hp-quote-written hp-quote-written-one" pathLength="1" d="M372 164h93"/><path class="hp-quote-written hp-quote-written-two" pathLength="1" d="M372 232h93"/></g>
        <path d="M319 292h150m-150 9h88" stroke="#9cafb6" stroke-width="2"/>
        <rect x="319" y="313" width="151" height="23" rx="2" fill="#dce6e2" stroke="#afc2bf"/>
        <path class="hp-quote-total" pathLength="1" d="M369 325h85" fill="none" stroke="#39756f" stroke-width="4" stroke-linecap="round"/>
        <path d="M184 294h76m-76 11h93m-93 11h57" stroke="#afc0c5" stroke-width="1.4"/>
        <g class="hp-quote-pen"><path d="m0 0 6-30 23-66q3-8 10-5t4 11L19-24Z" fill="url(#${id}-brass)" stroke="#7b694e"/><path d="m0 0 6-30 13 6Z" fill="#d9c4a0"/><path d="m0 0 3-12 6 4Z" fill="#294659"/><path d="m9-32 24-66" stroke="#f7e2bb" stroke-width="2"/><path d="m21-35 16-45q2-6 6-3" fill="none" stroke="#44616d" stroke-width="3"/></g>
        <path d="M123 84v248m-5-248h10m-10 248h10M530 84v248m-5-248h10m-10 248h10" fill="none" stroke="#8ba6b1" stroke-width="1"/>`;
    },
    appointment(id) {
      return `<path d="M90 366V56h220v310h-16V72H106v294Z" fill="url(#${id}-steel)"/>
        <path d="M111 77h178v278H111Z" fill="#304e5e" stroke="#89a2ad"/>
        <path d="M124 90h151v106H124Zm0 121h151v129H124Z" fill="#476675" stroke="#7595a2"/>
        <path d="M111 107h6v23h-6m0 162h6v23h-6" fill="url(#${id}-brass)"/>
        <rect x="257" y="198" width="18" height="65" rx="6" fill="url(#${id}-steel)"/>
        <circle cx="266" cy="217" r="7" fill="#415e6d"/><path d="M266 217h-33" stroke="url(#${id}-brass)" stroke-width="7" stroke-linecap="round"/>
        <path d="M263 240h6v13h-6Z" fill="#183543"/>
        <g class="hp-visit-bolts" fill="url(#${id}-brass)"><rect x="281" y="127" width="23" height="9" rx="1"/><rect x="281" y="276" width="23" height="9" rx="1"/></g>
        <path d="M315 220h33l23-28h23" fill="none" stroke="#9bb7be" stroke-width="1.5" stroke-dasharray="5 7"/>
        <g transform="translate(370 58)">
          <rect x="6" y="20" width="228" height="270" rx="7" fill="#506d7b" stroke="#273f4e"/>
          <rect x="0" y="13" width="228" height="270" rx="7" fill="#edf0e8" stroke="#a3b7bd"/>
          <path d="M7 13h214q7 0 7 7v51H0V20q0-7 7-7Z" fill="#315969"/>
          <path d="M17 63h194" stroke="#88a4ac" stroke-opacity=".6"/>
          ${[44,112,180].map(x => `<rect x="${x}" y="0" width="9" height="33" rx="4" fill="url(#${id}-steel)" stroke="#284b5b"/>`).join('')}
          <g fill="#9fb4b7" stroke="none">${Array.from({length:15},(_,i)=>`<rect x="${24+i%5*38}" y="${96+Math.floor(i/5)*38}" width="23" height="21" rx="2"/>`).join('')}</g>
          <rect x="96" y="131" width="33" height="31" rx="3" fill="#417d78" stroke="#2d625c"/>
          <path class="hp-visit-confirm" d="m102 146 7 7 15-17" pathLength="1" fill="none" stroke="#e8faf0" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M24 224h95m-95 12h69M24 254h58" stroke="#8ca6ae" stroke-width="2"/>
          <circle cx="183" cy="239" r="28" fill="#e0e8e3" stroke="#6c8f94" stroke-width="2"/>
          <path d="M183 215v4m24 20h-4m-20 24v-4m-24-20h4" stroke="#6d9499" stroke-width="1.5"/>
          <path class="hp-visit-minute" d="M183 239v-16" fill="none" stroke="#2e6565" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M183 239l-10-6" stroke="#2e6565" stroke-width="2.5" stroke-linecap="round"/><circle cx="183" cy="239" r="3" fill="url(#${id}-brass)"/>
        </g>
        <path d="M99 385h208m-208-6v12m208-12v12" fill="none" stroke="#8ca7b2" stroke-width="1.1"/>
        <path class="hp-visit-door-status" d="m168 275 17 17 38-42" pathLength="1" fill="none" stroke="#99d5bd" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
  };

  visuals.diagram = function (type) {
    if (!Object.prototype.hasOwnProperty.call(studies, type)) return previousDiagram.call(visuals, type);
    const id = `spe-process-${++sequence}`;
    return `<svg class="security-visual home-process-visual home-process-${type}" viewBox="0 0 680 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><defs><linearGradient id="${id}-steel" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e5edf0"/><stop offset=".2" stop-color="#92aab7"/><stop offset=".46" stop-color="#d4e1e6"/><stop offset=".57" stop-color="#658494"/><stop offset="1" stop-color="#a9bdc6"/></linearGradient><linearGradient id="${id}-brass" x1="0" y1="0" x2="1" y2=".3"><stop stop-color="#a78357"/><stop offset=".35" stop-color="#e3c496"/><stop offset=".61" stop-color="#bd9b69"/><stop offset="1" stop-color="#ddc5a1"/></linearGradient></defs><g stroke="#314e5f" stroke-width="1.25" stroke-linejoin="round">${studies[type](id)}</g></svg>`;
  };
})();
