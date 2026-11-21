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
  type LucideIcon,
} from "lucide-react";
import { Reveal, Counter } from "@/components/portfolio/motion";
import { DiscordButton } from "@/components/portfolio/DiscordButton";
import { TapBurst } from "@/components/portfolio/TapBurst";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { AskAsh } from "@/components/portfolio/AskAsh";
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
          "Founder, admin, head manager and moderator across 70+ Discord and Minecraft servers. Staff management, moderation and community building.",
      },
      { property: "og:title", content: `${profile.name} — Discord & Minecraft Staff Portfolio` },
      {
        property: "og:description",
        content: "Staff & management experience across 70+ Discord and Minecraft communities.",
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

const tierStyle: Record<ServerRole["tier"], { label: string; cls: string; icon: LucideIcon }> = {
  owner: { label: "OWNER", cls: "bg-gold text-background", icon: Crown },
  lead: { label: "LEAD", cls: "bg-primary text-primary-foreground", icon: Shield },
  staff: { label: "STAFF", cls: "bg-accent text-accent-foreground", icon: Gavel },
};

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="mb-10">
      <p className="font-pixel text-xs tracking-widest text-primary">{kicker}</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

/* Animated terminal content */
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

  const script = terminalScripts[scriptIndex] ?? terminalScripts[0];

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
        setScriptIndex((index) => (index + 1) % terminalScripts.length);
      } else if (deleting) {
        setTyped((current) => current.slice(0, -1));
      } else {
        setTyped(script.slice(0, typed.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [typed, deleting, script]);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-emerald-400/20 bg-[#050807]/95 shadow-[0_0_55px_rgba(16,185,129,.12)]">
      <div className="flex h-12 items-center justify-between border-b border-white/10 bg-white/[0.035] px-4">
        <div className="flex gap-2">
          <span className="size-2.5 rounded-full bg-red-500" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-500" />
        </div>

        <span className="font-mono text-[10px] text-slate-500">
          root@ashdev: ~
        </span>

        <span className="font-mono text-xs text-emerald-400">
          ▮▮▮
        </span>
      </div>

      <div className="min-h-[300px] p-5 font-mono text-xs leading-6 text-emerald-300 sm:min-h-[340px] sm:p-7 sm:text-sm">
        <pre className="whitespace-pre-wrap break-words">
          {typed}
          <span className="animate-blink text-emerald-300">█</span>
        </pre>
      </div>
    </div>
  );
}

function Index() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main className="overflow-x-hidden">
      <TapBurst />
      <CursorGlow />
      <AskAsh open={chatOpen} onOpenChange={setChatOpen} />

      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-emerald-400/10 bg-[#030706]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-center gap-2 font-mono text-sm">
            <span className="inline-block size-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">root@</span>
            <span className="text-white">{profile.name}</span>
          </a>

          <div className="hidden items-center gap-8 font-mono text-[10px] text-slate-400 sm:flex">
            <a href="#servers" className="hover:text-emerald-400">01_SERVERS</a>
            <a href="#skills" className="hover:text-emerald-400">02_SKILLS</a>
            <a href="#more" className="hover:text-emerald-400">03_MORE</a>

            <Button
              variant="ghost"
              onClick={() => setChatOpen(true)}
              className="h-auto border border-emerald-400/30 px-4 py-2 font-mono text-[10px] text-emerald-400 hover:bg-emerald-400/10 hover:text-emerald-300"
            >
              Ask_Ash()
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="top"
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#030706] py-28 text-white"
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(36,255,164,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(36,255,164,.10) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 20%, black 85%, transparent)",
          }}
        />

        <div className="absolute -left-40 top-1/4 size-[34rem] rounded-full bg-emerald-500/10 blur-[130px]" />
        <div className="absolute right-0 top-1/4 size-[30rem] rounded-full bg-emerald-400/10 blur-[140px]" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-8 lg:grid-cols-[1fr_1.08fr] lg:gap-16">
          {/* Left side */}
          <div className="animate-pop-in">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10px] tracking-[.18em] text-emerald-300 sm:text-xs">
              <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
              SYSTEM.STATUS: ONLINE
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
              <span className="block text-white">{profile.name}</span>
            </h1>

            <p className="mt-4 font-mono text-xl text-slate-300 sm:text-2xl">
              {profile.role}
              <span className="animate-blink text-emerald-400">_</span>
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {["DISCORD MANAGEMENT", "MINECRAFT", "COMMUNITY BUILDING"].map((tag, i) => (
                <span
                  key={tag}
                  className={cn(
                    "border px-3 py-2 font-mono text-[10px] tracking-wider sm:text-xs",
                    i === 0
                      ? "border-emerald-400/40 text-emerald-300"
                      : i === 1
                        ? "border-sky-400/40 text-sky-300"
                        : "border-violet-400/40 text-violet-300",
                  )}
                >
                  [ {tag} ]
                </span>
              ))}
            </div>

            <p className="mt-7 max-w-lg border-l-2 border-emerald-400/40 pl-4 font-mono text-sm leading-relaxed text-slate-400">
              &gt; Building communities, managing teams, and creating better server experiences.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#servers"
                className="rounded-md border border-emerald-400/40 bg-emerald-400/10 px-6 py-3 font-mono text-xs text-emerald-300 transition hover:bg-emerald-400/20"
              >
                init_experience()
              </a>

              <a
                href="#contact"
                className="rounded-md border border-white/15 bg-white/[0.04] px-6 py-3 font-mono text-xs text-slate-200 transition hover:border-white/30 hover:bg-white/[0.08]"
              >
                contact_me()
              </a>
            </div>
          </div>

          {/* Right side: animated terminal */}
          <TerminalWindow />
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="relative mx-auto -mt-10 max-w-6xl px-5">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="pixel-card p-5 text-center">
                <div className="font-display text-3xl font-bold text-primary sm:text-4xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Marquee */}
      <div className="mt-20 overflow-hidden border-y-2 border-border bg-card py-3">
        <div className="flex w-max animate-marquee gap-10 font-pixel text-sm text-muted-foreground">
          {[...servers, ...servers].map((s, i) => (
            <span key={i} className="flex items-center gap-3">
              <Pickaxe className="size-4 text-primary" />
              {s.server}
            </span>
          ))}
        </div>
      </div>

      {/* Servers */}
      <section id="servers" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
        <SectionTitle kicker="// STAFF EXPERIENCE" title="Servers I've run & staffed" />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {servers.map((s, i) => {
            const t = tierStyle[s.tier];
            const Icon = t.icon;

            return (
              <Reveal key={s.server} delay={(i % 3) * 120}>
                <article className="pixel-card group flex aspect-square flex-col justify-between p-3 sm:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="grid size-9 place-items-center border-2 border-border bg-secondary transition-transform duration-300 group-hover:rotate-12 sm:size-12">
                      <Icon className="size-4 text-primary sm:size-6" />
                    </div>

                    <span
                      className={cn(
                        "px-1.5 py-1 font-pixel text-[9px] sm:px-2 sm:text-[10px]",
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
                    <p className="mt-1 text-sm text-primary sm:text-base">
                      {s.position}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 border-t-2 border-dashed border-border pt-2 text-xs text-muted-foreground sm:gap-2 sm:pt-4 sm:text-sm">
                    <Users className="size-3.5 shrink-0 sm:size-4" />
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
                className="pixel-card flex aspect-square flex-col items-center justify-center gap-3 p-3 text-center"
              >
                <Users className="size-6 text-accent" />
                <h3 className="font-bold">{members}-member server</h3>
                <p className="text-sm text-muted-foreground">Staff experience</p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center font-pixel text-sm text-muted-foreground">
            + worked with <span className="text-primary">70+</span> servers in total
          </p>
        </Reveal>
      </section>

      {/* Ownership + Roles */}
      <section className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-2">
        <Reveal>
          <div className="pixel-card h-full p-7">
            <div className="flex items-center gap-3">
              <Crown className="size-6 text-gold" />
              <h3 className="text-2xl font-bold">Ownership & Management</h3>
            </div>

            <ul className="mt-6 space-y-3">
              {ownership.map((o) => (
                <li key={o} className="flex items-start gap-3">
                  <span className="mt-2 size-2 shrink-0 bg-primary" />
                  <span className="text-muted-foreground">{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="pixel-card pixel-card-accent h-full p-7">
            <div className="flex items-center gap-3">
              <Shield className="size-6 text-accent" />
              <h3 className="text-2xl font-bold">Staff Roles Held</h3>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {roles.map((r, i) => (
                <span
                  key={r}
                  className="animate-pop-in grid aspect-square place-items-center border-2 border-accent bg-accent/15 p-2 text-center font-pixel text-[10px] leading-snug sm:text-xs"
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
      <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
        <SectionTitle kicker="// STAFF SKILLS" title="What I bring to a team" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((s, i) => {
            const Icon = skillIcons[i] ?? Sparkles;

            return (
              <Reveal key={s.title} delay={(i % 3) * 100}>
                <div className="pixel-card group flex h-full gap-4 p-5">
                  <div className="grid size-11 shrink-0 place-items-center bg-primary/15 transition-colors group-hover:bg-primary">
                    <Icon className="size-5 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>

                  <div>
                    <h3 className="font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Additional */}
      <section id="more" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-24">
        <SectionTitle kicker="// ADDITIONAL" title="Also experienced in" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {extras.map((e, i) => (
            <Reveal key={e} delay={(i % 3) * 80}>
              <div className="pixel-card flex aspect-square flex-col items-center justify-center gap-3 p-3 text-center text-sm">
                <Sparkles className="size-6 text-gold" />
                <span>{e}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="scroll-mt-16 border-t-2 border-border bg-card">
        <Reveal className="mx-auto max-w-3xl px-5 py-20 text-center">
          <p className="font-pixel text-xs text-primary">// READY TO JOIN</p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Need a reliable staff member for your{" "}
            <span className="text-gradient">server</span>?
          </h2>

          <p className="mt-4 text-muted-foreground">
            Moderation, staff management, announcements and community growth — let's talk on
            Discord.
          </p>

          <div className="mt-8">
            <DiscordButton />
          </div>
        </Reveal>

        <footer className="border-t-2 border-border py-6 text-center font-pixel text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} · Built block by block
        </footer>
      </section>
    </main>
  );
}
