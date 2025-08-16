'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email,setEmail] = useState('demo@local');
  const [password,setPassword] = useState('demo');

  async function submit(e){
    e.preventDefault();
    const r = await fetch('/api/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email,password}) });
    if(r.ok){ window.location.href='/studio'; } else { alert('Identifiants invalides'); }
  }
  return (
    <main>
      <div className="card" style={{maxWidth:420}}>
        <h2>Connexion</h2>
        <form onSubmit={submit} style={{display:'grid',gap:8}}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email"/>
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="mot de passe"/>
          <button className="btn" type="submit">Se connecter</button>
          <p style={{opacity:.7,fontSize:12}}>Démo: demo@local / demo</p>
        </form>
      </div>
    </main>
  )
}
