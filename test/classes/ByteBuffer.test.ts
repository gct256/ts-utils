/* eslint-disable no-bitwise */

import { ByteBuffer } from "../../deno/classes/ByteBuffer.ts";
import { assertEquals, assertNotStrictEquals, assertThrows } from "../test-deps.ts";

Deno.test("get uint", () => {
  const buffer = ByteBuffer.from([0xfe, 0xdc, 0xba, 0x98]);

  assertEquals(
    buffer.getUint8(0),
    0xfe,
  );
  assertEquals(
    buffer.getUint16LE(0),
    0xdcfe,
  );
  assertEquals(
    buffer.getUint16BE(0),
    0xfedc,
  );
  assertEquals(
    buffer.getUint32LE(0),
    0x98badcfe,
  );
  assertEquals(
    buffer.getUint32BE(0),
    0xfedcba98,
  );

  assertThrows(() => buffer.getUint8(0.2));
  assertThrows(() => buffer.getUint16LE(0.2));
  assertThrows(() => buffer.getUint16BE(0.2));
  assertThrows(() => buffer.getUint32LE(0.2));
  assertThrows(() => buffer.getUint32BE(0.2));

  assertThrows(() => buffer.getUint8(NaN));
  assertThrows(() => buffer.getUint16LE(NaN));
  assertThrows(() => buffer.getUint16BE(NaN));
  assertThrows(() => buffer.getUint32LE(NaN));
  assertThrows(() => buffer.getUint32BE(NaN));

  assertThrows(() => buffer.getUint8(-1));
  assertThrows(() => buffer.getUint16LE(-1));
  assertThrows(() => buffer.getUint16BE(-1));
  assertThrows(() => buffer.getUint32LE(-1));
  assertThrows(() => buffer.getUint32BE(-1));

  assertThrows(() => buffer.getUint8(4));
  assertThrows(() => buffer.getUint16LE(3));
  assertThrows(() => buffer.getUint16BE(3));
  assertThrows(() => buffer.getUint32LE(1));
  assertThrows(() => buffer.getUint32BE(1));
});

Deno.test("get int", () => {
  const buffer = ByteBuffer.from([
    0xfe,
    0xdc,
    0xba,
    0x98,
    0x12,
    0x34,
    0x56,
    0x78,
  ]);

  assertEquals(
    buffer.getInt8(0),
    0xfe - 0x100,
  );
  assertEquals(
    buffer.getInt16LE(0),
    0xdcfe - 0x10000,
  );
  assertEquals(
    buffer.getInt16BE(0),
    0xfedc - 0x10000,
  );
  assertEquals(
    buffer.getInt32LE(0),
    0x98badcfe - 0x100000000,
  );
  assertEquals(
    buffer.getInt32BE(0),
    0xfedcba98 - 0x100000000,
  );

  assertEquals(
    buffer.getInt8(4),
    0x12,
  );
  assertEquals(
    buffer.getInt16LE(4),
    0x3412,
  );
  assertEquals(
    buffer.getInt16BE(4),
    0x1234,
  );
  assertEquals(
    buffer.getInt32LE(4),
    0x78563412,
  );
  assertEquals(
    buffer.getInt32BE(4),
    0x12345678,
  );

  assertThrows(() => buffer.getInt8(-1));
  assertThrows(() => buffer.getInt16LE(-1));
  assertThrows(() => buffer.getInt16BE(-1));
  assertThrows(() => buffer.getInt32LE(-1));
  assertThrows(() => buffer.getInt32BE(-1));

  assertThrows(() => buffer.getInt8(8));
  assertThrows(() => buffer.getInt16LE(7));
  assertThrows(() => buffer.getInt16BE(7));
  assertThrows(() => buffer.getInt32LE(5));
  assertThrows(() => buffer.getInt32BE(5));
});

