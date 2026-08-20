import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, Composition } from "remotion";

const COLORS = {
  bg: "#0B1220",
  emerald: "#10B981",
  gold: "#D4AF37",
  text: "#F5F5F0",
  red: "#EF4444",
};

const Caption: React.FC<{ text: string; highlight?: string }> = ({ text, highlight }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 10], [20, 0], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize: 56,
        fontWeight: 700,
        color: COLORS.text,
        textAlign: "center",
        lineHeight: 1.3,
        padding: "0 60px",
        textShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      {highlight ? (
        <>
          {text.split(highlight)[0]}
          <span style={{ color: COLORS.gold }}>{highlight}</span>
          {text.split(highlight)[1]}
        </>
      ) : (
        text
      )}
    </div>
  );
};

const Scene: React.FC<{ children: React.ReactNode; bg?: string }> = ({ children, bg }) => (
  <AbsoluteFill
    style={{
      backgroundColor: bg || COLORS.bg,
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Helvetica, Arial, sans-serif",
    }}
  >
    {children}
  </AbsoluteFill>
);

export const MyComponent: React.FC = () => {
  const fps = 30;
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <Sequence from={0} durationInFrames={3 * fps}>
        <Scene>
          <Caption text="Global markets just had their worst week in months." />
        </Scene>
      </Sequence>

      <Sequence from={3 * fps} durationInFrames={7 * fps}>
        <Scene>
          <Caption text="Taiwan's market fell over 6% — its worst day since the tariff shock." highlight="6%" />
        </Scene>
      </Sequence>

      <Sequence from={10 * fps} durationInFrames={8 * fps}>
        <Scene>
          <Caption text="Investors panicked. Bond yields spiked to levels unseen since 2007." highlight="2007" />
        </Scene>
      </Sequence>

      <Sequence from={18 * fps} durationInFrames={9 * fps}>
        <Scene>
          <Caption text="The US Treasury stepped in, doubling bond buybacks to calm the market." highlight="doubling bond buybacks" />
        </Scene>
      </Sequence>

      <Sequence from={27 * fps} durationInFrames={11 * fps}>
        <Scene bg="#1A0F0F">
          <Caption text="But the dollar weakened — now near a two-and-a-half month low." highlight="two-and-a-half month low" />
        </Scene>
      </Sequence>

      <Sequence from={38 * fps} durationInFrames={12 * fps}>
        <Scene bg="#0F1A14">
          <Caption
            text="For African and emerging markets, that means cheaper debt and less import pressure."
            highlight="cheaper debt"
          />
        </Scene>
      </Sequence>

      <Sequence from={50 * fps} durationInFrames={8 * fps}>
        <Scene>
          <Caption text="One chip sell-off in Taiwan. A ripple that reached Lusaka." highlight="Lusaka" />
        </Scene>
      </Sequence>

      <Sequence from={58 * fps} durationInFrames={2 * fps}>
        <Scene>
          <div style={{ fontSize: 64, fontWeight: 700, color: COLORS.text }}>
            Econo<span style={{ color: COLORS.gold }}>Talk</span>
          </div>
        </Scene>
      </Sequence>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={60 * 30}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
