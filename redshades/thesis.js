/* Editorial thesis overlay: shared by the website and print edition. */
(() => {
  const topics = Array.isArray(window.REDC2_CONTENT) ? window.REDC2_CONTENT : [];
  const set = (number, patch) => {
    const topic = topics.find(item => item.number === number);
    if (topic) Object.assign(topic, patch);
  };

  set(1, {
    title: 'RedShades — intelligence with a deterministic spine',
    paragraphs: [
      'RedShades is an 88-stage security-assessment system designed to make bounded, short-horizon model work accumulate into a coherent long-horizon result. Deterministic scheduling retains state, ownership, evidence and recovery; supervised AI is invoked only where the next decision cannot be reduced safely to fixed logic.'
    ],
    caption: 'A deterministic chain that turns bounded intelligence into durable progress.'
  });
  set(2, {
    title: 'The 88-stage deterministic spine',
    paragraphs: ['Enumeration, attack-surface construction, controlled validation, foothold handling, pivoting, platform-specific post-exploitation, privilege escalation and reporting are joined by one evidence-driven scheduler rather than one fragile model transcript.'],
    items: [
      {id:'ENUM',title:'Discovery and enumeration',description:'Network, service, web and identity observations'},
      {id:'FOOT',title:'Foothold convergence',description:'Evidence correlation, candidate review and validated effect'},
      {id:'PIV',title:'Pivot and subchains',description:'Route-aware discovery and child execution graphs'},
      {id:'PRIV',title:'Privilege progression',description:'Platform-specific evidence and bounded actions'},
      {id:'C2',title:'Implant-driven continuation',description:'Typed sessions, callbacks and host capabilities'},
      {id:'RPT',title:'Evidence and reporting',description:'Retained findings, source coordinates and outcomes'}
    ],
    caption:'Eighty-eight stages share one durable frontier; only eligible work advances.'
  });
  set(3, {
    title: 'Executive supervision over deterministic work',
    paragraphs:['The scheduler owns ordinary progression. The Executive observes the frontier, gates and evidence stream, resolves cross-stage ambiguity, preserves priorities and routes only the exceptional last mile to ACP or AEP. It does not replace deterministic authority.'],
    items:[
      {id:'WFS',title:'Work Frontier Scheduler',description:'Selects evidence-eligible stages'},
      {id:'EXEC',title:'Executive',description:'Observes convergence and routes exceptional work'},
      {id:'ADS',title:'Bounded AI calls',description:'Fill local ambiguity inside typed stages'},
      {id:'ACP',title:'Adaptive Capability Pipeline',description:'Synthesizes a missing target interaction'},
      {id:'AEP',title:'Autonomic Engineering Plane',description:'Repairs defective production machinery'},
      {id:'TAC',title:'Transactional Action Coordinator',description:'Retains intent, effect and read-back evidence'}
    ],
    caption:'The Executive monitors the chain; deterministic code retains authority.'
  });
  set(4, {
    title:'Model allocation: spend intelligence where continuity matters',
    paragraphs:['The architecture separates small bounded decisions from persistent convergence. Short calls can be served by a shared compact model with boundary-specific QLoRA specialization; Executive, ACP and AEP work benefits from persistent sessions on the stronger fine-tuned model. This is the intended allocation architecture, not a claim that every planned adapter has completed training.'],
    items:[
      {id:'1B',title:'Shared compact base',description:'Classification, normalization and narrow stage decisions'},
      {id:'QLR',title:'Boundary QLoRA bank',description:'Planned specialist adaptation without duplicating the base'},
      {id:'30B2A',title:'Fine-tuned reasoning model',description:'Persistent Executive, ACP and AEP sessions'},
      {id:'KV',title:'Session continuity',description:'Prior rejection receipts and causal history remain available'},
      {id:'DET',title:'Deterministic custody',description:'Scope, tools, effects, validation and promotion remain outside the model'},
      {id:'REV',title:'Isolated review',description:'Independent contamination and semantic assessment'}
    ],
    caption:'Small models handle bounded work; persistent stronger sessions own convergence.'
  });
  set(5, {
    title:'Operational surface and native control',
    paragraphs:['The chain coordinates established assessment tools, custom workers, Go implants, Zig stage helpers, payload bundles, virtualized transformation layers and native Qt inspection surfaces. Tools remain replaceable executors behind typed observations rather than becoming the architecture itself.'],
    items:[
      {id:'NET',title:'Network and service',description:'Nmap, Masscan, protocol clients and route-aware discovery'},
      {id:'WEB',title:'Web assessment',description:'FFUF, Gobuster, Nuclei, Gowitness, SQLMap and browser evidence'},
      {id:'ID',title:'Identity and directory',description:'NetExec, Impacket, BloodHound, LDAP and SMB tooling'},
      {id:'PIV',title:'Pivoting',description:'Ligolo, Chisel and nested route-aware scans'},
      {id:'IMP',title:'Implants and helpers',description:'Go Windows/Linux implants and Zig stage-zero helpers'},
      {id:'UI',title:'Native operator workspace',description:'AttackMap, Network Graph, WebRecon, evidence and gates'}
    ],
    caption:'A broad executor ecosystem is coordinated through typed state and operator-visible evidence.'
  });
  set(16, {title:'Scheduling eighty-eight stages without losing the frontier', paragraphs:['Each stage declares prerequisites, evidence inputs, effects, outputs, recovery policy and verified postconditions. The scheduler advances independent branches concurrently, parks only blocked endpoints and reconstructs progress from durable state after interruption.']});
  set(17, {title:'Miniature AI decisions inside deterministic stages', paragraphs:['A stage invokes AI only for bounded ambiguity: ranking evidence, normalizing an unfamiliar label, selecting admitted mechanics or reviewing a compact candidate. The response becomes runtime truth only after deterministic validation.']});
  set(22, {title:'AEP — repairing the machine without losing the run', paragraphs:['When the blocker is a product, orchestration, evidence-custody or platform-capability defect, the Executive routes it to AEP. One persistent repair session owns diagnosis, source work, focused and counterfactual tests, admission, atomic replacement and verified hand-back to the interrupted frontier.']});
  set(23, {title:'ACP — solving the unfamiliar last mile', paragraphs:['When evidence proves that the chain lacks one target interaction, ACP owns the complete capability convergence loop: finding, contract, binding, compatible SDK selection or extension, adapter generation, tests, isolated review and execution proof. Existing compatible artifacts skip unnecessary boundaries.']});
  set(24, {title:'One chain: enumerate, converge, pivot and continue', paragraphs:['The operational graph can move from external enumeration through web or identity evidence to a validated foothold, register the resulting session, discover internal routes, spawn subchains, evaluate privilege paths and continue through implant-backed host stages. Every transition remains tied to evidence and authority.']});
  set(29, {title:'Integrated capability families', paragraphs:['The implemented surface combines discovery, web reconnaissance, identity and directory analysis, controlled candidate validation, session registration, pivoting, Windows/Linux host inspection, privilege progression, artifact handling, reporting and autonomous repair.']});
  set(43, {title:'What the architecture has already demonstrated', paragraphs:['Reported autonomous completions show that the chain can sustain long sequences beyond one model horizon. Retained simulations and engineering contracts support individual mechanisms; exact field logs remain a separate evidence class and are not reconstructed from narrative.']});
  set(44, {title:'What remains unproven', paragraphs:['General reliability across unseen environments, the complete planned QLoRA bank, consistent weak-model parity with stronger agents, broad ACP convergence and full AEP hand-back still require current clean receipts and representative evaluations. The architecture is designed for those goals; the catalog does not present them as finished facts.']});
  set(45, {title:'Development direction: measurable intelligence leverage', paragraphs:['The decisive metric is not whether AI appears in the loop. It is whether a cheaper bounded model, supported by deterministic state and reusable specialists, reaches the same validated frontier with fewer repairs, no lost feedback and recoverable ownership.']});
})();
