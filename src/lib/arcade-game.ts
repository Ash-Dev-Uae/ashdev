export const ROUND_DURATION_MS = 20_000;

export type GlitchPosition = { x: number; y: number };
export type ArcadeState = {
  status: "idle" | "playing" | "finished";
  score: number;
  best: number;
  remaining: number;
  deadline: number | null;
  position: GlitchPosition;
};
export const initialArcadeState: ArcadeState = {
  status: "idle",
  score: 0,
  best: 0,
  remaining: 20,
  deadline: null,
  position: { x: 0.5, y: 0.5 },
};

export function nextGlitchPosition(previous: GlitchPosition, random = Math.random): GlitchPosition {
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = { x: random(), y: random() };
    if (Math.hypot(candidate.x - previous.x, candidate.y - previous.y) >= 0.3) return candidate;
  }
  // A deterministic fallback keeps even repeated random values from stranding the target.
  return { x: previous.x < 0.5 ? 0.9 : 0.1, y: previous.y < 0.5 ? 0.9 : 0.1 };
}

export type ArcadeAction =
  | { type: "start"; now: number; position: GlitchPosition }
  | { type: "tick"; now: number }
  | { type: "catch"; now: number; position: GlitchPosition };

export function arcadeReducer(state: ArcadeState, action: ArcadeAction): ArcadeState {
  if (action.type === "start") {
    return {
      ...state,
      status: "playing",
      score: 0,
      remaining: 20,
      deadline: action.now + ROUND_DURATION_MS,
      position: action.position,
    };
  }
  if (state.status !== "playing" || state.deadline === null) return state;
  const remaining = Math.max(0, Math.ceil((state.deadline - action.now) / 1000));
  if (remaining === 0) return { ...state, status: "finished", remaining: 0, deadline: null };
  if (action.type === "catch") {
    const score = state.score + 1;
    return {
      ...state,
      score,
      best: Math.max(state.best, score),
      remaining,
      position: action.position,
    };
  }
  return remaining === state.remaining ? state : { ...state, remaining };
}
