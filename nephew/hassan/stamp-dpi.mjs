import fs from 'node:fs';
import path from 'node:path';

const downloads = new URL('./downloads/', import.meta.url);
const print = new URL('./print/', import.meta.url);
const table = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  table[n] = c >>> 0;
}
function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) c = table[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const name = Buffer.from(type, 'ascii');
  const out = Buffer.alloc(data.length + 12);
  out.writeUInt32BE(data.length, 0);
  name.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crc32(Buffer.concat([name, data])), data.length + 8);
  return out;
}
function stamp(file) {
  const png = fs.readFileSync(file);
  const signature = png.subarray(0, 8);
  const chunks = [];
  let offset = 8;
  while (offset < png.length) {
    const length = png.readUInt32BE(offset);
    const type = png.toString('ascii', offset + 4, offset + 8);
    const end = offset + length + 12;
    if (type !== 'pHYs') chunks.push(png.subarray(offset, end));
    offset = end;
  }
  const density = Buffer.alloc(9);
  density.writeUInt32BE(11811, 0);
  density.writeUInt32BE(11811, 4);
  density[8] = 1;
  chunks.splice(1, 0, chunk('pHYs', density));
  fs.writeFileSync(file, Buffer.concat([signature, ...chunks]));
}
for (let id = 1; id <= 50; id++) {
  const number = String(id).padStart(2, '0');
  stamp(path.join(downloads.pathname, `hard-power-card-${number}.png`));
  stamp(path.join(print.pathname, `hard-power-card-${number}-front.png`));
  stamp(path.join(print.pathname, `hard-power-card-${number}-back.png`));
}
console.log('Stamped 150 PNG files at 300 PPI.');
