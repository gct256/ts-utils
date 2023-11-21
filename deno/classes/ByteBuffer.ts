/* eslint-disable no-bitwise */

/** Byte buffer container type. */
type ByteBufferContainer = {
  [key: number]: number;
  length: number;
  slice(start?: number, end?: number): ByteBufferContainer;
  fill(value: number, start?: number, end?: number): void;
};

/**
 * Check position for byte buffer.
 *
 * @param position - Position.
 * @param length - Data length.
 * @returns Position.
 */
const checkPosition = (position: number, length: number): number => {
  if (!Number.isInteger(position)) {
    throw new Error(`Illegal data position: ${position}`);
  }

  if (position < 0 || length <= position) {
    throw new Error(`Out of bounds: ${position}`);
  }

  return position;
};

const getSigned = (uint: number, threshold: number): number =>
  uint < threshold ? uint : uint - threshold * 2;

/** Byte buffer class. */
export class ByteBuffer<T extends ByteBufferContainer> {
  readonly #data: T;
  #position: number;

  private constructor(data: T) {
    this.#data = data;
    this.#position = 0;
  }

  /**
   * Create byte buffer object.
   *
   * @param data - Data source. ex. number[], Uint8Array, node's Buffer.
   */
  static from<S extends ByteBufferContainer>(data: S): ByteBuffer<S> {
    return new ByteBuffer(data);
  }

