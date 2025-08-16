import '../styles/globals.css';

export const metadata = {
  title: "Brawl Animation",
  description: "Animate sprite sheets and 3D models with a simple timeline (no copyrighted assets included).",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <div style={{maxWidth:1200,margin:'0 auto',padding:24}}>
          <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
            <a href="/" style={{fontWeight:800,fontSize:22,textDecoration:'none',color:'inherit'}}>Brawl Animation</a>
            <nav style={{display:'flex',gap:12}}>
              <a href="/library">Bibliothèque</a>
              <a href="/backgrounds">Arrière-plans</a>
              <a href="/dances">Danses</a>
              <a href="/studio">Studio</a>
              <a href="/login">Connexion</a>
            </nav>
          </header>
          {children}
          <footer style={{opacity:.6,marginTop:40,fontSize:12}}>Template éducatif. Non affilié à Supercell. Aucun asset inclus.</footer>
        </div>
      </body>
    </html>
  );
}