Deno.test("set", () => {
  assertEquals(
    ByteBuffer.from([0]).setInt8(0, 0x12).toArrayForDebug(),
    [0x12],
  );
  assertEquals(
    ByteBuffer.from([0, 0]).setInt16LE(0, 0x1234).toArrayForDebug(),
    [0x34, 0x12],
  );
  assertEquals(
    ByteBuffer.from([0, 0]).setInt16BE(0, 0x1234).toArrayForDebug(),
    [0x12, 0x34],
  );
  assertEquals(
    ByteBuffer.from([0, 0, 0, 0]).setInt32LE(0, 0x12345678).toArrayForDebug(),
    [0x78, 0x56, 0x34, 0x12],
  );
  assertEquals(
    ByteBuffer.from([0, 0, 0, 0]).setInt32BE(0, 0x12345678).toArrayForDebug(),
    [0x12, 0x34, 0x56, 0x78],
  );

  const buffer = ByteBuffer.from([0, 1, 2, 3]);

  assertThrows(() => buffer.setInt8(-1, 42));
  assertThrows(() => buffer.setInt16LE(-1, 42));
  assertThrows(() => buffer.setInt16BE(-1, 42));
  assertThrows(() => buffer.setInt32LE(-1, 42));
  assertThrows(() => buffer.setInt32BE(-1, 42));

  assertThrows(() => buffer.setInt8(4, 42));
  assertThrows(() => buffer.setInt16LE(3, 42));
  assertThrows(() => buffer.setInt16BE(3, 42));
  assertThrows(() => buffer.setInt32LE(1, 42));
  assertThrows(() => buffer.setInt32BE(1, 42));

  assertEquals(
    buffer.toArrayForDebug(),
    [0, 1, 2, 3],
  );
});

Deno.test("set (round to 8bit)", () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0]);

  assertEquals(
    buffer.setInt8(0, 0x123).getUint8(0),
    0x23,
  );
  assertEquals(
    buffer.setInt16LE(0, 0x12345).getUint16LE(0),
    0x2345,
  );
  assertEquals(
    buffer.setInt16BE(0, 0x12345).getUint16BE(0),
    0x2345,
  );
  assertEquals(
    buffer.setInt32LE(0, 0x123456789).getUint32LE(0),
    0x23456789,
  );
  assertEquals(
    buffer.setInt32BE(0, 0x123456789).getUint32BE(0),
    0x23456789,
  );
});

Deno.test("set (negative)", () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0]);

  assertEquals(
    buffer.setInt8(0, -1).getUint8(0),
    0xff,
  );
  assertEquals(
    buffer.setInt16LE(0, -1).getUint16LE(0),
    0xffff,
  );
  assertEquals(
    buffer.setInt16BE(0, -1).getUint16BE(0),
    0xffff,
  );
  assertEquals(
    buffer.setInt32LE(0, -1).getUint32LE(0),
    0xffffffff,
  );
  assertEquals(
    buffer.setInt32BE(0, -1).getUint32BE(0),
    0xffffffff,
  );
});

Deno.test("read uint", () => {
  const buffer = ByteBuffer.from([
    0x01,
    0x02,
    0x03,
    0x04,
    0x05,
    0x06,
    0x07,
    0x08,
    0x09,
    0x0a,
    0x0b,
    0x0c,
    0x0d,
  ]);

  assertEquals(
    buffer.readUint8(),
    0x01,
  );
  assertEquals(
    buffer.readUint16LE(),
    0x0302,
  );
  assertEquals(
    buffer.readUint16BE(),
    0x0405,
  );
  assertEquals(
    buffer.readUint32LE(),
    0x09080706,
  );
  assertEquals(
    buffer.readUint32BE(),
    0x0a0b0c0d,
  );

  assertThrows(() => buffer.readUint8());

  buffer.rewind();
  assertEquals(
    buffer.readUint8(),
    0x01,
  );
  assertEquals(
    buffer.readUint16LE(),
    0x0302,
  );
  assertEquals(
    buffer.readUint16BE(),
    0x0405,
  );
  assertEquals(
    buffer.readUint32LE(),
    0x09080706,
  );
  assertEquals(
    buffer.readUint32BE(),
    0x0a0b0c0d,
  );

  buffer.seekTo(1);
  assertEquals(
    buffer.readUint8(),
    0x02,
  );
  assertEquals(
    buffer.readUint16LE(),
    0x0403,
  );
  assertEquals(
    buffer.readUint16BE(),
    0x0506,
  );
  assertEquals(
    buffer.readUint32LE(),
    0x0a090807,
  );
});

