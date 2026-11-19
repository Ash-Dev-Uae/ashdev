export const profile = {
  name: "Ash",
  role: "A New Developer",
  tagline: "Discord & Minecraft Staff · Community Manager",
  discordUsername: "a_sh_9",
  /** Numeric Discord user ID. When set, the contact button opens the profile directly. */
  discordId: "1462437982123331615" as string,
};

export type ServerRole = {
  server: string;
  position: string;
  members: string;
  tier: "owner" | "lead" | "staff";
};

export const servers: ServerRole[] = [
  { server: "eSports", position: "Staff Member", members: "1,500", tier: "staff" },
  { server: "Team Rangers", position: "Founder", members: "39", tier: "owner" },
  { server: "Toxicity", position: "Admin", members: "30", tier: "lead" },
  { server: "Galaxy Network", position: "Head Manager", members: "20–30", tier: "lead" },
  { server: "StealCurse", position: "Manager", members: "9 regulars", tier: "lead" },
  { server: "StealSkill", position: "Junior Moderator", members: "20", tier: "staff" },
  { server: "BlameGens", position: "Owner", members: "10", tier: "owner" },
];

export const stats = [
  { value: 70, suffix: "+", label: "Servers worked with" },
  { value: 7, suffix: "", label: "Featured staff roles" },
  { value: 2, suffix: "", label: "Discord servers owned" },
  { value: 130, suffix: "+", label: "Members managed" },
];

export const ownership = [
  "Owned 2 Discord servers",
  "Minecraft server ownership & management",
  "Discord community management",
  "Staff team management & coordination",
];

// Server names and exact staff titles were not supplied for these communities.
export const additionalStaffExperience = [400, 90, 45];

export const roles = [
  "Administrator",
  "Moderator",
  "Trainee",
  "Builder",
  "HoneyMC Staff Applicant",
];

export const skills = [
  { title: "Rule Enforcement", text: "Moderating communities and enforcing server rules fairly." },
  { title: "Reports & Complaints", text: "Handling reports and complaints quickly and calmly." },
  { title: "Anti-Cheat", text: "Dealing with hackers and rule breakers in-game." },
  { title: "Chat Safety", text: "Removing inappropriate messages and racial slurs." },
  { title: "Conflict Resolution", text: "Helping members and resolving disputes." },
  { title: "Staff Abuse Cases", text: "Investigating and handling staff abuse situations." },
  { title: "Staff Panels", text: "Managing Discord staff panels and infraction systems." },
  { title: "Applications", text: "Reviewing staff applications and picking the right people." },
  { title: "Announcements", text: "Writing announcements and staff updates." },
];

export const extras = [
  "Minecraft server management",
  "Discord community management",
  "Staff systems using Birb",
  "Creating staff panels",
  "Professional announcements",
  "Staff recruitment & coordination",
  "Discord tickets & punishments",
];
