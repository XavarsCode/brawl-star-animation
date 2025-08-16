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
  const [loaded, setLoaded] = useState(false);

  const activeUrl = fileUrl || imgUrl;

  useEffect(() => {
    if (!activeUrl) { setLoaded(false); setImage(null); return; }
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => { setImage(img); setLoaded(true); };
    img.onerror = () => { setLoaded(false); setImage(null); };
    img.src = activeUrl;
  }, [activeUrl]);

  useEffect(() => {
    let raf = 0;
    let acc = 0;
    let frame = 0;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx || !image || !loaded) return;

    const draw = (dt) => {
      if (!playing) { raf = requestAnimationFrame(draw); return; }
      acc += dt;
      const interval = 1000 / fps;
      if (acc >= interval) {
        frame = (frame + Math.floor(acc / interval)) % totalFrames;
        acc = acc % interval;
      }

      const cw = frameW * scale;
      const ch = frameH * scale;
      canvasRef.current.width = cw;
      canvasRef.current.height = ch;
      ctx.imageSmoothingEnabled = false;

      const sx = (frame % framesPerRow) * frameW;
      const sy = Math.floor(frame / framesPerRow) * frameH;
      ctx.clearRect(0,0,cw,ch);
      ctx.drawImage(image, sx, sy, frameW, frameH, 0, 0, cw, ch);
      raf = requestAnimationFrame((t) => {
        const now = performance.now();
        const dtNew = now - (draw.last || now);
        draw.last = now;
        draw(dtNew);
      });
    };
    raf = requestAnimationFrame((t) => draw(1000/60));
    return () => cancelAnimationFrame(raf);
  }, [image, loaded, frameW, frameH, totalFrames, framesPerRow, fps, scale, playing]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16 }}>
      <div style={{ display: 'grid', placeItems: 'center', minHeight: 520, background: '#0a0f16', border: '1px solid #1f2a37', borderRadius: 16 }}>
        <canvas ref={canvasRef} />
      </div>
      <div style={{ background: '#0f1722', border: '1px solid #1f2a37', borderRadius: 16, padding: 16 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Sprite Sheet</h3>
        <label style={labelStyle}>URL de l'image (CORS)</label>
        <input value={imgUrl} onChange={e => setImgUrl(e.target.value)} placeholder="/sprites/brawler.png"
               style={inputStyle}/>
        <label style={labelStyle}>Ou importer un fichier local</label>
        <input type="file" accept="image/*" onChange={e => {
          const f = e.target.files?.[0];
          if (f) setFileUrl(URL.createObjectURL(f));
        }} />

        <div style={{ height: 8 }} />
        <Row><Num label="Frames totales" value={totalFrames} setValue={setTotalFrames} />
            <Num label="Frames par ligne" value={framesPerRow} setValue={setFramesPerRow} /></Row>
        <Row><Num label="Largeur frame" value={frameW} setValue={setFrameW} />
            <Num label="Hauteur frame" value={frameH} setValue={setFrameH} /></Row>
        <Row><Num label="FPS" value={fps} setValue={setFps} />
            <Num label="Scale" value={scale} setValue={setScale} step="0.1" /></Row>

        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button onClick={() => setPlaying(p => !p)} style={btnStyle}>{playing ? 'Pause' : 'Play'}</button>
          <button onClick={() => { setFileUrl(''); setImgUrl(''); }} style={btnStyle}>Reset</button>
        </div>
      </div>
    </div>
  );
}

function Row({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>{children}</div>;
}
function Num({ label, value, setValue, step = '1' }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={labelStyle}>{label}</span>
      <input type="number" value={value} step={step} onChange={e => setValue(Number(e.target.value))} style={inputStyle} />
    </label>
  );
}

const labelStyle = { fontSize: 12, opacity: 0.8, marginBottom: 2 };
const inputStyle = { width: '100%', padding: 8, borderRadius: 10, background: '#0b0f14', border: '1px solid #1f2a37', color: 'inherit' };
const btnStyle = { padding: '8px 12px', borderRadius: 10, border: '1px solid #1f2a37', background: '#0b0f14', color: 'inherit' };
