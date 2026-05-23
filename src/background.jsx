import { useEffect, useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
class Particle {
  // @ts-ignore
  constructor(canvas) {
    this.canvas = canvas;
    this.reset();
  }
  reset() {
    const { width, height } = this.canvas;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
    this.opacity = Math.random() * 0.6 + 0.2;
    this.hue = Math.random() * 60 + 180;
  }
  update() {
    // @ts-ignore
    this.x += this.speedX;
    // @ts-ignore
    this.y += this.speedY;
    const { width, height } = this.canvas;
    // @ts-ignore
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height)
      this.reset();
  }
  // @ts-ignore
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 90%, 75%, ${this.opacity})`;
    ctx.fill();
  }
}

export default function AnimatedBackground() {
  const matches = useMediaQuery("(min-width:600px)");
  function ParticleCanvas() {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
      const canvas = canvasRef.current;
      // @ts-ignore
      const ctx = canvas.getContext("2d");

      const resize = () => {
        // @ts-ignore
        canvas.width = canvas.offsetWidth;
        // @ts-ignore
        canvas.height = canvas.offsetHeight;
        // @ts-ignore
        particlesRef.current = matches
          ? Array.from({ length: 500 }, () => new Particle(canvas))
          : Array.from({ length: 100 }, () => new Particle(canvas));
      };
      resize();
      window.addEventListener("resize", resize);

      // @ts-ignore
      canvas.addEventListener("mousemove", (e) => {
        // @ts-ignore
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      });
      // @ts-ignore
      canvas.addEventListener("mouseleave", () => {
        mouseRef.current = { x: -9999, y: -9999 };
      });

      const loop = () => {
        // @ts-ignore
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // @ts-ignore
        const particles = particlesRef.current;
        const mouse = mouseRef.current;

        for (let i = 0; i < particles.length; i++) {
          // draw connections between nearby particles
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(120,200,255,${(1 - dist / 120) * 0.25})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
          // mouse repulsion
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150 && mdist > 0) {
            const force = (150 - mdist) / 150;
            particles[i].x += (mdx / mdist) * force * 2;
            particles[i].y += (mdy / mdist) * force * 2;
          }
          particles[i].update();
          particles[i].draw(ctx);
        }
        // @ts-ignore
        animRef.current = requestAnimationFrame(loop);
      };
      loop();

      return () => {
        // @ts-ignore
        cancelAnimationFrame(animRef.current);
        window.removeEventListener("resize", resize);
      };
    }, []);

    return (
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    );
  }
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100vh",
        background:
          "linear-gradient(135deg,#020817 0%,#0a1628 50%,#060d1f 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        zIndex: "-1",
        top: "0",
        left: "0",
      }}
    >
      {/* grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(120,200,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(120,200,255,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <ParticleCanvas />
    </div>
  );
}
