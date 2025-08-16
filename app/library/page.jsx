import data from '@/data/brawlers.json';

export default function LibraryPage() {
  return (
    <main>
      <h1 style={{fontSize:28,marginBottom:12}}>Bibliothèque des personnages</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {data.brawlers.map(b => (
          <div key={b.id} className="card">
            <h3 style={{margin:'4px 0'}}>{b.name}</h3>
            <p style={{opacity:.8,fontSize:12}}>Skins: {b.skins.join(', ')}</p>
            <a className="btn" href={`/studio?brawler=${b.id}`}>Animer</a>
          </div>
        ))}
      </div>
    </main>
  )
}
