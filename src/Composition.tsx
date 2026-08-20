import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  interpolate,
  spring,
  Easing,
} from "remotion";

const COLORS = {
  bg: "#050A12",
  panel: "#0B1422",
  cyan: "#48D9FF",
  gold: "#F5C95B",
  white: "#F7FAFC",
  muted: "#8FA3B8",
  green: "#39E29B",
  red: "#FF536B",
};

const ease = Easing.bezier(0.22, 1, 0.36, 1);

/* ---------------- BACKGROUND ---------------- */

const Grid = () => (
  <AbsoluteFill
    style={{
      opacity: 0.12,
      backgroundImage:
        "linear-gradient(rgba(72,217,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(72,217,255,.35) 1px, transparent 1px)",
      backgroundSize: "70px 70px",
      transform:
        "perspective(700px) rotateX(60deg) scale(1.6)",
      transformOrigin: "center bottom",
    }}
  />
);

const Vignette = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(circle at center, transparent 20%, rgba(0,0,0,.75) 100%)",
      pointerEvents: "none",
    }}
  />
);

/* ---------------- CAMERA ---------------- */

const Camera = ({
  children,
  zoom = 1,
}: {
  children: React.ReactNode;
  zoom?: number;
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [0, 45],
    [zoom, zoom * 1.08],
    {
      easing: ease,
      extrapolateRight: "clamp",
    }
  );

  const x = interpolate(
    frame,
    [0, 45],
    [0, -12],
    {
      easing: ease,
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale}) translateX(${x}px)`,
        transformOrigin: "center",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/* ---------------- GLOBE ---------------- */

const Globe = () => {
  const frame = useCurrentFrame();

  const rotation = frame * 1.2;

  const pulse = interpolate(
    Math.sin(frame / 10),
    [-1, 1],
    [0.8, 1]
  );

  return (
    <div
      style={{
        width: 430,
        height: 430,
        borderRadius: "50%",
        position: "relative",
        overflow: "hidden",

        background:
          "radial-gradient(circle at 35% 30%, #315F7A, #102E46 45%, #02060B 80%)",

        boxShadow:
          "0 0 90px rgba(72,217,255,.35), inset -60px -30px 90px rgba(0,0,0,.9)",

        transform: `rotate(${rotation}deg) scale(${pulse})`,
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: `${i * 10}% ${i * 7}%`,
            border: "2px solid rgba(72,217,255,.25)",
            borderRadius: "50%",
            transform: `rotate(${i * 20}deg)`,
          }}
        />
      ))}

      {/* continents */}
      <div
        style={{
          position: "absolute",
          width: 130,
          height: 60,
          left: 105,
          top: 105,
          background: COLORS.green,
          opacity: 0.55,
          borderRadius: "60% 40% 55% 35%",
          transform: "rotate(-20deg)",
          filter: "blur(.3px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 150,
          height: 65,
          left: 210,
          top: 215,
          background: COLORS.green,
          opacity: 0.5,
          borderRadius: "40% 60% 45% 55%",
          transform: "rotate(20deg)",
        }}
      />

      {/* atmosphere */}
      <div
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: "50%",
          border: "4px solid rgba(72,217,255,.35)",
          boxShadow: "0 0 40px rgba(72,217,255,.5)",
        }}
      />
    </div>
  );
};

/* ---------------- MONEY ---------------- */

const DollarBill = ({
  index,
}: {
  index: number;
}) => {
  const frame = useCurrentFrame();

  const y =
    Math.sin(frame / 14 + index) * 25 +
    index * 50;

  const rotation =
    Math.sin(frame / 20 + index) * 10;

  const x =
    Math.sin(frame / 25 + index) * 80;

  return (
    <div
      style={{
        position: "absolute",
        left: `${35 + index * 12}%`,
        top: `${15 + index * 9}%`,
        width: 250,
        height: 115,

        background:
          "linear-gradient(135deg,#34431c,#7f8f37,#293716)",

        border: `3px solid ${COLORS.gold}`,
        borderRadius: 12,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        color: "#FFF2A6",
        fontSize: 54,
        fontWeight: 900,

        boxShadow:
          "0 20px 50px rgba(0,0,0,.5)",

        transform:
          `translate(${x}px,${y}px) rotate(${rotation}deg)`,
      }}
    >
      $100
    </div>
  );
};

/* ---------------- DATA STREAMS ---------------- */

const DataStreams = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const progress = (frame * 5 + i * 120) % 700;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 500,
              height: 3,

              left: -500 + progress,
              top: 300 + i * 75,

              background:
                `linear-gradient(90deg,transparent,${COLORS.cyan},transparent)`,

              boxShadow:
                `0 0 15px ${COLORS.cyan}`,

              transform:
                `rotate(${i % 2 ? -8 : 8}deg)`,

              opacity: 0.7,
            }}
          />
        );
      })}
    </>
  );
};

/* ---------------- CHART ---------------- */

const MarketChart = () => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [0, 55],
    [0, 1],
    {
      easing: ease,
      extrapolateRight: "clamp",
    }
  );

  const points = [
    [0, 180],
    [80, 160],
    [150, 175],
    [220, 120],
    [290, 135],
    [360, 75],
    [430, 105],
    [500, 45],
  ];

  const visible = Math.floor(
    progress * points.length
  );

  return (
    <div
      style={{
        width: 650,
        height: 330,
        background: "rgba(8,18,30,.9)",
        border: "1px solid rgba(72,217,255,.25)",
        borderRadius: 18,
        padding: 25,
        boxShadow:
          "0 25px 80px rgba(0,0,0,.45)",
      }}
    >
      <div
        style={{
          color: COLORS.muted,
          fontSize: 18,
          letterSpacing: 3,
          marginBottom: 15,
        }}
      >
        GLOBAL MARKET INDEX
      </div>

      <svg width="600" height="240">
        <polyline
          points={points
            .slice(0, visible + 1)
            .map(([x, y]) => `${x + 20},${y + 20}`)
            .join(" ")}
          fill="none"
          stroke={COLORS.green}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.slice(0, visible + 1).map(([x, y], i) => (
          <circle
            key={i}
            cx={x + 20}
            cy={y + 20}
            r="7"
            fill={COLORS.green}
          />
        ))}
      </svg>
    </div>
  );
};

/* ---------------- DEBT COUNTER ---------------- */

const DebtCounter = () => {
  const frame = useCurrentFrame();

  const value = interpolate(
    frame,
    [0, 60],
    [0, 38.9],
    {
      easing: Easing.out(Easing.quad),
      extrapolateRight: "clamp",
    }
  );

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontSize: 76,
          fontWeight: 950,
          color: COLORS.white,
          letterSpacing: -3,

          textShadow:
            `0 0 35px ${COLORS.red}`,
        }}
      >
        ${value.toFixed(1)}T
      </div>

      <div
        style={{
          marginTop: 12,
          fontSize: 20,
          color: COLORS.red,
          letterSpacing: 5,
        }}
      >
        NATIONAL DEBT
      </div>
    </div>
  );
};

/* ---------------- NEWS GRAPHIC ---------------- */

const NewsBar = ({
  headline,
}: {
  headline: string;
}) => {
  const frame = useCurrentFrame();

  const x = interpolate(
    frame,
    [0, 18],
    [-1000, 0],
    {
      easing: ease,
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 115,

        background:
          "linear-gradient(90deg,#07111f,#0c1b2d)",

        borderTop:
          `2px solid ${COLORS.cyan}`,

        transform: `translateX(${x}px)`,

        display: "flex",
        alignItems: "center",

        padding: "0 55px",
      }}
    >
      <div
        style={{
          background: COLORS.red,
          padding: "12px 18px",
          fontWeight: 900,
          fontSize: 18,
          letterSpacing: 2,
          marginRight: 20,
        }}
      >
        ECONOTALK
      </div>

      <div
        style={{
          fontSize: 25,
          fontWeight: 700,
        }}
      >
        {headline}
      </div>
    </div>
  );
};

/* ---------------- SCENE ---------------- */

const Scene = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    {
      extrapolateRight: "clamp",
    }
  );

  const y = interpolate(
    frame,
    [0, 20],
    [40, 0],
    {
      easing: ease,
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        color: COLORS.white,
        fontFamily:
          "Arial, Helvetica, sans-serif",
        overflow: "hidden",
      }}
    >
      <Grid />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center,rgba(72,217,255,.10),transparent 50%)",
        }}
      />

      <Camera>{children}</Camera>

      <div
        style={{
          position: "absolute",
          left: 55,
          top: 70,
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: COLORS.cyan,
            letterSpacing: 5,
            fontWeight: 900,
          }}
        >
          ECONOTALK • GLOBAL ECONOMY
        </div>

        <div
          style={{
            marginTop: 15,
            fontSize: 47,
            fontWeight: 950,
            maxWidth: 850,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 12,
            fontSize: 22,
            color: COLORS.muted,
          }}
        >
          {subtitle}
        </div>
      </div>

      <Vignette />
    </AbsoluteFill>
  );
};

/* ---------------- MAIN VIDEO ---------------- */

export const MyComposition: React.FC = () => {
  const fps = 30;

  return (
    <AbsoluteFill>

      {/* SCENE 1 */}
      <Sequence from={0} durationInFrames={5 * fps}>
        <Scene
          title="THE DOLLAR RUNS THE WORLD"
          subtitle="Follow the money."
        >
          <DataStreams />

          <div
            style={{
              position: "absolute",
              top: 420,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Globe />
          </div>

          {[0, 1, 2].map((i) => (
            <DollarBill key={i} index={i} />
          ))}

          <NewsBar headline="GLOBAL MONEY FLOWS ARE MOVING AGAIN" />
        </Scene>
      </Sequence>

      {/* SCENE 2 */}
      <Sequence from={5 * fps} durationInFrames={6 * fps}>
        <Scene
          title="THE DEBT CLOCK NEVER STOPS"
          subtitle="And markets are watching."
        >
          <div
            style={{
              position: "absolute",
              top: 410,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DebtCounter />
          </div>

          <div
            style={{
              position: "absolute",
              top: 650,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MarketChart />
          </div>

          <NewsBar headline="MARKETS REACT AS DEBT KEEPS CLIMBING" />
        </Scene>
      </Sequence>

      {/* SCENE 3 */}
      <Sequence from={11 * fps} durationInFrames={6 * fps}>
        <Scene
          title="MONEY MOVES ACROSS BORDERS"
          subtitle="Trade connects every economy."
        >
          <DataStreams />

          <div
            style={{
              position: "absolute",
              top: 410,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              transform: "scale(.85)",
            }}
          >
            <Globe />
          </div>

          <div
            style={{
              position: "absolute",
              top: 760,
              left: 80,
              fontSize: 100,
            }}
          >
            🚢
          </div>

          <div
            style={{
              position: "absolute",
              top: 750,
              right: 80,
              fontSize: 100,
            }}
          >
            ⛏️
          </div>

          <NewsBar headline="OIL • COPPER • TECHNOLOGY • CAPITAL" />
        </Scene>
      </Sequence>

      {/* SCENE 4 */}
      <Sequence from={17 * fps} durationInFrames={6 * fps}>
        <Scene
          title="ONE MARKET. MILLIONS OF RIPPLE EFFECTS."
          subtitle="A shock in one country can reach another."
        >
          <div
            style={{
              position: "absolute",
              top: 420,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MarketChart />
          </div>

          <DataStreams />

          <NewsBar headline="FROM WALL STREET TO AFRICA" />
        </Scene>
      </Sequence>

      {/* END */}
      <Sequence from={23 * fps} durationInFrames={4 * fps}>
        <Scene
          title="THE WORLD ECONOMY — EXPLAINED"
          subtitle="EconoTalk"
        >
          <div
            style={{
              position: "absolute",
              top: 470,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Globe />
          </div>

          <div
            style={{
              position: "absolute",
              top: 900,
              left: 0,
              right: 0,
              textAlign: "center",
              fontSize: 32,
              fontWeight: 800,
              color: COLORS.gold,
              letterSpacing: 3,
            }}
          >
            NEWS • MARKETS • MONEY
          </div>
        </Scene>
      </Sequence>

    </AbsoluteFill>
  );
};
