import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Bot,
  Box,
  Bug,
  Check,
  ClipboardCheck,
  Code2,
  Crown,
  Flag,
  Gavel,
  Hammer,
  Handshake,
  LayoutPanelTop,
  Menu,
  MessageCircle,
  MessageSquareOff,
  MessagesSquare,
  Shield,
  Sparkles,
  UserX,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Arcade } from "@/components/portfolio/Arcade";
import { AskAsh } from "@/components/portfolio/AskAsh";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { DiscordButton } from "@/components/portfolio/DiscordButton";
import { Counter, Reveal } from "@/components/portfolio/motion";
import { TapBurst } from "@/components/portfolio/TapBurst";
import { Button } from "@/components/ui/button";
import {
  additionalStaffExperience,
  extras,
  ownership,
  profile,
  projects,
  roles,
  servers,
  skills,
  stats,
  type ServerRole,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ash — Community Manager & Minecraft Staff" },
      {
        name: "description",
        content:
          "Ash's portfolio: Discord and Minecraft staff experience, community leadership, moderation skills, owned servers, and interactive projects.",
      },
      { property: "og:title", content: "Ash — Community Manager & Minecraft Staff" },
      {
        property: "og:description",
        content:
          "Community leadership, hands-on moderation, Minecraft server experience, and interactive projects by Ash.",
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
  MessagesSquare,
];

const tierDetails: Record<
  ServerRole["tier"],
  { label: string; icon: LucideIcon; className: string }
> = {
  owner: {
    label: "Owner",
    icon: Crown,
    className: "border-primary/35 bg-primary/10 text-primary",
  },
  lead: {
    label: "Leadership",
    icon: Shield,
    className: "border-foreground/15 bg-secondary text-foreground",
  },
  staff: {
    label: "Staff",
    icon: Gavel,
    className: "border-border bg-muted text-muted-foreground",
  },
};

const navigation = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Arcade", href: "#arcade" },
];

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mb-10 grid gap-5 border-t border-border pt-6 sm:mb-12 lg:grid-cols-[1fr_1.4fr] lg:gap-12">
      <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
        <span>{number}</span>
        <span className="h-px w-8 bg-primary/50" />
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 className="max-w-2xl text-3xl font-extrabold tracking-[-0.045em] text-balance sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
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
  const [reducedMotion, setReducedMotion] = useState(false);
  const script = terminalScripts[scriptIndex] ?? "";

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setTyped(script);
      return;
    }

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
  }, [typed, deleting, script, reducedMotion]);

  return (
    <div className="terminal-window overflow-hidden rounded-2xl border border-border bg-background/90 shadow-2xl">
      <div className="flex h-12 items-center justify-between border-b border-border bg-secondary/45 px-4 sm:px-5">
        <div className="flex gap-2" aria-hidden="true">
          <span className="size-2 rounded-full bg-muted-foreground/45" />
          <span className="size-2 rounded-full bg-muted-foreground/45" />
          <span className="size-2 rounded-full bg-primary" />
        </div>
        <span className="font-mono text-[9px] tracking-wider text-muted-foreground sm:text-[10px]">
          ash@portfolio: ~
        </span>
        <Code2 className="size-4 text-primary" aria-hidden="true" />
      </div>

      <div className="relative min-h-[270px] p-5 font-mono text-[11px] leading-6 text-foreground/80 sm:min-h-[310px] sm:p-7 sm:text-sm">
        <div className="mb-4 text-primary/70">// live profile terminal</div>
        <pre aria-label="Animated profile terminal" className="whitespace-pre-wrap break-words">
          {typed}
          <span className="animate-blink text-primary">_</span>
        </pre>
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-3 font-mono text-[9px] tracking-wider text-muted-foreground sm:px-5">
        <span>ASHDEV_TERMINAL</span>
        <span className="flex items-center gap-2 text-primary">
          <span className="size-1.5 rounded-full bg-primary" /> RUNNING
        </span>
      </div>
    </div>
  );
}

function VoxelMotif() {
  return (
    <div className="voxel-motif" aria-hidden="true">
      <span className="voxel-cube voxel-cube-large" />
      <span className="voxel-cube voxel-cube-small" />
      <span className="voxel-pixel voxel-pixel-one" />
      <span className="voxel-pixel voxel-pixel-two" />
    </div>
  );
}

