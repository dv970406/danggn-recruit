import { getRgbByHex, randomNumBetween } from "@/src/utils/func/random";

// Confetti 폭죽의 각각의 요소가 되는 컴포넌트
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
    // 분사 범위의 각도를 나타냄
    this.angle = (Math.PI / 180) * randomNumBetween(deg - spread, deg + spread);

    // 반지름으로 요소가 갈 수 있는 최대 최소 거리의 범위를 나타냄
    this.r = randomNumBetween(30, 100);

    // 화면 크기 내에서만 움직일 수 있게 하기 위해 window객체값 사용
    this.x = innerWidth * x;
    this.y = innerHeight * y;

    // 뿜어져나가는 가속을 정함
    this.vx = this.r * Math.cos(this.angle);
    this.vy = this.r * Math.sin(this.angle);

    // 떨어지는 힘(gravity)과 나아가는 힘을 제지하는 마찰(friction)을 정함
    this.friction = 0.89;
    this.gravity = 0.5;

    // 폭죽 요소의 크기너비를 구함
    this.width = 15;
    this.height = 15;

    // 점점 투명하게 만들어야하므로 일단 최초에는 opacity를 1로 할당
    this.opacity = 1;

    this.widthDelta = randomNumBetween(0, 360);
    this.heightDelta = randomNumBetween(0, 360);

    // 폭죽 요소가 빙글빙글 돌면서 떨어지게 하기 위함
    this.rotation = randomNumBetween(0, 360);
    this.rotationDelta = randomNumBetween(-1, 1);

    // 폭죽 요소의 색깔로 랜덤으로 지정됨.
    // 당근컬러의 할당비율을 높여서 대부분 주황색이 되도록 할 것임
    this.color = color;

    // 랜덤으로 지정될 모양은 네모, 원 두가지가 있음
    this.shape = shape;
  }

  // requestAnimationFrame에 의해 계속 실행될 것임
  // 폭죽 요소가 발사되고 떨어지고 투명해지는 로직을 지정함
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

  // circle인 shape를 만듦
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

  // square인 shape를 만듦
  drawSquare(ctx: CanvasRenderingContext2D) {
    ctx.fillRect(
      this.x,
      this.y,
      this.width * Math.cos((Math.PI / 180) * this.widthDelta),
      this.height * Math.sin((Math.PI / 180) * this.heightDelta)
    );
  }

  // 요소를 만드는 함수임
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

    // rotate의 원위치를 위해서 reset시킨다.
    ctx.resetTransform();
  }
}
