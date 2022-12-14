/* eslint-disable no-bitwise */
import { ByteBuffer } from '../../src/classes/ByteBuffer';

test('get uint', () => {
  const buffer = ByteBuffer.from([0xfe, 0xdc, 0xba, 0x98]);

  expect(buffer.getUint8(0)).toBe(0xfe);
  expect(buffer.getUint16LE(0)).toBe(0xdcfe);
  expect(buffer.getUint16BE(0)).toBe(0xfedc);
  expect(buffer.getUint32LE(0)).toBe(0x98badcfe);
  expect(buffer.getUint32BE(0)).toBe(0xfedcba98);

  expect(() => buffer.getUint8(-1)).toThrowError();
  expect(() => buffer.getUint16LE(-1)).toThrowError();
  expect(() => buffer.getUint16BE(-1)).toThrowError();
  expect(() => buffer.getUint32LE(-1)).toThrowError();
  expect(() => buffer.getUint32BE(-1)).toThrowError();

  expect(() => buffer.getUint8(4)).toThrowError();
  expect(() => buffer.getUint16LE(3)).toThrowError();
  expect(() => buffer.getUint16BE(3)).toThrowError();
  expect(() => buffer.getUint32LE(1)).toThrowError();
  expect(() => buffer.getUint32BE(1)).toThrowError();
});

test('get int', () => {
  const buffer = ByteBuffer.from([0xfe, 0xdc, 0xba, 0x98]);

  expect(buffer.getInt8(0)).toBe(0xfe - 0x100);
  expect(buffer.getInt16LE(0)).toBe(0xdcfe - 0x10000);
  expect(buffer.getInt16BE(0)).toBe(0xfedc - 0x10000);
  expect(buffer.getInt32LE(0)).toBe(0x98badcfe - 0x100000000);
  expect(buffer.getInt32BE(0)).toBe(0xfedcba98 - 0x100000000);

  expect(() => buffer.getInt8(-1)).toThrowError();
  expect(() => buffer.getInt16LE(-1)).toThrowError();
  expect(() => buffer.getInt16BE(-1)).toThrowError();
  expect(() => buffer.getInt32LE(-1)).toThrowError();
  expect(() => buffer.getInt32BE(-1)).toThrowError();

  expect(() => buffer.getInt8(4)).toThrowError();
  expect(() => buffer.getInt16LE(3)).toThrowError();
  expect(() => buffer.getInt16BE(3)).toThrowError();
  expect(() => buffer.getInt32LE(1)).toThrowError();
  expect(() => buffer.getInt32BE(1)).toThrowError();
});

test('set', () => {
  expect(ByteBuffer.from([0]).setInt8(0, 0x12).toArrayForDebug()).toEqual([
    0x12
  ]);
  expect(
    ByteBuffer.from([0, 0]).setInt16LE(0, 0x1234).toArrayForDebug()
  ).toEqual([0x34, 0x12]);
  expect(
    ByteBuffer.from([0, 0]).setInt16BE(0, 0x1234).toArrayForDebug()
  ).toEqual([0x12, 0x34]);
  expect(
    ByteBuffer.from([0, 0, 0, 0]).setInt32LE(0, 0x12345678).toArrayForDebug()
  ).toEqual([0x78, 0x56, 0x34, 0x12]);
  expect(
    ByteBuffer.from([0, 0, 0, 0]).setInt32BE(0, 0x12345678).toArrayForDebug()
  ).toEqual([0x12, 0x34, 0x56, 0x78]);

  const buffer = ByteBuffer.from([0, 1, 2, 3]);

  expect(() => buffer.setInt8(-1, 42)).toThrowError();
  expect(() => buffer.setInt16LE(-1, 42)).toThrowError();
  expect(() => buffer.setInt16BE(-1, 42)).toThrowError();
  expect(() => buffer.setInt32LE(-1, 42)).toThrowError();
  expect(() => buffer.setInt32BE(-1, 42)).toThrowError();

  expect(() => buffer.setInt8(4, 42)).toThrowError();
  expect(() => buffer.setInt16LE(3, 42)).toThrowError();
  expect(() => buffer.setInt16BE(3, 42)).toThrowError();
  expect(() => buffer.setInt32LE(1, 42)).toThrowError();
  expect(() => buffer.setInt32BE(1, 42)).toThrowError();

  expect(buffer.toArrayForDebug()).toEqual([0, 1, 2, 3]);
});

