import { useState, useEffect } from 'react';

const FILMS = [
  { year: 1972, title: "Dealing", role: null },
  { year: 1976, title: "Obsession", role: "Robert LaSalle" },
  { year: 1979, title: "All That Jazz", role: "Lucas Sergeant" },
  { year: 1979, title: "Rich Kids", role: "Paul Phillips" },
  { year: 1981, title: "Blow Out", role: "Burke" },
  { year: 1982, title: "The World According to Garp", role: "Roberta Muldoon" },
  { year: 1983, title: "Twilight Zone: The Movie", role: "John Valentine" },
  { year: 1983, title: "Terms of Endearment", role: "Sam Burns" },
  { year: 1984, title: "Footloose", role: "Rev. Shaw Moore" },
  { year: 1984, title: "Buckaroo Banzai", role: "Dr. Emilio Lizardo" },
  { year: 1984, title: "2010", role: "Dr. Walter Curnow" },
  { year: 1985, title: "Santa Claus: The Movie", role: "B.Z." },
  { year: 1985, title: "Mesmerized", role: null },
  { year: 1986, title: "The Manhattan Project", role: "John Mathewson" },
  { year: 1987, title: "Harry and the Hendersons", role: "George Henderson" },
  { year: 1988, title: "Distant Thunder", role: "Mark Lambert" },
  { year: 1989, title: "Out Cold", role: null },
  { year: 1990, title: "Memphis Belle", role: "Col. Bruce Derringer" },
  { year: 1990, title: "I Love You to Death", role: "Harlan James" },
  { year: 1991, title: "Ricochet", role: "Earl Talbot Blake" },
  { year: 1991, title: "At Play in the Fields of the Lord", role: "Leslie Huben" },
  { year: 1992, title: "Raising Cain", role: "Dr. Carter Nix" },
  { year: 1993, title: "Cliffhanger", role: "Eric Qualen" },
  { year: 1993, title: "The Pelican Brief", role: "Thomas Callahan" },
  { year: 1994, title: "Princess Caraboo", role: "Prof. Wilkinson" },
  { year: 1994, title: "Silent Fall", role: "Dr. Jake Rainer" },
  { year: 1994, title: "A Good Man in Africa", role: "Dr. Alex Murray" },
  { year: 1996, title: "Hollow Point", role: null },
  { year: 1998, title: "A Civil Action", role: "Judge Walter Skinner" },
  { year: 1998, title: "Homegrown", role: null },
  { year: 2000, title: "Don Quixote", role: "Don Quixote" },
  { year: 2001, title: "Shrek", role: "Lord Farquaad (voice)" },
  { year: 2002, title: "Orange County", role: "Bud Brubaker" },
  { year: 2004, title: "Kinsey", role: "Alfred Kinsey Sr." },
  { year: 2006, title: "Dreamgirls", role: "Jerry Harris" },
  { year: 2009, title: "Confessions of a Shopaholic", role: "Edgar West" },
  { year: 2010, title: "Leap Year", role: "Jeremy Davis" },
  { year: 2012, title: "Rise of the Guardians", role: "Santa Claus (voice)" },
  { year: 2012, title: "This Is 40", role: "Oliver" },
  { year: 2012, title: "The Campaign", role: "Raymond Huggins" },
  { year: 2014, title: "Interstellar", role: "Donald" },
  { year: 2014, title: "Love Is Strange", role: "Ben Hull" },
  { year: 2014, title: "The Homesman", role: "Rev. Alfred Dowd" },
  { year: 2016, title: "The Accountant", role: "Lamar Blackburn" },
  { year: 2016, title: "Miss Sloane", role: "Sen. Ron Sperling" },
  { year: 2017, title: "Beatriz at Dinner", role: "Doug Strutt" },
  { year: 2017, title: "Daddy's Home 2", role: "Don Whitaker" },
  { year: 2017, title: "Pitch Perfect 3", role: "Fergus Hobart" },
  { year: 2019, title: "Pet Sematary", role: "Jud Crandall" },
  { year: 2019, title: "Late Night", role: "Walter Lovell" },
  { year: 2019, title: "The Tomorrow Man", role: "Ed Hemsler" },
  { year: 2019, title: "Bombshell", role: "Roger Ailes" },
  { year: 2023, title: "Killers of the Flower Moon", role: "Peter Leaward" },
  { year: 2023, title: "Sharper", role: "Richard Hobbes" },
  { year: 2024, title: "Cabrini", role: "Archbishop Corrigan" },
  { year: 2024, title: "Conclave", role: "Cardinal Tremblay" },
  { year: 2024, title: "Spellbound", role: "Sun Oracle (voice)" },
  { year: 2024, title: "The Rule of Jenny Pen", role: "Dave Crealy" },
  { year: 2025, title: "Jimpa", role: "Jim" },
];

