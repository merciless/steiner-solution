import P5 from "p5";

class Coordinates {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class MyPoint {
  _p5: P5;
  _pos: Coordinates;
  _size: number;

  constructor(p5: P5, at: Coordinates, radius: number) {
    this._p5 = p5;
    this._pos = at;
    this._size = radius;
  }

  text(i: number): void {
    const p5 = this._p5;

    p5.push();
    p5.stroke(0);
    p5.strokeWeight(0);
    p5.text(`P${i + 1}`, this._pos.x + 5, this._pos.y + 5);

    p5.pop();
  }

  draw(): void {
    const p5 = this._p5;

    p5.push();

    p5.fill(0);
    p5.noStroke();
    p5.ellipse(this._pos.x, this._pos.y, this._size);

    p5.pop();
  }
}

class SolutionPoint {
  _p5: P5;
  _pos: Coordinates;
  _size: number;
  _ok: boolean;

  constructor(p5: P5, at: Coordinates, radius: number, ok: boolean) {
    this._p5 = p5;
    this._pos = at;
    this._size = radius;
    this._ok = ok;
  }

  text(i: number): void {
    const p5 = this._p5;

    p5.push();
    p5.stroke(0);
    p5.strokeWeight(0);
    p5.text(`O`, this._pos.x + 5, this._pos.y + 5);

    p5.pop();
  }

  draw(): void {
    const p5 = this._p5;

    p5.push();
    p5.fill("red");
    p5.noStroke();
    p5.ellipse(this._pos.x, this._pos.y, this._size);

    p5.pop();
  }
}

export { Coordinates, MyPoint, SolutionPoint };
