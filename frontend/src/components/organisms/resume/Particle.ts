import { getRgbByHex, randomNumBetween } from "@/src/utils/func/random";

export default class Particle {
  x: number;
  y: number;
  width: number;
  height: number;
  r: number;
  vx: number;
  vy: number;
  friction: number;
  gravity: number;
  angle: number;
  opacity: number;
  widthDelta: number;
  heightDelta: number;
  rotation: number;
  rotationDelta: number;
  color: string;
  shape: string;
  constructor(
    x: number,
    y: number,
    deg = 0,
    color: string,
    shape: string,
    spread = 30
  ) {
    this.angle = (Math.PI / 180) * randomNumBetween(deg - spread, deg + spread);
    this.r = randomNumBetween(30, 100);
    this.x = innerWidth * x;
    this.y = innerHeight * y;

    this.vx = this.r * Math.cos(this.angle);
    this.vy = this.r * Math.sin(this.angle);

    this.friction = 0.89;
    this.gravity = 0.5;

    this.width = 15;
    this.height = 15;

    this.opacity = 1;

    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);

    this.rotation = randomNumBetween(0, 360);
    this.rotationDelta = randomNumBetween(-1, 1);

    this.color = color;

    this.shape = shape;
  }
  update() {
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    this.opacity -= 0.005;

    this.widthDelta += 2;
    this.heightDelta += 2;

    this.rotation += this.rotationDelta;
  }
  drawCircle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      Math.abs(this.width * Math.cos((Math.PI / 180) * this.widthDelta)) / 2,
      Math.abs(this.height * Math.sin((Math.PI / 180) * this.heightDelta)) / 2,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();
  }
  drawSquare(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta)
    );
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2);
    ctx.rotate((Math.PI / 180) * this.rotation);
    ctx.translate(-this.x - this.width * 1.2, -this.y - this.height * 1.2);

    const { r, g, b } = getRgbByHex(this.color);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;

    if (this.shape === "square") {
      this.drawSquare(ctx);
    } else {
      this.drawCircle(ctx);
    }

    ctx.resetTransform();
  }
}
