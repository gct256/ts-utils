declare type FrameRequestCallback = (time: number) => void;
export declare type Raf = (callback: FrameRequestCallback) => number;
export declare const web: {
    /**
     * Get CanvasRenderingContext2D from canvas element.
     *
     * @param canvas canvas element.
     * @param width context width.
     * @param height context height.
     * @returns context.
     */
    getContext2D(canvas: HTMLCanvasElement, width?: number | undefined, height?: number | undefined): CanvasRenderingContext2D;
    /**
     * Create CanvasRenderingContext2D with size.
     *
     * @param width context width.
     * @param height context height.
     * @returns context.
     */
    createContext2D(width: number, height: number): CanvasRenderingContext2D;
    /**
     * wrapper for document.getElementById.
     *
     * @param id element's id.
     * @return element.
     */
    getElement(id: string): HTMLElement;
    /**
     * wrapper for window.requestAnimationFrame.
     *
     * @param handler animation handler.
     * @param interval interval frame.
     */
    animate(handler: (time?: number | undefined) => boolean, interval?: number, raf?: Raf): void;
};
export {};
