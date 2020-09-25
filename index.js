'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var funcs = {
    /**
     * Empty function.
     */
    noop: function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i] = arguments[_i];
        }
        //
    }
};

var numbers = {
    /**
     * Calculate the remainder like Python.
     *
     * @param a dividend.
     * @param b divisor. If it is 0 the result will always be NaN.
     * @returns result.
     */
    modulo: function (a, b) {
        if (!Number.isFinite(a) || !Number.isFinite(b))
            return NaN;
        if (b === 0)
            return NaN;
        if (a === 0 || a === b || -a === b)
            return 0;
        if ((a > 0 && b > 0) || (a < 0 && b < 0))
            return a % b;
        return (a % b) + b;
    },
    /**
     * Return adjusted value between min value and max value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    clamp: function (a, min, max) {
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
    floor: function (a, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return Number.isFinite(a) ? Math.floor(a) : defaultValue;
    },
    /**
     * Wrapper for Math.ceil with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    ceil: function (a, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return Number.isFinite(+a) ? Math.ceil(a) : defaultValue;
    },
    /**
     * Wrapper for Math.round with fallback to default value.
     *
     * @param a target value.
     * @param defaultValue default value.
     */
    round: function (a, defaultValue) {
        if (defaultValue === void 0) { defaultValue = 0; }
        return Number.isFinite(+a) ? Math.round(a) : defaultValue;
    }
};

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

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var defaultRandomGenerator = function () {
    return Math.floor(Math.random() * 0x100000000);
};
var randoms = {
    /**
     * generate random value in range [0, 1)
     *
     * @return value.
     */
    random: function (generator) {
        if (generator === void 0) { generator = defaultRandomGenerator; }
        return generator() / 0x100000000;
    },
    /**
     * generate interger random value in range [0, max]
     *
     * @return value.
     */
    randInt: function (max, generator) {
        if (max === void 0) { max = 0xffffffff; }
        if (generator === void 0) { generator = defaultRandomGenerator; }
        var value = (generator() / 0xffffffff) * max;
        return value > 0 ? Math.floor(value) : Math.ceil(value);
    },
    /**
     * generate interger random value in range [min, max]
     *
     * @return value.
     */
    randIntRange: function (min, max, generator) {
        if (generator === void 0) { generator = defaultRandomGenerator; }
        var m0 = min < max ? min : max;
        var m1 = min < max ? max : min;
        var diff = m1 - m0;
        return Math.floor((generator() / 0xffffffff) * diff) + m0;
    },
    /**
     * generate float random value in range [0, max]
     *
     * @return value.
     */
    randFloat: function (max, generator) {
        if (max === void 0) { max = 1; }
        if (generator === void 0) { generator = defaultRandomGenerator; }
        return (generator() / 0xffffffff) * max;
    },
    /**
     * generate float random value in range [min, max]
     *
     * @return value.
     */
    randFloatRange: function (min, max, generator) {
        if (generator === void 0) { generator = defaultRandomGenerator; }
        var m0 = min < max ? min : max;
        var m1 = min < max ? max : min;
        var diff = m1 - m0;
        return (generator() / 0xffffffff) * diff + m0;
    },
    shuffle: function (array, generator) {
        if (generator === void 0) { generator = defaultRandomGenerator; }
        var result = __spreadArrays(array);
        var length = result.length;
        if (length < 2)
            return result;
        while (length > 0) {
            length -= 1;
            var i = Math.floor(randoms.randIntRange(0, length, generator));
            var tmp = result[length];
            result[length] = result[i];
            result[i] = tmp;
        }
        return result;
    }
};

var web = {
    /**
     * Get CanvasRenderingContext2D from canvas element.
     *
     * @param canvas canvas element.
     * @param width context width.
     * @param height context height.
     * @returns context.
     */
    getContext2D: function (canvas, width, height) {
        var ct = canvas.getContext('2d');
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
    createContext2D: function (width, height) {
        var cv = document.createElement('canvas');
        return web.getContext2D(cv, width, height);
    },
    /**
     * wrapper for document.getElementById.
     *
     * @param id element's id.
     * @return element.
     */
    getElement: function (id) {
        var e = document.getElementById(id);
        if (e === null)
            throw new Error("element not found: id=" + id);
        return e;
    },
    /**
     * wrapper for window.requestAnimationFrame.
     *
     * @param handler animation handler.
     * @param interval interval frame.
     */
    animate: function (handler, interval, raf) {
        if (interval === void 0) { interval = 0; }
        if (raf === void 0) { raf = window.requestAnimationFrame; }
        var count = 0;
        var loop = function () {
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

exports.funcs = funcs;
exports.numbers = numbers;
exports.randoms = randoms;
exports.web = web;
