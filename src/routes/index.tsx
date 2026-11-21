
      {/* Hero */}
      <section id="top" className="relative flex min-h-[100svh] items-center py-28 sm:py-32">
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

        <div className="relative mx-auto w-full max-w-5xl px-5 pt-12">
          <div className="hero-box animate-pop-in w-full p-8 text-left sm:p-14 md:p-20">
            <div className="inline-flex items-center gap-2 border border-primary/50 bg-background/60 px-4 py-2 font-pixel text-[10px] text-primary sm:text-xs">
              <span className="size-2 animate-blink bg-primary" />
              ONLINE · OPEN TO STAFF ROLES
            </div>

            <h1 className="mt-8 text-4xl font-bold leading-tight sm:text-6xl md:text-7xl">
              <span className="block animate-in fade-in slide-in-from-bottom-4 duration-700">
                Hello, I am
              </span>

              <span className="block text-gradient animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
                {profile.name}.
              </span>

              <span className="mt-4 block text-2xl text-gold animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both sm:text-4xl md:text-5xl">
                {profile.role}
              </span>
            </h1>

            <div className="mt-7 min-h-[3em] max-w-2xl font-display text-lg text-muted-foreground sm:text-2xl md:text-3xl">
              <Typewriter
                words={[
                  "Discord Community Manager",
                  "Minecraft Server Owner",
                  "Head Manager & Admin",
                  "Staff Team Builder",
                ]}
              />
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#servers"
                className="pixel-btn bg-primary px-7 py-4 text-xs text-primary-foreground"
              >
                MY EXPERIENCE
              </a>

              <a
                href="#contact"
                className="pixel-btn bg-accent px-7 py-4 text-xs text-accent-foreground"
              >
                CONTACT ME
              </a>
            </div>

            <div className="mt-12 border-t border-border/60 pt-5 font-pixel text-[10px] tracking-widest text-muted-foreground">
              BUILDING · LEARNING · CREATING
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
