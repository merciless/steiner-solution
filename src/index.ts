import P5 from "p5";
import "p5/lib/addons/p5.dom";
import p5 from "p5";

import { Coordinates, MyPoint, SolutionPoint } from "./MyPoint";
import { Steiner } from "./Steiner";

const sketch = (p5: P5): void => {
  let _width: number;
  let _height: number;

  let points: MyPoint[] = [];

  const clear = (): void => {
    points = [];
    solution = null;
    p5.clear();
  };

  const drawGrid = (): void => {
    const w: number = _width / 60;
    const c: P5.Color = p5.color(0, 0, 0, 15);

    p5.push();

    p5.strokeWeight(1);
    p5.stroke(c);

    for (let x = 0; x < _width; x += w) {
      p5.line(x, 0, x, _height);
    }

    for (let y = 0; y < _width; y += w) {
      p5.line(0, y, _width, y);
    }

    p5.text(`Нажмите SPACE чтобы очистить поле`, 10, 15);
    p5.text(`Точка Штейнера обозначена красным цветом`, 10, 30);

    p5.pop();
  };

  p5.setup = (): void => {
    _width = p5.windowWidth;
    _height = p5.windowHeight;
    p5.createCanvas(_width, _height);
  };

  p5.draw = (): void => {
    p5.background(255);

    drawGrid();

    points.forEach((point: MyPoint, index: number) => {
      if (solution) {
        p5.strokeWeight(2);
        p5.stroke(235, 81, 96, 60);

        p5.line(point._pos.x, point._pos.y, solution._pos.x, solution._pos.y);
      }
      point.draw();
      point.text(index);
    });

    if (solution) {
      solution.draw();
    }
  };

  p5.mouseClicked = (): void => {
    if (points.length >= 3) {
      points.shift();
    }

    const coordinates: Coordinates = new Coordinates(p5.mouseX, p5.mouseY);
    points.push(new MyPoint(p5, coordinates, 10));

    if (points.length < 3) {
      return;
    }

    solution = steiner.solutionForThreePoints(
      new Array(3).fill(null).map((el: number, i: number) => points[i]._pos.x),
      new Array(3).fill(null).map((el: number, i: number) => points[i]._pos.y)
    );
  };

  p5.windowResized = (): void => {
    _width = p5.windowWidth;
    _height = p5.windowHeight;
    p5.resizeCanvas(_width, _height);
  };

  p5.keyPressed = (): boolean => {
    if (p5.keyCode == 32) {
      clear();
    }

    return false;
  };
};

let s = new p5(sketch);
let steiner = new Steiner(s);
let solution: SolutionPoint;

console.log("🚀 - app is running");
