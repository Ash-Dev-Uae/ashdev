import { useEffect, useRef } from "react";

/** Glowing yellow circle that follows the mouse, or the finger while it's touching the screen. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let tx = -200, ty = -200, x = tx, y = ty;
    let raf = 0;
    let running = false;

    const loop = () => {
      x += (tx - x) * 0.25;
      y += (ty - y) * 0.25;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(loop);
      else running = false;
    };
    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const moveTo = (nx: number, ny: number, snap = false) => {
      tx = nx;
      ty = ny;
      if (snap) {
        x = nx;
        y = ny;
      }
      el.classList.add("is-active");
      kick();
    };
    const hide = () => el.classList.remove("is-active");

    let shown = false;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      moveTo(e.clientX, e.clientY, !shown);
      shown = true;
    };
    const onMouseLeave = () => {
      hide();
      shown = false;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) moveTo(t.clientX, t.clientY, e.type === "touchstart");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", hide, { passive: true });
    window.addEventListener("touchcancel", hide, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", hide);
      window.removeEventListener("touchcancel", hide);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="cursor-glow">
      <span className="cursor-glow-core" />
    </div>
  );
}