Deno.test("read int", () => {
  const buffer = ByteBuffer.from([
    0xff,
    0xfe,
    0xfd,
    0xfc,
    0xfb,
    0xfa,
    0xf9,
    0xf8,
    0xf7,
    0xf6,
    0xf5,
    0xf4,
    0xf3,
  ]);

  assertEquals(
    buffer.readInt8(),
    0xff - 0x100,
  );
  assertEquals(
    buffer.readInt16LE(),
    0xfdfe - 0x10000,
  );
  assertEquals(
    buffer.readInt16BE(),
    0xfcfb - 0x10000,
  );
  assertEquals(
    buffer.readInt32LE(),
    0xf7f8f9fa - 0x100000000,
  );
  assertEquals(
    buffer.readInt32BE(),
    0xf6f5f4f3 - 0x100000000,
  );

  assertThrows(() => buffer.readInt8());

  buffer.rewind();
  assertEquals(
    buffer.readInt8(),
    0xff - 0x100,
  );
  assertEquals(
    buffer.readInt16LE(),
    0xfdfe - 0x10000,
  );
  assertEquals(
    buffer.readInt16BE(),
    0xfcfb - 0x10000,
  );
  assertEquals(
    buffer.readInt32LE(),
    0xf7f8f9fa - 0x100000000,
  );
  assertEquals(
    buffer.readInt32BE(),
    0xf6f5f4f3 - 0x100000000,
  );

  buffer.seekTo(1);
  assertEquals(
    buffer.readInt8(),
    0xfe - 0x100,
  );
  assertEquals(
    buffer.readInt16LE(),
    0xfcfd - 0x10000,
  );
  assertEquals(
    buffer.readInt16BE(),
    0xfbfa - 0x10000,
  );
  assertEquals(
    buffer.readInt32LE(),
    0xf6f7f8f9 - 0x100000000,
  );
});

Deno.test("write", () => {
  const buffer = ByteBuffer.from([
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
  ]);

  buffer.writeInt8(0x01);
  buffer.writeInt16LE(0x0302);
  buffer.writeInt16BE(0x0405);
  buffer.writeInt32LE(0x09080706);
  buffer.writeInt32BE(0x0a0b0c0d);

  assertEquals(
    buffer.toArrayForDebug(),
    [
      0x01,
      0x02,
      0x03,
      0x04,
      0x05,
      0x06,
      0x07,
      0x08,
      0x09,
      0x0a,
      0x0b,
      0x0c,
      0x0d,
    ],
  );

  assertThrows(() => buffer.writeInt8(0x0e));

  buffer.rewind();
  buffer.writeInt8(0x02);
  buffer.writeInt16LE(0x0403);
  buffer.writeInt16BE(0x0506);
  buffer.writeInt32LE(0x0a090807);
  buffer.writeInt32BE(0x0b0c0d0e);

  assertEquals(
    buffer.toArrayForDebug(),
    [
      0x02,
      0x03,
      0x04,
      0x05,
      0x06,
      0x07,
      0x08,
      0x09,
      0x0a,
      0x0b,
      0x0c,
      0x0d,
      0x0e,
    ],
  );

  buffer.seekTo(1);
  buffer.writeInt8(0x02);
  buffer.writeInt16LE(0x0403);
  buffer.writeInt16BE(0x0506);
  buffer.writeInt32LE(0x0a090807);

  assertEquals(
    buffer.toArrayForDebug(),
    [
      0x02,
      0x02,
      0x03,
      0x04,
      0x05,
      0x06,
      0x07,
      0x08,
      0x09,
      0x0a,
      0x0c,
      0x0d,
      0x0e,
    ],
  );
});

Deno.test("seek, position", () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0]);

  assertEquals(
    buffer.seekTo(2).position,
    2,
  );
  assertEquals(
    buffer.seekBy(1).position,
    3,
  );
  assertEquals(
    buffer.seekBy(-2).position,
    1,
  );

  assertThrows(() => buffer.seekTo(-1));
  assertThrows(() => buffer.seekTo(4));

  assertThrows(() => buffer.seekBy(-2));
  assertThrows(() => buffer.seekBy(3));

  assertEquals(
    buffer.rewind().position,
    0,
  );
});

Deno.test("slice", () => {
  const buffer = ByteBuffer.from([0, 1, 2, 3, 4, 5, 6, 7]);

  assertNotStrictEquals(buffer.slice(), buffer);
  assertEquals(
    buffer.slice().toArrayForDebug(),
    buffer.toArrayForDebug(),
  );

  assertEquals(
    buffer.slice(4).toArrayForDebug(),
    [4, 5, 6, 7],
  );
  assertEquals(
    buffer.slice(4, 6).toArrayForDebug(),
    [4, 5],
  );
});

