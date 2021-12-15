import { PointData } from './PointData';
import { SizeData } from './SizeData';

/** Rectangle data type. */
export type RectangleData = PointData &
  SizeData & {
    /** X coordinate of the left edge. */
    readonly left: number;
    /** X coordinate of the right edge. */
    readonly right: number;
    /** Y coordinate of the top edge. */
    readonly top: number;
    /** Y coordinate of the bottom edge. */
    readonly bottom: number;
  };
