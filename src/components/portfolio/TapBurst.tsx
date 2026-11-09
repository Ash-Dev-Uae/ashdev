import { useEffect } from "react";

const COLORS = ["bg-primary", "bg-accent", "bg-gold", "bg-primary"];

/** Minecraft-style block-break burst: tapping/clicking anywhere throws pixel particles. */
export function TapBurst() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layer = document.createElement("div");
    layer.className = "pointer-events-none fixed inset-0 z-[100] overflow-hidden";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    const spawn = (x: number, y: number) => {
      const ring = document.createElement("span");
      ring.className = "tap-ring";
      ring.style.left = `${x}px`;
      ring.style.top = `${y}px`;
      ring.addEventListener("animationend", () => ring.remove());
      layer.appendChild(ring);

      const count = 10;
      for (let i = 0; i < count; i++) {
        const p = document.createElement("span");
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
        const dist = 30 + Math.random() * 40;
        const size = 4 + Math.round(Math.random() * 4);
        p.className = `tap-particle ${COLORS[i % COLORS.length]}`;
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
        p.style.setProperty("--dy", `${Math.sin(angle) * dist - 10}px`);
        p.addEventListener("animationend", () => p.remove());
        layer.appendChild(p);
      }
    };

    const onDown = (e: PointerEvent) => spawn(e.clientX, e.clientY);
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      layer.remove();
    };
  }, []);

  return null;
}
