import { relations } from "drizzle-orm";

import { users } from "./users";
import { contentItems, contentMetadata } from "./content";
import { platformMetrics } from "./metrics";
import { portfolioConfig } from "./portfolio";
import { auditLog } from "./audit";

export const usersRelations = relations(users, ({ one, many }) => ({
  inviter: one(users, {
    fields: [users.invitedBy],
    references: [users.id],
    relationName: "invites",
  }),
  invitees: many(users, { relationName: "invites" }),
  portfolioConfigChanges: many(portfolioConfig),
  auditEvents: many(auditLog),
}));

export const contentItemsRelations = relations(contentItems, ({ one, many }) => ({
  metadata: one(contentMetadata, {
    fields: [contentItems.id],
    references: [contentMetadata.contentItemId],
  }),
  metrics: many(platformMetrics),
}));

export const contentMetadataRelations = relations(contentMetadata, ({ one }) => ({
  contentItem: one(contentItems, {
    fields: [contentMetadata.contentItemId],
    references: [contentItems.id],
  }),
}));

export const platformMetricsRelations = relations(platformMetrics, ({ one }) => ({
  contentItem: one(contentItems, {
    fields: [platformMetrics.contentItemId],
    references: [contentItems.id],
  }),
}));

export const portfolioConfigRelations = relations(portfolioConfig, ({ one }) => ({
  updatedByUser: one(users, {
    fields: [portfolioConfig.updatedBy],
    references: [users.id],
  }),
}));

export const auditLogRelations = relations(auditLog, ({ one }) => ({
  user: one(users, {
    fields: [auditLog.userId],
    references: [users.id],
  }),
}));
