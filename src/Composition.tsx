import { AbsoluteFill, useCurrentFrame, interpolate, Composition } from "remotion";

export const MyComponent: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 20], [0.9, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0B1220",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ opacity, transform: `scale(${scale})`, textAlign: "center" }}>
        <div style={{ fontSize: 20, color: "#10B981", letterSpacing: 4, marginBottom: 12 }}>
          ECONOMICS · AFRICA · EMERGING MARKETS
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, color: "#F5F5F0" }}>
          Econo<span style={{ color: "#D4AF37" }}>Talk</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={60}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
