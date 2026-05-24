// src/components/GlobeFlow.tsx
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Canvas Earth texture ─────────────────────────────────── */
function makeTexture(): THREE.CanvasTexture {
  const W = 1024, H = 512;
  const cvs = document.createElement("canvas");
  cvs.width = W; cvs.height = H;
  const ctx = cvs.getContext("2d")!;

  // Deep-ocean fill
  ctx.fillStyle = "#020d1c";
  ctx.fillRect(0, 0, W, H);

  // Lat/lon grid
  ctx.strokeStyle = "rgba(6,182,212,0.13)";
  ctx.lineWidth = 0.6;
  for (let lat = -75; lat <= 75; lat += 15) {
    const y = ((90 - lat) / 180) * H;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }
  for (let lon = 0; lon < 360; lon += 15) {
    const x = (lon / 360) * W;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }

  // Equator highlight
  ctx.strokeStyle = "rgba(6,182,212,0.3)";
  ctx.lineWidth = 1.0;
  const eq = (90 / 180) * H;
  ctx.beginPath(); ctx.moveTo(0, eq); ctx.lineTo(W, eq); ctx.stroke();

  const ll = (lon: number, lat: number): [number, number] => [
    ((lon + 180) / 360) * W,
    ((90 - lat) / 180) * H,
  ];

  // Continent polygons
  const shapes: [number, number][][] = [
    // North America
    [[-168,72],[-140,70],[-120,68],[-100,72],[-80,74],[-70,70],[-55,50],[-55,47],
     [-65,44],[-75,35],[-80,25],[-88,16],[-92,20],[-100,20],[-105,22],[-115,28],
     [-120,34],[-125,38],[-130,55],[-140,58],[-150,60],[-165,65],[-168,72]],
    // Greenland
    [[-44,82],[-20,84],[0,82],[-15,75],[-30,70],[-48,72],[-44,82]],
    // South America
    [[-80,12],[-75,11],[-65,1],[-50,-5],[-38,-8],[-35,-12],[-40,-20],[-45,-23],
     [-50,-30],[-55,-38],[-65,-45],[-68,-55],[-70,-52],[-75,-45],[-78,-35],[-80,-12],[-80,0],[-80,12]],
    // Europe
    [[-10,36],[10,38],[28,38],[32,36],[30,40],[35,46],[28,50],[22,54],
     [18,58],[15,62],[10,62],[5,58],[0,50],[-5,44],[-8,40],[-10,36]],
    // Scandinavia
    [[5,58],[8,62],[14,67],[18,70],[26,72],[28,68],[22,62],[18,58],[5,58]],
    // Africa
    [[-5,36],[10,37],[20,37],[33,30],[37,22],[40,12],[43,12],[50,8],
     [44,0],[40,-5],[38,-18],[35,-28],[28,-34],[20,-35],[15,-30],
     [10,-22],[5,-5],[2,5],[-2,5],[-8,5],[-16,10],[-18,15],[-16,22],
     [-13,28],[-8,34],[-5,36]],
    // Asia
    [[28,42],[38,38],[44,42],[48,46],[55,50],[60,56],[65,62],[70,68],[80,72],
     [90,72],[100,70],[110,68],[120,65],[130,62],[135,55],[140,48],[138,38],
     [130,32],[120,26],[110,20],[100,12],[100,5],[105,-5],[110,-8],[118,-8],
     [125,-4],[130,0],[128,10],[120,18],[110,22],[100,28],[90,28],[80,32],
     [70,28],[60,22],[50,26],[44,38],[38,38],[28,42]],
    // Australia
    [[114,-22],[120,-20],[128,-16],[136,-14],[140,-18],[146,-20],[150,-24],
     [152,-28],[150,-34],[146,-38],[140,-38],[134,-36],[128,-32],[122,-26],[114,-22]],
    // UK
    [[-3,52],[-2,58],[0,58],[2,52],[-1,50],[-3,52]],
    // Iceland
    [[-24,64],[-14,66],[-12,64],[-16,62],[-24,62],[-24,64]],
  ];

  shapes.forEach(poly => {
    ctx.beginPath();
    poly.forEach(([lon, lat], i) => {
      const [x, y] = ll(lon, lat);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(6,182,212,0.18)";
    ctx.fill();
    ctx.strokeStyle = "rgba(6,182,212,0.6)";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  });

  // City dots
  const cities: [number, number, string][] = [
    [-74, 40.7, "#ef4444"], [-.1, 51.5, "#ef4444"], [37.6, 55.7, "#f59e0b"],
    [116.4, 39.9, "#ef4444"], [139.7, 35.7, "#22d3ee"], [2.3, 48.9, "#22d3ee"],
    [77.2, 28.6, "#22d3ee"], [103.8, 1.3, "#22d3ee"], [28, -26.2, "#ef4444"],
    [-43.2,-22.9,"#f59e0b"], [-87.6,41.8,"#22d3ee"], [151.2,-33.9,"#22d3ee"],
  ];
  cities.forEach(([lon, lat, col]) => {
    const [x, y] = ll(lon, lat);
    // Glow
    const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
    g.addColorStop(0, col + "66"); g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI*2); ctx.fill();
    // Core
    ctx.fillStyle = col;
    ctx.shadowColor = col; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI*2); ctx.fill();
    ctx.shadowBlur = 0;
  });

  return new THREE.CanvasTexture(cvs);
}