Deno.test("fillInt8", () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  assertEquals(
    buffer.fillInt8(0x12).toArrayForDebug(),
    [
      0x12,
      0x12,
      0x12,
      0x12,
      0x12,
      0x12,
      0x12,
      0x12,
      0x12,
    ],
  );
  assertEquals(
    buffer.fillInt8(0x13, 1).toArrayForDebug(),
    [
      0x12,
      0x13,
      0x13,
      0x13,
      0x13,
      0x13,
      0x13,
      0x13,
      0x13,
    ],
  );
  assertEquals(
    buffer.fillInt8(0x14, 1, 5).toArrayForDebug(),
    [
      0x12,
      0x14,
      0x14,
      0x14,
      0x14,
      0x13,
      0x13,
      0x13,
      0x13,
    ],
  );
  assertEquals(
    buffer.fillInt8(0x15, 5, 1).toArrayForDebug(),
    [
      0x12,
      0x14,
      0x14,
      0x14,
      0x14,
      0x13,
      0x13,
      0x13,
      0x13,
    ],
  );
});

Deno.test("fillInt16LE", () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  assertEquals(
    buffer.fillInt16LE(0x1234, 1).toArrayForDebug(),
    [
      0x00,
      0x34,
      0x12,
      0x34,
      0x12,
      0x34,
      0x12,
      0x34,
      0x12,
    ],
  );
  assertEquals(
    buffer.fillInt16LE(0x5678, 1, 5).toArrayForDebug(),
    [
      0x00,
      0x78,
      0x56,
      0x78,
      0x56,
      0x34,
      0x12,
      0x34,
      0x12,
    ],
  );
  assertEquals(
    buffer.fillInt16LE(0x9abc, 5, 1).toArrayForDebug(),
    [
      0x00,
      0x78,
      0x56,
      0x78,
      0x56,
      0x34,
      0x12,
      0x34,
      0x12,
    ],
  );

  assertThrows(() => buffer.fillInt16LE(0xdef0));

  assertEquals(
    buffer.toArrayForDebug(),
    [
      0x00,
      0x78,
      0x56,
      0x78,
      0x56,
      0x34,
      0x12,
      0x34,
      0x12,
    ],
  );
});

Deno.test("fillInt16BE", () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  assertEquals(
    buffer.fillInt16BE(0x1234, 1).toArrayForDebug(),
    [
      0x00,
      0x12,
      0x34,
      0x12,
      0x34,
      0x12,
      0x34,
      0x12,
      0x34,
    ],
  );
  assertEquals(
    buffer.fillInt16BE(0x5678, 1, 5).toArrayForDebug(),
    [
      0x00,
      0x56,
      0x78,
      0x56,
      0x78,
      0x12,
      0x34,
      0x12,
      0x34,
    ],
  );
  assertEquals(
    buffer.fillInt16BE(0x9abc, 5, 1).toArrayForDebug(),
    [
      0x00,
      0x56,
      0x78,
      0x56,
      0x78,
      0x12,
      0x34,
      0x12,
      0x34,
    ],
  );

  assertThrows(() => buffer.fillInt16BE(0xdef0));

  assertEquals(
    buffer.toArrayForDebug(),
    [
      0x00,
      0x56,
      0x78,
      0x56,
      0x78,
      0x12,
      0x34,
      0x12,
      0x34,
    ],
  );
});

Deno.test("fillInt32LE", () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  assertEquals(
    buffer.fillInt32LE(0x12345678, 1).toArrayForDebug(),
    [
      0x00,
      0x78,
      0x56,
      0x34,
      0x12,
      0x78,
      0x56,
      0x34,
      0x12,
      0x78,
      0x56,
      0x34,
      0x12,
    ],
  );
  assertEquals(
    buffer.fillInt32LE(0x9abcdef0, 1, 9).toArrayForDebug(),
    [
      0x00,
      0xf0,
      0xde,
      0xbc,
      0x9a,
      0xf0,
      0xde,
      0xbc,
      0x9a,
      0x78,
      0x56,
      0x34,
      0x12,
    ],
  );
  assertEquals(
    buffer.fillInt32LE(0x9abcdef0, 9, 1).toArrayForDebug(),
    [
      0x00,
      0xf0,
      0xde,
      0xbc,
      0x9a,
      0xf0,
      0xde,
      0xbc,
      0x9a,
      0x78,
      0x56,
      0x34,
      0x12,
    ],
  );

  assertThrows(() => buffer.fillInt32LE(0x87654321));

  assertEquals(
    buffer.toArrayForDebug(),
    [
      0x00,
      0xf0,
      0xde,
      0xbc,
      0x9a,
      0xf0,
      0xde,
      0xbc,
      0x9a,
      0x78,
      0x56,
      0x34,
      0x12,
    ],
  );
});

