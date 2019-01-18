import { web } from '../src/web';

describe('web', () => {
  test('getContext2D', () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    expect(web.getContext2D(canvas, 12, 34)).toBeInstanceOf(Object);
    expect(web.getContext2D(canvas, 12, 34).canvas.width).toBe(12);
    expect(web.getContext2D(canvas, 12, 34).canvas.height).toBe(34);
  });

  test('createContext2D', () => {
    expect(web.createContext2D(12, 34)).toBeInstanceOf(Object);
    expect(web.createContext2D(12, 34).canvas.width).toBe(12);
    expect(web.createContext2D(12, 34).canvas.height).toBe(34);
  });

  test('getElement', () => {
    document.body.innerHTML = '<div id="root">Root</div>';
    expect(web.getElement('root')).toBeInstanceOf(HTMLElement);
    expect(() => web.getElement('no-element')).toThrow();
  });

  describe('animate', () => {
    test('default', () => {
      let count1: number = 0;
      let count2: number = 0;
      function raf(callback: FrameRequestCallback): number {
        count1 += 1;
        callback(0);

        return 0;
      }

      function handler(): boolean {
        count2 += 1;
        return count2 < 10;
      }

      web.animate(handler, 0, raf);
      expect(count1).toBe(10);
      expect(count2).toBe(10);
    });

    test('with interval', () => {
      let count1: number = 0;
      let count2: number = 0;
      function raf(callback: FrameRequestCallback): number {
        count1 += 1;
        callback(0);

        return 0;
      }

      function handler(): boolean {
        count2 += 1;
        return count2 < 10;
      }

      web.animate(handler, 5, raf);
      expect(count1).toBe(60);
      expect(count2).toBe(10);
    });
  });
});
