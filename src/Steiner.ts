import { Coordinates, SolutionPoint } from "./MyPoint";
import { getAngle } from "./utils";
import P5 from "p5";

class Steiner {
  _p5: P5;

  constructor(p5: P5) {
    this._p5 = p5;
  }

  solutionForThreePoints(x: number[], y: number[]): SolutionPoint {
    const lim = (Math.PI * 2) / 3;

    let angles = [
      Math.abs(
        getAngle(
          new Coordinates(x[0], y[0]),
          new Coordinates(x[1], y[1]),
          new Coordinates(x[2], y[2])
        )
      ),
      Math.abs(
        getAngle(
          new Coordinates(x[1], y[1]),
          new Coordinates(x[2], y[2]),
          new Coordinates(x[0], y[0])
        )
      ),
      Math.abs(
        getAngle(
          new Coordinates(x[2], y[2]),
          new Coordinates(x[1], y[1]),
          new Coordinates(x[0], y[0])
        )
      ),
    ];

    if (angles.filter((x: number) => x >= lim).length > 0) {
      const mx: number = Math.max(...angles);
      const index: number = angles.indexOf(mx);
      return new SolutionPoint(
        this._p5,
        new Coordinates(x[index], y[index]),
        10,
        false
      );
    } else {
      const r12: number = Math.sqrt((x[0] - x[1]) ** 2 + (y[0] - y[1]) ** 2);
      const r13: number = Math.sqrt((x[0] - x[2]) ** 2 + (y[0] - y[2]) ** 2);
      const r23: number = Math.sqrt((x[1] - x[2]) ** 2 + (y[1] - y[2]) ** 2);

      const s: number =
        x[0] * y[1] +
        x[1] * y[2] +
        x[2] * y[0] -
        x[0] * y[2] -
        x[2] * y[1] -
        x[1] * y[0];
      const k1: number =
        (Math.sqrt(3) / 2) * (r12 ** 2 + r13 ** 2 - r23 ** 2) + Math.abs(s);
      const k2: number =
        (Math.sqrt(3) / 2) * (r23 ** 2 + r12 ** 2 - r13 ** 2) + Math.abs(s);
      const k3: number =
        (Math.sqrt(3) / 2) * (r13 ** 2 + r23 ** 2 - r12 ** 2) + Math.abs(s);
      const d: number = (1 / Math.sqrt(3)) * (k1 + k2 + k3);
      const Px: number =
        ((k1 * k2 * k3) / (2 * Math.sqrt(3) * Math.abs(s) * d)) *
        (x[0] / k1 + x[1] / k2 + x[2] / k3);
      const Py: number =
        ((k1 * k2 * k3) / (2 * Math.sqrt(3) * Math.abs(s) * d)) *
        (y[0] / k1 + y[1] / k2 + y[2] / k3);

      return new SolutionPoint(this._p5, new Coordinates(Px, Py), 15, true);
    }
  }
}

export { Steiner };
