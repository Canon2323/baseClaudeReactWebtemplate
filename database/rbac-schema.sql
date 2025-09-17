-- RBAC Schema for Supabase
-- Inspired by Next.js SaaS Starter approach
-- Enhanced with granular permissions

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =================================
-- RBAC TABLES
-- =================================

-- Roles table
CREATE TABLE IF NOT EXISTS public.roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  is_system BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Permissions table
CREATE TABLE IF NOT EXISTS public.permissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  resource VARCHAR(50) NOT NULL, -- e.g., 'users', 'posts', 'billing'
  action VARCHAR(50) NOT NULL,    -- e.g., 'create', 'read', 'update', 'delete'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Role permissions junction table
CREATE TABLE IF NOT EXISTS public.role_permissions (
  role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
  organization_id UUID, -- For multi-tenant support
  assigned_by UUID REFERENCES auth.users(id),
  assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id, role_id, organization_id)
);

-- =================================
-- DEFAULT ROLES AND PERMISSIONS
-- =================================

-- Insert default roles
INSERT INTO public.roles (name, description, is_system) VALUES
  ('super_admin', 'Full system access', true),
  ('admin', 'Organization administrator', true),
  ('owner', 'Organization owner', true),
  ('member', 'Organization member', true),
  ('viewer', 'Read-only access', true)
ON CONFLICT (name) DO NOTHING;

-- Insert default permissions
INSERT INTO public.permissions (name, description, resource, action) VALUES
  -- User management
  ('users.create', 'Create users', 'users', 'create'),
  ('users.read', 'View users', 'users', 'read'),
  ('users.update', 'Update users', 'users', 'update'),
  ('users.delete', 'Delete users', 'users', 'delete'),
  ('users.invite', 'Invite users', 'users', 'invite'),

  -- Organization management
  ('organization.read', 'View organization', 'organization', 'read'),
  ('organization.update', 'Update organization', 'organization', 'update'),
  ('organization.delete', 'Delete organization', 'organization', 'delete'),
  ('organization.billing', 'Manage billing', 'organization', 'billing'),

  -- Content management
  ('content.create', 'Create content', 'content', 'create'),
  ('content.read', 'View content', 'content', 'read'),
  ('content.update', 'Update content', 'content', 'update'),
  ('content.delete', 'Delete content', 'content', 'delete'),
  ('content.publish', 'Publish content', 'content', 'publish'),

  -- Billing and payments
  ('billing.read', 'View billing', 'billing', 'read'),
  ('billing.update', 'Update billing', 'billing', 'update'),
  ('billing.cancel', 'Cancel subscriptions', 'billing', 'cancel'),

  -- Analytics and reports
  ('analytics.read', 'View analytics', 'analytics', 'read'),
  ('reports.export', 'Export reports', 'reports', 'export'),

  -- System administration
  ('system.logs', 'View system logs', 'system', 'read'),
  ('system.settings', 'Update system settings', 'system', 'update')
ON CONFLICT (name) DO NOTHING;

-- Assign permissions to roles
WITH role_permission_assignments AS (
  SELECT
    r.id as role_id,
    p.id as permission_id
  FROM public.roles r
  CROSS JOIN public.permissions p
  WHERE
    -- Super Admin: All permissions
    (r.name = 'super_admin') OR

    -- Admin: All except system
    (r.name = 'admin' AND p.resource != 'system') OR

    -- Owner: Organization and billing management
    (r.name = 'owner' AND p.resource IN ('organization', 'billing', 'users', 'content', 'analytics')) OR

    -- Member: Basic content and read access
    (r.name = 'member' AND (
      (p.resource = 'content' AND p.action IN ('create', 'read', 'update')) OR
      (p.resource = 'organization' AND p.action = 'read') OR
      (p.resource = 'users' AND p.action = 'read')
    )) OR

    -- Viewer: Read-only access
    (r.name = 'viewer' AND p.action = 'read')
)
INSERT INTO public.role_permissions (role_id, permission_id)
SELECT role_id, permission_id FROM role_permission_assignments
ON CONFLICT DO NOTHING;

-- =================================
-- ROW LEVEL SECURITY (RLS)
-- =================================

