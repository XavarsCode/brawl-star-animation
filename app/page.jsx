export default function Home() {
  return (
    <main>
      <div className="card">
        <h1 style={{fontSize:34,margin:'4px 0'}}>Brawl Animation</h1>
        <p>Éditeur 2D/3D avec timeline et modes Simple/Complexe. Connecte-toi pour utiliser le Studio 3D.</p>
        <div style={{display:'flex',gap:8,marginTop:12}}>
          <a className="btn" href="/studio">Aller au Studio</a>
          <a className="btn" href="/library">Voir la Bibliothèque</a>
        </div>
      </div>
    </main>
  )
}