test('set (round to 8bit)', () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0]);

  expect(buffer.setInt8(0, 0x123).getUint8(0)).toBe(0x23);
  expect(buffer.setInt16LE(0, 0x12345).getUint16LE(0)).toBe(0x2345);
  expect(buffer.setInt16BE(0, 0x12345).getUint16BE(0)).toBe(0x2345);
  expect(buffer.setInt32LE(0, 0x123456789).getUint32LE(0)).toBe(0x23456789);
  expect(buffer.setInt32BE(0, 0x123456789).getUint32BE(0)).toBe(0x23456789);
});

test('set (negative)', () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0]);

  expect(buffer.setInt8(0, -1).getUint8(0)).toBe(0xff);
  expect(buffer.setInt16LE(0, -1).getUint16LE(0)).toBe(0xffff);
  expect(buffer.setInt16BE(0, -1).getUint16BE(0)).toBe(0xffff);
  expect(buffer.setInt32LE(0, -1).getUint32LE(0)).toBe(0xffffffff);
  expect(buffer.setInt32BE(0, -1).getUint32BE(0)).toBe(0xffffffff);
});

test('read', () => {
  const buffer = ByteBuffer.from([
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d
  ]);

  expect(buffer.readUint8()).toBe(0x01);
  expect(buffer.readUint16LE()).toBe(0x0302);
  expect(buffer.readUint16BE()).toBe(0x0405);
  expect(buffer.readUint32LE()).toBe(0x09080706);
  expect(buffer.readUint32BE()).toBe(0x0a0b0c0d);

  expect(() => buffer.readUint8()).toThrowError();

  buffer.rewind();
  expect(buffer.readUint8()).toBe(0x01);
  expect(buffer.readUint16LE()).toBe(0x0302);
  expect(buffer.readUint16BE()).toBe(0x0405);
  expect(buffer.readUint32LE()).toBe(0x09080706);
  expect(buffer.readUint32BE()).toBe(0x0a0b0c0d);

  buffer.seekTo(1);
  expect(buffer.readUint8()).toBe(0x02);
  expect(buffer.readUint16LE()).toBe(0x0403);
  expect(buffer.readUint16BE()).toBe(0x0506);
  expect(buffer.readUint32LE()).toBe(0x0a090807);
});

test('write', () => {
  const buffer = ByteBuffer.from([
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00
  ]);

  buffer.writeInt8(0x01);
  buffer.writeInt16LE(0x0302);
  buffer.writeInt16BE(0x0405);
  buffer.writeInt32LE(0x09080706);
  buffer.writeInt32BE(0x0a0b0c0d);

  expect(buffer.toArrayForDebug()).toEqual([
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d
  ]);

  expect(() => buffer.writeInt8(0x0e)).toThrowError();

  buffer.rewind();
  buffer.writeInt8(0x02);
  buffer.writeInt16LE(0x0403);
  buffer.writeInt16BE(0x0506);
  buffer.writeInt32LE(0x0a090807);
  buffer.writeInt32BE(0x0b0c0d0e);

  expect(buffer.toArrayForDebug()).toEqual([
    0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e
  ]);

  buffer.seekTo(1);
  buffer.writeInt8(0x02);
  buffer.writeInt16LE(0x0403);
  buffer.writeInt16BE(0x0506);
  buffer.writeInt32LE(0x0a090807);

  expect(buffer.toArrayForDebug()).toEqual([
    0x02, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0c, 0x0d, 0x0e
  ]);
});

test('seek, position', () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0]);

  expect(buffer.seekTo(2).position).toBe(2);
  expect(buffer.seekBy(1).position).toBe(3);
  expect(buffer.seekBy(-2).position).toBe(1);

  expect(() => buffer.seekTo(-1)).toThrowError();
  expect(() => buffer.seekTo(4)).toThrowError();

  expect(() => buffer.seekBy(-2)).toThrowError();
  expect(() => buffer.seekBy(3)).toThrowError();

  expect(buffer.rewind().position).toBe(0);
});

test('slice', () => {
  const buffer = ByteBuffer.from([0, 1, 2, 3, 4, 5, 6, 7]);

  expect(buffer.slice()).not.toBe(buffer);
  expect(buffer.slice().toArrayForDebug()).toEqual(buffer.toArrayForDebug());

  expect(buffer.slice(4).toArrayForDebug()).toEqual([4, 5, 6, 7]);
  expect(buffer.slice(4, 6).toArrayForDebug()).toEqual([4, 5]);
});

