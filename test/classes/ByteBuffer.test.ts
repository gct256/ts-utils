/* eslint-disable no-bitwise */
import { ByteBuffer } from '../../src/classes/ByteBuffer';

test('get uint', () => {
  const buffer = ByteBuffer.from([0xfe, 0xdc, 0xba, 0x98]);

  expect(buffer.getUint8(0)).toBe(0xfe);
  expect(buffer.getUint16LE(0)).toBe(0xdcfe);
  expect(buffer.getUint16BE(0)).toBe(0xfedc);
  expect(buffer.getUint32LE(0)).toBe(0x98badcfe);
  expect(buffer.getUint32BE(0)).toBe(0xfedcba98);

  expect(() => buffer.getUint8(0.2)).toThrow();
  expect(() => buffer.getUint16LE(0.2)).toThrow();
  expect(() => buffer.getUint16BE(0.2)).toThrow();
  expect(() => buffer.getUint32LE(0.2)).toThrow();
  expect(() => buffer.getUint32BE(0.2)).toThrow();

  expect(() => buffer.getUint8(NaN)).toThrow();
  expect(() => buffer.getUint16LE(NaN)).toThrow();
  expect(() => buffer.getUint16BE(NaN)).toThrow();
  expect(() => buffer.getUint32LE(NaN)).toThrow();
  expect(() => buffer.getUint32BE(NaN)).toThrow();

  expect(() => buffer.getUint8(-1)).toThrow();
  expect(() => buffer.getUint16LE(-1)).toThrow();
  expect(() => buffer.getUint16BE(-1)).toThrow();
  expect(() => buffer.getUint32LE(-1)).toThrow();
  expect(() => buffer.getUint32BE(-1)).toThrow();

  expect(() => buffer.getUint8(4)).toThrow();
  expect(() => buffer.getUint16LE(3)).toThrow();
  expect(() => buffer.getUint16BE(3)).toThrow();
  expect(() => buffer.getUint32LE(1)).toThrow();
  expect(() => buffer.getUint32BE(1)).toThrow();
});

