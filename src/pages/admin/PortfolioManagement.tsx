/* Put near top of your globals */
:root {
  --limitless-glass: rgba(255,255,255,0.04);
  --limitless-glass-strong: rgba(255,255,255,0.06);
}

/* Ensure images cover and have no black bars or gaps */
img {
  display: block;
  max-width: 100%;
  height: auto;
  background: transparent;
  object-fit: cover;
}

/* Useful card glass styles (if not already present) */
.glass {
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  backdrop-filter: blur(6px);
}

.glass-strong {
  background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02));
  backdrop-filter: blur(8px);
}

/* thumbnail safe container so broken images don't show black strip */
.aspect-video {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
}
.aspect-video > img,
.aspect-video > .media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* small helper to reduce horizontal scrollbar on cards grid */
.grid {
  -webkit-overflow-scrolling: touch;
}
