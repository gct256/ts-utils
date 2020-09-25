import { web, Raf } from '../src/web';

describe('web', () => {
  test('getContext2D', () => {
    const canvas: HTMLCanvasElement = document.createElement('canvas');

    expect(web.getContext2D(canvas, 12, 34)).toBeInstanceOf(Object);
    expect(web.getContext2D(canvas, 12, 34).canvas.width).toBe(12);
    expect(web.getContext2D(canvas, 12, 34).canvas.height).toBe(34);

    canvas.width = 56;
    canvas.height = 78;
    expect(web.getContext2D(canvas).canvas.width).toBe(56);
    expect(web.getContext2D(canvas).canvas.height).toBe(78);

    expect(web.getContext2D(canvas, 12.1, 34.1).canvas.width).toBe(13);
    expect(web.getContext2D(canvas, 12.1, 34.1).canvas.height).toBe(35);

    expect(web.getContext2D(canvas, 12.9, 34.9).canvas.width).toBe(13);
    expect(web.getContext2D(canvas, 12.9, 34.9).canvas.height).toBe(35);

    expect(web.getContext2D(canvas, 0, 0).canvas.width).toBe(1);
    expect(web.getContext2D(canvas, 0, 0).canvas.height).toBe(1);

    expect(web.getContext2D(canvas, -42, -42).canvas.width).toBe(1);
    expect(web.getContext2D(canvas, -42, -42).canvas.height).toBe(1);
  });

  test('createContext2D', () => {
    expect(web.createContext2D(12, 34)).toBeInstanceOf(Object);

    expect(web.createContext2D(12, 34).canvas.width).toBe(12);
    expect(web.createContext2D(12, 34).canvas.height).toBe(34);

    expect(web.createContext2D(12.1, 34.1).canvas.width).toBe(13);
    expect(web.createContext2D(12.1, 34.1).canvas.height).toBe(35);

    expect(web.createContext2D(12.9, 34.9).canvas.width).toBe(13);
    expect(web.createContext2D(12.9, 34.9).canvas.height).toBe(35);

    expect(web.createContext2D(0, 0).canvas.width).toBe(1);
    expect(web.createContext2D(0, 0).canvas.height).toBe(1);

    expect(web.createContext2D(-42, -42).canvas.width).toBe(1);
    expect(web.createContext2D(-42, -42).canvas.height).toBe(1);
  });

  test('getElement', () => {
    document.body.innerHTML = '<div id="root">Root</div>';
    expect(web.getElement('root')).toBeInstanceOf(HTMLElement);
    expect(() => web.getElement('no-element')).toThrow();
  });

  describe('animate', () => {
    test('default', () => {
      let count1 = 0;
      let count2 = 0;

      const raf: Raf = (callback) => {
        count1 += 1;
        callback(0);

        return 0;
      };

      const handler = (): boolean => {
        count2 += 1;

        return count2 < 10;
      };

      web.animate(handler, 0, raf);
      expect(count1).toBe(10);
      expect(count2).toBe(10);
    });

    test('with interval', () => {
      let count1 = 0;
      let count2 = 0;

      const raf: Raf = (callback) => {
        count1 += 1;
        callback(0);

        return 0;
      };

      const handler = (): boolean => {
        count2 += 1;

        return count2 < 10;
      };

      web.animate(handler, 5, raf);
      expect(count1).toBe(60);
      expect(count2).toBe(10);
    });
  });
});
