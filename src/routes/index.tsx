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

  const script = terminalScripts[scriptIndex] ?? "";

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
    <main
      className="relative overflow-x-hidden bg-background text-foreground"
      style={{
        backgroundImage: "url('/minecraft-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
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
            <Button asChild variant="ghost" className="font-mono text-xs text-violet-300 hover:text-white">
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
          <div className="animate-pop-in">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-violet-200 sm:text-xs">
              <span className="size-2 animate-pulse rounded-full bg-violet-400" />
              AVAILABLE FOR OPPORTUNITIES
            </div>

            {/* Profile picture and name */}
            <div className="mb-5 flex items-center gap-4 sm:gap-5">
              <div className="relative size-[76px] shrink-0 overflow-hidden rounded-2xl border border-violet-300/40 shadow-[0_0_35px_rgba(139,92,246,0.25)] sm:size-24">
                <img
                  src="/ash-pfp.png"
                  alt="Ash profile picture"
                  className="size-full object-cover"
                />
                <div className="pointer-events-none absolute inset-1 rounded-xl border border-violet-200/10" />
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
              <Button
                asChild
                className="rounded-xl bg-violet-500 px-6 text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400"
              >
                <a href="#servers">
                  Explore My Experience
                  <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>

              <Button
                variant="outline"
                onClick={() => setChatOpen(true)}
                className="rounded-xl border-violet-400/30 bg-violet-400/5 text-violet-200 hover:bg-violet-400/15 hover:text-white"
              >
                Ask Ash
              </Button>
            </div>

            <div className="mt-12 grid max-w-md grid-cols-3 gap-5 border-t border-violet-400/15 pt-7">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-white sm:text-3xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 font-mono text-[9px] tracking-wider text-slate-400 sm:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Reveal delay={150}>
            <TerminalWindow />
          </Reveal>
        </div>
      </section>

      {/* Ownership */}
      <section className="relative border-y border-violet-400/10 bg-[#0b0815]/85 py-20 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle
            kicker="01 / OWNERSHIP"
            title="Communities I've Built"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {ownership.map((item, index) => (
              <Reveal key={item} delay={index * 80}>
                <div className="group h-full rounded-2xl border border-violet-400/15 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-violet-400/[0.06]">
                  <div className="mb-5 grid size-12 place-items-center rounded-xl border border-violet-400/20 bg-violet-400/10">
                    <Crown className="size-5 text-violet-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{item}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Servers */}
      <section
        id="servers"
        className="relative bg-[#0b0815]/90 py-24 backdrop-blur-md"
      >
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle
            kicker="02 / EXPERIENCE"
            title="Where I've Worked"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {servers.map((server, index) => {
              const TierIcon = tierStyle[server.tier].icon;

              return (
                <Reveal key={server.server} delay={index * 50}>
                  <div className="group h-full rounded-2xl border border-violet-400/15 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-violet-400/[0.06]">
                    <div className="mb-5 flex items-center justify-between">
                      <div className="grid size-11 place-items-center rounded-xl border border-violet-400/20 bg-violet-400/10">
                        <TierIcon className="size-5 text-violet-300" />
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 font-mono text-[9px] tracking-wider",
                          tierStyle[server.tier].cls,
                        )}
                      >
                        {tierStyle[server.tier].label}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {server.server}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      {server.position}
                    </p>
                    <p className="mt-3 font-mono text-xs text-violet-300">
                      {server.members} members
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-16">
            <SectionTitle
              kicker="03 / STAFF ROLES"
              title="My Roles & Responsibilities"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {roles.map((role, index) => (
                <Reveal key={role} delay={index * 60}>
                  <div className="flex h-full items-center gap-4 rounded-2xl border border-violet-400/15 bg-white/[0.035] p-5 transition hover:border-violet-400/35">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-400/10">
                      <Gavel className="size-5 text-violet-300" />
                    </div>
                    <h3 className="font-semibold text-white">{role}</h3>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
            {/* Skills */}
      <section
        id="skills"
        className="relative border-y border-violet-400/10 bg-[#0b0815]/85 py-24 backdrop-blur-md"
      >
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle kicker="04 / SKILLS" title="What I Bring" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill, index) => {
              const Icon = skillIcons[index % skillIcons.length];

              return (
                <Reveal key={skill.title} delay={index * 50}>
                  <div className="flex h-full items-center gap-4 rounded-xl border border-violet-400/15 bg-white/[0.035] p-5 transition hover:border-violet-400/40 hover:bg-violet-400/[0.06]">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-400/10">
                      <Icon className="size-5 text-violet-300" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {skill.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-slate-400">
                        {skill.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* More */}
      <section
        id="more"
        className="relative bg-[#0b0815]/90 py-24 backdrop-blur-md"
      >
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle
            kicker="05 / MORE ABOUT ME"
            title="Beyond the Roles"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            {extras.map((extra, index) => (
              <Reveal key={extra} delay={index * 70}>
                <div className="rounded-2xl border border-violet-400/15 bg-white/[0.035] p-6 transition hover:border-violet-400/35">
                  <div className="mb-4 grid size-11 place-items-center rounded-xl bg-violet-400/10">
                    <Sparkles className="size-5 text-violet-300" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{extra}</h3>
                </div>
              </Reveal>
            ))}
          </div>

          {additionalStaffExperience.length > 0 && (
            <div className="mt-14">
              <h3 className="mb-6 text-xl font-bold text-white">
                Additional Staff Experience
              </h3>

              <div className="grid gap-4 sm:grid-cols-3">
                {additionalStaffExperience.map((members) => (
                  <div
                    key={members}
                    className="rounded-xl border border-violet-400/15 bg-white/[0.035] p-5"
                  >
                    <Users className="mb-3 size-5 text-violet-300" />
                    <h4 className="text-2xl font-bold text-white">
                      {members}+
                    </h4>
                    <p className="mt-1 text-sm text-slate-400">
                      Member server experience
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Arcade */}
      <section
        className="relative border-y border-violet-400/10 bg-[#0b0815]/90 py-24 backdrop-blur-md"
      >
        <div className="mx-auto max-w-6xl px-6">
          <SectionTitle
            kicker="06 / INTERACTIVE"
            title="Take a Break"
          />

          <p className="mb-8 max-w-xl text-sm leading-relaxed text-slate-400">
            A little something to play with while you're here. Have fun!
          </p>

          <Arcade />
        </div>
      </section>

      {/* Contact */}
      <section className="relative bg-[#0b0815]/90 py-24 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <div className="mx-auto mb-6 grid size-14 place-items-center rounded-2xl border border-violet-400/25 bg-violet-400/10">
              <Handshake className="size-7 text-violet-300" />
            </div>

            <p className="font-mono text-xs tracking-[0.2em] text-violet-300">
              07 / LET'S CONNECT
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Have a project in mind?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
              Whether you're building a community, growing a server, or looking
              for someone to help manage your team, let's talk.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <DiscordButton />

              <Button
                onClick={() => setChatOpen(true)}
                variant="outline"
                className="rounded-xl border-violet-400/30 bg-violet-400/5 text-violet-200 hover:bg-violet-400/15 hover:text-white"
              >
                Ask Ash
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-violet-400/10 bg-[#080610] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center sm:flex-row sm:text-left">
          <p className="font-mono text-xs text-slate-500">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>

          <p className="font-mono text-[10px] tracking-wider text-violet-400/70">
            BUILT WITH PASSION
          </p>
        </div>
      </footer>
    </main>
  );
              }
