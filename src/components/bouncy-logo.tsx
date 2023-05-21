import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';

const useCanvas = (callback: Function) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext('2d');
    callback([canvas, ctx]);
  }, []);

  return canvasRef;
};

export default function BouncyLogo() {
  let canvasObj: any;
  let ctx: CanvasRenderingContext2D;
  const canvasRef = useCanvas(([canvas, _ctx]: any) => {
    canvasObj = canvas;
    ctx = _ctx;
  });
  const randomDirection = Math.random() < 0.5 ? -1 : 1;
  const logoWidth = 210;
  const logoHeight = 180;
  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;
  let speed = 3;
  let x = (canvasWidth - 20) / 2;
  let y = (canvasHeight - 20) / 2;
  let directionX = randomDirection;
  let directionY = randomDirection;
  let color = '#fff';

  const resizeListener = () => {
    return debounce(() => {
      setCanvasDimensions();
    }, 1000);
  };

  useEffect(() => {
    console.log('initializing bouncy logo!');

    if (canvasObj) {
      init();
    }

    return function cleanup() {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const init = () => {
    setCanvasDimensions();
    animate();
    window.addEventListener('resize', resizeListener);
  };

  function animate() {
    update();
    draw();
    requestAnimationFrame(() => {
      animate();
    });
  }

  function setCanvasDimensions() {
    canvasObj.width = canvasWidth;
    canvasObj.height = canvasHeight;
  }

  const update = () => {
    [x, y] = [x + speed * directionX, y + speed * directionY];
    const isOutOfBoundsX = x <= 0 || x + logoWidth >= canvasWidth;
    const isOutOfBoundsY = y <= 0 || y + logoHeight >= canvasHeight;

    if (isOutOfBoundsX || isOutOfBoundsY) {
      changeColor();
    }

    [directionX, directionY] = [
      isOutOfBoundsX ? -directionX : directionX,
      isOutOfBoundsY ? -directionY : directionY,
    ];
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // Commas replaced with spaces for Firefox - seemingly no effect
    const p: any = new Path2D(
      `M118.895 20.346c0 0-13.743 16.922-13.04 18.001c0.975-1.079-4.934-18.186-4.934-18.186s-1.233-3.597-5.102-15.387H81.81H47.812H22.175l-2.56 11.068h19.299h4.579c12.415 0 19.995 5.132 17.878 14.225c-2.287 9.901-13.123 14.128-24.665 14.128H32.39l5.552-24.208H18.647l-8.192 35.368h27.398c20.612 0 40.166-11.067 43.692-25.288c0.617-2.614 0.53-9.185-1.054-13.053c0-0.093-0.091-0.271-0.178-0.537c-0.087-0.093-0.178-0.722 0.178-0.814c0.172-0.092 0.525 0.271 0.525 0.358c0 0 0.179 0.456 0.351 0.813l17.44 50.315l44.404-51.216l18.761-0.092h4.579c12.424 0 20.09 5.132 17.969 14.225c-2.29 9.901-13.205 14.128-24.75 14.128h-4.405L161 19.987h-19.287l-8.198 35.368h27.398c20.611 0 40.343-11.067 43.604-25.288c3.347-14.225-11.101-25.293-31.89-25.293h-18.143h-22.727C120.923 17.823 118.895 20.346 118.895 20.346L118.895 20.346z"/><path d="M99.424 67.329C47.281 67.329 5 73.449 5 81.012c0 7.558 42.281 13.678 94.424 13.678c52.239 0 94.524-6.12 94.524-13.678C193.949 73.449 151.664 67.329 99.424 67.329z M96.078 85.873c-11.98 0-21.58-2.072-21.58-4.595c0-2.523 9.599-4.59 21.58-4.59c11.888 0 21.498 2.066 21.498 4.59C117.576 83.801 107.966 85.873 96.078 85.873z`
    );
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.setTransform(1, 0, 0, 1, x, y);
    ctx.stroke(p);
    ctx.fill(p);
  };

  const changeColor = () => {
    // Random pastel color
    color = `hsla(${~~(360 * Math.random())}, 70%,  72%, 0.8)`;
  };

  return <canvas ref={canvasRef} />;
}
