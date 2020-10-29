/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}

/** Utility for value comparison. */
const compare = {
    /**
     * Compare data using.
     *
     * @param a - Data.
     * @param b - Another data.
     */
    data(a, b) {
        if (a < b)
            return -1;
        return a > b ? 1 : 0;
    },
    /**
     * Compare numbers.
     *
     * @param a - Number.
     * @param b - Another number.
     */
    number(a, b) {
        if (Number.isNaN(a)) {
            return Number.isNaN(b) ? 0 : -1;
        }
        return Number.isNaN(b) ? 1 : compare.data(a, b);
    },
    /**
     * Compare numbers with precision.
     *
     * @param a - Number.
     * @param b - Another number.
     * @param precision - Precision.
     */
    float(a, b, precision = 8) {
        if (Number.isNaN(a)) {
            return Number.isNaN(b) ? 0 : -1;
        }
        if (Number.isNaN(b))
            return 1;
        if (a === b)
            return 0;
        if (Math.abs(a - b) <= Math.pow(10, -precision))
            return 0;
        return a < b ? -1 : 1;
    },
    /**
     * Compare validatable objects.
     * If invalid both, return NaN.
     *
     * @param a - Validatable object.
     * @param b - Another validatable object.
     */
    validatable(a, b) {
        if (!a.isValid()) {
            return b.isValid() ? -1 : NaN;
        }
        return b.isValid() ? 0 : 1;
    },
    /**
     * Return the first non-zero value of the comparator's results.
     * If the result is NaN, return 0.
     *
     * @param compareResults - Comparator's results.
     */
    groups(...compareResults) {
        var _a;
        const result = (_a = compareResults.find((x) => Number.isNaN(x) || (Number.isFinite(x) && x !== 0))) !== null && _a !== void 0 ? _a : 0;
        return Number.isNaN(result) ? 0 : result;
    }
};