/* ── Rotating Earth ──────────────────────────────────────── */
function Earth() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const atmRef  = useRef<THREE.Mesh>(null!);

  const mat = useMemo(() => {
    if (typeof window === "undefined") return new THREE.MeshStandardMaterial();
    return new THREE.MeshStandardMaterial({
      map: makeTexture(),
      roughness: 0.88,
      metalness: 0.05,
      emissive: new THREE.Color("#001018"),
      emissiveIntensity: 0.6,
    });
  }, []);

  const atmMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec3 vNormal; varying vec3 vPos;
      void main(){ vNormal=normalize(normalMatrix*normal);
        vPos=(modelViewMatrix*vec4(position,1.0)).xyz;
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uTime; varying vec3 vNormal; varying vec3 vPos;
      void main(){
        vec3 v=normalize(-vPos);
        float r=pow(1.0-abs(dot(vNormal,v)),2.4);
        float p=1.0+0.1*sin(uTime*1.6);
        gl_FragColor=vec4(0.02,0.65,0.85,r*p*0.88); }`,
    transparent:true, blending:THREE.AdditiveBlending,
    side:THREE.FrontSide, depthWrite:false,
  }), []);

  const outerMat = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: `
      varying vec3 vN;
      void main(){ vN=normalize(normalMatrix*normal);
        gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      uniform float uTime; varying vec3 vN;
      void main(){
        float r=pow(1.0-abs(dot(vN,vec3(0,0,1))),3.2);
        float p=1.0+0.08*sin(uTime*0.8);
        gl_FragColor=vec4(0.03,0.6,0.8,r*p*0.45); }`,
    transparent:true, blending:THREE.AdditiveBlending,
    side:THREE.BackSide, depthWrite:false,
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y = t * 0.07;
    atmMat.uniforms.uTime.value = t;
    outerMat.uniforms.uTime.value = t;
  });

  return (
    <>
      {/* Outer glow */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <primitive object={outerMat} attach="material" />
      </mesh>
      {/* Inner atmosphere */}
      <mesh ref={atmRef} scale={1.04}>
        <sphereGeometry args={[1, 48, 48]} />
        <primitive object={atmMat} attach="material" />
      </mesh>
      {/* Earth */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </>
  );
}

/* ── Orbit ring ──────────────────────────────────────────── */
function Ring({ r, tiltX, tiltZ, op }: { r:number; tiltX:number; tiltZ:number; op:number }) {
  const ref = useRef<THREE.Group>(null!);
  const pts = useMemo(() => {
    const a: THREE.Vector3[] = [];
    for (let i=0;i<=128;i++){
      const ang=(i/128)*Math.PI*2;
      a.push(new THREE.Vector3(Math.cos(ang)*r,0,Math.sin(ang)*r));
    }
    return a;
  }, [r]);
  const geo = useMemo(()=>new THREE.BufferGeometry().setFromPoints(pts),[pts]);

  useFrame(({clock})=>{
    if(ref.current){
      ref.current.rotation.x = tiltX;
      ref.current.rotation.z = tiltZ + Math.sin(clock.getElapsedTime()*0.15)*0.02;
    }
  });

  return (
    <group ref={ref}>
      {/* @ts-ignore - React Three Fiber vs SVG line typings conflict in TS */}
      <line geometry={geo}>
        <lineBasicMaterial color="#06b6d4" transparent opacity={op}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </line>
    </group>
  );
}

/* ── Satellite dot ───────────────────────────────────────── */
function Sat({ r, speed, phase, color, tiltX=0 }: {
  r:number; speed:number; phase:number; color:string; tiltX?:number;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({clock})=>{
    const t = clock.getElapsedTime()*speed+phase;
    if(ref.current){
      const x=Math.cos(t)*r, z=Math.sin(t)*r;
      const y=Math.sin(t*0.5)*0.12*r;
      ref.current.position.set(x, y*Math.cos(tiltX)-z*Math.sin(tiltX),
        y*Math.sin(tiltX)+z*Math.cos(tiltX));
    }
  });
  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[0.028,8,8]}/>
        <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} depthWrite={false}/>
      </mesh>
      <mesh scale={3}><sphereGeometry args={[0.028,8,8]}/>
        <meshBasicMaterial color={color} transparent opacity={0.12}
          blending={THREE.AdditiveBlending} depthWrite={false}/>
      </mesh>
    </group>
  );
}

/* ── Data arcs ───────────────────────────────────────────── */
function Arcs() {
  const { lines, meta } = useMemo(()=>{
    const lines: THREE.Line[] = [], meta: {ph:number;sp:number}[] = [];
    for(let i=0;i<16;i++){
      const p1=new THREE.Vector3().setFromSphericalCoords(1.02,Math.random()*2.5+0.3,Math.random()*Math.PI*2);
      const p2=new THREE.Vector3().setFromSphericalCoords(1.02,Math.random()*2.5+0.3,Math.random()*Math.PI*2);
      const mid=p1.clone().lerp(p2,0.5).normalize().multiplyScalar(1.02+0.15+Math.random()*0.4);
      const pts=new THREE.QuadraticBezierCurve3(p1,mid,p2).getPoints(50);
      const geo=new THREE.BufferGeometry().setFromPoints(pts);
      const isRed=Math.random()<0.28;
      const hue=isRed?0:185+Math.floor(Math.random()*40);
      const mat=new THREE.LineBasicMaterial({
        color:new THREE.Color(`hsl(${hue},90%,65%)`),
        transparent:true, opacity:0,
        blending:THREE.AdditiveBlending, depthWrite:false,
      });
      lines.push(new THREE.Line(geo,mat));
      meta.push({ph:Math.random()*Math.PI*2, sp:0.4+Math.random()*0.8});
    }
    return {lines,meta};
  },[]);

  useFrame(({clock})=>{
    const t=clock.getElapsedTime();
    lines.forEach((l,i)=>{
      (l.material as THREE.LineBasicMaterial).opacity =
        Math.max(0,0.7*(Math.sin(t*meta[i].sp+meta[i].ph)*0.5+0.5));
    });
  });
  return <group>{lines.map((l,i)=><primitive key={i} object={l}/>)}</group>;
}

/* ── Stars ───────────────────────────────────────────────── */
function Stars() {
  const geo = useMemo(()=>{
    const g=new THREE.BufferGeometry();
    const n=1200, pos=new Float32Array(n*3), col=new Float32Array(n*3);
    for(let i=0;i<n;i++){
      const r=10+Math.random()*8, t=Math.random()*Math.PI, p=Math.random()*Math.PI*2;
      pos[i*3]=r*Math.sin(t)*Math.cos(p);
      pos[i*3+1]=r*Math.sin(t)*Math.sin(p);
      pos[i*3+2]=r*Math.cos(t);
      const c=Math.random()<0.07;
      col[i*3]=c?0.08:0.75+Math.random()*0.25;
      col[i*3+1]=c?0.75:0.75+Math.random()*0.25;
      col[i*3+2]=c?1:0.75+Math.random()*0.25;
    }
    g.setAttribute("position",new THREE.BufferAttribute(pos,3));
    g.setAttribute("color",new THREE.BufferAttribute(col,3));
    return g;
  },[]);
  return (
    <points geometry={geo}>
      <pointsMaterial size={0.055} vertexColors transparent opacity={0.8}
        blending={THREE.AdditiveBlending} depthWrite={false} sizeAttenuation/>
    </points>
  );
}

/* ── Main export — accepts explicit size ─────────────────── */
export default function GlobeFlow({ size = 480 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, flexShrink: 0 }}>
      <Canvas
        camera={{ position: [0, 0.3, 2.8], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.12} />
        <directionalLight position={[-3, 3, 4]} intensity={1.5} color="#ffffff" />
        <pointLight position={[3, 0, 2]} intensity={0.5} color="#06b6d4" distance={15} />
        <pointLight position={[-2,-2,-3]} intensity={0.25} color="#818cf8" distance={15} />

        <Stars />
        <Earth />
        <Arcs />
        <Ring r={1.2} tiltX={0.55} tiltZ={0.1} op={0.30} />
        <Ring r={1.38} tiltX={-0.4} tiltZ={0.25} op={0.18} />
        <Sat r={1.2} speed={0.4} phase={0}    color="#22d3ee" tiltX={0.55} />
        <Sat r={1.2} speed={0.4} phase={Math.PI} color="#22d3ee" tiltX={0.55} />
        <Sat r={1.38} speed={0.55} phase={1.1} color="#818cf8" />
      </Canvas>
    </div>
  );
}