Deno.test("fillInt32BE", () => {
  const buffer = ByteBuffer.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  assertEquals(
    buffer.fillInt32BE(0x12345678, 1).toArrayForDebug(),
    [
      0x00,
      0x12,
      0x34,
      0x56,
      0x78,
      0x12,
      0x34,
      0x56,
      0x78,
      0x12,
      0x34,
      0x56,
      0x78,
    ],
  );
  assertEquals(
    buffer.fillInt32BE(0x9abcdef0, 1, 9).toArrayForDebug(),
    [
      0x00,
      0x9a,
      0xbc,
      0xde,
      0xf0,
      0x9a,
      0xbc,
      0xde,
      0xf0,
      0x12,
      0x34,
      0x56,
      0x78,
    ],
  );
  assertEquals(
    buffer.fillInt32BE(0x9abcdef0, 9, 1).toArrayForDebug(),
    [
      0x00,
      0x9a,
      0xbc,
      0xde,
      0xf0,
      0x9a,
      0xbc,
      0xde,
      0xf0,
      0x12,
      0x34,
      0x56,
      0x78,
    ],
  );

  assertThrows(() => buffer.fillInt32BE(0x87654321));

  assertEquals(
    buffer.toArrayForDebug(),
    [
      0x00,
      0x9a,
      0xbc,
      0xde,
      0xf0,
      0x9a,
      0xbc,
      0xde,
      0xf0,
      0x12,
      0x34,
      0x56,
      0x78,
    ],
  );
});

Deno.test("data type", () => {
  const src = [0x12];

  if (typeof Uint8Array !== "undefined") {
    Deno.test("Uint8Array", () => {
      const buffer = ByteBuffer.from(new Uint8Array(src));

      assertEquals(
        buffer.getUint8(0),
        0x12,
      );
      assertEquals(
        buffer.setInt8(0, 0x23).getUint8(0),
        0x23,
      );
    });
  }

  if (typeof Int8Array !== "undefined") {
    Deno.test("Int8Array", () => {
      const buffer = ByteBuffer.from(new Int8Array(src));

      assertEquals(
        buffer.getUint8(0),
        0x12,
      );
      assertEquals(
        buffer.setInt8(0, 0x23).getUint8(0),
        0x23,
      );
    });
  }

  if (typeof Uint8ClampedArray !== "undefined") {
    Deno.test("Uint8ClampedArray", () => {
      const buffer = ByteBuffer.from(new Uint8ClampedArray(src));

      assertEquals(
        buffer.getUint8(0),
        0x12,
      );
      assertEquals(
        buffer.setInt8(0, 0x23).getUint8(0),
        0x23,
      );
    });
  }

  if (typeof Uint16Array !== "undefined") {
    Deno.test("Uint16Array", () => {
      const buffer = ByteBuffer.from(new Uint16Array(src));

      assertEquals(
        buffer.getUint8(0),
        0x12,
      );
      assertEquals(
        buffer.setInt8(0, 0x23).getUint8(0),
        0x23,
      );
    });
  }

  if (typeof Int16Array !== "undefined") {
    Deno.test("Int16Array", () => {
      const buffer = ByteBuffer.from(new Int16Array(src));

      assertEquals(
        buffer.getUint8(0),
        0x12,
      );
      assertEquals(
        buffer.setInt8(0, 0x23).getUint8(0),
        0x23,
      );
    });
  }

  if (typeof Uint32Array !== "undefined") {
    Deno.test("Uint32Array", () => {
      const buffer = ByteBuffer.from(new Uint32Array(src));

      assertEquals(
        buffer.getUint8(0),
        0x12,
      );
      assertEquals(
        buffer.setInt8(0, 0x23).getUint8(0),
        0x23,
      );
    });
  }

  if (typeof Int32Array !== "undefined") {
    Deno.test("Int32Array", () => {
      const buffer = ByteBuffer.from(new Int32Array(src));

      assertEquals(
        buffer.getUint8(0),
        0x12,
      );
      assertEquals(
        buffer.setInt8(0, 0x23).getUint8(0),
        0x23,
      );
    });
  }
});
