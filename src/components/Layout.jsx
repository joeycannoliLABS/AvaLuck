import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div style={{
      background: 'var(--dark-bg)',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient background glows */}
      <div style={{
        position: 'fixed',
        top: -200,
        right: -200,
        width: 600,
        height: 600,
        background: 'radial-gradient(circle, rgba(232,65,66,0.04), transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed',
        bottom: -300,
        left: -200,
        width: 800,
        height: 800,
        background: 'radial-gradient(circle, rgba(46,205,167,0.03), transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Navbar />

      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
