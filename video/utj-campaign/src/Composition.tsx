import React from "react";
import { Composition } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import {
  Ballot,
  CallToAction,
  EndCard,
  EveryVote,
  Hook,
  Representation,
  Torah,
  Values,
} from "./scenes";

const T = 15; // transition length in frames
const SCENES = [130, 150, 180, 150, 240, 140, 200, 150];
const TOTAL = SCENES.reduce((a, b) => a + b, 0) - T * (SCENES.length - 1);

const timing = linearTiming({ durationInFrames: T });

export const UTJVideo: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Hook" durationInFrames={SCENES[0]}>
      <Hook />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence name="Torah" durationInFrames={SCENES[1]}>
      <Torah />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />
    <TransitionSeries.Sequence name="Values" durationInFrames={SCENES[2]}>
      <Values />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence name="Representation" durationInFrames={SCENES[3]}>
      <Representation />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={wipe({ direction: "from-right" })} timing={timing} />
    <TransitionSeries.Sequence name="Ballot" durationInFrames={SCENES[4]}>
      <Ballot />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={timing} />
    <TransitionSeries.Sequence name="EveryVote" durationInFrames={SCENES[5]}>
      <EveryVote />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing} />
    <TransitionSeries.Sequence name="CallToAction" durationInFrames={SCENES[6]}>
      <CallToAction />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={timing} />
    <TransitionSeries.Sequence name="EndCard" durationInFrames={SCENES[7]}>
      <EndCard />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

export const MyComposition = () => (
  <>
    <Composition
      id="UTJ"
      component={UTJVideo}
      durationInFrames={TOTAL}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="UTJ-Landscape"
      component={UTJVideo}
      durationInFrames={TOTAL}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
