'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

(function (funcs) {
    /**
     * Empty function.
     */
    function noop() {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i] = arguments[_i];
        }
        //
    }
    funcs.noop = noop;
})(exports.funcs || (exports.funcs = {}));

// tslint:disable: no-unsafe-any
(function (numbers) {
    /**
     * Calculate the remainder like Python.
     *
     * @param a dividend.
     * @param b divisor. If it is 0 the result will always be NaN.
     * @returns result.
     */
    function modulo(a, b) {
        if (!Number.isFinite(+a) || !Number.isFinite(+b))
            return NaN;
        var c = +a;
        var d = +b;
        if (d === 0)
            return NaN;
        if (c === 0 || c === d || -c === d)
            return 0;
        if ((c > 0 && d > 0) || (c < 0 && d < 0))
            return c % d;
        return (c % d) + d;
    }
    numbers.modulo = modulo;
    /**
     * Return adjusted value between min value and max value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    function clamp(a, min, max) {
        if (!Number.isFinite(+a) ||
            !Number.isFinite(+min) ||
            !Number.isFinite(+max)) {
            return NaN;
        }
        var b = +a;
        var mi = +min;
        var ma = +max;
        return b < mi ? mi : b > ma ? ma : b;
    }
    numbers.clamp = clamp;
    /**
     * Wrapper for Math.floor with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    function floor(a, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return Number.isFinite(+a) ? Math.floor(a) : defaultValue;
    }
    numbers.floor = floor;
    /**
     * Wrapper for Math.ceil with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    function ceil(a, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return Number.isFinite(+a) ? Math.ceil(a) : defaultValue;
    }
    numbers.ceil = ceil;
    /**
     * Wrapper for Math.round with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    function round(a, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return Number.isFinite(+a) ? Math.round(a) : defaultValue;
    }
    numbers.round = round;
})(exports.numbers || (exports.numbers = {}));

(function (randoms) {
    function defaultRandomGenerator() {
        // tslint:disable-next-line:insecure-random
        return Math.floor(Math.random() * 0x100000000);
        // return [0, 0xffffffff]
    }
    /**
     * generate random value in range [0, 1)
     *
     * @return value.
     */
    function random(generator) {
        if (generator === void 0) { generator = defaultRandomGenerator; }
        return generator() / 0x100000000;
    }
    randoms.random = random;
    /**
     * generate interger random value in range [0, max]
     *
     * @return value.
     */
    function randInt(max, generator) {
        if (max === void 0) { max = 0xffffffff; }
        if (generator === void 0) { generator = defaultRandomGenerator; }
        var value = (generator() / 0xffffffff) * max;
        return value > 0 ? Math.floor(value) : Math.ceil(value);
    }
    randoms.randInt = randInt;
    /**
     * generate interger random value in range [min, max]
     *
     * @return value.
     */
    function randIntRange(min, max, generator) {
        if (generator === void 0) { generator = defaultRandomGenerator; }
        var m0 = min < max ? min : max;
        var m1 = min < max ? max : min;
        var diff = m1 - m0;
        return Math.floor((generator() / 0xffffffff) * diff) + m0;
    }
    randoms.randIntRange = randIntRange;
    /**
     * generate float random value in range [0, max]
     *
     * @return value.
     */
    function randFloat(max, generator) {
        if (max === void 0) { max = 1; }
        if (generator === void 0) { generator = defaultRandomGenerator; }
        return (generator() / 0xffffffff) * max;
    }
    randoms.randFloat = randFloat;
    /**
     * generate float random value in range [min, max]
     *
     * @return value.
     */
    function randFloatRange(min, max, generator) {
        if (generator === void 0) { generator = defaultRandomGenerator; }
        var m0 = min < max ? min : max;
        var m1 = min < max ? max : min;
        var diff = m1 - m0;
        return (generator() / 0xffffffff) * diff + m0;
    }
    randoms.randFloatRange = randFloatRange;
    function shuffle(array, generator) {
        if (generator === void 0) { generator = defaultRandomGenerator; }
        var result = array.slice();
        var length = result.length;
        if (length < 2)
            return result;
        while (length > 0) {
            length -= 1;
            var i = Math.floor(randIntRange(0, length, generator));
            var tmp = result[length];
            result[length] = result[i];
            result[i] = tmp;
        }
        return result;
    }
    randoms.shuffle = shuffle;
})(exports.randoms || (exports.randoms = {}));

(function (web) {
    /**
     * Get CanvasRenderingContext2D from canvas element.
     *
     * @param canvas canvas element.
     * @param width context width.
     * @param height context height.
     * @returns context.
     */
    function getContext2D(canvas, width, height) {
        var ct = canvas.getContext('2d');
        if (ct === null)
            throw new Error('cannot get context 2d');
        if (typeof width === 'number') {
            canvas.width = Math.max(exports.numbers.ceil(width, 1), 1);
        }
        if (typeof height === 'number') {
            canvas.height = Math.max(exports.numbers.ceil(height, 1), 1);
        }
        return ct;
    }
    web.getContext2D = getContext2D;
    /**
     * Create CanvasRenderingContext2D with size.
     *
     * @param width context width.
     * @param height context height.
     * @returns context.
     */
    function createContext2D(width, height) {
        var cv = document.createElement('canvas');
        return getContext2D(cv, width, height);
    }
    web.createContext2D = createContext2D;
    /**
     * wrapper for document.getElementById.
     *
     * @param id element's id.
     * @return element.
     */
    function getElement(id) {
        var e = document.getElementById(id);
        if (e === null)
            throw new Error("element not found: id=" + id);
        return e;
    }
    web.getElement = getElement;
    /**
     * wrapper for window.requestAnimationFrame.
     *
     * @param handler animation handler.
     * @param interval interval frame.
     */
    function animate(handler, interval, raf) {
        if (interval === void 0) { interval = 0; }
        if (raf === void 0) { raf = window.requestAnimationFrame; }
        var count = 0;
        function loop() {
            count += 1;
            if (count > interval) {
                if (handler() === false)
                    return;
                count = 0;
            }
            raf(loop);
        }
        raf(loop);
    }
    web.animate = animate;
})(exports.web || (exports.web = {}));
