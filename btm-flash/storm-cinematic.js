(()=>{'use strict';
const stage=document.querySelector('.storm-stage');
if(!stage)return;
const brands=[...stage.querySelectorAll('.storm-brand')];
if(!brands.length)return;
const canvas=stage.querySelector('.storm-canvas');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ctx=!reduced&&canvas?.getContext('2d',{alpha:true});
function light(brand,on){
 brand.classList.toggle('is-lit',on);
 brand.classList.remove('is-arriving','is-leaving','is-charged');
 brand.inert=!on;
 if(on)brand.removeAttribute('aria-hidden');else brand.setAttribute('aria-hidden','true');
}
if(!ctx){stage.classList.add('storm-static');brands.forEach(brand=>light(brand,true));return;}
stage.classList.add('storm-live');
let active=brands.slice(0,Math.min(6,brands.length)),cursor=active.length%brands.length;
brands.forEach(brand=>light(brand,active.includes(brand)));

const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
function noise(seed){const n=Math.sin(seed*12.9898+78.233)*43758.5453;return(n-Math.floor(n))*2-1;}
function channel(start,end,seed,spread,levels){
 let points=[start,end];
 for(let level=0;level<levels;level++){
  const next=[points[0]],amount=spread*Math.pow(.52,level);
  for(let i=0;i<points.length-1;i++){
   const a=points[i],b=points[i+1];
   next.push({x:(a.x+b.x)/2+noise(seed+level*71+i*19)*amount,y:(a.y+b.y)/2+noise(seed+level*89+i*23)*amount*.22},b);
  }
  points=next;
 }
 return points;
}
function path(context,points){context.beginPath();context.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++)context.lineTo(points[i].x,points[i].y);}
function stroke(context,points,color,width,blur,shadow){
 path(context,points);context.strokeStyle=color;context.lineWidth=width;context.shadowBlur=blur;context.shadowColor=shadow;context.stroke();
}

/* The photographed sky, logo motion and natural branched strokes are retained.
   Their glow is painted into a finite set of local textures during idle time;
   a discharge only composites those textures. No blur/path rendering, canvas
   allocation or layout measurements occur in an animation frame or turnover. */
const pool=brands.map(()=>({image:null,context:null,ready:false,branches:[]}));
let width=0,height=0,ratio=1,signature='',generation=0,ready=false;
let idleTask=0,idleIsNative=false,buildIndex=-1,buildStep=0,atlas=null;
function deferBuild(){
 if(idleTask||disposed)return;
 if(typeof requestIdleCallback==='function'){
  idleIsNative=true;idleTask=requestIdleCallback(()=>{idleTask=0;preparePart();},{timeout:120});
 }else{
  idleIsNative=false;idleTask=setTimeout(()=>{idleTask=0;preparePart();},18);
 }
}
function cancelBuild(){
 if(!idleTask)return;
 if(idleIsNative&&typeof cancelIdleCallback==='function')cancelIdleCallback(idleTask);else clearTimeout(idleTask);
 idleTask=0;
}
function makeAtlas(){
 atlas=document.createElement('canvas');atlas.width=160;atlas.height=128;
 const a=atlas.getContext('2d',{alpha:true});
 const glow=a.createRadialGradient(64,64,0,64,64,63);
 glow.addColorStop(0,'rgba(240,250,255,.92)');glow.addColorStop(.08,'rgba(190,229,255,.8)');glow.addColorStop(.25,'rgba(100,174,255,.34)');glow.addColorStop(1,'rgba(60,120,255,0)');
 a.fillStyle=glow;a.fillRect(0,0,128,128);
 const spark=a.createRadialGradient(144,16,0,144,16,14);
 spark.addColorStop(0,'rgba(255,255,255,1)');spark.addColorStop(.16,'rgba(193,230,255,.9)');spark.addColorStop(.52,'rgba(99,173,255,.32)');spark.addColorStop(1,'rgba(70,140,255,0)');
 a.fillStyle=spark;a.fillRect(128,0,32,32);
}
function prepareChannel(index){
 const item=pool[index],end=item.end;
 const start={x:clamp(end.x+noise(index+4)*width*.085,12,width-12),y:height*(.02+(index%3)*.025)};
 const distance=Math.hypot(end.x-start.x,end.y-start.y);
 item.start=start;item.path=channel(start,end,index*101+7,Math.min(48,distance*.13),6);
 item.branches=[];
 for(let b=0;b<7;b++){
  const origin=item.path[8+Math.round((noise(index*19+b*11+8)+1)*.5*45)];
  const length=distance*(.1+(noise(index*13+b*17)+1)*.095);
  const point={x:origin.x+(noise(index*43+b*5)<0?-1:1)*length*.65,y:origin.y+length*.66};
  item.branches.push({path:channel(origin,point,index*131+b*19+3,Math.min(28,length*.25),4),alpha:.24+(noise(index*7+b*21)+1)*.145});
 }
 const points=[...item.path,...item.branches.flatMap(branch=>branch.path)],margin=38;
 item.left=Math.floor(Math.min(...points.map(point=>point.x))-margin);
 item.top=Math.floor(Math.min(...points.map(point=>point.y))-margin);
 item.width=Math.ceil(Math.max(...points.map(point=>point.x))-item.left+margin);
 item.height=Math.ceil(Math.max(...points.map(point=>point.y))-item.top+margin);
 if(!item.image)item.image=document.createElement('canvas');
 item.image.width=Math.ceil(item.width*ratio);item.image.height=Math.ceil(item.height*ratio);
 item.context=item.image.getContext('2d',{alpha:true});
 item.context.setTransform(ratio,0,0,ratio,-item.left*ratio,-item.top*ratio);
 item.context.lineJoin='round';item.context.lineCap='round';item.context.globalCompositeOperation='screen';
}
function preparePart(){
 if(disposed)return;
 // One bounded preparation step per idle callback prevents a first-strike burst.
 if(buildIndex===-1){if(!atlas)makeAtlas();buildIndex=0;buildStep=0;deferBuild();return;}
 if(buildIndex>=pool.length){ready=true;schedule();return;}
 const item=pool[buildIndex];
 if(buildStep===0)prepareChannel(buildIndex);
 else if(buildStep===1)stroke(item.context,item.path,'rgba(72,111,255,.23)',11,27,'#476eff');
 else if(buildStep===2)stroke(item.context,item.path,'rgba(116,173,255,.88)',3.2,13,'#70b4ff');
 else if(buildStep===3)stroke(item.context,item.path,'rgba(244,250,255,1)',1.05,3,'#d8ecff');
 else if(buildStep===4){
  item.context.beginPath();
  for(const branch of item.branches){item.context.moveTo(branch.path[0].x,branch.path[0].y);for(let p=1;p<branch.path.length;p++)item.context.lineTo(branch.path[p].x,branch.path[p].y);}
  item.context.strokeStyle='rgba(116,173,255,.23)';item.context.lineWidth=1.8;item.context.shadowBlur=8;item.context.shadowColor='#6bafff';item.context.stroke();
 }else{
  for(const branch of item.branches)stroke(item.context,branch.path,`rgba(180,210,255,${branch.alpha})`,.75,0,'transparent');
  item.context=null;item.ready=true;buildIndex++;buildStep=-1;
 }
 buildStep++;deferBuild();
}

let visible=false,focused=false,disposed=false;
let timer=0,deadline=0,remaining=2200,resizeTimer=0,chargeTimer=0;
let phase='arrival',incoming=null,outgoing=null;
let raf=0,lastPaint=-Infinity;
const discharge={on:false,index:0,start:0};
const particles=Array.from({length:12},(_,index)=>{
 const angle=noise(index*71+13)*Math.PI,velocity=40+(noise(index*19+17)+1)*42;
 return{vx:Math.cos(angle)*velocity,vy:Math.sin(angle)*velocity,life:430+(noise(index*11+3)+1)*180,size:.65+(noise(index*37+7)+1)*.33};
});
function canRun(){return visible&&!document.hidden&&!focused&&!disposed&&ready;}
function clearDischarge(){
 if(raf)cancelAnimationFrame(raf);raf=0;discharge.on=false;lastPaint=-Infinity;
 ctx.clearRect(0,0,width,height);
}
function clearCharge(){clearTimeout(chargeTimer);chargeTimer=0;brands.forEach(brand=>brand.classList.remove('is-arriving','is-charged'));}
function pause(){
 if(timer){remaining=Math.max(0,deadline-performance.now());clearTimeout(timer);timer=0;}
 clearDischarge();clearCharge();
}
function schedule(delay=remaining){
 if(timer||!canRun()||(brands.length<=active.length&&phase==='arrival'))return;
 remaining=Math.max(0,delay);deadline=performance.now()+remaining;
 timer=setTimeout(()=>{timer=0;remaining=0;advance();},remaining);
}
function frame(now){
 raf=0;if(!canRun()||!discharge.on)return;
 if(now-lastPaint<31){raf=requestAnimationFrame(frame);return;}lastPaint=now;
 const age=now-discharge.start,item=pool[discharge.index];
 ctx.clearRect(0,0,width,height);
 if(age>1050){discharge.on=false;return;}
 const flash=Math.exp(-Math.pow((age-70)/82,2))*.8+Math.exp(-Math.pow((age-230)/66,2))*.45+Math.exp(-Math.pow((age-420)/160,2))*.21;
 const alpha=clamp(flash,0,1)*(1-age/1050),reveal=clamp(age/95,0,1);
 if(alpha>.003){
  ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=alpha;
  if(reveal<1){const front=item.start.y+(item.end.y-item.start.y)*reveal;ctx.beginPath();ctx.rect(item.left,item.top,item.width,Math.max(0,front-item.top));ctx.clip();}
  ctx.drawImage(item.image,item.left,item.top,item.width,item.height);ctx.restore();
 }
 if(age>65){
  const impactAge=age-65,radius=49+Math.min(1,impactAge/500)*24;
  ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=alpha*.75;
  ctx.drawImage(atlas,0,0,128,128,item.end.x-radius,item.end.y-radius,radius*2,radius*2);
  for(const particle of particles){
   if(impactAge>particle.life)continue;
   const t=impactAge/1000,x=item.end.x+particle.vx*t,y=item.end.y+particle.vy*t+40*t*t;
   const size=5*particle.size;ctx.globalAlpha=(1-impactAge/particle.life)*.8;
   ctx.drawImage(atlas,128,0,32,32,x-size,y-size,size*2,size*2);
  }
  ctx.restore();
 }
 raf=requestAnimationFrame(frame);
}
function strike(brand){
 discharge.on=true;discharge.index=brands.indexOf(brand);discharge.start=performance.now();lastPaint=-Infinity;
 if(!raf)raf=requestAnimationFrame(frame);
}
function charge(brand){
 clearCharge();brand.classList.add('is-charged','is-arriving');
 chargeTimer=setTimeout(()=>{chargeTimer=0;brand.classList.remove('is-charged','is-arriving');},780);
}
function advance(){
 if(!canRun())return;
 if(phase==='arrival'){
  incoming=null;
  for(let attempts=0;attempts<brands.length;attempts++){
   const candidate=brands[cursor%brands.length];cursor=(cursor+1)%brands.length;
   if(!active.includes(candidate)){incoming=candidate;break;}
  }
  if(!incoming){remaining=2200;return;}
  outgoing=active[0];strike(incoming);phase='arrival-impact';schedule(110);
 }else if(phase==='arrival-impact'){
  light(incoming,true);active.push(incoming);charge(incoming);phase='departure';schedule(1000);
 }else if(phase==='departure'){
  strike(outgoing);phase='departure-impact';schedule(110);
 }else{
  light(outgoing,false);outgoing.classList.add('is-leaving');
  active=active.filter(brand=>brand!==outgoing);charge(outgoing);
  incoming=null;outgoing=null;phase='arrival';schedule(980);
 }
}
function measure(){
 const rect=stage.getBoundingClientRect();
 // CSS entrance/floating transforms never alter these stable layout anchors.
 const points=brands.map(brand=>({x:brand.offsetLeft,y:brand.offsetTop}));
 const next=[rect.width,rect.height,...points.flatMap(point=>[point.x,point.y])].join(',');
 if(next===signature||rect.width<20||rect.height<20)return;
 signature=next;generation++;pause();cancelBuild();ready=false;
 width=rect.width;height=rect.height;ratio=Math.min(typeof devicePixelRatio==='number'?devicePixelRatio:1,1.5);
 canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
 pool.forEach((item,index)=>{item.ready=false;item.end=points[index];});
 buildIndex=-1;buildStep=0;deferBuild();
}
measure();
new ResizeObserver(()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{resizeTimer=0;measure();},130);}).observe(stage);
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else pause();},{threshold:.08}).observe(stage);
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();else schedule();});
stage.addEventListener('focusin',()=>{focused=true;pause();});
stage.addEventListener('focusout',event=>{if(!stage.contains(event.relatedTarget)){focused=false;schedule();}});
addEventListener('pagehide',()=>{disposed=true;pause();cancelBuild();clearTimeout(resizeTimer);resizeTimer=0;});
addEventListener('pageshow',()=>{disposed=false;measure();if(!ready)deferBuild();schedule();});
})();
