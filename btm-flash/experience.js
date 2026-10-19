(()=>{'use strict';
const all=(s,r=document)=>[...r.querySelectorAll(s)];const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const bar=document.createElement('div');bar.className='site-progress';bar.setAttribute('aria-hidden','true');document.body.append(bar);
let queued=false,extent=0,scrollTimer=0;
function updateProgress(){queued=false;bar.style.transform=`scaleX(${extent>0?Math.max(0,Math.min(1,scrollY/extent)):0})`}
function measureExtent(){extent=Math.max(0,document.documentElement.scrollHeight-innerHeight);updateProgress()}
addEventListener('scroll',()=>{
 if(!document.documentElement.classList.contains('is-scrolling'))document.documentElement.classList.add('is-scrolling');
 clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{scrollTimer=0;document.documentElement.classList.remove('is-scrolling')},160);
 if(!queued){queued=true;requestAnimationFrame(updateProgress)}
},{passive:true});
addEventListener('resize',measureExtent,{passive:true});new ResizeObserver(measureExtent).observe(document.body);measureExtent();
all('.expertise-card,.process-step').forEach((el,i)=>el.style.setProperty('--entry-order',String(i%5)));
if(!reduced){
 const scenes=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-entering');scenes.unobserve(e.target)}}),{threshold:.16});
 all('.expertise-grid,.process-track,.service-hero-art,.brand-section,.light-story,.human-photo').forEach(el=>scenes.observe(el));
 const motion=new IntersectionObserver(entries=>entries.forEach(e=>e.target.classList.toggle('motion-visible',e.isIntersecting)),{rootMargin:'100px',threshold:0});
 all('[data-diagram],.storm-stage,.process-track,.paris-circuit,.final-cta,.hero-media').forEach(el=>{el.classList.add('motion-observed');motion.observe(el)});
 const visibility=()=>document.documentElement.classList.toggle('motion-suspended',document.hidden);document.addEventListener('visibilitychange',visibility);visibility();
}
all('.review-stage').forEach(stage=>{
 const viewport=stage.querySelector('.review-viewport'),track=stage.querySelector('.review-track');if(!viewport||!track)return;
 const originals=all('.review-card',track),count=originals.length;if(!count)return;
 const quotes=originals.map(el=>el.querySelector('.review-typed').textContent),button=stage.querySelector('.review-pause');
 let explicitPause=false,focusPause=false,visible=false,offset=0,last=0,clock=0,entered=-1,loops=0,frame=0,pitch=0,seen=4;
 if(reduced){stage.dataset.motion='reduced';if(button)button.hidden=true;return;}
 stage.classList.add('motion-ready');stage.dataset.motion='continuous';
 for(const card of originals){const clone=card.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.inert=true;all('a,button',clone).forEach(el=>el.tabIndex=-1);track.append(clone)}
 const cards=all('.review-card',track),ink=cards.map(el=>el.querySelector('.review-typed')),stars=cards.map(el=>el.querySelector('.review-stars'));
 // Keep each complete quotation in the DOM. Only its local paint mask changes;
 // rewriting text while the track moves invalidates line layout on every letter.
 const reveals=ink.map(el=>{const wrapper=document.createElement('span');wrapper.className='review-ink-reveal';el.replaceWith(wrapper);wrapper.append(el);return wrapper});
 let layouts=[],states=cards.map(()=>({start:0,duration:0,active:false,chars:-1,phase:0}));
 function canRun(){return visible&&!document.hidden&&!explicitPause&&!focusPause&&pitch>0}
 function stop(){cancelAnimationFrame(frame);frame=0;last=0;stage.dataset.animationState='sleeping'}
 function wake(){if(canRun()&&!frame){last=0;frame=requestAnimationFrame(tick);stage.dataset.animationState='running'}}
 function measureInk(){
  layouts=reveals.map((wrapper,i)=>{
   const box=wrapper.getBoundingClientRect(),fragments=typeof ink[i].getClientRects==='function'?[...ink[i].getClientRects()]:[];
   const lines=fragments.filter(rect=>rect.width>0&&rect.height>0).map(rect=>({left:Math.max(0,rect.left-box.left),top:Math.max(0,rect.top-box.top),bottom:Math.max(0,rect.bottom-box.top),width:rect.width}));
   return {width:box.width,lines,total:lines.reduce((width,line)=>width+line.width,0)};
  });
  states.forEach(state=>state.chars=-1);render();
 }
 function measure(){pitch=originals[0].getBoundingClientRect().width+(parseFloat(getComputedStyle(track).gap)||0);seen=Math.max(1,Math.round(viewport.clientWidth/pitch));stage.dataset.visibleReviews=String(seen);measureInk();wake()}
 function begin(index,delay=0){const text=quotes[index%count];states[index]={start:clock+delay,duration:Math.max(2700,Math.min(4700,text.length*46+700)),active:true,chars:-1,phase:0};cards[index].classList.remove('is-writing','is-written');if(stars[index])stars[index].style.animation='none'}
 function paintInk(index,chars,length){
  const wrapper=reveals[index],layout=layouts[index];
  if(chars<=0){wrapper.style.clipPath='inset(0 100% 0 0)';return;}
  if(chars>=length){wrapper.style.clipPath='none';return;}
  if(!layout?.lines.length||!layout.total){wrapper.style.clipPath=`inset(0 ${100-chars/length*100}% 0 0)`;return;}
  let remaining=layout.total*chars/length,line=layout.lines[layout.lines.length-1];
  for(const current of layout.lines){line=current;if(remaining<=line.width)break;remaining-=line.width;}
  const x=Math.min(layout.width,line.left+remaining).toFixed(2),top=line.top.toFixed(2),bottom=line.bottom.toFixed(2),width=layout.width.toFixed(2);
  wrapper.style.clipPath=`polygon(0 0,${width}px 0,${width}px ${top}px,${x}px ${top}px,${x}px ${bottom}px,0 ${bottom}px)`;
 }
 function render(){states.forEach((s,i)=>{if(!s.active)return;const text=quotes[i%count],elapsed=clock-s.start,n=elapsed<0?0:Math.min(text.length,Math.floor(elapsed/s.duration*text.length));if(n!==s.chars){s.chars=n;paintInk(i,n,text.length)}if(elapsed>=0&&s.phase===0){s.phase=1;cards[i].classList.add('is-writing');if(stars[i])stars[i].style.animation=''}if(elapsed>=s.duration&&s.phase!==2){s.phase=2;cards[i].classList.remove('is-writing');cards[i].classList.add('is-written')}})}
 function tick(now){frame=0;if(!canRun()){stop();return;}const dt=last?Math.min(now-last,70):0;last=now;clock+=dt;offset+=dt/1000*.24;
  if(offset>=count){offset-=count;loops++;for(let i=0;i<count;i++){states[i]={...states[i+count],chars:-1};cards[i].className=cards[i+count].className;}}
  const first=Math.floor(offset),next=Math.min(cards.length-1,first+seen),serial=loops*count+first;if(serial!==entered){entered=serial;begin(next)}
  track.style.transform=`translate3d(${-offset*pitch}px,0,0)`;render();frame=requestAnimationFrame(tick);
 }
 measure();new ResizeObserver(measure).observe(viewport);document.fonts?.ready.then(measure);for(let i=0;i<Math.min(seen,count);i++)begin(i,i*540);
 new IntersectionObserver(es=>{visible=es[0].isIntersecting;if(visible)wake();else stop()},{threshold:.15}).observe(stage);
 button?.addEventListener('click',()=>{explicitPause=!explicitPause;button.textContent=explicitPause?'Reprendre le défilement':'Mettre les avis en pause';button.setAttribute('aria-pressed',String(explicitPause));if(explicitPause)stop();else wake()});
 track.addEventListener('focusin',e=>{focusPause=true;stop();const card=e.target.closest('.review-card');if(card){offset=Number(card.dataset.reviewId)||0;track.style.transform=`translate3d(${-offset*pitch}px,0,0)`;states.forEach(s=>{s.active=true;s.duration=Math.max(1,s.duration);s.start=clock-s.duration});render()}});
 track.addEventListener('focusout',e=>{if(!track.contains(e.relatedTarget)){focusPause=false;wake()}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else wake()});addEventListener('pagehide',stop);addEventListener('pageshow',()=>{measure();wake()});
});
})();
