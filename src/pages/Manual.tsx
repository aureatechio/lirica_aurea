import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookOpen,
  LayoutDashboard,
  Package,
  Calendar,
  Target,
  Settings,
  Users,
  TrendingUp,
  Library,
  Database,
  Brain,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Info,
  Layers,
} from "lucide-react";
import { Link } from "wouter";

const tiersDefinicao = [
  {
    tier: "T1",
    nome: "Lançamento/Ação do Mês",
    descricao: "Campanhas principais de lançamento com maior investimento e expectativa de retorno. São as ações âncora do mês.",
    cor: "bg-red-500",
    exemplos: ["Lançamento Calendário Exponencial", "Abertura de Turma Jornada", "Black Friday MGS"],
  },
  {
    tier: "T2",
    nome: "Funis Menores e Variados",
    descricao: "Campanhas de suporte com funis específicos para diferentes produtos ou públicos. Complementam as ações T1.",
    cor: "bg-orange-500",
    exemplos: ["Funil de Passaporte", "Campanha de Branding", "Ações segmentadas"],
  },
  {
    tier: "T3",
    nome: "Perpétuo",
    descricao: "Campanhas always-on que rodam continuamente. Focadas em captação constante e nutrição de leads.",
    cor: "bg-yellow-500",
    exemplos: ["Funil perpétuo de entrada", "Captação orgânica", "Conteúdo evergreen"],
  },
  {
    tier: "T4",
    nome: "Renovação, Recuperação e RMKT",
    descricao: "Ações focadas em base existente: renovação de assinaturas, recuperação de churns e remarketing.",
    cor: "bg-blue-500",
    exemplos: ["Campanha de renovação", "Recuperação de boletos", "RMKT de carrinho abandonado"],
  },
  {
    tier: "T5",
    nome: "Upsell",
    descricao: "Campanhas de upgrade e cross-sell para clientes ativos. Foco em aumentar ticket médio e LTV.",
    cor: "bg-purple-500",
    exemplos: ["Upgrade para MBA", "Cross-sell de imersões", "Oferta de mentorias"],
  },
];

const modulos = [
  { id: "dashboard", nome: "Dashboard", icone: LayoutDashboard, descricao: "Visão consolidada de KPIs, faturamento por núcleo e próximas campanhas", funcionalidades: ["Faturamento anual e mensal por núcleo (MGS/Aceleraí/Outros)", "ROAS médio e campanhas ativas", "Gráfico de projeção de faturamento", "Lista de próximas campanhas programadas"] },
  { id: "produtos", nome: "Produtos", icone: Package, descricao: "Gestão de produtos MGS e celebridades/segmentos Aceleraí", funcionalidades: ["Calendário de produtos MGS com datas, mentores e vagas", "Catálogo de celebridades Aceleraí por segmento", "Alertas de eventos concorrentes", "Visualização mês a mês de oportunidades"] },
  { id: "estrategico", nome: "Estratégico", icone: Calendar, descricao: "Planejamento anual com visão de campanhas por Tier e projeção de faturamento", funcionalidades: ["Cronograma anual de lançamentos por Tier (T1-T5)", "Projeção mensal de faturamento vs meta", "Sistema de alertas para gaps de planejamento", "Edição inline de valores e datas"] },
  { id: "tatico", nome: "Tático", icone: Target, descricao: "Controle mensal detalhado de campanhas, metas e investimentos", funcionalidades: ["Tabela de campanhas do mês com métricas", "Calculadora de funil (leads a vendas)", "ROAS por campanha", "Comparativo meta vs realizado"] },
  { id: "operacional", nome: "Operacional", icone: Settings, descricao: "Simulador de cenários e calculadora de campanhas", funcionalidades: ["Seletor de campanhas com projeções pré-setadas", "Simulação de cenários (conservador/moderado/otimista)", "Cálculo de leads, vendas e ROAS projetado", "Análise de viabilidade de campanha"] },
  { id: "influencias", nome: "Influências", icone: Users, descricao: "Mapa de influenciadores diretos e indiretas do mercado", funcionalidades: ["54+ referências categorizadas (diretas e indiretas)", "Sistema de pesos (Crítico, Alto, Médio)", "Links para Meta Ad Library e perfis", "Filtros por categoria e segmento"] },
  { id: "tendencias", nome: "Tendências", icone: TrendingUp, descricao: "Feed de notícias e tendências do mercado em tempo real", funcionalidades: ["Notícias categorizadas por segmento", "Sugestões de oportunidades baseadas em tendências", "Alertas de movimentações do mercado", "Integração com análise de campanhas"] },
  { id: "cliente-sintetico", nome: "Cliente Sintético", icone: Brain, descricao: "Teste ofertas com ICPs simulados baseados em pesquisas reais", funcionalidades: ["3 perfis de ICPs detalhados (Empresário, Profissional Liberal, Digital)", "Gerador de 5 clientes sintéticos aleatórios", "Filtro por segmento (17 categorias disponíveis)", "Chat simulado com IA para testar ofertas", "Histórico de conversas salvo no banco de dados", "Construtor de ICP personalizado"] },
  { id: "nova-campanha", nome: "Nova Campanha", icone: Zap, descricao: "Criação de campanhas com assistência de IA em 8 etapas", funcionalidades: ["Wizard de 8 etapas guiadas", "Campos para Big Idea, Dor, Transformação, ICP", "Configuração de funil com fluxo visual", "Detalhamento de criativos em vídeo e estáticos", "Análise de IA com nota e feedback", "Exportação de relatório em PDF"] },
  { id: "biblioteca", nome: "Biblioteca", icone: Library, descricao: "89 referências curadas de criativos por tema e formato", funcionalidades: ["Exemplos de Feed, LP, Manifesto, Vídeo, Estático, Post Orgânico", "12 temas categorizados", "Sistema de níveis (Iniciante a Avançado)", "Botão Usar como Base para campanhas"] },
  { id: "repositorio", nome: "Repositório", icone: Database, descricao: "Materiais e métricas de campanhas passadas", funcionalidades: ["Upload de LPs, manifestos, criativos", "Métricas históricas de campanhas", "Base de conhecimento para novas campanhas", "Documentos de referência (PDFs, apresentações)"] },
  { id: "analytics", nome: "Analytics", icone: TrendingUp, descricao: "Dashboard de análise de performance das campanhas e conversas", funcionalidades: ["Taxa de conversão simulada por ICP", "Gráfico de objeções mais frequentes", "Métricas de conversas (positivas, negativas, neutras)", "Insights e recomendações automáticas", "Filtros por período e tipo de ICP", "Performance comparativa por segmento"] },
];

