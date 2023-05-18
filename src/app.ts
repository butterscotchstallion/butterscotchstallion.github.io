import BouncyLogo from "./components/bouncy-logo";

window.addEventListener("DOMContentLoaded", async () => {
    // Object.assign will not accept HTMLCanvasElement :(
    const canvasEl: any = document.getElementById("canvas");
    const canvas = Object.assign(canvasEl, {
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const { update, draw } = await BouncyLogo(canvas);
    
    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }
    animate();
});