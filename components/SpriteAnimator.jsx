'use client';
import { useEffect, useRef, useState } from 'react';

export default function SpriteAnimator() {
  const canvasRef = useRef(null);
  const [imgUrl, setImgUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [frameW, setFrameW] = useState(256);
  const [frameH, setFrameH] = useState(256);
  const [totalFrames, setTotalFrames] = useState(16);
  const [framesPerRow, setFramesPerRow] = useState(4);
  const [fps, setFps] = useState(12);
  const [scale, setScale] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [image, setImage] = useState(null);

  const activeUrl = fileUrl || imgUrl;

  useEffect(() => {
    if (!activeUrl) { setImage(null); return; }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => setImage(img);
    img.src = activeUrl;
  }, [activeUrl]);

  useEffect(() => {
    let raf = 0, acc = 0, frame = 0;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !image) return;
    const draw = (dt) => {
      if (playing) acc += dt;
      const interval = 1000 / fps;
      if (acc >= interval) {
        frame = (frame + Math.floor(acc / interval)) % totalFrames;
        acc = acc % interval;
      }
      const cw = frameW * scale, ch = frameH * scale;
      canvasRef.current.width = cw; canvasRef.current.height = ch;
      ctx.imageSmoothingEnabled = false;
      const sx = (frame % framesPerRow) * frameW;
      const sy = Math.floor(frame / framesPerRow) * frameH;
      ctx.clearRect(0,0,cw,ch);
      ctx.drawImage(image, sx, sy, frameW, frameH, 0, 0, cw, ch);
      raf = requestAnimationFrame((now) => {
        const dtNew = now - (draw.last || now); draw.last = now; draw(dtNew);
      });
    };
    raf = requestAnimationFrame((t) => draw(1000/60));
    return () => cancelAnimationFrame(raf);
  }, [image, frameW, frameH, totalFrames, framesPerRow, fps, scale, playing]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 12 }}>
      <div style={{ display: 'grid', placeItems: 'center', minHeight: 480, background: '#0a0f16', border: '1px solid #1f2a37', borderRadius: 16 }}>
        <canvas ref={canvasRef} />
      </div>
      <div>
        <div className="card" style={{display:'grid',gap:8}}>
          <h3>Sprite Sheet</h3>
          <label>URL Image</label>
          <input value={imgUrl} onChange={e=>setImgUrl(e.target.value)} placeholder="/sprites/your.png"/>
          <label>Ou fichier</label>
          <input type="file" accept="image/*" onChange={e=>{ const f=e.target.files?.[0]; if(f) setFileUrl(URL.createObjectURL(f)); }}/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
            <label>Frames totales<input type="number" value={totalFrames} onChange={e=>setTotalFrames(+e.target.value)} /></label>
            <label>Frames/ligne<input type="number" value={framesPerRow} onChange={e=>setFramesPerRow(+e.target.value)} /></label>
            <label>Largeur<input type="number" value={frameW} onChange={e=>setFrameW(+e.target.value)} /></label>
            <label>Hauteur<input type="number" value={frameH} onChange={e=>setFrameH(+e.target.value)} /></label>
            <label>FPS<input type="number" value={fps} onChange={e=>setFps(+e.target.value)} /></label>
            <label>Scale<input type="number" step="0.1" value={scale} onChange={e=>setScale(+e.target.value)} /></label>
          </div>
          <button className="btn" onClick={()=>setPlaying(p=>!p)}>{playing?'Pause':'Play'}</button>
        </div>
      </div>
    </div>
  )
}
