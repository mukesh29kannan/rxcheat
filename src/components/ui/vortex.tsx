"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useCallback } from "react";
import { createNoise3D } from "simplex-noise";
import { motion } from "framer-motion";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

export const Vortex = ({
  children,
  className,
  containerClassName,
  particleCount = 700,
  rangeY = 100,
  baseHue = 220,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  backgroundColor = "#000000",
}: VortexProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const noise3D = createNoise3D();
  const tick = useRef(0);
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  const particleProps = useRef(new Float32Array(particlePropsLength));
  const center = useRef<[number, number]>([0, 0]);

  const HALF_PI = 0.5 * Math.PI;
  const TAU = 2 * Math.PI;
  const xOff = 0.00125;
  const yOff = 0.00125;
  const zOff = 0.0005;
  const rangeHue = 100;

  const rand = (n: number) => n * Math.random();
  const randRange = (n: number) => n - rand(2 * n);
  const fadeInOut = (t: number, m: number) => Math.abs(((t + 0.5 * m) % m) - 0.5 * m) / (0.5 * m);
  const lerp = (n1: number, n2: number, speed: number) => (1 - speed) * n1 + speed * n2;

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    center.current = [0.5 * canvas.width, 0.5 * canvas.height];
  }, []);

  const initParticle = (i: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let x = rand(canvas.width);
    let y = center.current[1] + randRange(rangeY);
    let vx = 0;
    let vy = 0;
    let life = 0;
    let ttl = 50 + rand(150);
    let speed = baseSpeed + rand(rangeSpeed);
    let radius = baseRadius + rand(rangeRadius);
    let hue = baseHue + rand(rangeHue);

    particleProps.current.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  };

  const drawParticle = (
    x: number,
    y: number,
    x2: number,
    y2: number,
    life: number,
    ttl: number,
    radius: number,
    hue: number,
    ctx: CanvasRenderingContext2D
  ) => {
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };

  const updateParticle = (i: number, ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let x = particleProps.current[i];
    let y = particleProps.current[i + 1];
    let n = noise3D(x * xOff, y * yOff, tick.current * zOff) * TAU;
    let vx = lerp(particleProps.current[i + 2], Math.cos(n), 0.5);
    let vy = lerp(particleProps.current[i + 3], Math.sin(n), 0.5);
    let life = particleProps.current[i + 4];
    let ttl = particleProps.current[i + 5];
    let speed = particleProps.current[i + 6];
    let x2 = x + vx * speed;
    let y2 = y + vy * speed;
    let radius = particleProps.current[i + 7];
    let hue = particleProps.current[i + 8];

    drawParticle(x, y, x2, y2, life, ttl, radius, hue, ctx);

    life++;
    particleProps.current.set([x2, y2, vx, vy, life], i);

    if (x2 > canvas.width || x2 < 0 || y2 > canvas.height || y2 < 0 || life > ttl) {
      initParticle(i);
    }
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    tick.current++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, ctx);
    }

    requestAnimationFrame(draw);
  }, [backgroundColor]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    
    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      initParticle(i);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [draw, resize]);

  return (
    <div className={cn("relative h-full w-full", containerClassName)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        ref={containerRef}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        <canvas ref={canvasRef} />
      </motion.div>

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
