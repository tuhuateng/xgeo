-- 创建用户角色枚举
CREATE TYPE public.user_role AS ENUM ('user', 'agent', 'admin');

-- 创建代理等级表
CREATE TABLE public.agent_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_name TEXT NOT NULL UNIQUE,
  min_tokens INTEGER NOT NULL,
  discount_rate DECIMAL(3,2) NOT NULL CHECK (discount_rate >= 0 AND discount_rate <= 1),
  commission_rate DECIMAL(3,2) NOT NULL CHECK (commission_rate >= 0 AND commission_rate <= 1),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 创建用户角色表
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  agent_tier_id UUID REFERENCES public.agent_tiers(id),
  tokens_purchased INTEGER DEFAULT 0,
  tokens_remaining INTEGER DEFAULT 0,
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 创建代理佣金记录表
CREATE TABLE public.agent_commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  transaction_amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  commission_rate DECIMAL(3,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT now(),
  paid_at TIMESTAMPTZ
);

-- 插入默认代理等级
INSERT INTO public.agent_tiers (tier_name, min_tokens, discount_rate, commission_rate) VALUES
  ('基础代理', 20000, 0.20, 0.15),
  ('高级代理', 50000, 0.25, 0.20),
  ('合作伙伴', 100000, 0.30, 0.25);

-- 启用 RLS
ALTER TABLE public.agent_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_commissions ENABLE ROW LEVEL SECURITY;

-- 创建安全函数检查角色
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role user_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 代理等级策略（公开可读）
CREATE POLICY "Agent tiers are viewable by everyone"
  ON public.agent_tiers FOR SELECT
  TO authenticated
  USING (true);

-- 用户角色策略
CREATE POLICY "Users can view their own role"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can update their own role info"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 佣金记录策略
CREATE POLICY "Agents can view their own commissions"
  ON public.agent_commissions FOR SELECT
  TO authenticated
  USING (auth.uid() = agent_user_id);

CREATE POLICY "Admins can view all commissions"
  ON public.agent_commissions FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "System can insert commissions"
  ON public.agent_commissions FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 创建更新时间戳触发器
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_user_roles_updated_at
  BEFORE UPDATE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();