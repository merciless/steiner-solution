import { Coordinates } from "./MyPoint";

function getAngle(
  first: Coordinates,
  second: Coordinates,
  third: Coordinates
): number {
  const x1 = second.x - first.x;
  const x2 = third.x - first.x;
  const y1 = second.y - first.y;
  const y2 = third.y - first.y;
  const d1 = Math.sqrt(x1 ** 2 + y1 ** 2);
  const d2 = Math.sqrt(x2 ** 2 + y2 ** 2);

  return Math.acos((x1 * x2 + y1 * y2) / (d1 * d2));
}

export { getAngle };
