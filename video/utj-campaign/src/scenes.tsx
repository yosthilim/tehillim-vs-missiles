import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop, Center, GoldRule, shine, Words } from "./components";
import { GOLD, GOLD_DEEP, NAVY, NAVY_LIGHT, sans, serif, useK, WHITE } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Hook: React.FC = () => (
  <AbsoluteFill>
    <Backdrop from={NAVY} to={NAVY_LIGHT} />
    <Center>
      <Words text="יש דברים" size={130} color={WHITE} font={serif} weight={900} delay={8} />
      <Words
        text="שלא מתפשרים עליהם."
        size={120}
        color={GOLD}
        font={serif}
        weight={900}
        delay={32}
        style={{ marginTop: 20 }}
      />
    </Center>
  </AbsoluteFill>
);

export const Torah: React.FC = () => (
  <AbsoluteFill>
    <Backdrop from="#0c2846" to="#124d5c" />
    <Center>
      <Words text="לימוד תורה" size={160} color={WHITE} font={serif} weight={900} delay={5} />
      <GoldRule delay={20} />
      <Words
        text="הזכות ללמוד תורה ולחיות לפיה"
        size={56}
        color={GOLD}
        font={sans}
        weight={700}
        delay={28}
        stagger={3}
      />
    </Center>
  </AbsoluteFill>
);

const ValueCard: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: { damping: 18, mass: 0.8 } });
  const k = useK();
  return (
    <div
      style={{
        direction: "rtl",
        width: 860 * k,
        padding: `${42 * k}px ${56 * k}px`,
        marginBottom: 44 * k,
        borderRadius: 28,
        background: "rgba(255,255,255,0.08)",
        borderRight: `12px solid ${GOLD}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
        fontFamily: serif,
        fontWeight: 900,
        fontSize: 90 * k,
        color: WHITE,
        opacity: interpolate(p, [0, 0.6], [0, 1], clamp),
        translate: `${(1 - p) * 420}px 0px`,
      }}
    >
      {text}
    </div>
  );
};

export const Values: React.FC = () => {
  const k = useK();
  return (
  <AbsoluteFill>
    <Backdrop from="#1a1036" to="#3b1f5c" />
    <Center>
      <Words text="מה שחשוב לנו" size={64} color={GOLD} font={sans} weight={800} delay={0} />
      <div style={{ height: 70 * k }} />
      <ValueCard text="משפחה חזקה" delay={14} />
      <ValueCard text="חינוך לילדים" delay={34} />
      <ValueCard text="כבוד לכל יהודי" delay={54} />
    </Center>
  </AbsoluteFill>
  );
};

export const Representation: React.FC = () => (
  <AbsoluteFill>
    <Backdrop from={NAVY} to={NAVY_LIGHT} />
    <Center>
      <Words text="ייצוג אמיתי" size={150} color={WHITE} font={serif} weight={900} delay={5} />
      <GoldRule delay={20} />
      <Words
        text="קול שמדבר בשם הקהילות שלנו"
        size={58}
        color={GOLD}
        font={sans}
        weight={700}
        delay={28}
        stagger={3}
      />
      <Words text="בכנסת" size={58} color={WHITE} font={sans} weight={700} delay={48} />
    </Center>
  </AbsoluteFill>
);

// The ballot slip flies in, settles, then drops through the slot of the box.
export const Ballot: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const landscape = width > height;
  // Layout: slip size and the box/slot position, per orientation.
  const slip = landscape ? { w: 300, h: 404 } : { w: 520, h: 700 };
  const slotY = landscape ? 800 : 1390;
  const box = landscape ? { w: 560, h: 260 } : { w: 780, h: 440 };
  const slipTop = landscape ? 260 : 470;
  const titleTop = landscape ? 70 : 170;
  const s = slip.w / 520;
  const enter = spring({ frame: frame - 12, fps, config: { damping: 14, mass: 1.1 } });
  const drop = interpolate(frame, [140, 175], [0, 1], {
    ...clamp,
    easing: (t) => t * t,
  });
  const pulse = interpolate(frame, [172, 182, 215], [0, 1, 0], clamp);
  const y = interpolate(enter, [0, 1], [-1500, 0]) + drop * (slotY - slipTop + 100);
  const rotate = interpolate(enter, [0, 1], [-28, -4]) * (1 - drop);
  return (
    <AbsoluteFill>
      <Backdrop from={NAVY} to={NAVY_LIGHT} glow={0.25} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: titleTop }}>
        <Words text="הפתק שלך" size={92} color={WHITE} font={serif} weight={900} delay={0} />
      </AbsoluteFill>
      {/* Clip at the slot so the slip disappears into the box. */}
      <div style={{ position: "absolute", left: 0, top: 0, width, height: slotY, overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            left: (width - slip.w) / 2,
            top: slipTop,
            width: slip.w,
            height: slip.h,
            borderRadius: 14 * s,
            background: "#fbfaf6",
            boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            translate: `0px ${y}px`,
            rotate: `${rotate}deg`,
            scale: String(1 - drop * 0.35),
          }}
        >
          <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 400 * s, lineHeight: 1, color: NAVY }}>ג</div>
          <div style={{ width: 300 * s, height: 4, background: GOLD_DEEP, margin: `${26 * s}px 0` }} />
          <div style={{ direction: "rtl", fontFamily: sans, fontWeight: 800, fontSize: 60 * s, color: NAVY }}>
            יהדות התורה
          </div>
        </div>
      </div>
      {/* Ballot box */}
      <div
        style={{
          position: "absolute",
          left: (width - box.w) / 2,
          top: slotY - 30,
          width: box.w,
          height: box.h,
          borderRadius: 26,
          background: "linear-gradient(180deg, #1b3f73, #0e2547)",
          border: `4px solid rgba(245,197,66,0.6)`,
          boxShadow: `0 0 ${40 + pulse * 120}px rgba(245,197,66,${0.15 + pulse * 0.55})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 22,
            left: box.w * 0.19,
            width: box.w * 0.62,
            height: 18,
            borderRadius: 9,
            background: "#050d1c",
            boxShadow: `0 0 ${pulse * 40}px ${GOLD}`,
          }}
        />
        <div
          style={{
            direction: "rtl",
            fontFamily: sans,
            fontWeight: 800,
            fontSize: landscape ? 56 : 70,
            color: WHITE,
            marginTop: 30,
          }}
        >
          קלפי
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const EveryVote: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: frame - 34, fps, config: { damping: 9 } });
  const k = useK();
  return (
    <AbsoluteFill>
      <Backdrop from="#0c2846" to="#124d5c" />
      <Center>
        <Words text="כל קול חשוב" size={140} color={WHITE} font={serif} weight={900} delay={5} />
        <div
          style={{
            direction: "rtl",
            marginTop: 40 * k,
            fontFamily: serif,
            fontWeight: 900,
            fontSize: 110 * k,
            color: GOLD,
            scale: String(pop),
            opacity: Math.min(pop * 1.5, 1),
          }}
        >
          גם שלך.
        </div>
      </Center>
    </AbsoluteFill>
  );
};

