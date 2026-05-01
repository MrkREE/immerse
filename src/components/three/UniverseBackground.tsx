"use client";
import { useEffect, useRef } from "react";

export default function UniverseBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    let animationId: number;
    let scene: import("three").Scene;
    let camera: import("three").PerspectiveCamera;
    let renderer: import("three").WebGLRenderer;
    let starField1: import("three").Points;
    let starField2: import("three").Points;
    let nebulaField: import("three").Points;

    const init = async () => {
      const THREE = await import("three");

      // Scene
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.0001);

      // Camera
      camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
      );
      camera.position.z = 600;
      camera.position.y = 0;

      // Renderer
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: false,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 1);

      // ─── Star field 1 — small bright stars ───
      const starCount1 = 4000;
      const positions1 = new Float32Array(starCount1 * 3);
      for (let i = 0; i < starCount1; i++) {
        const r = 500 + Math.random() * 1200;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions1[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions1[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions1[i * 3 + 2] = r * Math.cos(phi);
      }
      const geo1 = new THREE.BufferGeometry();
      geo1.setAttribute("position", new THREE.BufferAttribute(positions1, 3));
      const mat1 = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.6,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
      });
      starField1 = new THREE.Points(geo1, mat1);
      scene.add(starField1);

      // ─── Star field 2 — larger diffuse stars ───
      const starCount2 = 1500;
      const positions2 = new Float32Array(starCount2 * 3);
      for (let i = 0; i < starCount2; i++) {
        const r = 300 + Math.random() * 900;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        positions2[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        positions2[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions2[i * 3 + 2] = r * Math.cos(phi);
      }
      const geo2 = new THREE.BufferGeometry();
      geo2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));
      const mat2 = new THREE.PointsMaterial({
        color: 0xcccccc,
        size: 1.8,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.35,
      });
      starField2 = new THREE.Points(geo2, mat2);
      scene.add(starField2);

      // ─── Nebula — grey dust cloud ───
      const nebulaCount = 1200;
      const nebulaPositions = new Float32Array(nebulaCount * 3);
      for (let i = 0; i < nebulaCount; i++) {
        nebulaPositions[i * 3] = (Math.random() - 0.5) * 1600;
        nebulaPositions[i * 3 + 1] = (Math.random() - 0.5) * 800;
        nebulaPositions[i * 3 + 2] = -200 + (Math.random() - 0.5) * 400;
      }
      const nebGeo = new THREE.BufferGeometry();
      nebGeo.setAttribute("position", new THREE.BufferAttribute(nebulaPositions, 3));
      const nebMat = new THREE.PointsMaterial({
        color: 0x555555,
        size: 3.5,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.18,
      });
      nebulaField = new THREE.Points(nebGeo, nebMat);
      scene.add(nebulaField);

      // ─── Scroll-driven camera zoom ───
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / (maxScroll * 0.5), 1);
        camera.position.z = 600 - progress * 460;
        camera.position.y = progress * 30;
      };
      window.addEventListener("scroll", handleScroll);

      // ─── Resize ───
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      // ─── Animation loop ───
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        const t = Date.now() * 0.0001;
        starField1.rotation.y = t * 0.15;
        starField1.rotation.x = t * 0.05;
        starField2.rotation.y = t * 0.08;
        nebulaField.rotation.y = t * 0.04;
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => {
      cancelAnimationFrame(animationId);
      cleanup?.();
      renderer?.dispose();
      try { renderer?.forceContextLoss(); } catch (_) {}
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
