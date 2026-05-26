"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function TomatoScene({ running, isBreak }: { running: boolean; isBreak: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runningRef = useRef(running);
  const isBreakRef = useRef(isBreak);
  const modelRef = useRef<THREE.Group | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const spinningRef = useRef(false);
  const spinAngleRef = useRef(0);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    const prevBreak = isBreakRef.current;
    isBreakRef.current = isBreak;

    const scene = sceneRef.current;
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    if (!scene || !renderer || !camera || !modelRef.current) return;
    if (prevBreak === isBreak) return;

    // 高速一回転させて180度で切り替え
    spinningRef.current = true;
    spinAngleRef.current = 0;
    const nextFile = isBreak ? "/blue.glb" : "/tomato.glb";
    let swapped = false;

    const loader = new GLTFLoader();
    loader.load(nextFile, (gltf) => {
      const nextModel = gltf.scene;
      nextModel.scale.setScalar(2.5);
      nextModel.position.set(0, 1.5, 0);
      nextModel.rotation.x = 0.4;

      const doSpin = () => {
        spinAngleRef.current += 0.12; // 高速回転
        if (modelRef.current) {
          modelRef.current.rotation.y += 0.12;
        }

        // 180度（π）で入れ替え
        if (!swapped && spinAngleRef.current >= Math.PI) {
          swapped = true;
          if (modelRef.current) scene.remove(modelRef.current);
          nextModel.rotation.y = modelRef.current?.rotation.y ?? Math.PI;
          scene.add(nextModel);
          modelRef.current = nextModel;
        }

        if (renderer && camera) renderer.render(scene, camera);

        // 360度（2π）で終了
        if (spinAngleRef.current < Math.PI * 2) {
          requestAnimationFrame(doSpin);
        } else {
          spinningRef.current = false;
          if (modelRef.current) {
            modelRef.current.rotation.y = 0;
          }
        }
      };
      doSpin();
    });
  }, [isBreak]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (canvas.dataset.initialized) return;
    canvas.dataset.initialized = "1";

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xaaaaaa);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1, 30);
    camera.lookAt(0, -3, 0);
    cameraRef.current = camera;

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.5);
    dir1.position.set(5, 5, 5);
    scene.add(dir1);
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.4);
    dir2.position.set(-5, -2, -5);
    scene.add(dir2);

    const loader = new GLTFLoader();
    let animId: number;
    loader.load("/tomato.glb", (gltf) => {
      const model = gltf.scene;
      model.scale.setScalar(2.5);
      model.position.set(0, 1.5, 0);
      model.rotation.x = 0.4;
      scene.add(model);
      modelRef.current = model;

      const animate = () => {
        animId = requestAnimationFrame(animate);
        if (!spinningRef.current && runningRef.current && modelRef.current) {
          modelRef.current.rotation.y += 0.005;
        }
        renderer.render(scene, camera);
      };
      animate();
    });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}
