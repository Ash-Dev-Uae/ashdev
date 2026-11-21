import { cleanup, fireEvent, render, screen, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Arcade } from "@/components/portfolio/Arcade";

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Arcade timer lifecycle", () => {
  it("starts only on Start and clears the timer at twenty seconds", () => {
    render(<Arcade />);
    expect(vi.getTimerCount()).toBe(0);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(vi.getTimerCount()).toBe(1);
    act(() => vi.advanceTimersByTime(20_000));
    expect(vi.getTimerCount()).toBe(0);
  });
  it("replaces the old timer on restart without losing the session best", () => {
    render(<Arcade />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    fireEvent.click(screen.getByRole("button", { name: "Catch the glowing glitch" }));
    act(() => vi.advanceTimersByTime(5_000));
    fireEvent.click(screen.getByRole("button", { name: "Restart" }));
    expect(vi.getTimerCount()).toBe(1);
    expect(screen.getByLabelText("Score").textContent).toBe("00");
    expect(screen.getByLabelText("Session best").textContent).toBe("01");
    expect(screen.getByLabelText("Seconds remaining").textContent).toBe("20s");
    act(() => vi.advanceTimersByTime(15_000));
    expect(screen.getByLabelText("Seconds remaining").textContent).toBe("05s");
    act(() => vi.advanceTimersByTime(5_000));
    expect(vi.getTimerCount()).toBe(0);
  });
  it("cleans up the active timer on unmount", () => {
    const view = render(<Arcade />);
    fireEvent.click(screen.getByRole("button", { name: "Start" }));
    expect(vi.getTimerCount()).toBe(1);
    view.unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
