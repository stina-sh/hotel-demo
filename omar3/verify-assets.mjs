import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {inflateRawSync} from 'node:zlib';

const root = path.dirname(new URL(import.meta.url).pathname);
const check = (condition, message) => { if (!condition) throw new Error(message); };
const sha = buffer => crypto.createHash('sha256').update(buffer).digest('hex');

function pngInfo(file) {
  const buffer = fs.readFileSync(file);
  check(buffer.subarray(1, 4).toString() === 'PNG', `${file}: invalid PNG`);
  const width = buffer.readUInt32BE(16), height = buffer.readUInt32BE(20), colorType = buffer[25];
  let density = null, offset = 8;
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset), type = buffer.toString('ascii', offset + 4, offset + 8);
    if (type === 'pHYs') density = [buffer.readUInt32BE(offset + 8), buffer.readUInt32BE(offset + 12), buffer[offset + 16]];
    offset += length + 12;
  }
  return {buffer, width, height, colorType, density};
}

function zipEntries(buffer) {
  let eocd = -1;
  for (let index = buffer.length - 22; index >= Math.max(0, buffer.length - 65557); index--) {
    if (buffer.readUInt32LE(index) === 0x06054b50) { eocd = index; break; }
  }
  check(eocd >= 0, 'ZIP end record missing');
  const count = buffer.readUInt16LE(eocd + 10), entries = new Map();
  let offset = buffer.readUInt32LE(eocd + 16);
  for (let index = 0; index < count; index++) {
    check(buffer.readUInt32LE(offset) === 0x02014b50, 'ZIP central record missing');
    const method = buffer.readUInt16LE(offset + 10), compressed = buffer.readUInt32LE(offset + 20);
    const nameLength = buffer.readUInt16LE(offset + 28), extraLength = buffer.readUInt16LE(offset + 30), commentLength = buffer.readUInt16LE(offset + 32);
    const localOffset = buffer.readUInt32LE(offset + 42), name = buffer.toString('utf8', offset + 46, offset + 46 + nameLength);
    check(buffer.readUInt32LE(localOffset) === 0x04034b50, `${name}: ZIP local record missing`);
    const localName = buffer.readUInt16LE(localOffset + 26), localExtra = buffer.readUInt16LE(localOffset + 28);
    const start = localOffset + 30 + localName + localExtra, payload = buffer.subarray(start, start + compressed);
    check(method === 0 || method === 8, `${name}: unsupported ZIP method`);
    entries.set(name, method === 0 ? payload : inflateRawSync(payload));
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

const context = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'designs.js'), 'utf8'), context);
const designs = context.window.CARD_DESIGNS;
check(designs.length === 50, 'design manifest must contain 50 options');
check(new Set(designs.map(item => item.id)).size === 50, 'option IDs must be unique');
check(new Set(designs.map(item => item.name)).size === 50, 'option names must be unique');
check(new Set(designs.map(item => JSON.stringify(item))).size === 50, 'design signatures must be unique');

const frontHashes = new Set(), backHashes = new Set();
for (let id = 1; id <= 50; id++) {
  const number = String(id).padStart(2, '0');
  for (const side of ['front', 'back']) {
    const name = `hard-power-card-${number}-${side}.png`, file = path.join(root, 'print', name);
    const info = pngInfo(file);
    check(info.width === 1125 && info.height === 675, `${name}: wrong bleed dimensions`);
    check(info.colorType === 2 || info.colorType === 6, `${name}: must be RGB/RGBA`);
    check(JSON.stringify(info.density) === JSON.stringify([11811, 11811, 1]), `${name}: not 300 PPI`);
    (side === 'front' ? frontHashes : backHashes).add(sha(info.buffer));
    check(fs.statSync(path.join(root, 'thumbs', `hard-power-card-${number}-${side}.webp`)).size > 0, `${name}: missing thumbnail`);
  }
  const zip = path.join(root, 'packages', `hard-power-card-${number}.zip`);
  const entries = zipEntries(fs.readFileSync(zip));
  check(entries.size === 2, `${zip}: expected exactly two files`);
  for (const side of ['front', 'back']) {
    const name = `hard-power-card-${number}-${side}.png`;
    check(entries.has(name), `${zip}: missing ${name}`);
    const archived = entries.get(name);
    check(sha(archived) === sha(fs.readFileSync(path.join(root, 'print', name))), `${zip}: stale ${name}`);
  }
}
check(frontHashes.size === 50, 'front PNGs must all be unique');
check(backHashes.size === 50, 'back PNGs must all be unique');

const renderer = fs.readFileSync(path.join(root, 'duplex-render.js'), 'utf8');
for (const forbidden of ['executive identity', 'concept ', 'direction ', 'prompt ', 'commercial leadership']) {
  check(!renderer.toLowerCase().includes(forbidden), `forbidden client copy: ${forbidden}`);
}
check(renderer.includes("caps(label,x,y,29"), 'field labels fell below 7 pt');
check(renderer.includes("x,y+42+i*38,34"), 'contact values fell below 8 pt');
check(renderer.includes("size=252"), 'QR footprint fell below 21 mm');

console.log('PASS: 50 manifest records, 100 print PNGs, 100 thumbnails, 50 synchronized ZIPs, unique faces, 300 PPI, bleed dimensions, print-size floors, and copy guard.');
