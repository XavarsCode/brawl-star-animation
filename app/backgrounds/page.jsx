import data from '@/data/backgrounds.json';

export default function Backgrounds() {
  return (
    <main>
      <h1 style={{fontSize:28,marginBottom:12}}>Arrière-plans</h1>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:12}}>
        {data.backgrounds.map(bg => (
          <div key={bg.id} className="card">
            <h3>{bg.label}</h3>
            <div style={{height:120,background:'#0a0f16',borderRadius:12,margin:'8px 0',border:'1px solid #1f2a37'}} />
          </div>
        ))}
      </div>
    </main>
  )
}