const numbers = {
    /**
     * Calculate the remainder like Python.
     *
     * @param a dividend.
     * @param b divisor. If it is 0 the result will always be NaN.
     * @returns result.
     */
    modulo(a, b) {
        if (!Number.isFinite(a) || !Number.isFinite(b))
            return NaN;
        if (b === 0)
            return NaN;
        if (a === 0 || a === b || -a === b)
            return 0;
        const c = (a > 0 && b > 0) || (a < 0 && b < 0) ? a % b : (a % b) + b;
        return c === b || c === 0 ? 0 : c;
    },
    /**
     * Return adjusted value between min value and max value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    clamp(a, min, max) {
        if (Number.isNaN(a) || Number.isNaN(min) || Number.isNaN(max)) {
            return NaN;
        }
        // eslint-disable-next-line no-nested-ternary
        return a < min ? min : a > max ? max : a;
    },
    /**
     * Wrapper for Math.floor with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    floor(a, defaultValue = 0) {
        return Number.isFinite(a) ? Math.floor(a) : defaultValue;
    },
    /**
     * Wrapper for Math.ceil with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    ceil(a, defaultValue = 0) {
        return Number.isFinite(+a) ? Math.ceil(a) : defaultValue;
    },
    /**
     * Wrapper for Math.round with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    round(a, defaultValue = 0) {
        return Number.isFinite(+a) ? Math.round(a) : defaultValue;
    }
};

var _valid;
/** Base object. */
class BaseObject {
    /**
     * Create an object.
     *
     * @param valid - If it is true, having valid parameters.
     */
    constructor(valid) {
        _valid.set(this, void 0);
        __classPrivateFieldSet(this, _valid, valid);
    }
    /**
     * Return true if other data has the same parameters.
     *
     * @param other - Other data.
     */
    isEqual(other) {
        return this.compare(other) === 0;
    }
    /** @implements */
    isValid() {
        return __classPrivateFieldGet(this, _valid);
    }
}
_valid = new WeakMap();

/** Point object. */
class Point extends BaseObject {
    //
    // constructor (private)
    //
    constructor({ x, y }) {
        super(Number.isFinite(x) && Number.isFinite(y));
        this.x = this.isValid() ? x : NaN;
        this.y = this.isValid() ? y : NaN;
    }
    //
    // static methods
    //
    /**
     * Create an object from an point data.
     *
     * @param data - Point data.
     */
    static of(data) {
        return new Point(data);
    }
    /**
     * Create an object from a coordinate.
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    static fromXY(x, y) {
        return new Point({ x, y });
    }
    //
    // overrides
    //
    /** @override */
    compare(other) {
        const point = new Point(other);
        return compare.groups(compare.validatable(this, point), compare.float(this.x, other.x), compare.float(this.y, other.y));
    }
    /** @override */
    valueOf() {
        return {
            x: this.x,
            y: this.y
        };
    }
    moveBy(arg0, arg1 = 0) {
        if (typeof arg0 === 'object') {
            return new Point({
                x: this.x + arg0.x,
                y: this.y + arg0.y
            });
        }
        return new Point({
            x: this.x + arg0,
            y: this.y + arg1
        });
    }
    /**
     * Get distance from the origin.
     *
     * @param squared - If true, return squared value.
     */
    getDistanceFromOrigin(squared = false) {
        if (!this.isValid())
            return NaN;
        const d = Math.pow(this.x, 2) + Math.pow(this.y, 2);
        return squared ? d : Math.sqrt(d);
    }
    /**
     * Get distance from the other point.
     *
     * @param point - Other point.
     * @param squared - If true, return squared value.
     */
    getDistance(point, squared = false) {
        const p = new Point(point);
        if (!this.isValid() || !p.isValid())
            return NaN;
        const d = Math.pow((this.x - p.x), 2) + Math.pow((this.y - p.y), 2);
        return squared ? d : Math.sqrt(d);
    }
}

var _cos, _sin, _tan;
const DEGREE_TO_RADIAN = Math.PI / 180;
const RADIAN_TO_DEGREE = 180 / Math.PI;
/** Angle object. */
class Angle extends BaseObject {
    //
    // constructor (private)
    //
    constructor({ radian, degree }) {
        super(Number.isFinite(radian) && Number.isFinite(degree));
        _cos.set(this, void 0);
        _sin.set(this, void 0);
        _tan.set(this, void 0);
        this.radian = this.isValid() ? radian : NaN;
        this.degree = this.isValid() ? degree : NaN;
        __classPrivateFieldSet(this, _cos, undefined);
        __classPrivateFieldSet(this, _sin, undefined);
        __classPrivateFieldSet(this, _tan, undefined);
    }
    //
    // static methods
    //
    /**
     * Create an object from an angle data.
     *
     * @param data - Angle data.
     * @param strict - If true, throw Error a radian and degree not match.
     */
    static of({ radian, degree }, strict = false) {
        if (strict && compare.float(radian * RADIAN_TO_DEGREE, degree) !== 0) {
            throw new Error('radian and degree not match.');
        }
        return new Angle({ radian: degree * DEGREE_TO_RADIAN, degree });
    }
    /**
     * Create an object from a radian value.
     *
     * @param radian - Radian value.
     */
    static fromRadian(radian) {
        return new Angle({ radian, degree: radian * RADIAN_TO_DEGREE });
    }
    /**
     * Create an object from a degree value.
     *
     * @param degree - Degree value.
     */
    static fromDegree(degree) {
        return new Angle({ radian: degree * DEGREE_TO_RADIAN, degree });
    }
    /**
     * Create an object from an angle from origin to coordinate.
     *
     * @param x - X coordinate.
     * @param y - Y coordinate.
     */
    static fromXY(x, y) {
        return Angle.fromRadian(Math.atan2(y, x));
    }
    /**
     * Create an object from an angle from origin to point.
     *
     * @param point - Point data.
     */
    static fromPoint(point) {
        return Angle.fromRadian(Math.atan2(point.y, point.x));
    }
    //
    // overrides
    //
    /** @override */
    compare(other) {
        const angle = new Angle(other);
        return compare.groups(compare.validatable(this, angle), compare.float(this.radian, angle.radian));
    }
    /** @override */
    valueOf() {
        return {
            radian: this.radian,
            degree: this.degree
        };
    }
    //
    // methods
    //
    /**
     * Create normalized angle object with range: -180 < degree <= 180.
     */
    normalize() {
        const degree = numbers.modulo(this.degree, 360);
        return Angle.fromDegree(degree > 180 ? degree - 360 : degree);
    }
    /**
     * Create normalized angle object with range: 0 <= degree < 360.
     */
    normalizeIn360() {
        return Angle.fromDegree(numbers.modulo(this.degree, 360));
    }
    /**
     * Create a new object with the added radian.
     *
     * @param radian - Radian value.
     */
    addRadian(radian) {
        return Angle.fromRadian(this.radian + radian);
    }
    /**
     * Create a new object with the added degree.
     *
     * @param degree - Degree value.
     */
    addDegree(degree) {
        return Angle.fromDegree(this.degree + degree);
    }
    /**
     * Create a new object with the added angles.
     *
     * @param angle - Angle data.
     */
    add(angle) {
        return Angle.fromDegree(this.degree + angle.degree);
    }
    /**
     * Create a new object by multiplying the angle by a multiplier.
     *
     * @param multiplier - Multiplier.
     */
    multiple(multiplier) {
        return Angle.fromDegree(this.degree * multiplier);
    }
    /**
     * Get cos value.
     */
    getCos() {
        var _a;
        // eslint-disable-next-line no-return-assign
        return (_a = __classPrivateFieldGet(this, _cos)) !== null && _a !== void 0 ? _a : (__classPrivateFieldSet(this, _cos, Math.cos(this.radian)));
    }
    /**
     * Get sin value.
     */
    getSin() {
        var _a;
        // eslint-disable-next-line no-return-assign
        return (_a = __classPrivateFieldGet(this, _sin)) !== null && _a !== void 0 ? _a : (__classPrivateFieldSet(this, _sin, Math.sin(this.radian)));
    }
    /**
     * Get tan value.
     */
    getTan() {
        var _a;
        // eslint-disable-next-line no-return-assign
        return (_a = __classPrivateFieldGet(this, _tan)) !== null && _a !== void 0 ? _a : (__classPrivateFieldSet(this, _tan, Math.tan(this.radian)));
    }
    /**
     * Get point delta.
     *
     * @param size - Size.
     */
    getPointDelta(size) {
        return Point.of({
            x: this.getCos() * size,
            y: this.getSin() * size
        });
    }
}
_cos = new WeakMap(), _sin = new WeakMap(), _tan = new WeakMap();

/** Size object. */
class Size extends BaseObject {
    //
    // constructor (private)
    //
    constructor({ width, height }) {
        super(Number.isFinite(width) &&
            width >= 0 &&
            Number.isFinite(height) &&
            height >= 0);
        this.width = this.isValid() ? width : NaN;
        this.height = this.isValid() ? height : NaN;
    }
    //
    // static methods
    //
    /**
     * Create an object from an size data.
     *
     * @param data - Size data.
     */
    static of(data) {
        return new Size(data);
    }
    /**
     * Create an object from a width and height.
     *
     * @param width - Width.
     * @param height - Height.
     */
    static fromWH(width, height) {
        return new Size({ width, height });
    }
    //
    // overrides
    //
    /** @overrides */
    compare(other) {
        const size = new Size(other);
        return compare.groups(compare.validatable(this, size), compare.float(this.width, size.width), compare.float(this.height, size.height));
    }
    /** @overrides */
    valueOf() {
        return {
            width: this.width,
            height: this.height
        };
    }
    //
    // methods
    //
    /**
     * Return true if empty.
     */
    isEmpty() {
        return this.isValid() && (this.width === 0 || this.height === 0);
    }
    resizeBy(arg0, arg1 = 0) {
        if (typeof arg0 === 'object') {
            if ('width' in arg0) {
                return new Size({
                    width: this.width + arg0.width,
                    height: this.height + arg0.height
                });
            }
            return new Size({
                width: this.width + arg0.x,
                height: this.height + arg0.y
            });
        }
        return new Size({
            width: this.width + arg0,
            height: this.height + arg1
        });
    }
}

var _origin, _size;
/** a < b */
const isLT = (a, b) => compare.float(a, b) < 0;
/** a <= b */
const isLE = (a, b) => compare.float(a, b) <= 0;
/** Rectangle object. */
class Rectangle extends BaseObject {
    //
    // constructor (private)
    //
    constructor(origin, size) {
        super(origin.isValid() && size.isValid());
        _origin.set(this, void 0);
        _size.set(this, void 0);
        this.left = this.isValid() ? origin.x : NaN;
        this.right = this.isValid() ? origin.x + size.width : NaN;
        this.top = this.isValid() ? origin.y : NaN;
        this.bottom = this.isValid() ? origin.y + size.height : NaN;
        this.width = this.isValid() ? size.width : NaN;
        this.height = this.isValid() ? size.height : NaN;
        this.x = this.isValid() ? origin.x : NaN;
        this.y = this.isValid() ? origin.y : NaN;
        __classPrivateFieldSet(this, _origin, Point.of(origin));
        __classPrivateFieldSet(this, _size, Size.of(size));
    }
    //
    // static methods
    //
    /**
     * Create an object from a rectangle data.
     *
     * @param data - Rectangle data.
     */
    static of({ left, right, top, bottom }) {
        return new Rectangle(Point.fromXY(left, top), Size.fromWH(right - left, bottom - top));
    }
    /**
     * Create an object from top-left point and size.
     *
     * @param x - X coordinate of top-left point.
     * @param y - Y coordinate of top-left point.
     * @param width - Width.
     * @param height - Height.
     */
    static fromXYWH(x, y, width, height) {
        return new Rectangle(Point.fromXY(x, y), Size.fromWH(width, height));
    }
    /**
     * Create an object from diagonal point pair.
     *
     * @param p0 - Point.
     * @param p1 - Another point.
     */
    static fromPointPair(p0, p1) {
        const [left, right] = p0.x < p1.x ? [p0.x, p1.x] : [p1.x, p0.x];
        const [top, bottom] = p0.y < p1.y ? [p0.y, p1.y] : [p1.y, p0.y];
        return Rectangle.of({ left, right, top, bottom });
    }
    //
    // overrides
    //
    /** @override */
    compare(other) {
        const rect = Rectangle.of(other);
        return compare.groups(compare.validatable(this, rect), __classPrivateFieldGet(this, _origin).compare(__classPrivateFieldGet(rect, _origin)), __classPrivateFieldGet(this, _size).compare(__classPrivateFieldGet(rect, _size)));
    }
    /** @override */
    valueOf() {
        return Object.assign(Object.assign({ left: this.left, right: this.right, top: this.top, bottom: this.bottom }, __classPrivateFieldGet(this, _size).valueOf()), __classPrivateFieldGet(this, _origin).valueOf());
    }
    //
    // methods
    //
    /**
     * Return true if empty.
     */
    isEmpty() {
        return __classPrivateFieldGet(this, _size).isEmpty();
    }
    /**
     * Return true if point in rectangle.
     *
     * @param point - Point data.
     * @param excludeEdge - If true, exclude point in edge case.
     */
    isPointContains(point, excludeEdge = false) {
        if (!this.isValid() || !Point.of(point).isValid())
            return false;
        const part = this.getPartForPoint(point);
        return excludeEdge ? part === 'inside' : part !== 'outside';
    }
    /**
     * Return true if another rectangle in rectangle.
     *
     * @param rect - Another rectangle data.
     * @param excludeEdge - If true, exclude point in edge case.
     */
    isContains(rect, excludeEdge = false) {
        if (!this.isValid())
            return false;
        const r = Rectangle.of(rect);
        if (!r.isValid())
            return false;
        if (excludeEdge) {
            return (isLT(this.left, r.left) &&
                isLT(r.right, this.right) &&
                isLT(this.top, r.top) &&
                isLT(r.bottom, this.bottom));
        }
        return (isLE(this.left, r.left) &&
            isLE(r.right, this.right) &&
            isLE(this.top, r.top) &&
            isLE(r.bottom, this.bottom));
    }
    /**
     * Return true if another rectangle has intersection with rectangle.
     *
     * @param rect - Another rectangle data.
     * @param excludeEdge - If true, exclude point in edge case.
     */
    isIntersects(rect, excludeEdge = false) {
        if (!this.isValid())
            return false;
        const r = Rectangle.of(rect);
        if (!r.isValid())
            return false;
        if (excludeEdge) {
            return (isLT(this.left, r.right) &&
                isLT(r.left, this.right) &&
                isLT(this.top, r.bottom) &&
                isLT(r.top, this.bottom));
        }
        return (isLE(this.left, r.right) &&
            isLE(r.left, this.right) &&
            isLE(this.top, r.bottom) &&
            isLE(r.top, this.bottom));
    }
    moveBy(arg0, arg1 = 0) {
        if (typeof arg0 === 'object') {
            return new Rectangle(__classPrivateFieldGet(this, _origin).moveBy(arg0), __classPrivateFieldGet(this, _size));
        }
        return new Rectangle(__classPrivateFieldGet(this, _origin).moveBy(arg0, arg1), __classPrivateFieldGet(this, _size));
    }
    resizeBy(arg0, arg1 = 0) {
        if (typeof arg0 === 'object') {
            if ('width' in arg0) {
                return new Rectangle(__classPrivateFieldGet(this, _origin), __classPrivateFieldGet(this, _size).resizeBy(arg0));
            }
            return new Rectangle(__classPrivateFieldGet(this, _origin), __classPrivateFieldGet(this, _size).resizeBy(arg0));
        }
        return new Rectangle(__classPrivateFieldGet(this, _origin), __classPrivateFieldGet(this, _size).resizeBy(arg0, arg1));
    }
    inset(arg0, arg1 = 0) {
        if (typeof arg0 === 'object') {
            if ('width' in arg0) {
                return new Rectangle(__classPrivateFieldGet(this, _origin).moveBy(arg0.width / 2, arg0.height / 2), __classPrivateFieldGet(this, _size).resizeBy(-arg0.width, -arg0.height));
            }
            return new Rectangle(__classPrivateFieldGet(this, _origin).moveBy(arg0.x / 2, arg0.y / 2), __classPrivateFieldGet(this, _size).resizeBy(-arg0.x, -arg0.y));
        }
        return new Rectangle(__classPrivateFieldGet(this, _origin).moveBy(arg0 / 2, arg1 / 2), __classPrivateFieldGet(this, _size).resizeBy(-arg0, -arg1));
    }
    getPartForPoint({ x, y }) {
        const left = compare.float(x, this.left);
        const right = compare.float(x, this.right);
        const top = compare.float(y, this.top);
        const bottom = compare.float(y, this.bottom);
        if (left < 0 || right > 0 || top < 0 || bottom > 0)
            return 'outside';
        if (left === 0) {
            if (top === 0)
                return 'top-left';
            return bottom === 0 ? 'bottom-left' : 'left';
        }
        if (right === 0) {
            if (top === 0)
                return 'top-right';
            return bottom === 0 ? 'bottom-right' : 'right';
        }
        if (top === 0)
            return 'top';
        return bottom === 0 ? 'bottom' : 'inside';
    }
}
_origin = new WeakMap(), _size = new WeakMap();

const getValue = (x) => Number.isFinite(x) ? numbers.clamp(Math.round(x), 0, 255) : x;
const format = (x) => x.toString(16).padStart(2, '0');
/** RGB-based color object. */
class RGBA extends BaseObject {
    //
    // constructor (private)
    //
    constructor({ red, green, blue, alpha }) {
        super(Number.isInteger(red) &&
            red >= 0 &&
            red <= 255 &&
            Number.isInteger(green) &&
            green >= 0 &&
            green <= 255 &&
            Number.isInteger(blue) &&
            blue >= 0 &&
            blue <= 255 &&
            Number.isInteger(alpha) &&
            alpha >= 0 &&
            alpha <= 255);
        this.red = this.isValid() ? red : NaN;
        this.green = this.isValid() ? green : NaN;
        this.blue = this.isValid() ? blue : NaN;
        this.alpha = this.isValid() ? alpha : NaN;
    }
    //
    // static methods
    //
    /**
     * Create an object from an color data.
     *
     * @param data - Color data.
     */
    static of(data) {
        return new RGBA(data);
    }
    /**
     * Create an object from red, green, and blue values.
     *
     * @param red - Red value. 0 <= n <= 255, integer.
     * @param green - Green value. 0 <= n <= 255, integer.
     * @param blue - Blue value. 0 <= n <= 255, integer.
     */
    static fromRGB(red, green, blue) {
        return new RGBA({
            red: getValue(red),
            green: getValue(green),
            blue: getValue(blue),
            alpha: 255
        });
    }
    /**
     * Create an object from floating-point values of red, green, and blue.
     *
     * @param red - Red value. 0 <= n <= 1, float.
     * @param green - Green value. 0 <= n <= 1, float.
     * @param blue - Blue value. 0 <= n <= 1, float.
     */
    static fromRGBByFloat(red, green, blue) {
        return new RGBA({
            red: getValue(red * 255),
            green: getValue(green * 255),
            blue: getValue(blue * 255),
            alpha: 255
        });
    }
    /**
     * Create an object from red, green, blue, and alpha values.
     *
     * @param red - Red value. 0 <= n <= 255, integer.
     * @param green - Green value. 0 <= n <= 255, integer.
     * @param blue - Blue value. 0 <= n <= 255, integer.
     * @param alpha - Alpha value. 0 <= n <= 255, integer.
     */
    static fromRGBA(red, green, blue, alpha) {
        return new RGBA({
            red: getValue(red),
            green: getValue(green),
            blue: getValue(blue),
            alpha: getValue(alpha)
        });
    }
    /**
     * Create an object from floating-point values of red, green, blue, and alpha.
     *
     * @param red - Red value. 0 <= n <= 1, float.
     * @param green - Green value. 0 <= n <= 1, float.
     * @param blue - Blue value. 0 <= n <= 1, float.
     * @param alpha - Alpha value. 0 <= n <= 1, float.
     */
    static fromRGBAByFloat(red, green, blue, alpha) {
        return new RGBA({
            red: getValue(red * 255),
            green: getValue(green * 255),
            blue: getValue(blue * 255),
            alpha: getValue(alpha * 255)
        });
    }
    /**
     * Create an object from hex string.
     *
     * @param hexString - Hex string.
     * @param strict - If set ture, throw Error with illegal hex stirng format.
     * If set false, return black color with illegal hex stirng format.
     */
    static fromHexString(hexString, strict = false) {
        const matches = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i.exec(hexString);
        if (!matches) {
            if (strict)
                throw new Error('Illegal hex string');
            return RGBA.BLACK;
        }
        const [, r, g, b, a] = matches;
        return new RGBA({
            red: Number.parseInt(r, 16),
            green: Number.parseInt(g, 16),
            blue: Number.parseInt(b, 16),
            alpha: typeof a !== 'string' ? 255 : Number.parseInt(a, 16)
        });
    }
    //
    // overrides
    //
    /** @override */
    compare(other) {
        const color = new RGBA(other);
        return compare.groups(compare.validatable(this, color), compare.number(this.red, other.red), compare.number(this.green, other.green), compare.number(this.blue, other.blue), compare.number(this.alpha, other.alpha));
    }
    /** @override */
    valueOf() {
        return {
            red: this.red,
            green: this.green,
            blue: this.blue,
            alpha: this.alpha
        };
    }
    //
    // methods
    //
    /**
     * Return a color string for CSS.
     *
     * @param omitAlpha - If true and alpha is 255, omit alpha parameter.
     */
    toString(omitAlpha = false) {
        if (!this.isValid())
            return 'rgb(0,0,0)';
        return omitAlpha && this.alpha === 255
            ? `rgb(${this.red},${this.green},${this.blue})`
            : `rgba(${this.red},${this.green},${this.blue},${this.alpha / 255})`;
    }
    /**
     * Return a hexadecimal color string for CSS.
     *
     * @param omitAlpha - If true and alpha is 255, omit alpha parameter.
     */
    toHexString(omitAlpha = false) {
        if (!this.isValid())
            return '#000000';
        return omitAlpha && this.alpha === 255
            ? `#${format(this.red)}${format(this.green)}${format(this.blue)}`
            : `#${format(this.red)}${format(this.green)}${format(this.blue)}${format(this.alpha)}`;
    }
}
RGBA.BLACK = RGBA.of({
    red: 0,
    green: 0,
    blue: 0,
    alpha: 255
});

const funcs = {
    /**
     * Empty function.
     */
    noop(..._) {
        //
    }
};

const defaultRandomGenerator = () => Math.floor(Math.random() * 0x100000000);
const randoms = {
    /**
     * generate random value in range [0, 1)
     *
     * @return value.
     */
    random(generator = defaultRandomGenerator) {
        return generator() / 0x100000000;
    },
    /**
     * generate interger random value in range [0, max]
     *
     * @return value.
     */
    randInt(max = 0xffffffff, generator = defaultRandomGenerator) {
        const value = (generator() / 0xffffffff) * max;
        return value > 0 ? Math.floor(value) : Math.ceil(value);
    },
    /**
     * generate interger random value in range [min, max]
     *
     * @return value.
     */
    randIntRange(min, max, generator = defaultRandomGenerator) {
        const m0 = min < max ? min : max;
        const m1 = min < max ? max : min;
        const diff = m1 - m0;
        return Math.floor((generator() / 0xffffffff) * diff) + m0;
    },
    /**
     * generate float random value in range [0, max]
     *
     * @return value.
     */
    randFloat(max = 1, generator = defaultRandomGenerator) {
        return (generator() / 0xffffffff) * max;
    },
    /**
     * generate float random value in range [min, max]
     *
     * @return value.
     */
    randFloatRange(min, max, generator = defaultRandomGenerator) {
        const m0 = min < max ? min : max;
        const m1 = min < max ? max : min;
        const diff = m1 - m0;
        return (generator() / 0xffffffff) * diff + m0;
    },
    shuffle(array, generator = defaultRandomGenerator) {
        const result = [...array];
        let { length } = result;
        if (length < 2)
            return result;
        while (length > 0) {
            length -= 1;
            const i = Math.floor(randoms.randIntRange(0, length, generator));
            const tmp = result[length];
            result[length] = result[i];
            result[i] = tmp;
        }
        return result;
    }
};

const web = {
    /**
     * Get CanvasRenderingContext2D from canvas element.
     *
     * @param canvas canvas element.
     * @param width context width.
     * @param height context height.
     * @returns context.
     */
    getContext2D(canvas, width, height) {
        const ct = canvas.getContext('2d');
        if (ct === null)
            throw new Error('cannot get context 2d');
        if (typeof width === 'number') {
            canvas.width = Math.max(numbers.ceil(width, 1), 1);
        }
        if (typeof height === 'number') {
            canvas.height = Math.max(numbers.ceil(height, 1), 1);
        }
        return ct;
    },
    /**
     * Create CanvasRenderingContext2D with size.
     *
     * @param width context width.
     * @param height context height.
     * @returns context.
     */
    createContext2D(width, height) {
        const cv = document.createElement('canvas');
        return web.getContext2D(cv, width, height);
    },
    /**
     * wrapper for document.getElementById.
     *
     * @param id element's id.
     * @return element.
     */
    getElement(id) {
        const e = document.getElementById(id);
        if (e === null)
            throw new Error(`element not found: id=${id}`);
        return e;
    },
    /**
     * wrapper for window.requestAnimationFrame.
     *
     * @param handler animation handler.
     * @param interval interval frame.
     */
    animate(handler, interval = 0, raf = window.requestAnimationFrame) {
        let count = 0;
        const loop = () => {
            count += 1;
            if (count > interval) {
                if (handler() === false)
                    return;
                count = 0;
            }
            raf(loop);
        };
        raf(loop);
    }
};

export { Angle, BaseObject, Point, RGBA, Rectangle, Size, compare, funcs, numbers, randoms, web };
