import { db } from "@portify/db";
import { contentItems } from "@portify/db/schema/content";

const [existing] = await db.select({ id: contentItems.id }).from(contentItems).limit(1);

if (existing) {
  console.log("Content already seeded, skipping.");
  process.exit(0);
}

const inserted = await db
  .insert(contentItems)
  .values([
    {
      title: "Parasite (2019) — A Masterclass in Class Tension",
      type: "video",
      platform: "youtube",
      description:
        "Bong Joon-ho's Palme d'Or winner dissected frame by frame. Why the basement matters.",
      thumbnailUrl: null,
      externalUrl: null,
      status: "published",
      personalRating: 5,
      publishedAt: new Date("2024-01-15"),
    },
    {
      title: "Everything Everywhere All At Once — Chaos as Meaning",
      type: "article",
      platform: null,
      description:
        "A deep-read on the Daniels' multiverse odyssey and why it made half the internet cry.",
      thumbnailUrl: null,
      externalUrl: null,
      status: "published",
      personalRating: 5,
      publishedAt: new Date("2024-02-03"),
    },
    {
      title: "The Batman (2022) — Three Hours Well Spent?",
      type: "video",
      platform: "tiktok",
      description:
        "Reeves strips Batman back to detective noir. My honest take after three watches.",
      thumbnailUrl: null,
      externalUrl: null,
      status: "published",
      personalRating: 4,
      publishedAt: new Date("2024-02-20"),
    },
    {
      title: "Dune: Part Two — Desert Power",
      type: "video",
      platform: "youtube",
      description:
        "Villeneuve completes his magnum opus. The sandworm scene alone is worth the price of admission.",
      thumbnailUrl: null,
      externalUrl: null,
      status: "published",
      personalRating: 5,
      publishedAt: new Date("2024-03-10"),
    },
    {
      title: "Poor Things — Bella's World, Bella's Rules",
      type: "article",
      platform: null,
      description:
        "Lanthimos at his most playful. A feminist fable wrapped in a steampunk fever dream.",
      thumbnailUrl: null,
      externalUrl: null,
      status: "published",
      personalRating: 4,
      publishedAt: new Date("2024-03-28"),
    },
    {
      title: "Oppenheimer — The Weight of Light",
      type: "video",
      platform: "instagram",
      description:
        "Three hours on the man who split the atom. Nolan's most restrained and most devastating film.",
      thumbnailUrl: null,
      externalUrl: null,
      status: "published",
      personalRating: 5,
      publishedAt: new Date("2024-04-05"),
    },
    {
      title: "Past Lives — What Could Have Been",
      type: "article",
      platform: null,
      description:
        "Celine Song's debut is a quiet devastation. 24 years, two continents, one unanswerable question.",
      thumbnailUrl: null,
      externalUrl: null,
      status: "published",
      personalRating: 5,
      publishedAt: new Date("2024-04-22"),
    },
    {
      title: "The Zone of Interest — Horror in Plain Sight",
      type: "article",
      platform: null,
      description:
        "Glazer removes the spectacle from atrocity. The most uncomfortable film of the decade.",
      thumbnailUrl: null,
      externalUrl: null,
      status: "published",
      personalRating: 4,
      publishedAt: new Date("2024-05-08"),
    },
    {
      title: "Saltburn — Class, Obsession, and a Very Long Bath",
      type: "video",
      platform: "tiktok",
      description:
        "Fennell's sophomore feature is a gorgeous trap. Oliver Quick is this generation's anti-hero.",
      thumbnailUrl: null,
      externalUrl: null,
      status: "published",
      personalRating: 3,
      publishedAt: new Date("2024-05-20"),
    },
  ])
  .returning();

console.log(`Inserted ${inserted.length} content items.`);
process.exit(0);
