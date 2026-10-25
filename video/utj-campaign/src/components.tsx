import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GOLD, useK } from "./theme";

// Gradient backdrop with a drifting gold glow, rising specks and a vignette.
export const Backdrop: React.FC<{
  from: string;
  to: string;
  glow?: number;
  specks?: boolean;
}> = ({ from, to, glow = 0.32, specks = true }) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const cx = 50 + 28 * Math.sin(frame / 80);
  const cy = 42 + 18 * Math.cos(frame / 110);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, ${from}, ${to})` }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${cx}% ${cy}%, rgba(245,197,66,${glow}) 0%, rgba(245,197,66,0) 42%)`,
        }}
      />
      {specks &&
        new Array(36).fill(0).map((_, i) => {
          const x = random(`x${i}`) * 100;
          const speed = 0.6 + random(`s${i}`) * 1.4;
          const size = 3 + random(`z${i}`) * 6;
          const y = (random(`y${i}`) * height - frame * speed * 2) % height;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: y < 0 ? y + height : y,
                width: size,
                height: size,
                borderRadius: "50%",
                background: GOLD,
                opacity: 0.12 + random(`o${i}`) * 0.3,
                filter: "blur(1px)",
              }}
            />
          );
        })}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Hebrew line that reveals word by word (rise, fade and de-blur).
export const Words: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  size: number;
  color: string;
  font: string;
  weight?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, stagger = 5, size: baseSize, color, font, weight = 700, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const size = baseSize * useK();
  return (
    <div
      style={{
        direction: "rtl",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: size * 0.28,
        fontFamily: font,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1.15,
        color,
        textAlign: "center",
        ...style,
      }}
    >
      {text.split(" ").map((word, i) => {
        const p = spring({ frame: frame - delay - i * stagger, fps, config: { damping: 200 } });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              opacity: p,
              translate: `0px ${(1 - p) * 45}px`,
              filter: `blur(${(1 - p) * 10}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

export const GoldRule: React.FC<{ delay?: number; width?: number }> = ({
  delay = 0,
  width = 340,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 200 }, durationInFrames: 25 });
  const k = useK();
  return (
    <div
      style={{
        width: width * k * p,
        height: 6,
        borderRadius: 3,
        background: `linear-gradient(90deg, rgba(245,197,66,0), ${GOLD}, rgba(245,197,66,0))`,
        margin: `${34 * k}px auto`,
      }}
    />
  );
};

// Gold light sweeping across text.
export const shine = (frame: number, start: number, base: string): React.CSSProperties => ({
  backgroundImage: `linear-gradient(110deg, ${base} 38%, #fff6d0 48%, ${GOLD} 52%, ${base} 62%)`,
  backgroundSize: "300% 100%",
  backgroundPosition: `${interpolate(frame, [start, start + 40], [100, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })}% 0`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
});

export const Center: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => (
  <AbsoluteFill
    style={{
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: "100px 80px",
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);
