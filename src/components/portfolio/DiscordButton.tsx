import { useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export function DiscordButton({ className, label = "MESSAGE ME ON DISCORD" }: { className?: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const profileUrl = profile.discordId ? `https://discord.com/users/${profile.discordId}` : null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.discordUsername);
    } catch {
      /* clipboard blocked — the username is still shown below */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const cls = cn(
    "pixel-btn inline-flex items-center gap-2 bg-accent px-5 py-3 text-xs text-accent-foreground",
    className,
  );

  return (
    <div className="inline-flex flex-col items-center gap-2">
      {profileUrl ? (
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" onClick={copy} className={cls}>
          <MessageCircle className="size-4" /> {label}
        </a>
      ) : (
        <button type="button" onClick={copy} className={cls}>
          {copied ? <Check className="size-4" /> : <MessageCircle className="size-4" />}
          {copied ? "USERNAME COPIED!" : label}
        </button>
      )}
      <span className="font-pixel text-[10px] text-muted-foreground" aria-live="polite">
        {copied ? "Paste it in Discord → Add Friend" : `@${profile.discordUsername}`}
      </span>
    </div>
  );
}
