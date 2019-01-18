export declare namespace web {
    /**
     * Get CanvasRenderingContext2D from canvas element.
     *
     * @param canvas canvas element.
     * @param width context width.
     * @param height context height.
     * @returns context.
     */
    function getContext2D(canvas: HTMLCanvasElement, width: number, height: number): CanvasRenderingContext2D;
    /**
     * Create CanvasRenderingContext2D with size.
     *
     * @param width context width.
     * @param height context height.
     * @returns context.
     */
    function createContext2D(width: number, height: number): CanvasRenderingContext2D;
    /**
     * wrapper for document.getElementById.
     *
     * @param id element's id.
     * @return element.
     */
    function getElement(id: string): HTMLElement;
    type Raf = (callback: FrameRequestCallback) => number;
    /**
     * wrapper for window.requestAnimationFrame.
     *
     * @param handler animation handler.
     * @param interval interval frame.
     */
    function animate(handler: (time?: number) => boolean, interval?: number, raf?: Raf): void;
}