-- Enable RLS on all tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for roles table
CREATE POLICY "Users can view roles" ON public.roles
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage roles" ON public.roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      JOIN public.roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('super_admin', 'admin')
      AND ur.is_active = true
    )
  );

-- RLS Policies for permissions table
CREATE POLICY "Users can view permissions" ON public.permissions
  FOR SELECT USING (true);

CREATE POLICY "Only super admins can manage permissions" ON public.permissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      JOIN public.roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name = 'super_admin'
      AND ur.is_active = true
    )
  );

-- RLS Policies for user_roles table
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      JOIN public.roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('super_admin', 'admin', 'owner')
      AND ur.is_active = true
    )
  );

CREATE POLICY "Only admins can assign roles" ON public.user_roles
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles ur
      JOIN public.roles r ON ur.role_id = r.id
      WHERE ur.user_id = auth.uid()
      AND r.name IN ('super_admin', 'admin', 'owner')
      AND ur.is_active = true
    )
  );

-- =================================
-- HELPER FUNCTIONS
-- =================================

-- Function to check if user has permission
CREATE OR REPLACE FUNCTION public.user_has_permission(
  user_id UUID,
  permission_name TEXT,
  organization_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.user_roles ur
    JOIN public.role_permissions rp ON ur.role_id = rp.role_id
    JOIN public.permissions p ON rp.permission_id = p.id
    WHERE ur.user_id = user_has_permission.user_id
    AND p.name = permission_name
    AND ur.is_active = true
    AND (ur.expires_at IS NULL OR ur.expires_at > NOW())
    AND (organization_id IS NULL OR ur.organization_id = organization_id OR ur.organization_id IS NULL)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user roles
CREATE OR REPLACE FUNCTION public.get_user_roles(user_id UUID)
RETURNS TABLE(role_name TEXT, organization_id UUID) AS $$
BEGIN
  RETURN QUERY
  SELECT r.name, ur.organization_id
  FROM public.user_roles ur
  JOIN public.roles r ON ur.role_id = r.id
  WHERE ur.user_id = get_user_roles.user_id
  AND ur.is_active = true
  AND (ur.expires_at IS NULL OR ur.expires_at > NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user permissions
CREATE OR REPLACE FUNCTION public.get_user_permissions(user_id UUID)
RETURNS TABLE(permission_name TEXT, resource TEXT, action TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT DISTINCT p.name, p.resource, p.action
  FROM public.user_roles ur
  JOIN public.role_permissions rp ON ur.role_id = rp.role_id
  JOIN public.permissions p ON rp.permission_id = p.id
  WHERE ur.user_id = get_user_permissions.user_id
  AND ur.is_active = true
  AND (ur.expires_at IS NULL OR ur.expires_at > NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =================================
-- AUTH HOOKS (for JWT claims)
-- =================================

-- Function to add roles to JWT
CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event JSONB)
RETURNS JSONB AS $$
DECLARE
  claims JSONB;
  user_roles TEXT[];
  user_permissions TEXT[];
BEGIN
  -- Get user roles
  SELECT ARRAY_AGG(role_name) INTO user_roles
  FROM public.get_user_roles(auth.uid());

  -- Get user permissions
  SELECT ARRAY_AGG(permission_name) INTO user_permissions
  FROM public.get_user_permissions(auth.uid());

  -- Add to JWT claims
  claims := COALESCE(event->'claims', '{}'::JSONB);
  claims := claims || jsonb_build_object(
    'user_roles', COALESCE(user_roles, '{}'),
    'user_permissions', COALESCE(user_permissions, '{}')
  );

  event := event || jsonb_build_object('claims', claims);

  RETURN event;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =================================
-- INDEXES FOR PERFORMANCE
-- =================================

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role_id ON public.user_roles(role_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_organization ON public.user_roles(organization_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_active ON public.user_roles(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON public.role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission ON public.role_permissions(permission_id);
CREATE INDEX IF NOT EXISTS idx_permissions_resource_action ON public.permissions(resource, action);

-- =================================
-- TRIGGERS FOR UPDATED_AT
-- =================================

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_roles_updated_at
  BEFORE UPDATE ON public.roles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();