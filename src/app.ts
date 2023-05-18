import BouncyLogo from "./components/bouncy-logo";
import { debounce } from "lodash";

window.addEventListener("DOMContentLoaded", async () => {
    // Object.assign will not accept HTMLCanvasElement :(
    const canvasEl: any = document.getElementById("canvas");
    const canvas = Object.assign(canvasEl, {
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const { update, draw, changeColor } = await BouncyLogo(canvas);
    
    function setCanvasDimensions() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', debounce(() => {
        setCanvasDimensions();
    }, 1000))
});