  private getPosition(nextOffset: number): number {
    const position = checkPosition(this.#position, this.#data.length);

    this.#position += nextOffset;

    return position;
  }

  /** Get current position. */
  get position(): number {
    return this.#position;
  }

  /** Create number[] for debug. */
  toArrayForDebug(): number[] {
    const result: number[] = [];

    for (let i = 0; i < this.#data.length; i += 1) {
      result.push(this.#data[i] & 0xff);
    }

    return result;
  }

  /** Set position to first. */
  rewind(): this {
    return this.seekTo(0);
  }

  /**
   * Set position.
   *
   * @param position - Position.
   */
  seekTo(position: number): this {
    this.#position = checkPosition(position, this.#data.length);

    return this;
  }

  /**
   * Set position by relative offset.
   *
   * @param offset - Offset.
   */
  seekBy(offset: number): this {
    this.#position = checkPosition(this.#position + offset, this.#data.length);

    return this;
  }

  /**
   * Get 1-byte as unsigned number.
   *
   * @param position - Position.
   */
  getUint8(position: number): number {
    return this.#data[checkPosition(position, this.#data.length)] & 0xff;
  }

  /**
   * Get 1-byte as signed number.
   *
   * @param position - Position.
   */
  getInt8(position: number): number {
    return getSigned(this.getUint8(position), 0x80);
  }

  /**
   * Get 2-bytes as unsigned number using little endian byte order.
   *
   * @param position - Position.
   */
  getUint16LE(position: number): number {
    return this.getUint8(position) | (this.getUint8(position + 1) << 8);
  }

  /**
   * Get 2-bytes as signed number using little endian byte order.
   *
   * @param position - Position.
   */
  getInt16LE(position: number): number {
    return getSigned(this.getUint16LE(position), 0x8000);
  }

  /**
   * Get 2-bytes as unsigned number using big endian byte order.
   *
   * @param position - Position.
   */
  getUint16BE(position: number): number {
    return (this.getUint8(position) << 8) | this.getUint8(position + 1);
  }

  /**
   * Get 2-bytes as signed number using big endian byte order.
   *
   * @param position - Position.
   */
  getInt16BE(position: number): number {
    return getSigned(this.getUint16BE(position), 0x8000);
  }

  /**
   * Get 4-bytes as unsigned number using little endian byte order.
   *
   * @param position - Position.
   */
  getUint32LE(position: number): number {
    return (
      this.getUint8(position) +
      this.getUint8(position + 1) * 256 +
      this.getUint8(position + 2) * 65536 +
      this.getUint8(position + 3) * 16777216
    );
  }

  /**
   * Get 4-bytes as signed number using little endian byte order.
   *
   * @param position - Position.
   */
  getInt32LE(position: number): number {
    return getSigned(
      this.getUint8(position) +
        this.getUint8(position + 1) * 256 +
        this.getUint8(position + 2) * 65536 +
        this.getUint8(position + 3) * 16777216,
      0x80000000,
    );
  }

  /**
   * Get 4-bytes as unsigned number using big endian byte order.
   *
   * @param position - Position.
   */
  getUint32BE(position: number): number {
    return (
      this.getUint8(position) * 16777216 +
      this.getUint8(position + 1) * 65536 +
      this.getUint8(position + 2) * 256 +
      this.getUint8(position + 3)
    );
  }

  /**
   * Get 4-bytes as signed number using big endian byte order.
   *
   * @param position - Position.
   */
  getInt32BE(position: number): number {
    return getSigned(
      this.getUint8(position) * 16777216 +
        this.getUint8(position + 1) * 65536 +
        this.getUint8(position + 2) * 256 +
        this.getUint8(position + 3),
      0x80000000,
    );
  }

  /**
   * Set 1-byte.
   *
   * @param position - Position.
   * @param value - Value.
   */
  setInt8(position: number, value: number): this {
    this.#data[checkPosition(position, this.#data.length)] = value & 0xff;

    return this;
  }

  /**
   * Set 2-bytes using little endian byte order.
   *
   * @param position - Position.
   * @param value - Value.
   */
  setInt16LE(position: number, value: number): this {
    const pos1 = checkPosition(position, this.#data.length);
    const pos2 = checkPosition(position + 1, this.#data.length);

    this.#data[pos1] = value & 0x00ff;
    this.#data[pos2] = (value & 0xff00) >> 8;

    return this;
  }

  /**
   * Set 2-bytes using big endian byte order.
   *
   * @param position - Position.
   * @param value - Value.
   */
  setInt16BE(position: number, value: number): this {
    const pos1 = checkPosition(position, this.#data.length);
    const pos2 = checkPosition(position + 1, this.#data.length);

    this.#data[pos1] = (value & 0xff00) >> 8;
    this.#data[pos2] = value & 0x00ff;

    return this;
  }

  /**
   * Set 4-bytes using little endian byte order.
   *
   * @param position - Position.
   * @param value - Value.
   */
  setInt32LE(position: number, value: number): this {
    const pos1 = checkPosition(position, this.#data.length);
    const pos2 = checkPosition(position + 1, this.#data.length);
    const pos3 = checkPosition(position + 2, this.#data.length);
    const pos4 = checkPosition(position + 3, this.#data.length);

    this.#data[pos1] = value & 0x000000ff;
    this.#data[pos2] = (value & 0x0000ff00) >> 8;
    this.#data[pos3] = (value & 0x00ff0000) >> 16;
    this.#data[pos4] = (value & 0xff000000) >> 24;

    return this;
  }

  /**
   * Set 4-bytes using big endian byte order.
   *
   * @param position - Position.
   * @param value - Value.
   */
  setInt32BE(position: number, value: number): this {
    const pos1 = checkPosition(position, this.#data.length);
    const pos2 = checkPosition(position + 1, this.#data.length);
    const pos3 = checkPosition(position + 2, this.#data.length);
    const pos4 = checkPosition(position + 3, this.#data.length);

    this.#data[pos1] = (value & 0xff000000) >> 24;
    this.#data[pos2] = (value & 0x00ff0000) >> 16;
    this.#data[pos3] = (value & 0x0000ff00) >> 8;
    this.#data[pos4] = value & 0x000000ff;

    return this;
  }

  /**
   * Read 1-byte from current position as unsigned number
   * and update current position (+1).
   */
  readUint8(): number {
    return this.getUint8(this.getPosition(1));
  }

  /**
   * Read 1-byte from current position as signed number
   * and update current position (+1).
   */
  readInt8(): number {
    return this.getInt8(this.getPosition(1));
  }

  /**
   * Read 2-bytes from current position as unsigned number using little endian byte order
   * and update current position (+2).
   */
  readUint16LE(): number {
    return this.getUint16LE(this.getPosition(2));
  }

  /**
   * Read 2-bytes from current position as signed number using little endian byte order
   * and update current position (+2).
   */
  readInt16LE(): number {
    return this.getInt16LE(this.getPosition(2));
  }

  /**
   * Read 2-bytes from current position as unsigned number using big endian byte order
   * and update current position (+2).
   */
  readUint16BE(): number {
    return this.getUint16BE(this.getPosition(2));
  }

  /**
   * Read 2-bytes from current position as signed number using big endian byte order
   * and update current position (+2).
   */
  readInt16BE(): number {
    return this.getInt16BE(this.getPosition(2));
  }

  /**
   * Read 4-bytes from current position as unsigned number using little endian byte order
   * and update current position (+4).
   */
  readUint32LE(): number {
    return this.getUint32LE(this.getPosition(4));
  }

  /**
   * Read 4-bytes from current position as signed number using little endian byte order
   * and update current position (+4).
   */
  readInt32LE(): number {
    return this.getInt32LE(this.getPosition(4));
  }

  /**
   * Read 4-bytes from current position as unsigned number using big endian byte order
   * and update current position (+4).
   */
  readUint32BE(): number {
    return this.getUint32BE(this.getPosition(4));
  }

  /**
   * Read 4-bytes from current position as signed number using big endian byte order
   * and update current position (+4).
   */
  readInt32BE(): number {
    return this.getInt32BE(this.getPosition(4));
  }

  /**
   * Write 1-byte to current position
   * and update current position (+1).
   *
   * @param value - Value.
   */
  writeInt8(value: number): this {
    return this.setInt8(this.getPosition(1), value);
  }

  /**
   * Write 2-bytes to current position using little endian byte order
   * and update current position (+2).
   *
   * @param value - Value.
   */
  writeInt16LE(value: number): this {
    return this.setInt16LE(this.getPosition(2), value);
  }

  /**
   * Write 2-bytes to current position using big endian byte order
   * and update current position (+2).
   *
   * @param value - Value.
   */
  writeInt16BE(value: number): this {
    return this.setInt16BE(this.getPosition(2), value);
  }

  /**
   * Write 4-bytes to current position using little endian byte order
   * and update current position (+4).
   *
   * @param value - Value.
   */
  writeInt32LE(value: number): this {
    return this.setInt32LE(this.getPosition(4), value);
  }

  /**
   * Write 4-bytes to current position using big endian byte order
   * and update current position (+4).
   *
   * @param value - Value.
   */
  writeInt32BE(value: number): this {
    return this.setInt32BE(this.getPosition(4), value);
  }

  /**
   * Create new byte buffer from slice.
   *
   * @param start - Start position. default: 0
   * @param end - End position. default: Data length.
   */
  slice(start?: number, end?: number): ByteBuffer<ByteBufferContainer> {
    return new ByteBuffer(this.#data.slice(start, end));
  }

  /**
   * Fill 1-byte value.
   *
   * @param value - Value.
   * @param start - Start position. default: 0
   * @param end - End position. default: Data length.
   */
  fillInt8(value: number, start?: number, end?: number): this {
    this.#data.fill(value & 0xff, start, end);

    return this;
  }

  private fill16(v0: number, v1: number, start: number, end: number): this {
    if (start > end) return this;

    if ((end - start) % 2 !== 0) {
      throw new Error(`Illegal slice range: ${start} - ${end}`);
    }

    for (let i = start; i < end; i += 2) {
      this.#data[checkPosition(i, this.#data.length)] = v0;
      this.#data[checkPosition(i + 1, this.#data.length)] = v1;
    }

    return this;
  }

  /**
   * Fill 2-bytes value using little endian byte order.
   *
   * @param value - Value.
   * @param start - Start position. default: 0
   * @param end - End position. default: Data length.
   */
  fillInt16LE(value: number, start?: number, end?: number): this {
    return this.fill16(
      value & 0xff,
      (value & 0xff00) >> 8,
      start ?? 0,
      end ?? this.#data.length,
    );
  }

  /**
   * Fill 2-bytes value using big endian byte order.
   *
   * @param value - Value.
   * @param start - Start position. default: 0
   * @param end - End position. default: Data length.
   */
  fillInt16BE(value: number, start?: number, end?: number): this {
    return this.fill16(
      (value & 0xff00) >> 8,
      value & 0xff,
      start ?? 0,
      end ?? this.#data.length,
    );
  }

  private fill32(
    v0: number,
    v1: number,
    v2: number,
    v3: number,
    start: number,
    end: number,
  ): this {
    if (start > end) return this;

    if ((end - start) % 4 !== 0) {
      throw new Error(`Illegal slice range: ${start} - ${end}`);
    }

    for (let i = start; i < end; i += 4) {
      this.#data[checkPosition(i, this.#data.length)] = v0;
      this.#data[checkPosition(i + 1, this.#data.length)] = v1;
      this.#data[checkPosition(i + 2, this.#data.length)] = v2;
      this.#data[checkPosition(i + 3, this.#data.length)] = v3;
    }

    return this;
  }

  /**
   * Fill 4-bytes value using little endian byte order.
   *
   * @param value - Value.
   * @param start - Start position. default: 0
   * @param end - End position. default: Data length.
   */
  fillInt32LE(value: number, start?: number, end?: number): this {
    return this.fill32(
      value & 0xff,
      (value & 0xff00) >> 8,
      (value & 0xff0000) >> 16,
      (value & 0xff000000) >> 24,
      start ?? 0,
      end ?? this.#data.length,
    );
  }

  /**
   * Fill 4-bytes value using big endian byte order.
   *
   * @param value - Value.
   * @param start - Start position. default: 0
   * @param end - End position. default: Data length.
   */
  fillInt32BE(value: number, start?: number, end?: number): this {
    return this.fill32(
      (value & 0xff000000) >> 24,
      (value & 0xff0000) >> 16,
      (value & 0xff00) >> 8,
      value & 0xff,
      start ?? 0,
      end ?? this.#data.length,
    );
  }
}
