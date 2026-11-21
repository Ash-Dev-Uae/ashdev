import { describe, expect, it } from "vitest";
import { arcadeReducer, initialArcadeState, nextGlitchPosition } from "@/lib/arcade-game";

const start = (now = 1000) =>
  arcadeReducer(initialArcadeState, {
    type: "start",
    now,
    position: { x: 0.2, y: 0.8 },
  });

describe("Catch the Glitch rules", () => {
  it("does not start the timer or score before Start", () => {
    expect(initialArcadeState.deadline).toBeNull();
    expect(arcadeReducer(initialArcadeState, { type: "tick", now: 30_000 }).remaining).toBe(20);
    expect(
      arcadeReducer(initialArcadeState, { type: "catch", now: 10, position: { x: 0, y: 0 } }).score,
    ).toBe(0);
  });
  it("runs for exactly 20 seconds then stops at zero", () => {
    expect(start().deadline).toBe(21_000);
    expect(arcadeReducer(start(), { type: "tick", now: 20_999 }).remaining).toBe(1);
    const finished = arcadeReducer(start(), { type: "tick", now: 21_000 });
    expect(finished).toMatchObject({ status: "finished", remaining: 0, deadline: null });
    expect(arcadeReducer(finished, { type: "tick", now: 50_000 }).remaining).toBe(0);
  });
  it("adds one point and moves after a successful catch", () => {
    const caught = arcadeReducer(start(), {
      type: "catch",
      now: 2000,
      position: { x: 0.8, y: 0.2 },
    });
    expect(caught.score).toBe(1);
    expect(caught.position).toEqual({ x: 0.8, y: 0.2 });
  });
  it("rejects catches at or after the deadline", () => {
    expect(
      arcadeReducer(start(), { type: "catch", now: 21_000, position: { x: 1, y: 1 } }),
    ).toMatchObject({ score: 0, status: "finished" });
  });
  it("restarts with a fresh countdown and score while keeping this page's best", () => {
    const caught = arcadeReducer(start(), { type: "catch", now: 2000, position: { x: 1, y: 1 } });
    const restarted = arcadeReducer(caught, { type: "start", now: 5000, position: { x: 0, y: 0 } });
    expect(restarted).toMatchObject({ score: 0, best: 1, remaining: 20, deadline: 25_000 });
    expect(initialArcadeState.best).toBe(0);
  });
  it("keeps random targets in bounds and moves away from the last position", () => {
    for (const value of [0, 0.5, 0.999]) {
      const previous = { x: value, y: value };
      const next = nextGlitchPosition(previous, () => value);
      expect(next.x).toBeGreaterThanOrEqual(0);
      expect(next.x).toBeLessThanOrEqual(1);
      expect(next.y).toBeGreaterThanOrEqual(0);
      expect(next.y).toBeLessThanOrEqual(1);
      expect(Math.hypot(next.x - previous.x, next.y - previous.y)).toBeGreaterThanOrEqual(0.3);
    }
  });
});