export const CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const big = spring({ frame: frame - 24, fps, config: { damping: 12 } });
  const k = useK();
  return (
    <AbsoluteFill>
      <Backdrop from={NAVY} to={NAVY_LIGHT} glow={0.4} />
      <Center>
        <Words text="ביום הבחירות" size={64} color={WHITE} font={sans} weight={700} delay={0} />
        <Words text="הצביעו" size={130} color={GOLD} font={serif} weight={900} delay={10} style={{ marginTop: 10 }} />
        <div
          style={{
            fontFamily: serif,
            fontWeight: 900,
            fontSize: 460 * k,
            lineHeight: 1.05,
            scale: String(interpolate(big, [0, 1], [0.4, 1])),
            opacity: Math.min(big * 1.4, 1),
            ...shine(frame, 55, WHITE),
          }}
        >
          ג׳
        </div>
        <Words text="יהדות התורה" size={110} color={WHITE} font={serif} weight={900} delay={44} />
      </Center>
    </AbsoluteFill>
  );
};

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const k = useK();
  return (
    <AbsoluteFill>
      <Backdrop from={GOLD} to={GOLD_DEEP} glow={0} specks={false} />
      <Center>
        <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 320 * k, lineHeight: 1, ...shine(frame, 10, NAVY) }}>
          ג׳
        </div>
        <Words text="יהדות התורה" size={124} color={NAVY} font={serif} weight={900} delay={6} style={{ marginTop: 20 }} />
      </Center>
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 140 * k }}>
        <Words text="תעמולת בחירות" size={44} color={NAVY} font={sans} weight={700} delay={20} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
