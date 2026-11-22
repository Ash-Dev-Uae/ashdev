import { useEffect, useReducer, useRef, type CSSProperties } from "react";
import { Crosshair, Gamepad2, Play, RotateCcw, Timer, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { arcadeReducer, initialArcadeState, nextGlitchPosition } from "@/lib/arcade-game";

export function Arcade() {
  const [game, dispatch] = useReducer(arcadeReducer, initialArcadeState);
  const targetRef = useRef<HTMLButtonElement>(null);
  const playing = game.status === "playing";

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => dispatch({ type: "tick", now: Date.now() }), 100);
    return () => window.clearInterval(interval);
  }, [playing, game.deadline]);

  const start = () => {
    dispatch({ type: "start", now: Date.now(), position: nextGlitchPosition(game.position) });
  };

  useEffect(() => {
    if (playing) targetRef.current?.focus({ preventScroll: true });
  }, [playing, game.deadline]);

  const catchGlitch = () => {
    dispatch({ type: "catch", now: Date.now(), position: nextGlitchPosition(game.position) });
  };
  const targetStyle = {
    "--glitch-x": game.position.x,
    "--glitch-y": game.position.y,
  } as CSSProperties;

  return (
    <section
      id="arcade"
      aria-labelledby="arcade-title"
      className="scroll-mt-20 border-y border-border bg-background py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-arcade uppercase">
              <Gamepad2 className="size-4" /> 05 / Interactive
            </p>
            <h2 id="arcade-title" className="text-3xl font-bold tracking-normal sm:text-4xl">
              Ash’s Arcade
            </h2>
          </div>
          <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-arcade" /> CATCH THE GLITCH / 01
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-arcade/25 bg-arcade-surface shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-5 border-b border-arcade/20 px-5 py-5 sm:px-7">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-bold tracking-normal sm:text-xl">
                <Crosshair className="size-5 text-arcade" /> Catch the Glitch
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">One glitch. Twenty seconds.</p>
            </div>
            <div className="grid w-full grid-cols-3 gap-6 sm:w-auto sm:gap-10">
              <div>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <Zap className="size-3" /> SCORE
                </span>
                <output
                  aria-label="Score"
                  className="mt-1 block font-mono text-2xl tabular-nums text-foreground"
                >
                  {game.score.toString().padStart(2, "0")}
                </output>
              </div>
              <div>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <Timer className="size-3" /> TIME
                </span>
                <output
                  aria-label="Seconds remaining"
                  aria-live="off"
                  className="mt-1 block font-mono text-2xl tabular-nums text-arcade"
                >
                  {game.remaining.toString().padStart(2, "0")}
                  <span className="text-sm">s</span>
                </output>
              </div>
              <div>
                <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                  <Trophy className="size-3" /> SESSION BEST
                </span>
                <output
                  aria-label="Session best"
                  className="mt-1 block font-mono text-2xl tabular-nums text-gold"
                >
                  {game.best.toString().padStart(2, "0")}
                </output>
              </div>
            </div>
          </div>

          <div
            role="group"
            aria-label="Catch the Glitch play field"
            className="arcade-field relative h-[360px] w-full sm:h-[420px]"
          >
            {playing ? (
              <Button
                ref={targetRef}
                type="button"
                variant="ghost"
                aria-label="Catch the glowing glitch"
                onClick={catchGlitch}
                style={targetStyle}
                className="arcade-orb p-0"
              >
                <Crosshair aria-hidden="true" className="size-6 text-arcade-foreground" />
              </Button>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-5 text-center">
                <div className="grid size-16 place-items-center rounded-full border border-arcade/40 bg-arcade/10 text-arcade">
                  <Gamepad2 className="size-8" />
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold tracking-normal">
                    {game.status === "finished" ? "Time’s up!" : "Ready, player?"}
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {game.status === "finished"
                      ? `${game.score} glitches caught · Session best: ${game.best}`
                      : "Catch the Glitch"}
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={start}
                  className="h-12 gap-2 rounded-full bg-arcade px-7 font-mono text-xs font-bold text-arcade-foreground hover:bg-arcade/90 focus-visible:ring-arcade"
                >
                  {game.status === "finished" ? (
                    <RotateCcw className="size-4" />
                  ) : (
                    <Play className="size-4" />
                  )}
                  {game.status === "finished" ? "Play again" : "Start"}
                </Button>
              </div>
            )}
          </div>

          <div className="flex min-h-16 items-center justify-between gap-4 border-t border-arcade/20 px-5 py-3 sm:px-7">
            <p role="status" className="font-mono text-xs text-muted-foreground">
              {playing
                ? "ROUND ACTIVE"
                : game.status === "finished"
                  ? "ROUND COMPLETE"
                  : "AWAITING PLAYER"}
            </p>
            {playing ? (
              <Button
                type="button"
                variant="outline"
                onClick={start}
                className="h-10 gap-2 rounded-full border-arcade/30 bg-transparent font-mono text-xs text-arcade hover:bg-arcade/10 hover:text-arcade"
              >
                <RotateCcw className="size-3.5" /> Restart
              </Button>
            ) : (
              <span className="font-mono text-[10px] text-muted-foreground">20 SECOND ROUND</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
