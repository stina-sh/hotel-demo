document.querySelectorAll('.reveal').forEach(el=>new IntersectionObserver(([e])=>{if(e.isIntersecting)e.target.classList.add('in')},{threshold:.12}).observe(el));
const dots=[...document.querySelectorAll('.catalog-links a')];
const sections=[...document.querySelectorAll('[data-page]')];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){dots.forEach(d=>d.classList.toggle('active',d.hash==='#'+e.target.id))}}),{threshold:.45});sections.forEach(s=>io.observe(s));
document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
