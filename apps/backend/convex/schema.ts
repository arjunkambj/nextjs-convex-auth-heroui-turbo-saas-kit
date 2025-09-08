import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    currentOrganizationId: v.optional(v.id("organizations")),
    defaultOrganizationId: v.optional(v.id("organizations")),
  })
    .index("email", ["email"])
    .index("currentOrg", ["currentOrganizationId"]),

  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    logo: v.optional(v.string()),
    ownerId: v.id("users"),
    settings: v.optional(
      v.object({
        allowInvites: v.optional(v.boolean()),
        requireEmailVerification: v.optional(v.boolean()),
        defaultRole: v.optional(v.id("roles")),
      })
    ),
    plan: v.optional(
      v.union(v.literal("free"), v.literal("pro"), v.literal("enterprise"))
    ),
    maxMembers: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
    isActive: v.boolean(),
  })
    .index("slug", ["slug"])
    .index("owner", ["ownerId"])
    .index("active", ["isActive"]),

  memberships: defineTable({
    userId: v.id("users"),
    organizationId: v.id("organizations"),
    roleId: v.id("roles"),
    status: v.union(
      v.literal("active"),
      v.literal("invited"),
      v.literal("suspended")
    ),
    invitedBy: v.optional(v.id("users")),
    invitedAt: v.optional(v.number()),
    joinedAt: v.optional(v.number()),
    lastActiveAt: v.optional(v.number()),
    permissions: v.optional(v.array(v.string())),
  })
    .index("userOrg", ["userId", "organizationId"])
    .index("orgMembers", ["organizationId", "status"])
    .index("userMemberships", ["userId", "status"]),

  roles: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    organizationId: v.optional(v.id("organizations")),
    permissions: v.array(
      v.union(
        v.literal("org.view"),
        v.literal("org.edit"),
        v.literal("org.delete"),
        v.literal("members.view"),
        v.literal("members.invite"),
        v.literal("members.remove"),
        v.literal("members.edit"),
        v.literal("billing.view"),
        v.literal("billing.manage"),
        v.literal("settings.view"),
        v.literal("settings.edit")
      )
    ),
    isSystemRole: v.boolean(),
    priority: v.number(),
  })
    .index("orgRoles", ["organizationId"])
    .index("systemRoles", ["isSystemRole"])
    .index("name", ["name", "organizationId"]),

  invitations: defineTable({
    email: v.string(),
    organizationId: v.id("organizations"),
    roleId: v.id("roles"),
    invitedBy: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("expired"),
      v.literal("cancelled")
    ),
  })
    .index("token", ["token"])
    .index("email", ["email", "organizationId"])
    .index("orgInvites", ["organizationId", "status"])
    .index("expires", ["expiresAt", "status"]),
});

export default schema;
