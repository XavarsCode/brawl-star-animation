import data from '@/data/dances.json';

export default function Dances() {
  return (
    <main>
      <h1 style={{fontSize:28,marginBottom:12}}>Danses prédéfinies</h1>
      <div className="card">
        <ul>
          {data.dances.map(d => <li key={d.id}>{d.label}</li>)}
        </ul>
      </div>
    </main>
  )
}