function ModuloCard({ modulo }: { modulo: typeof modulos[0] }) {
  const Icone = modulo.icone;
  return (
    <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-colors">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
          <Icone className="h-5 w-5 text-red-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold">{modulo.nome}</h3>
          <p className="text-sm text-muted-foreground mt-1">{modulo.descricao}</p>
          <ul className="mt-3 space-y-1">
            {modulo.funcionalidades.map((func, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                {func}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FluxoStep({ numero, titulo, descricao }: { numero: number; titulo: string; descricao: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm">
        {numero}
      </div>
      <div>
        <h4 className="font-medium">{titulo}</h4>
        <p className="text-sm text-muted-foreground">{descricao}</p>
      </div>
    </div>
  );
}

export default function Manual() {
  return (
    <div className="space-y-8 pb-8">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-8 border border-zinc-700">
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30">
              <BookOpen className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Manual da Central de Campanhas</h1>
              <p className="text-muted-foreground">Guia completo para utilizar todas as funcionalidades do painel</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div><p className="font-medium">12 Módulos</p><p className="text-sm text-muted-foreground">Funcionalidades integradas</p></div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <Layers className="h-5 w-5 text-blue-500" />
              <div><p className="font-medium">5 Tiers</p><p className="text-sm text-muted-foreground">Sistema de classificação</p></div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
              <Brain className="h-5 w-5 text-purple-500" />
              <div><p className="font-medium">Assistente IA</p><p className="text-sm text-muted-foreground">Análise e sugestões</p></div>
            </div>
          </div>
        </div>
      </div>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2"><Layers className="h-5 w-5 text-red-500" /><CardTitle>Sistema de Tiers (T1-T5)</CardTitle></div>
          <CardDescription>Classificação padronizada de campanhas utilizada em todas as abas do sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {tiersDefinicao.map((tier) => (
              <div key={tier.tier} className="flex items-start gap-4 p-4 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-colors">
                <div className={`${tier.cor} text-white font-bold px-3 py-2 rounded-lg text-lg min-w-[60px] text-center`}>{tier.tier}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{tier.nome}</h3>
                  <p className="text-muted-foreground mt-1">{tier.descricao}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tier.exemplos.map((exemplo, idx) => (<Badge key={idx} variant="outline" className="text-xs">{exemplo}</Badge>))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium text-amber-500">Importante</p>
                <p className="text-sm text-muted-foreground mt-1">Esta classificação de Tiers é consistente em todas as abas do sistema (Dashboard, Estratégico, Tático, Operacional). Ao planejar campanhas, sempre considere o Tier adequado para otimizar investimento e expectativa de retorno.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2"><LayoutDashboard className="h-5 w-5 text-red-500" /><CardTitle>Módulos do Sistema</CardTitle></div>
          <CardDescription>Conheça cada módulo e suas funcionalidades</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visao-geral" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
              <TabsTrigger value="planejamento">Planejamento</TabsTrigger>
              <TabsTrigger value="criacao">Criação</TabsTrigger>
            </TabsList>
            <TabsContent value="visao-geral" className="space-y-4">
              {modulos.filter(m => ["dashboard", "produtos"].includes(m.id)).map((modulo) => (<ModuloCard key={modulo.id} modulo={modulo} />))}
            </TabsContent>
            <TabsContent value="planejamento" className="space-y-4">
              {modulos.filter(m => ["estrategico", "tatico", "operacional", "influencias", "tendencias", "cliente-sintetico", "analytics"].includes(m.id)).map((modulo) => (<ModuloCard key={modulo.id} modulo={modulo} />))}
            </TabsContent>
            <TabsContent value="criacao" className="space-y-4">
              {modulos.filter(m => ["nova-campanha", "biblioteca", "repositorio"].includes(m.id)).map((modulo) => (<ModuloCard key={modulo.id} modulo={modulo} />))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader>
          <div className="flex items-center gap-2"><ArrowRight className="h-5 w-5 text-red-500" /><CardTitle>Fluxo de Trabalho Recomendado</CardTitle></div>
          <CardDescription>Passo a passo para criar e validar campanhas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FluxoStep numero={1} titulo="Consulte o Dashboard" descricao="Verifique os KPIs atuais, faturamento por núcleo e campanhas programadas para entender o contexto." />
            <FluxoStep numero={2} titulo="Analise o Estratégico" descricao="Veja o planejamento anual, identifique gaps e oportunidades por Tier." />
            <FluxoStep numero={3} titulo="Pesquise Influências e Tendências" descricao="Busque referências de mercado e tendências atuais para embasar sua campanha." />
            <FluxoStep numero={4} titulo="Consulte a Biblioteca" descricao="Encontre exemplos de criativos, LPs e manifestos que funcionam." />
            <FluxoStep numero={5} titulo="Crie a Campanha" descricao="Use o wizard de Nova Campanha para estruturar todos os elementos." />
            <FluxoStep numero={6} titulo="Analise com IA" descricao="Receba feedback e nota da campanha baseado em tendências e boas práticas." />
            <FluxoStep numero={7} titulo="Exporte o Relatório" descricao="Gere o PDF com todas as informações para compartilhar com a equipe." />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardHeader><div className="flex items-center gap-2"><Info className="h-5 w-5 text-red-500" /><CardTitle>Perguntas Frequentes</CardTitle></div></CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Como escolher o Tier correto para minha campanha?</AccordionTrigger>
              <AccordionContent>O Tier deve ser escolhido com base no objetivo e investimento da campanha. T1 é para lançamentos principais com maior budget, T2 para campanhas de suporte, T3 para ações contínuas (perpétuo), T4 para trabalhar base existente (renovação/RMKT), e T5 para upsell de clientes ativos.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Qual a diferença entre MGS e Aceleraí no sistema?</AccordionTrigger>
              <AccordionContent>MGS (Marketing Growth School) possui múltiplos produtos (Calendário, Jornada, Brand, etc.) com datas e mentores específicos. Aceleraí é um único produto de imersão que varia por segmento e celebridade. O sistema trata cada um de forma diferente na criação de campanhas.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Como funciona a análise de IA das campanhas?</AccordionTrigger>
              <AccordionContent>A IA analisa sua campanha com base em: completude das informações, alinhamento com tendências de mercado, qualidade da Big Idea, estrutura do funil, e variedade de criativos. A nota vai de 0 a 100 com feedbacks específicos para melhorias.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Posso editar os dados diretamente nas tabelas?</AccordionTrigger>
              <AccordionContent>Sim! Na aba Estratégico você pode clicar em qualquer valor (nome, meta, investimento, data) para editar diretamente. As alterações são refletidas em tempo real. Para persistir os dados, será necessário integrar com banco de dados.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>O que são influências diretas e indiretas?</AccordionTrigger>
              <AccordionContent>Influências diretas são players do mercado de educação/infoprodutos (G4, StartSe, Hotmart). Influências indiretas são grandes marcas de outros setores (Apple, Nike, Dior) que podem inspirar estratégias criativas e de posicionamento.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Como funciona o Cliente Sintético?</AccordionTrigger>
              <AccordionContent>O Cliente Sintético permite testar suas ofertas com ICPs simulados. Você pode: escolher entre 3 perfis pré-definidos, gerar 5 clientes aleatórios baseados em pesquisas reais, filtrar por segmento (17 categorias), conversar via chat com IA, e salvar o histórico de conversas para análise posterior.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>O que mostra o dashboard de Analytics?</AccordionTrigger>
              <AccordionContent>O Analytics exibe: taxa de conversão simulada por ICP, gráfico de objeções mais frequentes (preço, tempo, confiança, etc.), métricas de conversas (positivas, negativas, neutras), insights automáticos e recomendações para melhorar suas ofertas.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>Como salvar uma conversa no histórico?</AccordionTrigger>
              <AccordionContent>Após iniciar uma conversa com o cliente sintético, clique no botão de salvar (disquete) no chat. A conversa será salva no banco de dados e aparecerá no botão "Histórico" no topo da página, onde você pode revisar todas as conversas anteriores.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Link href="/"><Button size="lg" className="gap-2"><LayoutDashboard className="h-5 w-5" />Ir para o Dashboard<ArrowRight className="h-4 w-4" /></Button></Link>
      </div>
    </div>
  );
}
