'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import SpriteAnimator from '@/components/SpriteAnimator';
const ThreeStage = dynamic(()=>import('@/components/ThreeStage'),{ssr:false});

export default function StudioClient({ searchParams, user }){
  const [mode, setMode] = useState('simple'); // simple | complex
  const [tab, setTab] = useState('3d'); // '3d' | '2d'
  const [timeline, setTimeline] = useState({ duration: 5, keys: [] }); // seconds
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);

  useEffect(()=>{
    let raf; let last;
    if(!playing) return;
    const loop = (now) => {
      if(!last) last = now;
      const dt = (now - last)/1000;
      last = now;
      setT(v => {
        const nv = v + dt;
        if(nv > timeline.duration) return 0;
        return nv;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return ()=> cancelAnimationFrame(raf);
  }, [playing, timeline.duration]);

  return (
    <main>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h1 style={{fontSize:28}}>Studio 3D/2D</h1>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>setTab('3d')} disabled={tab==='3d'}>3D</button>
          <button className="btn" onClick={()=>setTab('2d')} disabled={tab==='2d'}>2D</button>
          <button className="btn" onClick={()=>setMode(m=>m==='simple'?'complex':'simple')}>Mode: {mode}</button>
          <form method="post" action="/api/logout"><button className="btn">Déconnexion</button></form>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'280px 1fr 320px',gap:12}}>
        <div className="card">
          <h3>Assets</h3>
          <p style={{opacity:.8,fontSize:12}}>Ajoute un modèle GLB/GLTF (URL ou fichier), ou des props simples.</p>
          <AssetControls />
        </div>

        <div className="card" style={{minHeight:480}}>
          {tab==='3d' ? <ThreeStage t={t} timeline={timeline} mode={mode} /> : <SpriteAnimator />}
        </div>

        <div className="card">
          <h3>Timeline</h3>
          <TimelineEditor t={t} setT={setT} playing={playing} setPlaying={setPlaying} timeline={timeline} setTimeline={setTimeline} />
        </div>
      </div>
    </main>
  );
}

function AssetControls(){
  const fileRef = useRef(null);
  const [url, setUrl] = useState('');
  return (
    <div style={{display:'grid',gap:8}}>
      <label>URL .glb/.gltf</label>
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://.../model.glb" />
      <a className="btn" href={`?addUrl=${encodeURIComponent(url)}`}>Ajouter par URL</a>
      <label>Ou importer un fichier</label>
      <input ref={fileRef} type="file" accept=".glb,.gltf" onChange={e=>{
        const f = e.target.files?.[0]; if(!f) return;
        const u = URL.createObjectURL(f);
        location.href = `?addUrl=${encodeURIComponent(u)}`;
      }}/>
      <div style={{height:8}}/>
      <h4>Props rapides</h4>
      <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
        <a className="btn" href="?add=box">Box</a>
        <a className="btn" href="?add=sphere">Sphere</a>
        <a className="btn" href="?add=plane">Plane</a>
      </div>
    </div>
  )
}

function TimelineEditor({ t, setT, playing, setPlaying, timeline, setTimeline }){
  const pixelsPerSec = 80;
  const width = Math.max(320, timeline.duration * pixelsPerSec + 40);

  function addKey(kind){
    const time = Math.min(timeline.duration, t);
    const k = { id: Math.random().toString(36).slice(2), time, kind, value: kind==='pos'?[0,0,0]:kind==='rot'?[0,0,0]:[1,1,1] };
    setTimeline(s => ({...s, keys: [...s.keys, k] }));
  }

  return (
    <div>
      <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
        <button className="btn" onClick={()=>setPlaying(p=>!p)}>{playing?'Pause':'Play'}</button>
        <button className="btn" onClick={()=>setT(0)}>Début</button>
        <label>Durée (s)</label>
        <input type="number" value={timeline.duration} onChange={e=>setTimeline(s=>({...s,duration:Number(e.target.value)||1}))} />
      </div>
      <div className="card" style={{overflow:'auto'}}>
        <div style={{position:'relative',height:140,width}}>
          <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:'#0a0f16',border:'1px solid #1f2a37',borderRadius:12}}/>
          <div style={{position:'absolute',top:0,bottom:0,left: t * pixelsPerSec, width:2, background:'#60a5fa'}}/>
          <div style={{position:'absolute',bottom:8,left:8,display:'flex',gap:6}}>
            <button className="btn" onClick={()=>addKey('pos')}>+ Position</button>
            <button className="btn" onClick={()=>addKey('rot')}>+ Rotation</button>
            <button className="btn" onClick={()=>addKey('scale')}>+ Scale</button>
          </div>
          <div style={{position:'absolute',top:8,left:8,right:8,bottom:32,overflow:'auto'}}>
            {timeline.keys.map(k => (
              <div key={k.id} style={{position:'absolute',left:k.time*pixelsPerSec,top:k.kind==='pos'?10:k.kind==='rot'?50:90}}>
                <div title={k.kind} style={{width:10,height:10,borderRadius:2,background:'#60a5fa'}} />
              </div>
            ))}
          </div>
          <input type="range" min={0} max={timeline.duration} step="0.01" value={t} onChange={e=>setT(Number(e.target.value))}
                 style={{position:'absolute',left:8,right:8,bottom:4}}/>
        </div>
      </div>
    </div>
  )
}
