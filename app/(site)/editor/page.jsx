'use client';
import dynamic from 'next/dynamic';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import SpriteAnimator from '@/components/SpriteAnimator';
const ThreeViewer = dynamic(() => import('@/components/ThreeViewer'), { ssr: false });

export default function EditorPage() {
  const [tab, setTab] = useState('3d');
  return (
    <main>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Éditeur d'animations</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <TabButton active={tab === '3d'} onClick={() => setTab('3d')}>3D (GLTF/GLB)</TabButton>
        <TabButton active={tab === '2d'} onClick={() => setTab('2d')}>2D (Sprite Sheet)</TabButton>
      </div>

      {tab === '3d' ? <ThreeViewer /> : <SpriteAnimator />}
    </main>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <button onClick={onClick}
      style={{
        padding: '8px 12px',
        borderRadius: 9999,
        border: '1px solid ' + (active ? '#3b82f6' : '#1f2a37'),
        background: active ? '#0b255a' : '#0f1722',
        fontWeight: 600
      }}>
      {children}
    </button>
  )
}
