'use strict';
const viewer=document.getElementById('necklace'),status=document.getElementById('viewer-status'),rotate=document.getElementById('rotate');
viewer.addEventListener('load',()=>{status.textContent='3D necklace ready.'});
viewer.addEventListener('error',()=>{status.textContent='The 3D model could not load. You can still view and download the rendered images below.'});
rotate.addEventListener('click',()=>{const enabled=!viewer.hasAttribute('auto-rotate');viewer.toggleAttribute('auto-rotate',enabled);rotate.setAttribute('aria-pressed',String(enabled));rotate.textContent=enabled?'Stop rotation':'Auto-rotate'});
document.getElementById('reset').addEventListener('click',()=>{viewer.cameraOrbit='0deg 65deg auto';viewer.cameraTarget='auto auto auto';viewer.fieldOfView='auto';viewer.removeAttribute('auto-rotate');rotate.setAttribute('aria-pressed','false');rotate.textContent='Auto-rotate'});
setTimeout(()=>{if(!customElements.get('model-viewer'))status.textContent='The 3D viewer is unavailable. The latest renders and CAD download are available below.'},15000);
