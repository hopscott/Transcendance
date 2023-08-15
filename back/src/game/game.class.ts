import { GameBoard } from './models/gameboard.model';
import { Ball } from './models/ball.model';
import { Paddle } from './models/paddle.model';
import { Vector } from './models/vector.model';
import { Point } from './models/point.model';
import { Player } from './models/player.model';

const MIN_REFLECTION_ANGLE = Math.PI / 3;

// Define GameProperties class and interfaces as needed
class GameProperties {
	// Define game properties and calculations here
	private GameBoard: GameBoard;
	private Ball: Ball;
	private Paddle1: Paddle;
  private Paddle2: Paddle;
  private Player1Score: number;
  private Player2Score: number;
  public tCreate = Date.now();
  public tStart = Date.now();;
  public id: number;
  public status = 'pending';
  public room: string;
  public player1: Player;
  public player2: Player;

	constructor(    
    id: number,
    player1Id: number,
    player2Id: number,
    room: string) {
    this.id = id;
    this.room = room;
    this.player1 = new Player(player1Id);
    this.player2 = new Player(player2Id);
		this.GameBoard = new GameBoard();
		this.Ball = new Ball();
		this.Paddle1 = new Paddle(true);
    this.Paddle2 = new Paddle(false);
    this.Player1Score = 0;
    this.Player2Score = 0;
	}

  resetBall(n: boolean): void {
    this.Ball.setAccelarationFactor(1);
    const randomY = Math.random() * 300;
    const ifUpperHalf = randomY < 150;

    this.Ball.setPos(new Point(300, randomY));
    if (n === true) {
      this.Ball.setDir(new Vector(-2, ifUpperHalf ? 2 : -2));
    } else {
      this.Ball.setDir(new Vector(2, ifUpperHalf ? 2 : -2));
    }
    this.Ball.setSpeed(2, 2);
  }

  updateScore(n: boolean): void {
    if (n === true) {
      this.Player1Score++;
    } else {
      this.Player2Score++;
    }
  }

  calculateAngle = (hitPoint: number, paddleTop: number, paddleHeight: number) => {
    // Normalize the hit point to a value between -1 and 1
    const normalizedHitPoint = 2 * (hitPoint - paddleTop) / paddleHeight - 1;

    // Use a quadratic function to calculate the angle
    let angle = normalizedHitPoint * normalizedHitPoint * Math.PI / 4;

    if (Math.abs(angle) < MIN_REFLECTION_ANGLE) {
      angle = angle < 0 ? -MIN_REFLECTION_ANGLE : MIN_REFLECTION_ANGLE;
    }

    return angle;
  };

  calculateSpeed = (angle: number, currentSpeed: number) => {
    const xspeed = Math.cos(angle) * currentSpeed;
    const yspeed = Math.sin(angle) * currentSpeed;

    return new Vector(xspeed, yspeed);
  };

	updateBallPosition(): void {
		let newPosx = this.Ball.getPos().x + this.Ball.getDir().x * this.Ball.getSpeed().x;
		let newPosy = this.Ball.getPos().y + this.Ball.getDir().y * this.Ball.getSpeed().y;

    if (newPosy - this.Ball.getSize() / 2 <= 0 || newPosy + this.Ball.getSize() / 2 >= this.GameBoard.getHeight()) {
      this.Ball.setDir(new Vector(this.Ball.getDir().x, -this.Ball.getDir().y));
    } else {
      this.Ball.setPos(new Point(newPosx, newPosy));
    }

    if (newPosx - this.Ball.getSize() / 2 <= 0 ) {
      this.resetBall(true);
      this.updateScore(false);
    } else if (newPosx + this.Ball.getSize() / 2 >= this.GameBoard.getWidth()) {
      this.resetBall(false);
      this.updateScore(true);
    } else if ((this.Ball.getSpeed().x < 0 && newPosx - this.Ball.getSize() / 2 <= this.Paddle1.getPos().y && newPosy + this.Ball.getSize() / 2 >= this.Paddle1.getPos().y && newPosy - this.Ball.getSize() / 2 <= this.Paddle1.getPos().y + this.Paddle1.getHeight()) || 
    (this.Ball.getSpeed().x > 0 && newPosx + this.Ball.getSize() / 2 >= this.GameBoard.getWidth() - this.Paddle2.getPos().y && newPosy + this.Ball.getSize() / 2 >= this.Paddle2.getPos().y && newPosy - this.Ball.getSize() / 2 <= this.Paddle2.getPos().y + this.Paddle2.getHeight())) {
        const incidentAngle = Math.atan2(this.Ball.getDir().y, this.Ball.getDir().x);
        const paddleY = this.Ball.getSpeed().x < 0 ? this.Paddle1.getPos().y : this.Paddle2.getPos().y;
        const reflectionModifier = this.calculateAngle(newPosy, paddleY, 80);
        const reflectionAngle = incidentAngle + reflectionModifier;
        const currentSpeedMagnitude = Math.sqrt(this.Ball.getDir().x * this.Ball.getDir().x + this.Ball.getDir().y * this.Ball.getDir().y);
        const newSpeed = this.calculateSpeed(reflectionAngle, currentSpeedMagnitude);
        this.Ball.setAccelarationFactor(this.Ball.getAccelarationFactor() + 0.2);
        this.Ball.setSpeed(
        (this.Ball.getSpeed().x < 0 ? Math.abs(newSpeed.x) : -Math.abs(newSpeed.x)) * this.Ball.getAccelarationFactor(),
        newSpeed.y * this.Ball.getAccelarationFactor());
    } else {
      this.Ball.setPos(new Point(newPosx, newPosy));
    }
  }
};
