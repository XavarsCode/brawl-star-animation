'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

function Item({ kind, url, timeline, t }){
  const ref = useRef();
  const [mixer,setMixer] = useState(null);
  const gltf = useGLTF(url || '/_none_', true);
  const sceneObj = url ? gltf.scene : null;

  useEffect(()=>{
    if(sceneObj && gltf.animations?.length){
      const mx = new THREE.AnimationMixer(sceneObj);
      const action = mx.clipAction(gltf.animations[0]);
      action.reset().play();
      setMixer(mx);
      return ()=> action.stop();
    }
  }, [sceneObj]);

  useFrame((_,delta) => mixer?.update(delta));

  // simple application of timeline keys (very naive: last key <= t)
  const pos=[0,0,0], rot=[0,0,0], scl=[1,1,1];
  for(const k of timeline.keys.filter(k=>k.time<=t)){
    if(k.kind==='pos') { pos[0]=k.value[0]; pos[1]=k.value[1]; pos[2]=k.value[2]; }
    if(k.kind==='rot') { rot[0]=k.value[0]; rot[1]=k.value[1]; rot[2]=k.value[2]; }
    if(k.kind==='scale') { scl[0]=k.value[0]; scl[1]=k.value[1]; scl[2]=k.value[2]; }
  }

  if(kind==='url' && sceneObj){
    return <primitive ref={ref} object={sceneObj} position={pos} rotation={rot} scale={scl} />;
  }
  if(kind==='box'){
    return <mesh ref={ref} position={pos} rotation={rot} scale={scl}><boxGeometry args={[1,1,1]}/><meshStandardMaterial /></mesh>;
  }
  if(kind==='sphere'){
    return <mesh ref={ref} position={pos} rotation={rot} scale={scl}><sphereGeometry args={[0.5,32,16]}/><meshStandardMaterial /></mesh>;
  }
  if(kind==='plane'){
    return <mesh ref={ref} rotation={[-Math.PI/2,0,0]} position={[0,-0.5,0]} scale={[5,5,1]}><planeGeometry args={[1,1]}/><meshStandardMaterial /></mesh>;
  }
  return null;
}

export default function ThreeStage({ t, timeline, mode }){
  // parse query for items
  const [items,setItems] = useState([]);
  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const add = params.get('add');
    const addUrl = params.get('addUrl');
    if(add){
      setItems(s=>[...s, { id: Math.random().toString(36).slice(2), kind:add }]);
      params.delete('add'); history.replaceState(null,'','?'+params.toString());
    }
    if(addUrl){
      setItems(s=>[...s, { id: Math.random().toString(36).slice(2), kind:'url', url:addUrl }]);
      params.delete('addUrl'); history.replaceState(null,'','?'+params.toString());
    }
  }, []);

  return (
    <div style={{height:520}}>
      <Canvas camera={{ position: [3,2,3], fov: 50 }}>
        <Suspense fallback={<Html center>Chargement…</Html>}>
          <ambientLight intensity={1} />
          <directionalLight position={[3,3,3]} intensity={2} />
          <Environment preset="city" />
          {items.map(it => <Item key={it.id} kind={it.kind} url={it.url} timeline={timeline} t={t} />)}
          <OrbitControls enableDamping />
        </Suspense>
      </Canvas>
      <div style={{position:'absolute',marginTop:8,marginLeft:8,opacity:.8,fontSize:12}}>Mode: {mode}</div>
    </div>
  )
}
