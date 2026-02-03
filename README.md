# Lirica Aurea - Frontend

Central de Campanhas com Material Design 3 e Supabase.

## Stack Tecnologica

**Frontend:**
- React 19 + TypeScript 5.9
- Vite 7 (build tool)
- Tailwind CSS 4 + Material Design 3 tokens
- Radix UI (primitives acessiveis)
- React Query 5 (data fetching)
- Wouter 3 (routing)
- React Hook Form 7 + Zod 4 (formularios)

**Backend:**
- Supabase (Auth + Database + Storage)

## Setup Local

### 1. Clone o repositorio

```bash
git clone <repo-url>
cd lirica-aurea-frontend
```

### 2. Instale as dependencias

```bash
pnpm install
```

### 3. Configure as variaveis de ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite `.env.local` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-anon-key
```

### 4. Configure o Supabase

Execute o seguinte SQL no Supabase Dashboard (SQL Editor):

```sql
-- Tabela ICPs (Ideal Customer Profile)
CREATE TABLE IF NOT EXISTS icps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  avatar TEXT,
  segmento VARCHAR(255) NOT NULL,
  faturamento VARCHAR(100),
  ticket_medio NUMERIC,
  dores TEXT[],
  desejos TEXT[],
  objecoes TEXT[],
  gatilhos TEXT[],
  momento TEXT,
  objetivo TEXT,
  is_from_real_data BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela Campanhas
CREATE TABLE IF NOT EXISTS campanhas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  nome VARCHAR(255) NOT NULL,
  nucleo VARCHAR(100),
  tier VARCHAR(50),
  status VARCHAR(50) DEFAULT 'rascunho',
  orcamento NUMERIC,
  meta_faturamento NUMERIC,
  conceito JSONB,
  funil JSONB,
  oferta JSONB,
  criativos JSONB,
  score_ia NUMERIC,
  analise_ia TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela Funil Metricas (para Aurea Cloud)
CREATE TABLE IF NOT EXISTS funil_metricas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  data DATE NOT NULL,
  investimento NUMERIC,
  investimento_percentual NUMERIC,
  visitantes INTEGER,
  visitantes_conversao NUMERIC,
  visitantes_cpv NUMERIC,
  leads_recebidos INTEGER,
  leads_percentual NUMERIC,
  leads_conversao NUMERIC,
  leads_cpl NUMERIC,
  oportunidades INTEGER,
  oportunidades_percentual NUMERIC,
  oportunidades_conversao NUMERIC,
  oportunidades_cpo NUMERIC,
  reunioes INTEGER,
  reunioes_percentual NUMERIC,
  reunioes_conversao NUMERIC,
  reunioes_metrica NUMERIC,
  propostas INTEGER,
  propostas_percentual NUMERIC,
  propostas_conversao NUMERIC,
  propostas_metrica NUMERIC,
  vendas INTEGER,
  vendas_percentual NUMERIC,
  vendas_valor_total NUMERIC,
  vendas_ticket_medio NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_icps_user ON icps(user_id);
CREATE INDEX IF NOT EXISTS idx_campanhas_user ON campanhas(user_id);
CREATE INDEX IF NOT EXISTS idx_funil_metricas_user_data ON funil_metricas(user_id, data DESC);

-- RLS Policies
ALTER TABLE icps ENABLE ROW LEVEL SECURITY;
ALTER TABLE campanhas ENABLE ROW LEVEL SECURITY;
ALTER TABLE funil_metricas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own icps" ON icps
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own icps" ON icps
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own icps" ON icps
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own icps" ON icps
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own campanhas" ON campanhas
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own campanhas" ON campanhas
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own campanhas" ON campanhas
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own campanhas" ON campanhas
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own funil_metricas" ON funil_metricas
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own funil_metricas" ON funil_metricas
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own funil_metricas" ON funil_metricas
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own funil_metricas" ON funil_metricas
  FOR DELETE USING (auth.uid() = user_id);
```

### 5. Execute o projeto

```bash
pnpm dev
```

Acesse http://localhost:5173

## Scripts Disponiveis

| Comando | Descricao |
|---------|-----------|
| `pnpm dev` | Inicia servidor de desenvolvimento |
| `pnpm build` | Build para producao |
| `pnpm preview` | Preview do build de producao |
| `pnpm check` | Verifica tipos TypeScript |
| `pnpm format` | Formata codigo com Prettier |

## Deploy na Vercel

1. Push para GitHub
2. Conecte o repositorio na Vercel
3. Configure as variaveis de ambiente:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automatico

## Estrutura do Projeto

```
lirica-aurea-frontend/
├── src/
│   ├── _core/
│   │   └── hooks/
│   │       └── useAuth.ts       # Hook de autenticacao Supabase
│   ├── components/
│   │   ├── ui/                  # Componentes MD3 (Button, Card, Input, etc)
│   │   └── DashboardLayout.tsx  # Layout principal com navegacao
│   ├── contexts/
│   │   └── ThemeContext.tsx     # Tema claro/escuro
│   ├── hooks/                   # Hooks customizados
│   ├── lib/
│   │   ├── supabase.ts          # Cliente Supabase
│   │   └── utils.ts             # Utilidades (cn, etc)
│   ├── pages/
│   │   ├── Dashboard.tsx        # Pagina inicial
│   │   ├── AureaCloud.tsx       # Funis de dados
│   │   ├── Estrategico.tsx      # Planejamento anual
│   │   ├── Tatico.tsx           # Planejamento mensal
│   │   ├── Operacional.tsx      # Campanhas
│   │   └── Login.tsx            # Autenticacao
│   ├── styles/
│   │   └── md3-tokens.css       # Tokens Material Design 3
│   ├── types/
│   │   └── database.types.ts    # Types do Supabase
│   ├── App.tsx                  # Rotas e providers
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos globais + MD3 typography
├── public/
├── .env.example
├── package.json
├── tailwind.config.js           # Config MD3
├── vite.config.ts
└── tsconfig.json
```

## Paginas Core (Ativas)

- **Dashboard** (`/`) - Visao geral
- **Aurea Cloud** (`/aurea-cloud`) - Funis de dados e metricas
- **Estrategico** (`/estrategico`) - Planejamento anual
- **Tatico** (`/tatico`) - Planejamento mensal
- **Operacional** (`/operacional`) - Gestao de campanhas

## Paginas Secundarias (Ocultas)

As seguintes paginas estao no codigo mas visualmente desabilitadas (opacity-50):
- Produtos, Influencias, Tendencias, Cliente Sintetico
- Analytics, Headhunter, Nova Campanha, Biblioteca
- Ref. Historicas, Biblioteca MKT, Repositorio, Meus Modelos, Manual

Podem ser reativadas removendo `disabled: true` em `DashboardLayout.tsx`.

## Material Design 3

Este projeto segue as diretrizes do Material Design 3:

### Typography Scale
- Display (large/medium/small)
- Headline (large/medium/small)
- Title (large/medium/small)
- Body (large/medium/small)
- Label (large/medium/small)

### Color System
- Primary, Secondary, Tertiary
- Error, Surface, Background
- Suporte completo para tema claro/escuro

### Elevation
- Niveis 0-5 com shadows MD3

### Motion
- Standard, Decelerate, Accelerate curves
- Durations: short (50-200ms), medium (250-400ms), long (450-600ms)

## Licenca

MIT
