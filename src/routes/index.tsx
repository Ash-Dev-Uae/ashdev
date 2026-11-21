import { createFileRoute } from "@tanstack/react-router";
import {
  Crown,
  Shield,
  Gavel,
  Flag,
  Bug,
  MessageSquareOff,
  Handshake,
  UserX,
  LayoutPanelTop,
  ClipboardCheck,
  Megaphone,
  Users,
  Sparkles,
  Pickaxe,
  ArrowUpRight,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Counter } from "@/components/portfolio/motion";
import { DiscordButton } from "@/components/portfolio/DiscordButton";
import { TapBurst } from "@/components/portfolio/TapBurst";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { AskAsh } from "@/components/portfolio/AskAsh";
import { Arcade } from "@/components/portfolio/Arcade";
import {
  profile,
  servers,
  stats,
  ownership,
  roles,
  skills,
  extras,
  additionalStaffExperience,
  type ServerRole,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — Discord & Minecraft Staff Portfolio` },
      {
        name: "description",
        content:
          "Community management, staff leadership, moderation and Minecraft server experience across 70+ communities.",
      },
      { property: "og:title", content: `${profile.name} — AshDev Portfolio` },
      {
        property: "og:description",
        content:
          "Building communities, managing teams and creating better server experiences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const skillIcons: LucideIcon[] = [
  Gavel,
  Flag,
  Bug,
  MessageSquareOff,
  Handshake,
  UserX,
  LayoutPanelTop,
  ClipboardCheck,
  Megaphone,
];

const tierStyle: Record<
  ServerRole["tier"],
  { label: string; cls: string; icon: LucideIcon }
> = {
  owner: {
    label: "OWNER",
    cls: "bg-gold text-background",
    icon: Crown,
  },
  lead: {
    label: "LEAD",
    cls: "bg-primary text-primary-foreground",
    icon: Shield,
  },
  staff: {
    label: "STAFF",
    cls: "bg-accent text-accent-foreground",
    icon: Gavel,
  },
};

function SectionTitle({
  kicker,
  title,
}: {
  kicker: string;
  title: string;
}) {
  return (
    <Reveal className="mb-10">
      <p className="font-mono text-xs tracking-[0.2em] text-primary">
        {kicker}
      </p>

      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
    </Reveal>
  );
}

/* Animated terminal */
const terminalScripts = [
  [
    "$ boot --portfolio",
    "> loading profile modules...",
    "> identity: " + profile.name,
    "> role: community_manager",
    "> status: online",
    "> all systems operational_",
  ].join("\n") + "\n",

  [
    "$ scan --experience",
    "> discord_servers: 70+",
    "> staff_management: active",
    "> moderation_tools: ready",
    "> community_building: enabled",
    "> scan complete_",
  ].join("\n") + "\n",

  [
    "$ minecraft --server-tools",
    "> initializing server systems...",
    "> configuring staff teams...",
    "> optimizing player experience...",
    "> permissions verified",
    "> process finished_",
  ].join("\n") + "\n",

  [
    "$ whoami",
    "> " + profile.name,
    "> community manager",
    "> minecraft server owner",
    "> staff team builder",
    "> ready for the next project_",
  ].join("\n") + "\n",
];

function TerminalWindow() {
  const [scriptIndex, setScriptIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  const script = terminalScripts[scriptIndex] ?? terminalScripts[0] ?? "";

  useEffect(() => {
    const finishedTyping = typed === script;
    const finishedDeleting = deleting && typed.length === 0;

    const delay =
      !deleting && finishedTyping
        ? 1700
        : finishedDeleting
          ? 350
          : deleting
            ? 12
            : typed.endsWith("\n")
              ? 160
              : 22;

    const timer = window.setTimeout(() => {
      if (!deleting && finishedTyping) {
        setDeleting(true);
      } else if (finishedDeleting) {
        setDeleting(false);
        setScriptIndex(
          (index) => (index + 1) % terminalScripts.length,
        );
      } else if (deleting) {
        setTyped((current) => current.slice(0, -1));
      } else {
        setTyped(script.slice(0, typed.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [typed, deleting, script]);

  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-violet-400/20 bg-[#0b0815]/95 shadow-[0_0_65px_rgba(139,92,246,0.13)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/70 to-transparent" />

      <div className="flex h-12 items-center justify-between border-b border-white/[0.07] bg-white/[0.025] px-5">
        <div className="flex gap-2">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-300" />
          <span className="size-2.5 rounded-full bg-violet-400" />
        </div>

        <span className="font-mono text-[10px] text-slate-500">
          ash@portfolio: ~
        </span>

        <Code2 className="size-4 text-violet-400" />
      </div>

      <div className="min-h-[300px] p-5 font-mono text-xs leading-6 text-violet-200 sm:min-h-[340px] sm:p-7 sm:text-sm">
        <div className="mb-4 text-violet-400/50">
          // interactive terminal
        </div>

        <pre className="whitespace-pre-wrap break-words">
          {typed}
          <span className="animate-blink text-violet-300">█</span>
        </pre>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3 font-mono text-[10px] text-slate-500">
        <span>ASHDEV_TERMINAL</span>
        <span className="text-violet-400">● RUNNING</span>
      </div>
    </div>
  );
}

function Index() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main className="relative overflow-x-hidden bg-background text-foreground" style={{ backgroundImage: "url('/minecraft-bg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <TapBurst />
      <CursorGlow />
      <AskAsh open={chatOpen} onOpenChange={setChatOpen} />

      {/* Navigation */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-violet-400/10 bg-[#0b0815]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a
            href="#top"
            className="flex items-center gap-2.5 font-mono text-sm"
          >
            <span className="grid size-8 place-items-center rounded-lg border border-violet-400/30 bg-violet-400/10">
              <Code2 className="size-4 text-violet-300" />
            </span>

            <span className="font-semibold text-white">
              {profile.name}
            </span>

            <span className="text-violet-400">.</span>
          </a>

          <div className="flex items-center gap-3 sm:hidden">
            <Button
              asChild
              variant="ghost"
              className="font-mono text-xs text-violet-300 hover:text-white"
            >
              <a href="#arcade">Arcade</a>
            </Button>
          </div>

          <div className="hidden items-center gap-6 font-mono text-[11px] text-slate-400 sm:flex">
            <a href="#servers" className="transition hover:text-violet-300">
              Servers
            </a>

            <a href="#skills" className="transition hover:text-violet-300">
              Skills
            </a>

            <a href="#more" className="transition hover:text-violet-300">
              More
            </a>

            <a href="#arcade" className="transition hover:text-violet-300">
              Arcade
            </a>

            <Button
              variant="ghost"
              onClick={() => setChatOpen(true)}
              className="h-auto rounded-lg border border-violet-400/30 bg-violet-400/10 px-4 py-2 font-mono text-[11px] text-violet-200 transition hover:bg-violet-400/20 hover:text-white"
            >
              Ask Ash
              <ArrowUpRight className="ml-1 size-3" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="top"
        className="relative flex min-h-[100svh] items-center overflow-hidden py-28 text-white"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(167,139,250,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,.18) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
          }}
        />

        <div className="absolute -left-40 top-1/4 size-[32rem] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute right-0 top-1/4 size-[30rem] rounded-full bg-fuchsia-500/10 blur-[150px]" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-6 pt-8 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
          {/* Hero introduction */}
          <div className="animate-pop-in">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-violet-200 sm:text-xs">
              <span className="size-2 animate-pulse rounded-full bg-violet-400" />
              AVAILABLE FOR OPPORTUNITIES
            </div>

            <div className="mb-5 flex items-center gap-4 sm:gap-5">
              <div className="relative grid size-[76px] shrink-0 place-items-center overflow-hidden rounded-2xl border border-violet-300/40 bg-gradient-to-br from-violet-500/30 via-[#21143d] to-[#100b1e] shadow-[0_0_35px_rgba(139,92,246,0.25)] sm:size-24">
                <div className="absolute inset-1 rounded-xl border border-violet-200/10" />

                <Sparkles className="size-9 text-violet-200 sm:size-11" />

                <span className="absolute bottom-2 right-2 size-2.5 rounded-full border-2 border-[#160e26] bg-emerald-400" />
              </div>

              <div className="min-w-0">
                <p className="mb-1 font-mono text-[10px] tracking-[0.2em] text-violet-300">
                  INTRODUCING
                </p>

                <h1 className="break-words text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  {profile.name}
                  <span className="text-violet-400">.</span>
                </h1>
              </div>
            </div>

            <p className="max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              Building communities, managing teams, and creating better server
              experiences.
            </p>

            <p className="mt-5 font-mono text-lg text-violet-300 sm:text-xl">
              {profile.role}
              <span className="animate-blink">_</span>
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {[
                "Discord Management",
                "Minecraft",
                "Community Building",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-violet-400/20 bg-violet-400/[0.06] px-3.5 py-2 font-mono text-[10px] tracking-wide text-violet-200 sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#servers"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-300/40 bg-violet-500 px-6 py-3.5 font-mono text-xs font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.22)] transition hover:-translate-y-1 hover:bg-violet-400"
              >
                View Experience
                <ArrowUpRight className="size-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 font-mono text-xs text-slate-200 transition hover:-translate-y-1 hover:border-violet-300/40 hover:bg-violet-400/10"
              >
                Contact Me
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-xs text-slate-500">
              <span className="h-px w-8 bg-violet-400/40" />
              Scroll to explore
              <span className="animate-bounce text-violet-300">↓</span>
            </div>
          </div>

          {/* Animated terminal */}
          <TerminalWindow />
        </div>
      </section>
            {/* Stats */}
      <section
        id="stats"
        className="relative mx-auto -mt-8 max-w-6xl scroll-mt-24 px-5"
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="pixel-card rounded-2xl p-5 text-center">
                <div className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>

                <div className="mt-2 text-xs text-muted-foreground sm:text-sm">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y border-violet-400/10 bg-card/60 py-4">
        <div className="flex w-max animate-marquee gap-10 font-mono text-sm text-muted-foreground">
          {[...servers, ...servers].map((s, i) => (
            <span key={i} className="flex items-center gap-3">
              <Pickaxe className="size-4 text-primary" />
              {s.server}
            </span>
          ))}
        </div>
      </div>

      {/* Servers */}
      <section
        id="servers"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24"
      >
        <SectionTitle
          kicker="// STAFF EXPERIENCE"
          title="Servers I've run & staffed"
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {servers.map((s, i) => {
            const t = tierStyle[s.tier];
            const Icon = t.icon;

            return (
              <Reveal key={s.server} delay={(i % 3) * 120}>
                <article className="pixel-card group flex aspect-square flex-col justify-between rounded-2xl p-3 sm:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid size-10 place-items-center rounded-xl border border-violet-400/20 bg-violet-400/10 transition-transform duration-300 group-hover:rotate-6 sm:size-12">
                      <Icon className="size-5 text-primary sm:size-6" />
                    </div>

                    <span
                      className={cn(
                        "rounded-md px-2 py-1 font-mono text-[9px] sm:text-[10px]",
                        t.cls,
                      )}
                    >
                      {t.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold leading-tight sm:text-2xl">
                      {s.server}
                    </h3>

                    <p className="mt-2 text-sm text-primary sm:text-base">
                      {s.position}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 border-t border-dashed border-border pt-3 text-xs text-muted-foreground sm:pt-4 sm:text-sm">
                    <Users className="size-4 shrink-0" />
                    {s.members}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {additionalStaffExperience.map((members) => (
              <article
                key={members}
                className="pixel-card flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl p-3 text-center"
              >
                <Users className="size-6 text-accent" />

                <h3 className="font-bold">{members}-member server</h3>

                <p className="text-sm text-muted-foreground">
                  Staff experience
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center font-mono text-sm text-muted-foreground">
            + worked with{" "}
            <span className="font-bold text-primary">70+</span> servers in
            total
          </p>
        </Reveal>
      </section>

      {/* Ownership and Roles */}
      <section className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-2">
        <Reveal>
          <div className="pixel-card h-full rounded-2xl p-7">
            <div className="flex items-center gap-3">
              <Crown className="size-6 text-gold" />
              <h3 className="text-2xl font-bold">
                Ownership & Management
              </h3>
            </div>

            <ul className="mt-6 space-y-4">
              {ownership.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="pixel-card h-full rounded-2xl p-7">
            <div className="flex items-center gap-3">
              <Shield className="size-6 text-accent" />
              <h3 className="text-2xl font-bold">Staff Roles Held</h3>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {roles.map((r, i) => (
                <span
                  key={r}
                  className="animate-pop-in grid aspect-square place-items-center rounded-xl border border-violet-400/20 bg-violet-400/[0.07] p-2 text-center text-xs font-semibold text-violet-200 sm:text-sm"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section
        id="skills"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24"
      >
        <SectionTitle
          kicker="// STAFF SKILLS"
          title="What I bring to a team"
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => {
            const Icon = skillIcons[i] ?? Sparkles;

            return (
              <Reveal key={s.title} delay={(i % 3) * 100}>
                <div className="pixel-card group flex h-full gap-4 rounded-2xl p-5">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-400/10 transition-colors group-hover:bg-violet-400/20">
                    <Icon className="size-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-bold">{s.title}</h3>

                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {s.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Additional */}
      <section
        id="more"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24"
      >
        <SectionTitle
          kicker="// ADDITIONAL"
          title="Also experienced in"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {extras.map((e, i) => (
            <Reveal key={e} delay={(i % 3) * 80}>
              <div className="pixel-card flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl p-3 text-center text-sm">
                <Sparkles className="size-6 text-violet-300" />
                <span>{e}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Arcade Game */}
      <Arcade />

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-16 border-t border-violet-400/10 bg-[#0b0815]/70"
      >
        <Reveal className="mx-auto max-w-3xl px-5 py-20 text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-violet-300">
            // READY TO JOIN
          </p>

          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Need a reliable staff member for your{" "}
            <span className="text-violet-400">server</span>?
          </h2>

          <p className="mt-4 leading-relaxed text-muted-foreground">
            Moderation, staff management, announcements and community growth —
            let's talk on Discord.
          </p>

          <div className="mt-8">
            <DiscordButton />
          </div>
        </Reveal>

        <footer className="border-t border-violet-400/10 py-6 text-center font-mono text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} · Built block by block
        </footer>
      </section>
    </main>
  );
      }
