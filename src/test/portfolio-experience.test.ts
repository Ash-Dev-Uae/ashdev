import { describe, expect, it } from "vitest";
import { additionalStaffExperience, stats } from "@/lib/portfolio-data";
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
});
