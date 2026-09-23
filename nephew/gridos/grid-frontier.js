document.querySelector('[data-print]')?.addEventListener('click',()=>print());
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const counters=[...document.querySelectorAll('[data-count]')];
if(reduce){
  counters.forEach(el=>el.textContent=el.dataset.count);
  document.querySelectorAll('[data-animate-chart]').forEach(el=>el.classList.add('in-view'));
}else{
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    entry.target.classList.add('in-view');
    entry.target.animate([{opacity:0,transform:'translateY(22px)'},{opacity:1,transform:'none'}],{duration:650,easing:'cubic-bezier(.16,1,.3,1)',fill:'both'});
    io.unobserve(entry.target);
  }),{threshold:.12});
  document.querySelectorAll('.gf-card,.gf-section>header,.gf-benchmark').forEach(el=>io.observe(el));
  counters.forEach(el=>{let n=0,max=Number(el.dataset.count);const tick=()=>{n=Math.min(max,n+1);el.textContent=n;if(n<max)setTimeout(tick,95)};tick()});
}
