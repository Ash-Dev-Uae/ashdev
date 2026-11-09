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
  ChevronDown,
  Sparkles,
  Pickaxe,
  type LucideIcon,
} from "lucide-react";
import heroImg from "@/assets/hero-pixel-night.jpg";
import { Reveal, Counter, Typewriter } from "@/components/portfolio/motion";
import { DiscordButton } from "@/components/portfolio/DiscordButton";
import { TapBurst } from "@/components/portfolio/TapBurst";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import {
  profile,
  servers,
  stats,
  ownership,
  roles,
  skills,
  extras,
  type ServerRole,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

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

const blocks = [
  { cls: "left-[6%] top-[22%] size-8 bg-primary", delay: "0s" },
  { cls: "left-[82%] top-[18%] size-6 bg-accent", delay: "1.2s" },
  { cls: "left-[14%] top-[68%] size-5 bg-gold", delay: "2.1s" },
  { cls: "left-[88%] top-[62%] size-9 bg-primary/70", delay: "0.6s" },
  { cls: "left-[48%] top-[12%] size-4 bg-accent/80", delay: "3s" },
];

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <Reveal className="mb-10">
      <p className="font-pixel text-xs tracking-widest text-primary">{kicker}</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

function Index() {
  return (
    <main className="overflow-x-hidden">
      <TapBurst />
      <CursorGlow />
      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b-2 border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-2 font-pixel text-sm">
            <span className="inline-block size-3 bg-primary animate-pulse-glow" />
            {profile.name}
          </a>
          <div className="hidden gap-6 font-pixel text-xs text-muted-foreground sm:flex">
            <a href="#servers" className="hover:text-primary">Servers</a>
            <a href="#skills" className="hover:text-primary">Skills</a>
            <a href="#more" className="hover:text-primary">More</a>
            <a href="#contact" className="text-accent hover:text-primary">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="relative flex min-h-[100svh] items-center">
        <img
          src={heroImg}
          alt="Pixel art night landscape with a castle on a hill"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-fade" />
        <div className="absolute inset-0 scanlines opacity-60" />
        {blocks.map((b, i) => (
          <span
            key={i}
            aria-hidden
            className={cn("absolute animate-float-block shadow-[var(--shadow-pixel)]", b.cls)}
            style={{ animationDelay: b.delay }}
          />
        ))}

        <div className="relative mx-auto w-full max-w-3xl px-5 pt-20">
          <div className="hero-box animate-pop-in p-6 text-center sm:p-10">
          <div className="inline-flex items-center gap-2 border-2 border-primary bg-background/70 px-3 py-1 font-pixel text-[10px] text-primary sm:text-xs">
            <span className="size-2 bg-primary animate-blink" /> ONLINE · OPEN TO STAFF ROLES
          </div>
          <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-5xl md:text-6xl">
            <span className="block animate-in fade-in slide-in-from-bottom-4 duration-700">Hello, I am</span>
            <span className="block text-gradient animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
              {profile.name},
            </span>
            <span className="mt-2 block text-xl text-gold animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both sm:text-3xl">
              {profile.role}
            </span>
          </h1>
          <p className="mx-auto mt-5 min-h-[2.5em] max-w-xl font-display text-base text-muted-foreground sm:text-xl">
            <Typewriter
              words={[
                "Discord Community Manager",
                "Minecraft Server Owner",
                "Head Manager & Admin",
                "Staff Team Builder",
              ]}
            />
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="#servers" className="pixel-btn bg-primary px-5 py-3 text-xs text-primary-foreground">
              MY EXPERIENCE
            </a>
            <a href="#contact" className="pixel-btn bg-accent px-5 py-3 text-xs text-accent-foreground">
              CONTACT ME
            </a>
          </div>
          </div>
        </div>

        <a
          href="#stats"
          aria-label="Scroll down"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground animate-bob"
        >
          <ChevronDown className="size-7" />
        </a>
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
                <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{s.label}</div>
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
              <Pickaxe className="size-4 text-primary" /> {s.server}
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
                    <span className={cn("px-1.5 py-1 font-pixel text-[9px] sm:px-2 sm:text-[10px]", t.cls)}>
                      {t.label}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold leading-tight sm:text-2xl">{s.server}</h3>
                    <p className="mt-1 text-sm text-primary sm:text-base">{s.position}</p>
                  </div>
                  <div className="flex items-center gap-1.5 border-t-2 border-dashed border-border pt-2 text-xs text-muted-foreground sm:gap-2 sm:pt-4 sm:text-sm">
                    <Users className="size-3.5 shrink-0 sm:size-4" /> {s.members}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={200}>
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
            Need a reliable staff member for your <span className="text-gradient">server</span>?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Moderation, staff management, announcements and community growth — let's talk on Discord.
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
