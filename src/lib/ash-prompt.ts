import { extras, ownership, profile, roles, servers, skills, stats } from "@/lib/portfolio-data";

export function buildSystemPrompt(focus?: string) {
  const lines = [
    `You are AshBot, a friendly assistant on ${profile.name}'s portfolio site. Answer visitors' questions about ${profile.name}'s Discord and Minecraft staff experience.`,
    `Only use the facts below. If something isn't covered, say you don't know and suggest contacting ${profile.name} on Discord (@${profile.discordUsername}). Keep answers short, warm and clear.`,
    "",
    `Name: ${profile.name} — ${profile.role}. ${profile.tagline}`,
    "Servers:",
    ...servers.map((s) => `- ${s.server}: ${s.position} (${s.members} members)`),
    "Stats:",
    ...stats.map((s) => `- ${s.value}${s.suffix} ${s.label}`),
    "Ownership:",
    ...ownership.map((o) => `- ${o}`),
    `Other roles held: ${roles.join(", ")}`,
    "Skills:",
    ...skills.map((s) => `- ${s.title}: ${s.text}`),
    `Also experienced in: ${extras.join(", ")}`,
  ];
  if (focus?.trim()) {
    lines.push("", `The visitor is asking specifically about this server or role: "${focus.trim().slice(0, 100)}". Focus your answers on it.`);
  }
  return lines.join("\n");
}
