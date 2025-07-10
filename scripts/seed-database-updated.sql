-- Create sample users first
INSERT INTO "User" (id, name, email, role, "createdAt", "updatedAt") VALUES
  ('user_1', 'John Admin', 'admin@company.com', 'ADMIN', NOW(), NOW()),
  ('user_2', 'Sarah Manager', 'sarah@company.com', 'USER', NOW(), NOW()),
  ('user_3', 'Mike Sales', 'mike@company.com', 'USER', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create default stages
INSERT INTO "Stage" (id, name, position, "createdAt", "updatedAt") VALUES
  ('stage_1', 'New Lead', 1, NOW(), NOW()),
  ('stage_2', 'Qualified', 2, NOW(), NOW()),
  ('stage_3', 'Proposal Sent', 3, NOW(), NOW()),
  ('stage_4', 'Negotiation', 4, NOW(), NOW()),
  ('stage_5', 'Closed Won', 5, NOW(), NOW()),
  ('stage_6', 'Closed Lost', 6, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Create sample leads with assignments
INSERT INTO "Lead" (id, name, email, phone, source, status, channel, "stageId", "assignedToId", "dateAdded", "createdAt", "updatedAt") VALUES
  ('lead_1', 'Acme Corporation', 'contact@acme.com', '+1-555-0101', 'ORGANIC', 'ACTIVE', 'Website Contact Form', 'stage_1', 'user_2', NOW(), NOW(), NOW()),
  ('lead_2', 'TechStart Inc', 'hello@techstart.io', '+1-555-0102', 'REFERRAL', 'ACTIVE', 'LinkedIn Referral', 'stage_2', 'user_3', NOW(), NOW(), NOW()),
  ('lead_3', 'Global Solutions Ltd', 'info@globalsolutions.com', '+1-555-0103', 'PAID', 'ACTIVE', 'Google Ads', 'stage_3', 'user_2', NOW(), NOW(), NOW()),
  ('lead_4', 'Innovation Labs', 'team@innovationlabs.com', '+1-555-0104', 'ORGANIC', 'ACTIVE', 'Content Marketing', 'stage_2', 'user_3', NOW(), NOW(), NOW()),
  ('lead_5', 'Future Systems', 'contact@futuresystems.com', '+1-555-0105', 'REFERRAL', 'COMPLETED', 'Partner Referral', 'stage_5', 'user_2', NOW(), NOW(), NOW()),
  ('lead_6', 'Digital Dynamics', 'hello@digitaldynamics.com', '+1-555-0106', 'PAID', 'INACTIVE', 'Facebook Ads', 'stage_6', NULL, NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;
