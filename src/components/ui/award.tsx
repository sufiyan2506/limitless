/* ---------------------------
   Design tokens (dark-only)
   --------------------------- */
   :root {
    --bg: #0a0a0a;
    --surface: #0f0f10;
    --muted: #a1a1aa;
    --text: #ffffff;
    --primary: 176 85 255; /* HSL-ish for gradient usage with Tailwind-compatible classes */
    --accent: 99 102 241;
  }
  
  /* Glass helpers */
  .glass-strong {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(8px);
  }
  
  .glass-weak {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(4px);
  }
  
  /* Neon primary utilities used by components */
  .text-primary {
    color: rgba(var(--primary), 1);
  }
  
  /* ---------------------------
     Small animations
     --------------------------- */
  @keyframes float-up {
    from { transform: translateY(6px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
  .animate-float {
    animation: float-up 0.45s cubic-bezier(.2,.8,.2,1) both;
  }
  
  /* dialog / general fade */
  @keyframes subtle-fade {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-subtle {
    animation: subtle-fade 0.36s cubic-bezier(.2,.8,.2,1) both;
  }
  
  /* small helper for neon gradient line */
  .bg-neon {
    background-image: linear-gradient(90deg, rgba(99,102,241,0.12), rgba(168,85,247,0.12));
  }
  
  /* utility: glass border */
  .border-glass {
    border: 1px solid rgba(255,255,255,0.06);
  }
  
  /* make sure text and backgrounds suit dark-only */
  body { background: var(--bg); color: var(--text); }
  
  /* keep marquee/accordion extras (already attached previously) - harmless duplicates */
  @keyframes marquee { 0% { transform: translate3d(0,0,0);} 100% { transform: translate3d(-50%,0,0);} }
  @keyframes marquee-vertical { 0% { transform: translate3d(0,0,0);} 100% { transform: translate3d(0,-50%,0);} }
  
  /* small avatar & alert animations (from previous extras) */
  @keyframes alert-in { from { opacity: 0; transform: translateY(8px) scale(0.98);} to { opacity: 1; transform: translateY(0) scale(1);} }
  .animate-alert-in { animation: alert-in 0.28s cubic-bezier(0.25,0.46,0.3,1) both; }
  