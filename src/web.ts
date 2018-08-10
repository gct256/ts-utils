export namespace web {
  /**
   * Create CanvasRenderingContext2D with size.
   *
   * @param width context width.
   * @param height context height.
   * @returns context.
   */
  export function createContext2D(
    width: number,
    height: number
  ): CanvasRenderingContext2D {
    const cv: HTMLCanvasElement = document.createElement('canvas');
    const ct: CanvasRenderingContext2D | null = cv.getContext('2d');
    if (ct === null) throw new Error('cannot create context 2d');

    cv.width = width;
    cv.height = height;

    return ct;
  }

  /**
   * wrapper for document.getElementById.
   *
   * @param id element's id.
   * @return element.
   */
  export function getElement(id: string): HTMLElement {
    const e: HTMLElement | null = document.getElementById(id);
    if (e === null) throw new Error(`element not found: id=${id}`);

    return e;
  }

  type Raf = (callback: FrameRequestCallback) => number;

  /**
   * wrapper for window.requestAnimationFrame.
   *
   * @param handler animation handler.
   * @param interval interval frame.
   */
  export function animate(
    handler: (time?: number) => boolean,
    interval: number = 0,
    raf: Raf = window.requestAnimationFrame
  ): void {
    let count: number = 0;

    function loop(): void {
      count += 1;
      if (count > interval) {
        if (handler() === false) return;
        count = 0;
      }
      raf(loop);
    }

    raf(loop);
  }
}
