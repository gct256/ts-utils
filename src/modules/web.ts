import { numbers } from './numbers';

type FrameRequestCallback = (time: number) => void;
export type Raf = (callback: FrameRequestCallback) => number;

export const web = {
  /**
   * Get CanvasRenderingContext2D from canvas element.
   *
   * @param canvas canvas element.
   * @param width context width.
   * @param height context height.
   * @returns context.
   */
  getContext2D(
    canvas: HTMLCanvasElement,
    width?: number,
    height?: number
  ): CanvasRenderingContext2D {
    const ct: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (ct === null) throw new Error('cannot get context 2d');

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
  createContext2D(width: number, height: number): CanvasRenderingContext2D {
    const cv: HTMLCanvasElement = document.createElement('canvas');

    return web.getContext2D(cv, width, height);
  },

  /**
   * wrapper for document.getElementById.
   *
   * @param id element's id.
   * @return element.
   */
  getElement(id: string): HTMLElement {
    const e: HTMLElement | null = document.getElementById(id);

    if (e === null) throw new Error(`element not found: id=${id}`);

    return e;
  },

  /**
   * wrapper for window.requestAnimationFrame.
   *
   * @param handler animation handler.
   * @param interval interval frame.
   */
  animate(
    handler: (time?: number) => boolean,
    interval = 0,
    raf: Raf = window.requestAnimationFrame
  ): void {
    let count = 0;

    const loop = (): void => {
      count += 1;

      if (count > interval) {
        if (handler() === false) return;
        count = 0;
      }
      raf(loop);
    };

    raf(loop);
  }
};