test('get int', () => {
  const buffer = ByteBuffer.from([
    0xfe, 0xdc, 0xba, 0x98, 0x12, 0x34, 0x56, 0x78
  ]);

  expect(buffer.getInt8(0)).toBe(0xfe - 0x100);
  expect(buffer.getInt16LE(0)).toBe(0xdcfe - 0x10000);
  expect(buffer.getInt16BE(0)).toBe(0xfedc - 0x10000);
  expect(buffer.getInt32LE(0)).toBe(0x98badcfe - 0x100000000);
  expect(buffer.getInt32BE(0)).toBe(0xfedcba98 - 0x100000000);

  expect(buffer.getInt8(4)).toBe(0x12);
  expect(buffer.getInt16LE(4)).toBe(0x3412);
  expect(buffer.getInt16BE(4)).toBe(0x1234);
  expect(buffer.getInt32LE(4)).toBe(0x78563412);
  expect(buffer.getInt32BE(4)).toBe(0x12345678);

  expect(() => buffer.getInt8(-1)).toThrow();
  expect(() => buffer.getInt16LE(-1)).toThrow();
  expect(() => buffer.getInt16BE(-1)).toThrow();
  expect(() => buffer.getInt32LE(-1)).toThrow();
  expect(() => buffer.getInt32BE(-1)).toThrow();

  expect(() => buffer.getInt8(8)).toThrow();
  expect(() => buffer.getInt16LE(7)).toThrow();
  expect(() => buffer.getInt16BE(7)).toThrow();
  expect(() => buffer.getInt32LE(5)).toThrow();
  expect(() => buffer.getInt32BE(5)).toThrow();
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

  expect(() => buffer.setInt8(-1, 42)).toThrow();
  expect(() => buffer.setInt16LE(-1, 42)).toThrow();
  expect(() => buffer.setInt16BE(-1, 42)).toThrow();
  expect(() => buffer.setInt32LE(-1, 42)).toThrow();
  expect(() => buffer.setInt32BE(-1, 42)).toThrow();

  expect(() => buffer.setInt8(4, 42)).toThrow();
  expect(() => buffer.setInt16LE(3, 42)).toThrow();
  expect(() => buffer.setInt16BE(3, 42)).toThrow();
  expect(() => buffer.setInt32LE(1, 42)).toThrow();
  expect(() => buffer.setInt32BE(1, 42)).toThrow();

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

test('read uint', () => {
  const buffer = ByteBuffer.from([
    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d
  ]);

  expect(buffer.readUint8()).toBe(0x01);
  expect(buffer.readUint16LE()).toBe(0x0302);
  expect(buffer.readUint16BE()).toBe(0x0405);
  expect(buffer.readUint32LE()).toBe(0x09080706);
  expect(buffer.readUint32BE()).toBe(0x0a0b0c0d);

  expect(() => buffer.readUint8()).toThrow();

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

test('read int', () => {
  const buffer = ByteBuffer.from([
    0xff, 0xfe, 0xfd, 0xfc, 0xfb, 0xfa, 0xf9, 0xf8, 0xf7, 0xf6, 0xf5, 0xf4, 0xf3
  ]);

  expect(buffer.readInt8()).toBe(0xff - 0x100);
  expect(buffer.readInt16LE()).toBe(0xfdfe - 0x10000);
  expect(buffer.readInt16BE()).toBe(0xfcfb - 0x10000);
  expect(buffer.readInt32LE()).toBe(0xf7f8f9fa - 0x100000000);
  expect(buffer.readInt32BE()).toBe(0xf6f5f4f3 - 0x100000000);

  expect(() => buffer.readInt8()).toThrow();

  buffer.rewind();
  expect(buffer.readInt8()).toBe(0xff - 0x100);
  expect(buffer.readInt16LE()).toBe(0xfdfe - 0x10000);
  expect(buffer.readInt16BE()).toBe(0xfcfb - 0x10000);
  expect(buffer.readInt32LE()).toBe(0xf7f8f9fa - 0x100000000);
  expect(buffer.readInt32BE()).toBe(0xf6f5f4f3 - 0x100000000);

  buffer.seekTo(1);
  expect(buffer.readInt8()).toBe(0xfe - 0x100);
  expect(buffer.readInt16LE()).toBe(0xfcfd - 0x10000);
  expect(buffer.readInt16BE()).toBe(0xfbfa - 0x10000);
  expect(buffer.readInt32LE()).toBe(0xf6f7f8f9 - 0x100000000);
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

  expect(() => buffer.writeInt8(0x0e)).toThrow();

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

  expect(() => buffer.seekTo(-1)).toThrow();
  expect(() => buffer.seekTo(4)).toThrow();

  expect(() => buffer.seekBy(-2)).toThrow();
  expect(() => buffer.seekBy(3)).toThrow();

  expect(buffer.rewind().position).toBe(0);
});

test('slice', () => {
  const buffer = ByteBuffer.from([0, 1, 2, 3, 4, 5, 6, 7]);

  expect(buffer.slice()).not.toBe(buffer);
  expect(buffer.slice().toArrayForDebug()).toEqual(buffer.toArrayForDebug());

  expect(buffer.slice(4).toArrayForDebug()).toEqual([4, 5, 6, 7]);
  expect(buffer.slice(4, 6).toArrayForDebug()).toEqual([4, 5]);
});

test('fillInt8', () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  expect(buffer.fillInt8(0x12).toArrayForDebug()).toEqual([
    0x12, 0x12, 0x12, 0x12, 0x12, 0x12, 0x12, 0x12, 0x12
  ]);
  expect(buffer.fillInt8(0x13, 1).toArrayForDebug()).toEqual([
    0x12, 0x13, 0x13, 0x13, 0x13, 0x13, 0x13, 0x13, 0x13
  ]);
  expect(buffer.fillInt8(0x14, 1, 5).toArrayForDebug()).toEqual([
    0x12, 0x14, 0x14, 0x14, 0x14, 0x13, 0x13, 0x13, 0x13
  ]);
  expect(buffer.fillInt8(0x15, 5, 1).toArrayForDebug()).toEqual([
    0x12, 0x14, 0x14, 0x14, 0x14, 0x13, 0x13, 0x13, 0x13
  ]);
});

test('fillInt16LE', () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  expect(buffer.fillInt16LE(0x1234, 1).toArrayForDebug()).toEqual([
    0x00, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12
  ]);
  expect(buffer.fillInt16LE(0x5678, 1, 5).toArrayForDebug()).toEqual([
    0x00, 0x78, 0x56, 0x78, 0x56, 0x34, 0x12, 0x34, 0x12
  ]);
  expect(buffer.fillInt16LE(0x9abc, 5, 1).toArrayForDebug()).toEqual([
    0x00, 0x78, 0x56, 0x78, 0x56, 0x34, 0x12, 0x34, 0x12
  ]);
  expect(() => buffer.fillInt16LE(0xdef0)).toThrow();
  expect(buffer.toArrayForDebug()).toEqual([
    0x00, 0x78, 0x56, 0x78, 0x56, 0x34, 0x12, 0x34, 0x12
  ]);
});

test('fillInt16BE', () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  expect(buffer.fillInt16BE(0x1234, 1).toArrayForDebug()).toEqual([
    0x00, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34, 0x12, 0x34
  ]);
  expect(buffer.fillInt16BE(0x5678, 1, 5).toArrayForDebug()).toEqual([
    0x00, 0x56, 0x78, 0x56, 0x78, 0x12, 0x34, 0x12, 0x34
  ]);
  expect(buffer.fillInt16BE(0x9abc, 5, 1).toArrayForDebug()).toEqual([
    0x00, 0x56, 0x78, 0x56, 0x78, 0x12, 0x34, 0x12, 0x34
  ]);
  expect(() => buffer.fillInt16BE(0xdef0)).toThrow();
  expect(buffer.toArrayForDebug()).toEqual([
    0x00, 0x56, 0x78, 0x56, 0x78, 0x12, 0x34, 0x12, 0x34
  ]);
});

test('fillInt32LE', () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  expect(buffer.fillInt32LE(0x12345678, 1).toArrayForDebug()).toEqual([
    0x00, 0x78, 0x56, 0x34, 0x12, 0x78, 0x56, 0x34, 0x12, 0x78, 0x56, 0x34, 0x12
  ]);
  expect(buffer.fillInt32LE(0x9abcdef0, 1, 9).toArrayForDebug()).toEqual([
    0x00, 0xf0, 0xde, 0xbc, 0x9a, 0xf0, 0xde, 0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12
  ]);
  expect(buffer.fillInt32LE(0x9abcdef0, 9, 1).toArrayForDebug()).toEqual([
    0x00, 0xf0, 0xde, 0xbc, 0x9a, 0xf0, 0xde, 0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12
  ]);
  expect(() => buffer.fillInt32LE(0x87654321)).toThrow();
  expect(buffer.toArrayForDebug()).toEqual([
    0x00, 0xf0, 0xde, 0xbc, 0x9a, 0xf0, 0xde, 0xbc, 0x9a, 0x78, 0x56, 0x34, 0x12
  ]);
});

test('fillInt32BE', () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  expect(buffer.fillInt32BE(0x12345678, 1).toArrayForDebug()).toEqual([
    0x00, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78, 0x12, 0x34, 0x56, 0x78
  ]);
  expect(buffer.fillInt32BE(0x9abcdef0, 1, 9).toArrayForDebug()).toEqual([
    0x00, 0x9a, 0xbc, 0xde, 0xf0, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78
  ]);
  expect(buffer.fillInt32BE(0x9abcdef0, 9, 1).toArrayForDebug()).toEqual([
    0x00, 0x9a, 0xbc, 0xde, 0xf0, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78
  ]);
  expect(() => buffer.fillInt32BE(0x87654321)).toThrow();
  expect(buffer.toArrayForDebug()).toEqual([
    0x00, 0x9a, 0xbc, 0xde, 0xf0, 0x9a, 0xbc, 0xde, 0xf0, 0x12, 0x34, 0x56, 0x78
  ]);
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
