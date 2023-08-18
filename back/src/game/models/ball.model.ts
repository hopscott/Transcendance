import { Vector } from './vector.model';
import { Point } from './point.model';
import { GameBoard } from './gameboard.model';

export class Ball {
	// Define ball properties and calculations here
	private Size: number;
	private Speed: Vector;
	private Pos: Point;
	private AccelarationFactor: number;
	private dir: Vector;
  
	constructor(gameboard: GameBoard) {
	  this.Size = 20;
	  this.Speed = new Vector(2, 2);
	  this.Pos = new Point(gameboard.width * 0.5, gameboard.height * 0.5);
	  this.AccelarationFactor = 1;
    const randomAngle = Math.random() * (Math.PI / 3) - Math.PI / 6;
    const randomX = Math.random() < 0.5 ? -1 : 1;
    const randomY = Math.random() < 0.5 ? -1 : 1;
	  this.dir = new Vector(2, 2);
	}

	getDir(): Vector {
	  return this.dir;
	}
	getPos(): Point {
	  return this.Pos;
	}
	getSize(): number {
	  return this.Size;
	}
	getSpeed(): Vector {
	  return this.Speed;
	}
	getAccelarationFactor(): number {
	  return this.AccelarationFactor;
	}
	setDir(dir: Vector): void {
	  this.dir = dir;
  	}
  	setPos(pos: Point): void {
	  this.Pos = pos;
	}
	setAccelarationFactor(accelarationFactor: number): void {
	  this.AccelarationFactor = accelarationFactor;
	}
	setSpeed(x: number, y: number): void {
	  this.Speed = new Vector(x, y);
	}
}