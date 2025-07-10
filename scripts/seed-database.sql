-- Create default stages
INSERT INTO "Stage" (id, name, position, "createdAt", "updatedAt") VALUES
  ('stage_1', 'Lead', 1, NOW(), NOW()),
  ('stage_2', 'Qualified', 2, NOW(), NOW()),
  ('stage_3', 'Proposal', 3, NOW(), NOW()),
  ('stage_4', 'Negotiation', 4, NOW(), NOW()),
  ('stage_5', 'Closed Won', 5, NOW(), NOW()),
  ('stage_6', 'Closed Lost', 6, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create sample leads (optional)
INSERT INTO "Lead" (id, name, email, phone, source, status, channel, "stageId", "dateAdded", "createdAt", "updatedAt") VALUES
  ('lead_1', 'John Smith', 'john@example.com', '+1-555-0101', 'ORGANIC', 'ACTIVE', 'Website', 'stage_1', NOW(), NOW(), NOW()),
  ('lead_2', 'Sarah Johnson', 'sarah@company.com', '+1-555-0102', 'REFERRAL', 'ACTIVE', 'LinkedIn', 'stage_2', NOW(), NOW(), NOW()),
  ('lead_3', 'Mike Davis', 'mike@startup.io', '+1-555-0103', 'PAID', 'ACTIVE', 'Google Ads', 'stage_3', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