// Palette - vintage cinema marquee
const COLORS = ['#6B0F1A', '#E8D4A0', '#C89A20', '#1A1B2E'];
const TEXT_COLORS = ['#E8D4A0', '#3A0A12', '#1A1B2E', '#E8D4A0'];

export default function LithgowWheel() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Limelight&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Mono:ital,wght@0,400;0,500;1,400&family=Inter+Tight:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

  const N = FILMS.length;
  const segmentAngle = 360 / N;

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinner(null);

    const pickIndex = Math.floor(Math.random() * N);
    // Land segment[pickIndex] centered under the pointer (top)
    // Native: segment i's center sits at top when wheel rotation = -i*segmentAngle (mod 360)
    const targetMod = ((-pickIndex * segmentAngle) % 360 + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta <= 0) delta += 360;
    // Tiny jitter within segment for organic feel
    const jitter = (Math.random() - 0.5) * segmentAngle * 0.6;
    delta += jitter;
    // Multiple full revolutions
    delta += 360 * 6;

    setRotation(rotation + delta);

    setTimeout(() => {
      setWinner({ ...FILMS[pickIndex], index: pickIndex });
      setHistory((h) => [FILMS[pickIndex], ...h].slice(0, 5));
      setIsSpinning(false);
    }, 5500);
  };

  // Geometry
  const cx = 300, cy = 300;
  const radius = 270;
  const ringRadius = 290;

  const segments = FILMS.map((film, i) => {
    // Segment i is centered at angle (i * segmentAngle - 90) from positive x-axis
    // so segment 0's center sits at the top of the wheel, under the pointer.
    const startA = ((i - 0.5) * segmentAngle - 90) * Math.PI / 180;
    const endA = ((i + 0.5) * segmentAngle - 90) * Math.PI / 180;
    const x1 = cx + radius * Math.cos(startA);
    const y1 = cy + radius * Math.sin(startA);
    const x2 = cx + radius * Math.cos(endA);
    const y2 = cy + radius * Math.sin(endA);
    const path = `M ${cx},${cy} L ${x1},${y1} A ${radius},${radius} 0 0,1 ${x2},${y2} Z`;

    const midA = (i * segmentAngle - 90) * Math.PI / 180;
    const tx = cx + radius * 0.74 * Math.cos(midA);
    const ty = cy + radius * 0.74 * Math.sin(midA);
    const textRotate = i * segmentAngle;

    return {
      path,
      colorIdx: i % COLORS.length,
      color: COLORS[i % COLORS.length],
      textColor: TEXT_COLORS[i % COLORS.length],
      tx, ty,
      textRotate,
      film,
    };
  });

  // Light bulbs around perimeter
  const NUM_BULBS = 36;
  const bulbs = Array.from({ length: NUM_BULBS }, (_, i) => {
    const a = (i * (360 / NUM_BULBS) - 90) * Math.PI / 180;
    return {
      x: cx + ringRadius * Math.cos(a),
      y: cy + ringRadius * Math.sin(a),
      alt: i % 2 === 0,
    };
  });

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center px-4 py-6 sm:py-10"
      style={{
        background: 'radial-gradient(ellipse at top, #1F1830 0%, #0E0A1A 60%, #050309 100%)',
        fontFamily: '"Inter Tight", system-ui, sans-serif',
      }}
    >
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
        @keyframes idle-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(232, 212, 160, 0.5), 0 8px 24px rgba(0,0,0,0.6); }
          50% { transform: scale(1.04); box-shadow: 0 0 0 14px rgba(232, 212, 160, 0), 0 8px 24px rgba(0,0,0,0.6); }
        }
        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .grain::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.85 0 0 0 0 0.7 0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0.4;
        }
      `}</style>

      {/* Header */}
      <header className="text-center mb-6 sm:mb-8 relative">
        <div
          className="text-[10px] sm:text-xs tracking-[0.4em] mb-3"
          style={{ color: '#C89A20', fontFamily: '"DM Mono", monospace' }}
        >
          ◆ NOW SHOWING ◆
        </div>
        <h1
          className="text-4xl sm:text-6xl leading-none"
          style={{
            fontFamily: '"Limelight", serif',
            color: '#E8D4A0',
            textShadow: '0 2px 0 #6B0F1A, 0 4px 14px rgba(200, 154, 32, 0.4)',
            letterSpacing: '0.02em',
          }}
        >
          Lithgow
        </h1>
        <h1
          className="text-4xl sm:text-6xl leading-none -mt-1"
          style={{
            fontFamily: '"Limelight", serif',
            color: '#E8D4A0',
            textShadow: '0 2px 0 #6B0F1A, 0 4px 14px rgba(200, 154, 32, 0.4)',
            letterSpacing: '0.02em',
          }}
        >
          Roulette
        </h1>
        <p
          className="mt-3 italic text-sm sm:text-base"
          style={{ color: '#A89884', fontFamily: '"Playfair Display", serif' }}
        >
          what'll it be tonight?
        </p>
      </header>

      {/* Wheel */}
      <div className="relative w-full max-w-[460px] aspect-square">
        {/* Pointer (flex-centered horizontally at the top) */}
        <div
          className="absolute top-0 left-0 right-0 flex justify-center z-20 pointer-events-none"
          style={{ transform: 'translateY(-6px)' }}
        >
          <svg width="44" height="56" viewBox="0 0 44 56">
            <defs>
              <linearGradient id="ptrGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5E2A5" />
                <stop offset="50%" stopColor="#C89A20" />
                <stop offset="100%" stopColor="#8C6B12" />
              </linearGradient>
            </defs>
            <path
              d="M 22 50 L 4 4 L 40 4 Z"
              fill="url(#ptrGrad)"
              stroke="#3A0A12"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle cx="22" cy="12" r="3" fill="#3A0A12" />
          </svg>
        </div>

        {/* Outer dark ring */}
        <div
          className="absolute inset-0 rounded-full grain"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #2A1B2E, #0E0A1A)',
            boxShadow: '0 30px 60px -10px rgba(0,0,0,0.8), inset 0 0 0 6px #6B0F1A, inset 0 0 0 8px #1A1B2E',
          }}
        />

        {/* Wheel + bulbs share one SVG (same coordinate frame, identical centering) */}
        <svg
          viewBox="0 0 600 600"
          className="absolute inset-0"
          preserveAspectRatio="xMidYMid meet"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}
        >
          {/* Spinning group: segments + hub */}
          <g
            style={{
              transformOrigin: '300px 300px',
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning
                ? 'transform 5.5s cubic-bezier(0.15, 0.95, 0.22, 1)'
                : 'none',
            }}
          >
            {segments.map((seg, i) => (
              <g key={i}>
                <path
                  d={seg.path}
                  fill={seg.color}
                  stroke="#0E0A1A"
                  strokeWidth="0.8"
                />
                <text
                  x={seg.tx}
                  y={seg.ty}
                  fontSize="13"
                  fontFamily='"Inter Tight", sans-serif'
                  fontWeight="700"
                  fill={seg.textColor}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${seg.textRotate} ${seg.tx} ${seg.ty})`}
                  style={{ letterSpacing: '0.05em' }}
                >
                  {seg.film.year}
                </text>
              </g>
            ))}
            <circle cx={cx} cy={cy} r="68" fill="#1A1B2E" stroke="#C89A20" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="62" fill="none" stroke="#6B0F1A" strokeWidth="1" />
          </g>

          {/* Static bulbs (don't spin) */}
          <g>
            {bulbs.map((b, i) => (
              <g key={`bulb-${i}`}>
                <circle
                  cx={b.x}
                  cy={b.y}
                  r="6"
                  fill={b.alt ? '#FFE7A0' : '#C89A20'}
                  style={{
                    animation: `flicker ${1.2 + (i % 5) * 0.3}s ease-in-out infinite`,
                    animationDelay: `${i * 0.08}s`,
                    filter: 'drop-shadow(0 0 4px rgba(255, 231, 160, 0.8))',
                  }}
                />
                <circle cx={b.x - 1.5} cy={b.y - 1.5} r="1.5" fill="#FFFEF0" opacity="0.9" />
              </g>
            ))}
          </g>
        </svg>

        {/* Center SPIN button (flex-centered for bulletproof positioning) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="rounded-full font-bold tracking-widest disabled:cursor-not-allowed pointer-events-auto"
            style={{
              width: '116px',
              height: '116px',
              background: isSpinning
                ? 'radial-gradient(circle at 35% 30%, #8C6B12, #3A0A12)'
                : 'radial-gradient(circle at 35% 30%, #F5E2A5 0%, #C89A20 50%, #6B0F1A 100%)',
              color: '#1A0F0A',
              fontFamily: '"Limelight", serif',
              fontSize: '20px',
              border: '3px solid #1A1B2E',
              boxShadow: isSpinning
                ? 'inset 0 4px 12px rgba(0,0,0,0.6), 0 4px 14px rgba(0,0,0,0.5)'
                : '0 6px 18px rgba(0,0,0,0.6), inset 0 -4px 8px rgba(58,10,18,0.5), inset 0 4px 8px rgba(255,255,255,0.3)',
              animation: !isSpinning && !winner ? 'idle-pulse 2.4s ease-in-out infinite' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            {isSpinning ? '...' : 'SPIN'}
          </button>
        </div>
      </div>

      {/* Result card */}
      <div className="w-full max-w-[520px] mt-8 sm:mt-10 min-h-[140px]">
        {winner ? (
          <div
            key={winner.index}
            className="relative px-6 py-7 sm:px-8 sm:py-8 grain"
            style={{
              background: 'linear-gradient(135deg, #6B0F1A 0%, #3A0A12 100%)',
              border: '2px solid #C89A20',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(232, 212, 160, 0.2)',
              animation: 'reveal 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) both',
            }}
          >
            <div
              className="text-[10px] sm:text-xs tracking-[0.35em] mb-2"
              style={{ color: '#C89A20', fontFamily: '"DM Mono", monospace' }}
            >
              ✦ TONIGHT'S FEATURE ✦
            </div>
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 900,
                  color: '#E8D4A0',
                  fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.01em',
                }}
              >
                {winner.title}
              </h2>
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  color: '#C89A20',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                }}
              >
                {winner.year}
              </span>
            </div>
            {winner.role && (
              <p
                className="mt-3 italic"
                style={{
                  fontFamily: '"Playfair Display", serif',
                  color: '#E8D4A0',
                  opacity: 0.85,
                  fontSize: '1rem',
                }}
              >
                John Lithgow as <span style={{ fontStyle: 'normal', fontWeight: 700 }}>{winner.role}</span>
              </p>
            )}
            <div
              className="mt-5 pt-4 text-xs tracking-widest"
              style={{
                borderTop: '1px dashed rgba(232, 212, 160, 0.3)',
                color: '#A89884',
                fontFamily: '"DM Mono", monospace',
              }}
            >
              GRAB THE POPCORN.
            </div>
          </div>
        ) : (
          <div
            className="text-center py-8 italic"
            style={{
              color: '#6E5F4A',
              fontFamily: '"Playfair Display", serif',
              fontSize: '1rem',
            }}
          >
            {isSpinning ? 'the wheel turns...' : 'tap SPIN to choose your evening'}
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 1 && (
        <div className="w-full max-w-[520px] mt-6">
          <div
            className="text-[10px] tracking-[0.35em] mb-3 text-center"
            style={{ color: '#6E5F4A', fontFamily: '"DM Mono", monospace' }}
          >
            ── PREVIOUSLY ──
          </div>
          <div className="flex flex-col gap-1.5">
            {history.slice(1).map((f, i) => (
              <div
                key={i}
                className="flex items-baseline gap-3 px-3 py-1.5 rounded"
                style={{
                  background: 'rgba(232, 212, 160, 0.04)',
                  borderLeft: '2px solid #6B0F1A',
                }}
              >
                <span
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    color: '#C89A20',
                    fontSize: '0.75rem',
                  }}
                >
                  {f.year}
                </span>
                <span
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    color: '#A89884',
                    fontSize: '0.9rem',
                  }}
                >
                  {f.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className="mt-10 text-center text-[10px] tracking-[0.3em]"
        style={{ color: '#4A3E2E', fontFamily: '"DM Mono", monospace' }}
      >
        {FILMS.length} FILMS · 1972–2025
      </footer>
    </div>
  );
}
