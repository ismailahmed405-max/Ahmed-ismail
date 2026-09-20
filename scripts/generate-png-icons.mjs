import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, r = 5, g = 150, b = 105) {
  // Simple uncompressed or deflate PNG generator
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function createChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    const combined = Buffer.concat([typeBuf, data]);

    // CRC32 calculation
    let c = ~0;
    for (let i = 0; i < combined.length; i++) {
      c = (c >>> 8) ^ table[(c ^ combined[i]) & 0xff];
    }
    c = ~c;
    crcBuf.writeInt32BE(c, 0);

    return Buffer.concat([len, typeBuf, data, crcBuf]);
  }

  // Precompute CRC32 table
  const table = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // Bit depth: 8
  ihdr[9] = 2; // Color type: 2 (RGB)
  ihdr[10] = 0; // Compression
  ihdr[11] = 0; // Filter
  ihdr[12] = 0; // Interlace

  const ihdrChunk = createChunk('IHDR', ihdr);

  // Scanlines (height rows, each starting with filter byte 0, then width * 3 bytes)
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(rowSize * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * 0.42;
  const innerRadius = width * 0.22;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter byte 0 (None)
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Check if inside center cross / heart
      const isCross = (Math.abs(dx) < width * 0.06 && Math.abs(dy) < height * 0.18) ||
                      (Math.abs(dy) < height * 0.06 && Math.abs(dx) < width * 0.18);

      if (dist < radius) {
        if (isCross) {
          // White medical cross
          rawData[pxOffset] = 255;
          rawData[pxOffset + 1] = 255;
          rawData[pxOffset + 2] = 255;
        } else if (dist < innerRadius) {
          // Rose/Red heart center
          rawData[pxOffset] = 244;
          rawData[pxOffset + 1] = 63;
          rawData[pxOffset + 2] = 94;
        } else {
          // Emerald green background
          rawData[pxOffset] = r;
          rawData[pxOffset + 1] = g;
          rawData[pxOffset + 2] = b;
        }
      } else {
        // Darker emerald border/background
        rawData[pxOffset] = Math.max(0, r - 30);
        rawData[pxOffset + 1] = Math.max(0, g - 30);
        rawData[pxOffset + 2] = Math.max(0, b - 30);
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressedData);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate icons
fs.writeFileSync('public/pwa-192x192.png', createPNG(192, 192));
fs.writeFileSync('public/pwa-512x512.png', createPNG(512, 512));
fs.writeFileSync('public/pwa-maskable-512x512.png', createPNG(512, 512, 4, 120, 87));
fs.writeFileSync('public/apple-touch-icon.png', createPNG(180, 180));

console.log('Successfully generated valid PWA and iOS PNG icons.');