test('fill', () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0]);

  expect(buffer.fillInt8(0x12).toArrayForDebug()).toEqual([
    0x12, 0x12, 0x12, 0x12, 0x12
  ]);
  expect(buffer.fillInt8(0x13, 1).toArrayForDebug()).toEqual([
    0x12, 0x13, 0x13, 0x13, 0x13
  ]);
  expect(buffer.fillInt8(0x14, 1, 4).toArrayForDebug()).toEqual([
    0x12, 0x14, 0x14, 0x14, 0x13
  ]);

  expect(buffer.fillInt16LE(0x1516, 1).toArrayForDebug()).toEqual([
    0x12, 0x16, 0x15, 0x16, 0x15
  ]);
  expect(() => buffer.fillInt16LE(0x1516)).toThrowError();

  expect(buffer.fillInt16BE(0x1718, 1).toArrayForDebug()).toEqual([
    0x12, 0x17, 0x18, 0x17, 0x18
  ]);
  expect(() => buffer.fillInt16BE(0x1718)).toThrowError();

  expect(buffer.fillInt32LE(0x191a1b1c, 1).toArrayForDebug()).toEqual([
    0x12, 0x1c, 0x1b, 0x1a, 0x19
  ]);
  expect(() => buffer.fillInt32LE(0x191a1b1c)).toThrowError();

  expect(buffer.fillInt32BE(0x1d1e1f20, 1).toArrayForDebug()).toEqual([
    0x12, 0x1d, 0x1e, 0x1f, 0x20
  ]);
  expect(() => buffer.fillInt32BE(0x1d1e1f20)).toThrowError();
});

describe('data type', () => {
  const src = [0x12];

  if (typeof Uint8Array !== 'undefined') {
    test('Uint8Array', () => {
      const buffer = ByteBuffer.from(new Uint8Array(src));

      expect(buffer.getUint8(0)).toBe(0x12);
      expect(buffer.setInt8(0, 0x23).getUint8(0)).toBe(0x23);
    });
  }

  if (typeof Int8Array !== 'undefined') {
    test('Int8Array', () => {
      const buffer = ByteBuffer.from(new Int8Array(src));

      expect(buffer.getUint8(0)).toBe(0x12);
      expect(buffer.setInt8(0, 0x23).getUint8(0)).toBe(0x23);
    });
  }

  if (typeof Uint8ClampedArray !== 'undefined') {
    test('Uint8ClampedArray', () => {
      const buffer = ByteBuffer.from(new Uint8ClampedArray(src));

      expect(buffer.getUint8(0)).toBe(0x12);
      expect(buffer.setInt8(0, 0x23).getUint8(0)).toBe(0x23);
    });
  }

  if (typeof Uint16Array !== 'undefined') {
    test('Uint16Array', () => {
      const buffer = ByteBuffer.from(new Uint16Array(src));

      expect(buffer.getUint8(0)).toBe(0x12);
      expect(buffer.setInt8(0, 0x23).getUint8(0)).toBe(0x23);
    });
  }

  if (typeof Int16Array !== 'undefined') {
    test('Int16Array', () => {
      const buffer = ByteBuffer.from(new Int16Array(src));

      expect(buffer.getUint8(0)).toBe(0x12);
      expect(buffer.setInt8(0, 0x23).getUint8(0)).toBe(0x23);
    });
  }

  if (typeof Uint32Array !== 'undefined') {
    test('Uint32Array', () => {
      const buffer = ByteBuffer.from(new Uint32Array(src));

      expect(buffer.getUint8(0)).toBe(0x12);
      expect(buffer.setInt8(0, 0x23).getUint8(0)).toBe(0x23);
    });
  }

  if (typeof Int32Array !== 'undefined') {
    test('Int32Array', () => {
      const buffer = ByteBuffer.from(new Int32Array(src));

      expect(buffer.getUint8(0)).toBe(0x12);
      expect(buffer.setInt8(0, 0x23).getUint8(0)).toBe(0x23);
    });
  }

  if (typeof Buffer !== 'undefined') {
    test('Buffer', () => {
      const buffer = ByteBuffer.from(Buffer.from(src));

      expect(buffer.getUint8(0)).toBe(0x12);
      expect(buffer.setInt8(0, 0x23).getUint8(0)).toBe(0x23);
    });
  }
});
