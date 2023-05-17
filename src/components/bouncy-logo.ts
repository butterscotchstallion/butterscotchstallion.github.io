import { Canvg } from 'canvg';

export default async function BouncyLogo(canvas: any) {
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    const randomDirection = Math.random() < 0.5 ? -1 : 1;
    const size = 250;
    let speed = 5;
    let x = (canvas.width - 20) / 2;
    let y = (canvas.height - 20) / 2;
    let directionX = randomDirection;
    let directionY = randomDirection;

    const update = () => {
      [x, y] = [
        x + speed * directionX,
        y + speed * directionY,
      ];
      [directionX, directionY] = [
        x <= 0 || x + size >= canvas.width
          ? -directionX
          : directionX,
        y <= 0 || y + size >= canvas.height
          ? -directionY
          : directionY,
      ];
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "maroon";
      ctx.fillRect(x, y, size, size);
    };

    return {
      draw: draw,
      update: update,
      ctx: ctx
    };
  }