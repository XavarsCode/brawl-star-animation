import '../styles/globals.css';
export const metadata = {
  title: "Brawler Animator (2D/3D)",
  description: "Preview and tweak sprite sheets and GLTF/GLB animations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial', background: '#0b0f14', color: '#e6edf3' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px' }}>
          {children}
          <footer style={{ opacity: 0.6, marginTop: 40, fontSize: 12 }}>
            Made with Next.js, React Three Fiber. No Supercell assets included.
          </footer>
        </div>
      </body>
    </html>
  );
}
