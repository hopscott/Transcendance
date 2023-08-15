import { Point } from './point.model';

export class Paddle {
	// Define paddle properties and calculations here
	private Width: number;
	private Height: number;
	private Speed: number;
	private Pos: Point;

	constructor(boolean: boolean) {
	  this.Width = 20;
	  this.Height = 80;
	  this.Speed = 10;
	  if (boolean === true) {
		this.Pos = new Point(20, 110);
	  } else {
		this.Pos = new Point(580, 110);
	  }
	}
	
	getWidth(): number {
	  return this.Width;
	}
	getHeight(): number {
	  return this.Height;
	}
	getSpeed(): number {
	  return this.Speed;
	}
	getPos(): Point {
	  return this.Pos;
  	}
}