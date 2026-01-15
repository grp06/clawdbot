import { describe, expect, it } from "vitest";

import { normalizeLegacyConfigValues } from "./doctor-legacy-config.js";

describe("normalizeLegacyConfigValues", () => {
  it("does not add whatsapp config when missing", () => {
    const res = normalizeLegacyConfigValues({
      messages: { ackReaction: "👀" },
    });

    expect(res.config.channels?.whatsapp).toBeUndefined();
    expect(res.changes).toEqual([]);
  });

  it("copies legacy ack reaction when whatsapp config exists", () => {
    const res = normalizeLegacyConfigValues({
      messages: { ackReaction: "👀", ackReactionScope: "group-mentions" },
      channels: { whatsapp: {} },
    });

    expect(res.config.channels?.whatsapp?.ackReaction).toEqual({
      emoji: "👀",
      direct: false,
      group: "mentions",
    });
    expect(res.changes).toEqual([
      "Copied messages.ackReaction → channels.whatsapp.ackReaction (scope: group-mentions).",
    ]);
  });
});
