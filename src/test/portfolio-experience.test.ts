import { describe, expect, it } from "vitest";
import {
  additionalStaffExperience,
  extras,
  profile,
  servers,
  stats,
} from "@/lib/portfolio-data";
import { buildSystemPrompt } from "@/lib/ash-prompt";

describe("Confirmed experience", () => {
  it.each([400, 90, 45])(
    "includes the %i-member server in the portfolio and AI context",
    (members) => {
      expect(additionalStaffExperience).toContain(members);
      expect(buildSystemPrompt()).toContain(`Staffed a ${members}-member server`);
    },
  );
  it("keeps two owned Discord servers", () => {
    expect(stats.find((stat) => stat.label === "Discord servers owned")?.value).toBe(2);
  });
  it("lists the 1,500-member eSports staff role and counts it as featured", () => {
    expect(servers).toContainEqual({
      server: "eSports",
      position: "Staff Member",
      members: "1,500",
      tier: "staff",
    });
    expect(buildSystemPrompt()).toContain("- eSports: Staff Member (1,500 members)");
    expect(stats.find((stat) => stat.label === "Featured staff roles")?.value).toBe(
      servers.length,
    );
  });
  it("shows Bedrock Edition as the Minecraft platform", () => {
    expect(profile.minecraftPlatform).toBe("Bedrock Edition");
    expect(extras).toContain("Minecraft: Bedrock Edition player");
    expect(buildSystemPrompt()).toContain(
      "Minecraft platform: Bedrock Edition — not Java Edition.",
    );
  });
});
