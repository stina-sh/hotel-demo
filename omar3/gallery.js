(function(){
  const gallery=document.getElementById('gallery');
  const available=window.CARD_AVAILABLE||5;
  document.querySelector('.count strong').textContent=available;
  gallery.innerHTML=window.CARD_DESIGNS.slice(0,available).map(d=>{
    const n=String(d.id).padStart(2,'0');
    return `<article class="concept" id="card-${d.id}"><div class="meta"><div><span class="badge">Concept ${n}</span><h2>${d.name}</h2></div><div class="actions"><a class="button primary" href="downloads/hard-power-card-${n}.png" download>Download PNG</a><a class="button" href="downloads/hard-power-card-${n}.png" target="_blank">Full size</a></div></div><div class="frame"><img loading="lazy" src="downloads/hard-power-card-${n}.png" alt="${d.name} business card"></div><p class="note">1050 × 600 px · 3.5 × 2 in at 300 ppi</p></article>`
  }).join('');
})();