function Index() {
  const [chatOpen, setChatOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const discordUrl = `https://discord.com/users/${profile.discordId}`;

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      <TapBurst />
      <CursorGlow />
      <AskAsh open={chatOpen} onOpenChange={setChatOpen} />

      <a
        href="#content"
        className="fixed top-3 left-3 z-[80] -translate-y-24 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition focus:translate-y-0"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          <a href="#top" className="group flex items-center gap-3" aria-label="Ash, back to top">
            <span className="relative grid size-9 place-items-center rounded-lg border border-primary/35 bg-primary/10 text-primary transition group-hover:bg-primary/15">
              <Box className="size-4" />
              <span className="absolute -right-0.5 -bottom-0.5 size-2 bg-primary" />
            </span>
            <span className="text-sm font-extrabold tracking-[-0.03em]">ASHDEV</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold text-muted-foreground transition hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button
              onClick={() => setChatOpen(true)}
              className="h-10 rounded-full bg-primary px-5 text-xs font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Bot className="size-4" /> Ask Ash
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setChatOpen(true)}
              aria-label="Ask Ash"
              className="rounded-full text-primary"
            >
              <Bot className="size-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              className="rounded-full"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </nav>

        <div
          id="mobile-navigation"
          hidden={!menuOpen}
          className="border-t border-border bg-background px-5 py-5 lg:hidden"
        >
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold"
              >
                {item.label} <ArrowRight className="size-4 text-primary" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="col-span-2 flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
            >
              Contact Ash <MessageCircle className="size-4" />
            </a>
          </div>
        </div>
      </header>

      <main id="content">
        <section
          id="top"
          className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20"
        >
          <div className="hero-atmosphere absolute inset-0 -z-20" aria-hidden="true" />
          <img
            src="/minecraft-bg.png"
            alt=""
            className="hero-landscape absolute inset-0 -z-10 size-full object-cover"
          />
          <VoxelMotif />

          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.06fr_.94fr] lg:gap-16">
              <div className="animate-pop-in">
                <div className="mb-7 flex items-center gap-3 font-mono text-[9px] tracking-[0.16em] text-primary uppercase sm:text-[10px]">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  Community · Moderation · Development
                </div>

                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="profile-frame relative shrink-0">
                    <img
                      src="/ash-pfp.png"
                      alt="Ash's Minecraft-inspired profile portrait"
                      className="size-20 rounded-[1.15rem] border border-primary/35 object-cover shadow-xl sm:size-28"
                    />
                    <span
                      className="absolute -right-1 -bottom-1 size-4 border-2 border-background bg-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h1 className="text-[clamp(4rem,10vw,8rem)] leading-[0.82] font-extrabold tracking-[-0.085em]">
                    ASH<span className="text-primary">.</span>
                  </h1>
                </div>

                <p className="mt-8 max-w-xl text-xl leading-snug font-semibold tracking-[-0.025em] text-foreground sm:text-2xl">
                  {profile.role}. Community manager.
                  <br />
                  <span className="text-muted-foreground">Minecraft & Discord staff.</span>
                </p>
                <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                  Building communities, coordinating staff teams, and creating better server
                  experiences through hands-on leadership.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="h-12 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[var(--glow-primary)] hover:bg-primary/90"
                  >
                    <a href="#projects">
                      View projects <ArrowRight className="size-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-12 rounded-full border-border bg-card/60 px-6 text-sm font-semibold hover:border-primary/45 hover:bg-card"
                  >
                    <a href="#contact">Contact me</a>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setChatOpen(true)}
                    className="h-12 rounded-full px-3 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                  >
                    <Bot className="size-4" /> Ask AshBot
                  </Button>
                </div>
              </div>

              <Reveal delay={140} className="relative">
                <div className="mb-4 flex items-center justify-between font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
                  <span>Profile console / 001</span>
                  <span className="text-primary">Online</span>
                </div>
                <TerminalWindow />
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-card/65 px-4 py-3 backdrop-blur-md">
                  <Blocks className="size-5 shrink-0 text-primary" />
                  <p className="text-xs leading-5 text-muted-foreground">
                    Practical experience across{" "}
                    <span className="font-semibold text-foreground">70+ communities</span>, from
                    staff member to owner.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal className="mt-14 grid grid-cols-2 border-y border-border lg:mt-16 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={cn(
                    "py-5 sm:py-6",
                    index % 2 === 1 && "border-l border-border pl-5 sm:pl-7",
                    index > 1 && "border-t border-border lg:border-t-0",
                    index === 2 && "lg:border-l lg:pl-7",
                    index === 0 && "lg:pr-7",
                  )}
                >
                  <p className="text-2xl font-extrabold tracking-[-0.04em] sm:text-3xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 font-mono text-[9px] leading-4 tracking-wide text-muted-foreground uppercase sm:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="about" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              number="01"
              eyebrow="About"
              title="Community first. Built through real experience."
              description="A concise look at what I do, the responsibilities I've held, and the communities I've helped shape."
            />

            <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
              <Reveal>
                <article className="surface-card relative h-full overflow-hidden p-6 sm:p-9">
                  <div
                    className="absolute top-0 right-0 size-24 border-b border-l border-border bg-secondary/35"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                    Hello, I am Ash
                  </span>
                  <h3 className="mt-6 max-w-xl text-2xl leading-tight font-bold tracking-[-0.035em] sm:text-3xl">
                    A new developer with hands-on staff and community management experience.
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                    I've worked across Discord and Minecraft communities as a staff member,
                    moderator, administrator, manager, founder, and owner. My experience covers
                    day-to-day moderation, reports, staff coordination, applications, announcements,
                    and server systems.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {["Discord", "Minecraft", "Staff leadership", "New developer"].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-background/50 px-3 py-1.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>

              <Reveal delay={100}>
                <article className="h-full rounded-2xl border border-primary/25 bg-primary/[0.055] p-6 sm:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <Crown className="size-5 text-primary" />
                    <h3 className="font-bold">Ownership & coordination</h3>
                  </div>
                  <ul className="space-y-5">
                    {ownership.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                          <Check className="size-3" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="experience" className="section-band scroll-mt-20 py-20 sm:py-24">
          <span id="servers" className="absolute -top-20" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              number="02"
              eyebrow="Experience"
              title="Roles earned inside real communities."
              description="Featured Discord and Minecraft staff experience, from junior moderation to community ownership."
            />

            <div className="experience-timeline">
              {servers.map((server, index) => {
                const tier = tierDetails[server.tier];
                const TierIcon = tier.icon;
                return (
                  <Reveal key={server.server} delay={Math.min(index * 45, 220)}>
                    <article className="experience-row group grid gap-4 py-5 sm:grid-cols-[46px_1fr_auto] sm:items-center sm:gap-6 sm:py-6">
                      <div className="flex items-center gap-4 sm:block">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] sm:hidden",
                            tier.className,
                          )}
                        >
                          {tier.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-secondary/60 text-primary transition duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                          <TierIcon className="size-5" />
                        </span>
                        <div>
                          <h3 className="text-lg font-bold tracking-[-0.025em] sm:text-xl">
                            {server.server}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">{server.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 pl-16 sm:block sm:pl-0 sm:text-right">
                        <span
                          className={cn(
                            "hidden w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9px] sm:inline-flex",
                            tier.className,
                          )}
                        >
                          {tier.label}
                        </span>
                        <p className="font-mono text-[10px] text-muted-foreground sm:mt-2">
                          <Users className="mr-1.5 inline size-3 text-primary" /> {server.members}{" "}
                          members
                        </p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="mt-8 rounded-2xl border border-border bg-card/60 p-5 sm:p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="font-bold">Roles & applications</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    HoneyMC is listed as an application, not a confirmed staff position.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <span
                      key={role}
                      className={cn(
                        "rounded-full border px-3 py-2 text-xs font-semibold",
                        role === "Builder"
                          ? "border-primary/25 bg-primary/10 text-primary"
                          : "border-border bg-secondary/50 text-secondary-foreground",
                      )}
                    >
                      {role === "Builder" && <Hammer className="mr-1.5 inline size-3" />}
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <div className="mt-10">
              <Reveal className="mb-5 flex flex-wrap items-end justify-between gap-2">
                <h3 className="text-lg font-bold">Additional confirmed staff experience</h3>
                <p className="text-xs text-muted-foreground">
                  Server names and exact roles were not supplied.
                </p>
              </Reveal>
              <div className="grid gap-3 sm:grid-cols-3">
                {additionalStaffExperience.map((members) => (
                  <Reveal key={members}>
                    <article className="flex items-center gap-4 rounded-xl border border-border bg-background/45 p-5">
                      <Users className="size-5 text-primary" />
                      <div>
                        <p className="text-xl font-extrabold">
                          {members}
                          <span className="text-primary">+</span>
                        </p>
                        <p className="text-xs text-muted-foreground">Member server experience</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              number="03"
              eyebrow="Skills"
              title="Calm moderation. Clear communication."
              description="Practical skills developed through reports, rule enforcement, staff coordination, and player support."
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill, index) => {
                const Icon = skillIcons[index] ?? Gavel;
                return (
                  <Reveal key={skill.title} delay={Math.min(index * 45, 180)}>
                    <article className="skill-card group h-full rounded-2xl border border-border bg-card p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/35 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span className="grid size-10 place-items-center rounded-lg bg-secondary text-primary transition group-hover:bg-primary/10">
                          <Icon className="size-4" />
                        </span>
                        <span className="font-mono text-[9px] text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-5 font-bold">{skill.title}</h3>
                      <p className="mt-2 text-xs leading-6 text-muted-foreground">{skill.text}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>

            <Reveal className="mt-10 border-t border-border pt-7">
              <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
                <h3 className="flex items-center gap-2 text-sm font-bold">
                  <Sparkles className="size-4 text-primary" /> Supporting experience
                </h3>
                <div className="flex flex-wrap gap-2">
                  {extras.map((extra) => (
                    <span
                      key={extra}
                      className="rounded-lg border border-border bg-secondary/35 px-3 py-2 text-xs text-muted-foreground"
                    >
                      {extra}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="section-band scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading
              number="04"
              eyebrow="Selected projects"
              title="Communities and interactive work."
              description="Existing server projects and the interactive features built into this portfolio—no placeholder links."
            />

            <div className="grid gap-5 lg:grid-cols-3">
              {projects.map((project, index) => {
                const ProjectIcon = index === 0 ? Crown : index === 1 ? Blocks : Code2;
                return (
                  <Reveal key={project.name} delay={index * 80}>
                    <article className="project-card group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/40">
                      <div className="project-visual relative flex h-40 items-center justify-center overflow-hidden border-b border-border">
                        <div className="project-cube" aria-hidden="true">
                          <ProjectIcon className="size-8 text-primary" />
                        </div>
                        <span className="absolute top-4 left-4 font-mono text-[9px] tracking-widest text-muted-foreground">
                          PROJECT / {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="font-mono text-[9px] tracking-[0.14em] text-primary uppercase">
                          {project.category}
                        </p>
                        <h3 className="mt-3 text-xl font-bold tracking-[-0.03em]">
                          {project.name}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                          {project.description}
                        </p>
                        <p className="mt-5 font-mono text-[10px] text-muted-foreground">
                          {project.meta}
                        </p>
                        <div className="mt-auto flex items-center justify-between gap-3 pt-7">
                          <a
                            href={project.href}
                            className="inline-flex items-center gap-2 text-xs font-bold text-foreground transition hover:text-primary"
                          >
                            {project.action} <ArrowUpRight className="size-4 text-primary" />
                          </a>
                          {index === 2 && (
                            <button
                              type="button"
                              onClick={() => setChatOpen(true)}
                              className="text-xs font-semibold text-muted-foreground underline decoration-border underline-offset-4 transition hover:text-primary"
                            >
                              Ask AshBot
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <Arcade />

        <section id="contact" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal>
              <div className="contact-panel relative overflow-hidden rounded-3xl border border-primary/25 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
                <div className="contact-grid absolute inset-0" aria-hidden="true" />
                <div className="relative grid items-end gap-10 lg:grid-cols-[1.2fr_.8fr]">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
                      06 / Start a conversation
                    </p>
                    <h2 className="mt-5 max-w-2xl text-4xl leading-[1.02] font-extrabold tracking-[-0.055em] text-balance sm:text-5xl lg:text-6xl">
                      Have a community to build?
                    </h2>
                    <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                      Whether you're growing a server, building a staff team, or looking for
                      community support, reach out on Discord.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-5 lg:items-end">
                    <DiscordButton label="Open Discord profile" />
                    <Button
                      variant="ghost"
                      onClick={() => setChatOpen(true)}
                      className="rounded-full px-5 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                    >
                      <Bot className="size-4" /> Ask about my experience first
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/35">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <a href="#top" className="flex items-center gap-3 text-sm font-extrabold">
                <span className="grid size-9 place-items-center rounded-lg border border-primary/35 bg-primary/10 text-primary">
                  <Box className="size-4" />
                </span>
                ASHDEV<span className="text-primary">.</span>
              </a>
              <p className="mt-3 text-xs text-muted-foreground">
                Community management · Minecraft · Development
              </p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-muted-foreground">
              {navigation.slice(0, 4).map((item) => (
                <a key={item.href} href={item.href} className="transition hover:text-primary">
                  {item.label}
                </a>
              ))}
              <a
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition hover:text-primary"
              >
                Discord <ArrowUpRight className="size-3" />
              </a>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-border pt-5 font-mono text-[9px] tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} ASH. ALL RIGHTS RESERVED.</p>
            <p>BUILT AROUND COMMUNITY.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
