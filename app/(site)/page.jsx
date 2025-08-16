import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Brawler Animator</h1>
      <p style={{ opacity: 0.8, marginBottom: 24 }}>Crée des animations 2D/3D (sprites & GLTF/GLB) et partage les liens avec ton équipe.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
        <Card title="Éditeur 2D/3D" href="/editor" description="Charge une sprite sheet ou un modèle 3D, ajuste les paramètres et exporte." />
        <Card title="Docs" href="https://github.com/pmndrs/react-three-fiber" external description="React Three Fiber docs (3D)." />
        <Card title="GLTF Tips" href="https://github.com/KhronosGroup/glTF" external description="Format glTF (animations, bones, etc.)." />
      </div>
    </main>
  );
}

function Card({ title, description, href, external }) {
  const cardStyle = { background: '#0f1722', border: '1px solid #1f2a37', borderRadius: 16, padding: 18 };
  const linkProps = external ? { target: "_blank", rel: "noreferrer" } : {};
  return (
    <div style={cardStyle}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{title}</h2>
      <p style={{ opacity: 0.8, marginBottom: 12 }}>{description}</p>
      <Link href={href} {...linkProps} style={{ textDecoration: 'underline' }}>Ouvrir</Link>
    </div>
  );
}
