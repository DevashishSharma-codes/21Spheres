import { useEffect, useRef } from "react";

export const Logo3DCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let isVisible = false;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    // STATIC 3D Core Octahedron Vertices
    const BASE_VERTICES = [
      [0, -1.3, 0], // Top
      [0, 1.3, 0],  // Bottom
      [-1.15, 0, 0], // Left
      [1.15, 0, 0],  // Right
      [0, 0, 1.15],  // Front
      [0, 0, -1.15], // Back
    ];

    const FACETS = [
      [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], // Top 4 pyramids
      [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5], // Bottom 4 pyramids
    ];

    // Fixed Static Angles for the Central 3D Logo
    const STATIC_ANGLE_X = 0.28;
    const STATIC_ANGLE_Y = 0.45;

    // Hover Physics for Orbit Speed & Scale
    let spinSpeed = 0.7;
    let targetSpinSpeed = 0.7;
    let hoverScale = 1;
    let targetScale = 1;

    const handleMouseEnter = () => {
      targetSpinSpeed = 1.5;
      targetScale = 1.15;
    };

    const handleMouseLeave = () => {
      targetSpinSpeed = 0.7;
      targetScale = 1.0;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 400;
      height = canvas.height = canvas.parentElement.clientHeight || 400;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;
    let lastTimeStamp = performance.now();

    // Pre-compute sphere gradient color stops
    const SPHERE_COLORS = [
      { stop: 0, color: "#FFFFFF" },
      { stop: 0.4, color: "#F1F5F9" },
      { stop: 0.75, color: "#CBD5E1" },
      { stop: 1, color: "#64748B" },
    ];

    let frameCount = 0;

    const startLoop = () => {
      if (!animationFrameId) {
        lastTimeStamp = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    // IntersectionObserver to run loop ONLY when canvas is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { rootMargin: "100px 0px" }
    );
    observer.observe(canvas);

    // High-Precision 30fps Sub-Pixel Delta Render Loop
    const render = (now) => {
      if (!isVisible) return;

      const delta = Math.min((now - lastTimeStamp) / 1000, 0.033);
      lastTimeStamp = now;

      frameCount++;
      if (frameCount % 2 !== 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth speed lerp
      spinSpeed += (targetSpinSpeed - spinSpeed) * (delta * 6);
      hoverScale += (targetScale - hoverScale) * (delta * 6);
      time += delta * spinSpeed * 0.85;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const baseRadius = Math.min(width, height) * 0.32 * hoverScale;
      const focalLength = 450;

      // Project function for STATIC core
      const projectStatic = ([x, y, z]) => {
        let x1 = x * Math.cos(STATIC_ANGLE_Y) + z * Math.sin(STATIC_ANGLE_Y);
        let z1 = -x * Math.sin(STATIC_ANGLE_Y) + z * Math.cos(STATIC_ANGLE_Y);

        let y2 = y * Math.cos(STATIC_ANGLE_X) - z1 * Math.sin(STATIC_ANGLE_X);
        let z2 = y * Math.sin(STATIC_ANGLE_X) + z1 * Math.cos(STATIC_ANGLE_X);

        const scale = focalLength / (focalLength + z2 * 45);
        return {
          x: cx + x1 * baseRadius * scale,
          y: cy + y2 * baseRadius * scale,
          z: z2,
          scale,
        };
      };

      const projectedCore = BASE_VERTICES.map(projectStatic);

      const sortedFacets = FACETS.map((facet) => {
        const avgZ = (projectedCore[facet[0]].z + projectedCore[facet[1]].z + projectedCore[facet[2]].z) / 3;
        return { facet, avgZ };
      }).sort((a, b) => b.avgZ - a.avgZ);

      const TOTAL_DOTS = 21;
      const orbitRadius = 1.72;
      const projectedDots = [];

      for (let i = 0; i < TOTAL_DOTS; i++) {
        const angle = (i / TOTAL_DOTS) * Math.PI * 2 + time;
        const x3d = Math.cos(angle) * orbitRadius;
        const y3d = Math.sin(angle) * 0.28;
        const z3d = Math.sin(angle) * orbitRadius;

        const proj = projectStatic([x3d, y3d, z3d]);
        projectedDots.push({
          x: proj.x,
          y: proj.y,
          z: proj.z,
          scale: proj.scale,
        });
      }

      const backDots = projectedDots.filter((d) => d.z > 0).sort((a, b) => b.z - a.z);
      const frontDots = projectedDots.filter((d) => d.z <= 0).sort((a, b) => b.z - a.z);

      const renderSphere = ({ x, y, scale }) => {
        const r = 5.6 * scale;
        const sphereGrad = ctx.createRadialGradient(
          x - r * 0.35,
          y - r * 0.35,
          r * 0.05,
          x,
          y,
          r
        );
        for (let i = 0; i < SPHERE_COLORS.length; i++) {
          sphereGrad.addColorStop(SPHERE_COLORS[i].stop, SPHERE_COLORS[i].color);
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = sphereGrad;
        ctx.shadowBlur = 0;
        ctx.fill();

        ctx.strokeStyle = "rgba(15, 23, 42, 0.4)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      };

      backDots.forEach(renderSphere);

      sortedFacets.forEach(({ facet, avgZ }) => {
        const p1 = projectedCore[facet[0]];
        const p2 = projectedCore[facet[1]];
        const p3 = projectedCore[facet[2]];

        const brightness = Math.max(0.2, Math.min(0.95, 0.52 + (avgZ * 0.32)));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();

        const grad = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
        const alpha = 0.98;
        const colorVal = Math.floor(brightness * 245);
        grad.addColorStop(0, `rgba(${colorVal}, ${colorVal}, ${colorVal + 15}, ${alpha})`);
        grad.addColorStop(1, `rgba(${Math.floor(colorVal * 0.35)}, ${Math.floor(colorVal * 0.35)}, ${Math.floor(colorVal * 0.45)}, ${alpha})`);

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      frontDots.forEach(renderSphere);

      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    return () => {
      observer.disconnect();
      stopLoop();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="relative w-56 h-44 sm:w-72 sm:h-56 md:w-80 md:h-60 cursor-pointer mx-auto"
      title="Hover over 3D logo to accelerate the 21 orbiting white 3D spheres"
    />
  );
};

