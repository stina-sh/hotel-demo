(() => {
 const pages=[...document.querySelectorAll('.page')];
 const current=document.querySelector('[data-current-page]');let active=0;
 pages.forEach((page,i)=>{page.id=`page-${String(i+1).padStart(2,'0')}`;page.dataset.pageNumber=String(i+1);const footer=document.createElement('footer');footer.className='folio';footer.innerHTML=`<span>RedShades · Technical catalog</span><span>${String(i+1).padStart(2,'0')}</span>`;page.append(footer);});
 const observer=new IntersectionObserver(entries=>{const best=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(best){active=pages.indexOf(best.target);current.textContent=`${String(active+1).padStart(2,'0')} / ${pages.length}`;}},{threshold:[.2,.45,.7]});pages.forEach(p=>observer.observe(p));
 const move=delta=>{active=Math.max(0,Math.min(pages.length-1,active+delta));pages[active].scrollIntoView();history.replaceState(null,'',`#${pages[active].id}`);};
 document.querySelector('[data-prev]')?.addEventListener('click',()=>move(-1));document.querySelector('[data-next]')?.addEventListener('click',()=>move(1));document.querySelector('[data-print]')?.addEventListener('click',()=>print());
 document.addEventListener('keydown',e=>{if(e.target.closest('input,textarea,button,a'))return;if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();move(-1);}if(['ArrowRight','PageDown'].includes(e.key)){e.preventDefault();move(1);}});
 document.body.dataset.pageCount=String(pages.length);
 const resize=()=>document.documentElement.style.setProperty('--reader-scale',String(Math.min(1,(document.documentElement.clientWidth-20)/793.7008)));
 resize();addEventListener('resize',resize);
})();
