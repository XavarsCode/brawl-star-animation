'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';

function Model({ url }) {
  const group = useRef();
  const gltf = useGLTF(url, true);
  const mixer = useMemo(() => (gltf.animations?.length ? new THREE.AnimationMixer(gltf.scene) : null), [gltf]);
  useEffect(() => {
    if (!mixer || !gltf.animations?.length) return;
    const action = mixer.clipAction(gltf.animations[0]);
    action.reset().play();
    return () => action.stop();
  }, [mixer, gltf]);
  useFrame((state, delta) => mixer?.update(delta));
  return <primitive ref={group} object={gltf.scene} />;
}

export default function ThreeViewer() {
  const [url, setUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const activeUrl = fileUrl || url;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
      <div style={{ height: 520, background: '#0a0f16', border: '1px solid #1f2a37', borderRadius: 16, overflow: 'hidden' }}>
        <Canvas camera={{ position: [2.5, 2.2, 2.5], fov: 50 }}>
          <Suspense fallback={<Html center>Chargement...</Html>}>
            {activeUrl ? <Model url={activeUrl} /> : <FallbackCube />}
            <Environment preset="city" />
            <OrbitControls enableDamping />
          </Suspense>
        </Canvas>
      </div>

      <div style={{ background: '#0f1722', border: '1px solid #1f2a37', borderRadius: 16, padding: 16 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Charger un modèle (GLTF/GLB)</h3>
        <label style={{ display: 'block', fontSize: 14, opacity: 0.8, marginBottom: 6 }}>URL .gltf/.glb (CORS activé)</label>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://exemple.com/brawler.glb"
               style={{ width: '100%', padding: 8, borderRadius: 10, background: '#0b0f14', border: '1px solid #1f2a37', color: 'inherit', marginBottom: 10 }}/>
        <label style={{ display: 'block', fontSize: 14, opacity: 0.8, marginBottom: 6 }}>Ou importer un fichier local</label>
        <input type="file" accept=".glb,.gltf" onChange={e => {
          const f = e.target.files?.[0];
          if (f) setFileUrl(URL.createObjectURL(f));
        }} />

        <p style={{ fontSize: 12, opacity: 0.7, marginTop: 12 }}>Astuce : exporte un GLB avec animations (armature) pour voir l'animation par défaut.</p>
      </div>
    </div>
  );
}

function FallbackCube() {
  return (
    <mesh rotation={[0.4, 0.4, 0]}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial metalness={0.1} roughness={0.6} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[3,3,3]} intensity={2} />
    </mesh>
  );
}

// Workaround for THREE namespace when using drei hooks
import * as THREE from 'three';
