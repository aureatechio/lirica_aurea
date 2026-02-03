import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Lightbulb,
  Target,
  Zap,
  FileText,
  Video,
  Image,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Save,
  Plus,
  Trash2,
  Mic,
  Camera,
  Bot,
  GraduationCap,
  Users,
  Play,
  Link,
  Globe,
  Layout,
  ShoppingCart,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  Layers,
  Star,
  History,
  BookOpen,
  TrendingUp,
  Combine,
  FolderOpen,
} from "lucide-react";
import { toast } from "sonner";
import { CriativosIASection } from "@/components/CriativosIA";
import { AssistenteIAEtapa } from "@/components/AssistenteIAEtapa";
import { ExportarRelatorioPDFButton } from "@/components/ExportarRelatorioPDF";
import JornadaHeroi from "@/components/JornadaHeroi";
import HyperCube from "@/components/HyperCube";

// Produtos MGS
const produtosMGS = [
  { id: "calendario", nome: "Calendário Exponencial", tier: 1 },
  { id: "jornada", nome: "Jornada Exponencial", tier: 1 },
  { id: "brand", nome: "Brand e Posicionamento", tier: 1 },
  { id: "criatividade", nome: "Criatividade Exponencial", tier: 1 },
  { id: "sales", nome: "Sales Exponencial", tier: 1 },
  { id: "ia", nome: "IA Exponencial", tier: 1 },
  { id: "growth", nome: "Growth Exponencial", tier: 1 },
  { id: "transnovacao", nome: "Transnovação Exponencial", tier: 1 },
  { id: "black", nome: "Black Exponencial", tier: 1 },
  { id: "multiplica", nome: "Multiplica Exponencial", tier: 2 },
  { id: "cultura", nome: "Cultura Exponencial", tier: 2 },
  { id: "certificacao", nome: "Certificação MGS", tier: 2 },
  { id: "passaporte", nome: "Passaporte MGS", tier: 2 },
  { id: "pulse", nome: "Pulse + MGS", tier: 2 },
  { id: "politico", nome: "Marketing Político", tier: 2 },
  { id: "hotseat", nome: "Hotseat", tier: 3 },
  { id: "incompany", nome: "In Company", tier: 3 },
  { id: "symphonia", nome: "Symphonia (MBA Premium)", tier: 1 },
  { id: "china", nome: "Viagem China", tier: 1 },
  { id: "summit", nome: "Summit MGS", tier: 1 },
];

// Celebridades/Segmentos Aceleraí
const segmentosAcelerai = [
  { id: "arthur", nome: "Arthur Aguiar", segmento: "Bloco" },
  { id: "faro", nome: "Rodrigo Faro", segmento: "Geral" },
  { id: "caua", nome: "Cauã Reymond", segmento: "Saúde/Bem-estar" },
  { id: "deborah", nome: "Déborah Secco", segmento: "Feminino" },
  { id: "saude", nome: "Saúde", segmento: "Profissionais de Saúde" },
  { id: "asc", nome: "ASC", segmento: "Arquitetura/Design" },
  { id: "cargos", nome: "Cargos", segmento: "Executivos" },
  { id: "fitness", nome: "Fitness", segmento: "Personal/Academia" },
  { id: "beleza", nome: "Beleza", segmento: "Estética/Beleza" },
  { id: "alimentacao", nome: "Alimentação", segmento: "Gastronomia" },
];

// Objetivos de campanha
const objetivosCampanha = [
  { id: "venda-direta", nome: "Venda Direta", descricao: "Conversão imediata para compra", icon: ShoppingCart },
  { id: "captacao", nome: "Captação de Leads", descricao: "Construção de base de contatos", icon: Users },
  { id: "aquecimento", nome: "Aquecimento", descricao: "Nutrição de leads existentes", icon: Mail },
  { id: "lancamento", nome: "Lançamento", descricao: "Evento de vendas com abertura e fechamento", icon: Calendar },
  { id: "renovacao", nome: "Renovação", descricao: "Retenção de clientes existentes", icon: RefreshCw },
  { id: "recuperacao", nome: "Recuperação", descricao: "Carrinho abandonado e reativação", icon: Target },
  { id: "remarketing", nome: "Remarketing", descricao: "Reativação de base fria", icon: MessageCircle },
  { id: "upsell", nome: "Upsell", descricao: "Aumento de ticket de clientes", icon: Zap },
  { id: "branding", nome: "Branding", descricao: "Construção e fortalecimento de marca", icon: Sparkles },
];

// Tipos de funil com fluxo visual
const tiposFunil = [
  { 
    id: "lancamento", 
    nome: "Lançamento Clássico", 
    descricao: "Abertura e fechamento de carrinho",
    etapas: [
      { nome: "LP Captura", tipo: "lp", campo: "lpCaptura" },
      { nome: "CPL 1", tipo: "video", campo: "cpl1" },
      { nome: "CPL 2", tipo: "video", campo: "cpl2" },
      { nome: "CPL 3", tipo: "video", campo: "cpl3" },
      { nome: "Webinar/Live", tipo: "evento", campo: "webinar" },
      { nome: "Carrinho Aberto", tipo: "lp", campo: "lpVendas" },
      { nome: "Carrinho Fechando", tipo: "email", campo: "emailFechamento" },
    ]
  },
  { 
    id: "perpetuo", 
    nome: "Perpétuo", 
    descricao: "Vendas contínuas automatizadas",
    etapas: [
      { nome: "Anúncio", tipo: "ad", campo: "anuncio" },
      { nome: "LP/VSL", tipo: "lp", campo: "lpVsl" },
      { nome: "Checkout", tipo: "checkout", campo: "checkout" },
      { nome: "Upsell", tipo: "lp", campo: "upsell" },
      { nome: "Downsell", tipo: "lp", campo: "downsell" },
    ]
  },
  { 
    id: "webinar", 
    nome: "Webinar/Live", 
    descricao: "Evento ao vivo com oferta",
    etapas: [
      { nome: "LP Inscrição", tipo: "lp", campo: "lpInscricao" },
      { nome: "Lembrete D-1", tipo: "email", campo: "lembreteD1" },
      { nome: "Lembrete D0", tipo: "email", campo: "lembreteD0" },
      { nome: "Webinar", tipo: "evento", campo: "webinar" },
      { nome: "Replay", tipo: "video", campo: "replay" },
      { nome: "Oferta", tipo: "lp", campo: "lpOferta" },
    ]
  },
  { 
    id: "challenge", 
    nome: "Challenge/Desafio", 
    descricao: "Engajamento com conteúdo",
    etapas: [
      { nome: "LP Inscrição", tipo: "lp", campo: "lpInscricao" },
      { nome: "Dia 1", tipo: "video", campo: "dia1" },
      { nome: "Dia 2", tipo: "video", campo: "dia2" },
      { nome: "Dia 3", tipo: "video", campo: "dia3" },
      { nome: "Dia 4", tipo: "video", campo: "dia4" },
      { nome: "Dia 5 + Oferta", tipo: "evento", campo: "dia5Oferta" },
    ]
  },
  { 
    id: "aplicacao", 
    nome: "Aplicação", 
    descricao: "Qualificação para high ticket",
    etapas: [
      { nome: "LP Aplicação", tipo: "lp", campo: "lpAplicacao" },
      { nome: "Formulário", tipo: "form", campo: "formulario" },
      { nome: "Qualificação", tipo: "processo", campo: "qualificacao" },
      { nome: "Call de Vendas", tipo: "call", campo: "callVendas" },
      { nome: "Proposta", tipo: "doc", campo: "proposta" },
    ]
  },
  { 
    id: "vsl", 
    nome: "VSL", 
    descricao: "Video Sales Letter direto",
    etapas: [
      { nome: "Anúncio", tipo: "ad", campo: "anuncio" },
      { nome: "LP com VSL", tipo: "lp", campo: "lpVsl" },
      { nome: "Checkout", tipo: "checkout", campo: "checkout" },
      { nome: "Order Bump", tipo: "checkout", campo: "orderBump" },
      { nome: "Upsell", tipo: "lp", campo: "upsell" },
    ]
  },
  { 
    id: "quiz", 
    nome: "Quiz/Diagnóstico", 
    descricao: "Segmentação e qualificação",
    etapas: [
      { nome: "Anúncio Quiz", tipo: "ad", campo: "anuncioQuiz" },
      { nome: "Quiz", tipo: "quiz", campo: "quiz" },
      { nome: "Resultado", tipo: "lp", campo: "resultado" },
      { nome: "Oferta Segmentada", tipo: "lp", campo: "ofertaSegmentada" },
    ]
  },
  { 
    id: "social", 
    nome: "Social Selling", 
    descricao: "Vendas via DM e relacionamento",
    etapas: [
      { nome: "Conteúdo Orgânico", tipo: "post", campo: "conteudo" },
      { nome: "Engajamento", tipo: "processo", campo: "engajamento" },
      { nome: "DM", tipo: "mensagem", campo: "dm" },
      { nome: "Qualificação", tipo: "processo", campo: "qualificacao" },
      { nome: "Venda", tipo: "checkout", campo: "venda" },
    ]
  },
];

// Tipos de criativo
const tiposCriativo = [
  { id: "corte-podcast", nome: "Corte de Podcast", icon: Mic },
  { id: "nativo", nome: "Nativo/Orgânico", icon: Play },
  { id: "reaproveitado", nome: "Reaproveitado", icon: RefreshCw },
  { id: "estudio", nome: "Gravado em Estúdio", icon: Camera },
  { id: "ia", nome: "Feito com IA", icon: Bot },
  { id: "corte-aula", nome: "Corte de Aula", icon: GraduationCap },
  { id: "prova-social", nome: "Prova Social/Depoimento", icon: Users },
  { id: "animacao", nome: "Animação/Motion", icon: Sparkles },
];

// Metodologias de copy
const metodologiasCopy = [
  { id: "aida", nome: "AIDA", descricao: "Atenção, Interesse, Desejo, Ação" },
  { id: "pas", nome: "PAS", descricao: "Problema, Agitação, Solução" },
  { id: "bab", nome: "BAB", descricao: "Before, After, Bridge" },
  { id: "4ps", nome: "4Ps", descricao: "Promise, Picture, Proof, Push" },
  { id: "hso", nome: "Hook-Story-Offer", descricao: "Gancho, História, Oferta" },
  { id: "fab", nome: "FAB", descricao: "Features, Advantages, Benefits" },
  { id: "quest", nome: "QUEST", descricao: "Qualify, Understand, Educate, Stimulate, Transition" },
  { id: "star", nome: "STAR", descricao: "Situation, Task, Action, Result" },
];

// Interface para criativo
interface Criativo {
  id: string;
  tipo: string;
  metodologia: string;
  descricao: string;
  duracao?: string;
  formato?: string;
  hook?: string;
  cta?: string;
}

// Interface para links do funil
interface LinksFunil {
  [key: string]: string;
}

// Sugestões de nomes
const sugestoesNomeAcao = ["Decolagem", "Ignição", "Virada", "Despertar", "Transformação", "Revolução", "Salto", "Avanço", "Breakthrough", "Ascensão"];

// Ícones por tipo de etapa
const etapaIcons: Record<string, React.ElementType> = {
  lp: Layout,
  video: Video,
  email: Mail,
  evento: Calendar,
  checkout: ShoppingCart,
  ad: Target,
  form: FileText,
  processo: Clock,
  call: MessageCircle,
  doc: FileText,
  quiz: Lightbulb,
  post: Image,
  mensagem: MessageCircle,
};

export default function NovaCampanha() {
  // Estado do wizard - NOVA ORDEM: 1. Núcleo, 2. Conceito, 3. Objetivo/Funil, 4. Oferta, 5. Manifesto, 6. Vídeos, 7. Estáticos
  const [etapaAtual, setEtapaAtual] = useState(1);
  const totalEtapas = 8;

  // Dados básicos
  const [nucleo, setNucleo] = useState<"MGS" | "ACELERAI" | "">("");
  const [produto, setProduto] = useState("");
  const [segmentoAcelerai, setSegmentoAcelerai] = useState("");
  const [nomeCampanha, setNomeCampanha] = useState("");
  
  // Conceito (agora etapa 2)
  const [bigIdea, setBigIdea] = useState("");
  const [dor, setDor] = useState("");
  const [transformacao, setTransformacao] = useState("");
  const [icp, setIcp] = useState("");

  // Objetivo e Funil (agora etapa 3)
  const [objetivo, setObjetivo] = useState("");
  const [tipoFunil, setTipoFunil] = useState("");
  const [linksFunil, setLinksFunil] = useState<LinksFunil>({});
  const [funilCustomizado, setFunilCustomizado] = useState(false);
  const [etapasCustomizadas, setEtapasCustomizadas] = useState<{nome: string; tipo: string; campo: string}[]>([]);

  // Oferta (etapa 4)
  const [oferta, setOferta] = useState("");
  const [ticketMedio, setTicketMedio] = useState("");
  const [entregaveis, setEntregaveis] = useState("");

  // Manifesto (etapa 5)
  const [temManifesto, setTemManifesto] = useState(false);
  const [manifesto, setManifesto] = useState("");
  const [roteiroManifesto, setRoteiroManifesto] = useState("");
  const [tipoManifesto, setTipoManifesto] = useState("");
  const [metodologiaManifesto, setMetodologiaManifesto] = useState("");
  const [duracaoManifesto, setDuracaoManifesto] = useState("");
  const [temTeasers, setTemTeasers] = useState(false);

  // Criativos em Vídeo (etapa 6)
  const [criativosVideo, setCriativosVideo] = useState<Criativo[]>([
    { id: "1", tipo: "", metodologia: "", descricao: "", duracao: "", hook: "", cta: "" }
  ]);

  // Criativos Estáticos (etapa 7)
  const [criativosEstaticos, setCriativosEstaticos] = useState<Criativo[]>([
    { id: "1", tipo: "", metodologia: "", descricao: "", formato: "", hook: "", cta: "" }
  ]);

  // Análise IA
  const [analisando, setAnalisando] = useState(false);
  const [notaCampanha, setNotaCampanha] = useState<number | null>(null);
  const [feedbackIA, setFeedbackIA] = useState<string[]>([]);

  // Modelos salvos
  const [mostrarModelos, setMostrarModelos] = useState(false);
  const [modelosSalvos] = useState([
    {
      id: 1,
      nome: "Apple 1984 - Adaptação",
      tipo: "ref_historica",
      fonteNome: "Apple 1984 Super Bowl",
      fonteTipo: "Campanha Clássica",
      conteudo: {
        titulo: "Think Different para Jornada Exponencial",
        descricao: "Adaptação do conceito revolucionário da Apple para o contexto de mentorias de negócios",
        bigIdea: "Você não precisa seguir as regras do mercado tradicional",
        copyLP: "Em um mundo onde todos fazem igual, os que pensam diferente dominam...",
        estrategia: "Posicionamento disruptivo + escassez + autoridade",
        gatilhos: ["Exclusividade", "Pertencimento", "Autoridade"],
      },
      favorito: true,
      createdAt: new Date("2024-01-15"),
    },
    {
      id: 2,
      nome: "Fórmula de Lançamento + Desafio",
      tipo: "combinado",
      fonteNome: "Erico Rocha + Ladeira",
      fonteTipo: "Combinação",
      conteudo: {
        titulo: "Híbrido PLF + Desafio 7 Dias",
        descricao: "Combinação da estrutura de lançamento do Erico com o engajamento do desafio do Ladeira",
        bigIdea: "Transformação em 7 dias com método validado",
        estrategia: "CPL + Desafio gratuito + Oferta no final",
        gatilhos: ["Urgência", "Prova Social", "Reciprocidade"],
      },
      favorito: false,
      createdAt: new Date("2024-02-01"),
    },
    {
      id: 3,
      nome: "Roteiro VSL - Hormozi Style",
      tipo: "criado",
      fonteNome: "Alex Hormozi - $100M Offers",
      fonteTipo: "Livro",
      conteudo: {
        titulo: "VSL de Alta Conversão",
        roteiro: "Hook: O que você está prestes a ver vai mudar sua forma de pensar sobre [NICHO]...",
        estrategia: "Oferta irresistível + Stack de valor + Garantia reversa",
      },
      favorito: true,
      createdAt: new Date("2024-02-10"),
    },
  ]);

  // Função para carregar modelo como base
  const carregarModelo = (modelo: typeof modelosSalvos[0]) => {
    if (modelo.conteudo.bigIdea) setBigIdea(modelo.conteudo.bigIdea);
    if (modelo.conteudo.descricao) setDor(modelo.conteudo.descricao);
    if (modelo.conteudo.titulo) setTransformacao(modelo.conteudo.titulo);
    if (modelo.conteudo.estrategia) setOferta(modelo.conteudo.estrategia);
    setNomeCampanha(`Nova campanha baseada em: ${modelo.nome}`);
    setMostrarModelos(false);
    toast.success(`Modelo "${modelo.nome}" carregado!`, {
      description: "Os campos foram preenchidos com os dados do modelo."
    });
  };

  // Funções auxiliares
  const adicionarCriativoVideo = () => {
    setCriativosVideo([...criativosVideo, { 
      id: Date.now().toString(), 
      tipo: "", 
      metodologia: "", 
      descricao: "",
      duracao: "",
      hook: "",
      cta: ""
    }]);
  };

  const removerCriativoVideo = (id: string) => {
    if (criativosVideo.length > 1) {
      setCriativosVideo(criativosVideo.filter(c => c.id !== id));
    }
  };

  const atualizarCriativoVideo = (id: string, campo: keyof Criativo, valor: string) => {
    setCriativosVideo(criativosVideo.map(c => 
      c.id === id ? { ...c, [campo]: valor } : c
    ));
  };

  const adicionarCriativoEstatico = () => {
    setCriativosEstaticos([...criativosEstaticos, { 
      id: Date.now().toString(), 
      tipo: "", 
      metodologia: "", 
      descricao: "",
      formato: "",
      hook: "",
      cta: ""
    }]);
  };

  const removerCriativoEstatico = (id: string) => {
    if (criativosEstaticos.length > 1) {
      setCriativosEstaticos(criativosEstaticos.filter(c => c.id !== id));
    }
  };

  const atualizarCriativoEstatico = (id: string, campo: keyof Criativo, valor: string) => {
    setCriativosEstaticos(criativosEstaticos.map(c => 
      c.id === id ? { ...c, [campo]: valor } : c
    ));
  };

  const atualizarLinkFunil = (campo: string, valor: string) => {
    setLinksFunil({ ...linksFunil, [campo]: valor });
  };

  const gerarSugestaoNomeAcao = () => {
    const prefixos = ["Operação", "Projeto", "Missão", "Campanha", "Movimento"];
    const sufixos = sugestoesNomeAcao;
    const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
    const sufixo = sufixos[Math.floor(Math.random() * sufixos.length)];
    return `${prefixo} ${sufixo}`;
  };

  const analisarCampanha = () => {
    setAnalisando(true);
    setTimeout(() => {
      const nota = Math.floor(Math.random() * 30) + 70;
      setNotaCampanha(nota);
      
      const feedbacks = [];
      if (!bigIdea) feedbacks.push("Big Idea não definida - elemento crucial para diferenciação");
      if (!dor) feedbacks.push("Dor do cliente não especificada - dificulta conexão emocional");
      if (!transformacao) feedbacks.push("Transformação não clara - promessa de valor indefinida");
      if (bigIdea && bigIdea.length < 50) feedbacks.push("Big Idea muito curta - desenvolva mais o conceito");
      if (criativosVideo.length < 3) feedbacks.push("Poucos vídeos planejados - considere aumentar para melhor cobertura");
      if (!temManifesto && objetivo === "lancamento") feedbacks.push("Lançamentos performam melhor com manifesto");
      
      const criativosSemTipo = criativosVideo.filter(c => !c.tipo).length;
      if (criativosSemTipo > 0) feedbacks.push(`${criativosSemTipo} criativo(s) sem tipo definido`);
      
      const criativosSemMetodologia = criativosVideo.filter(c => !c.metodologia).length;
      if (criativosSemMetodologia > 0) feedbacks.push(`${criativosSemMetodologia} criativo(s) sem metodologia de copy`);
      
      // Verificar links do funil
      const funilAtual = tiposFunil.find(f => f.id === tipoFunil);
      if (funilAtual) {
        const linksVazios = funilAtual.etapas.filter(e => !linksFunil[e.campo]).length;
        if (linksVazios > 0) feedbacks.push(`${linksVazios} etapa(s) do funil sem link definido`);
      }
      
      if (feedbacks.length === 0) {
        feedbacks.push("Campanha bem estruturada! Considere testar variações de Big Idea.");
        feedbacks.push("Recomendamos validar a oferta com um grupo de teste antes do lançamento.");
      }
      
      setFeedbackIA(feedbacks);
      setAnalisando(false);
    }, 2000);
  };

  const salvarCampanha = () => {
    toast.success("Campanha salva com sucesso!");
  };

  const proximaEtapa = () => {
    if (etapaAtual < totalEtapas) setEtapaAtual(etapaAtual + 1);
  };

  const etapaAnterior = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  const funilAtual = tiposFunil.find(f => f.id === tipoFunil);

  // Nomes das etapas
  const etapasNomes = [
    "Núcleo e Produto",
    "Conceito e Big Idea",
    "Objetivo e Funil",
    "Oferta e Entregáveis",
    "Manifesto",
    "Criativos em Vídeo",
    "Criativos Estáticos",
    "Assistente IA"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Nova Campanha
          </h1>
          <p className="text-muted-foreground">
            Crie e valide sua campanha com assistência de IA
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setMostrarModelos(!mostrarModelos)}
            className={mostrarModelos ? "border-primary text-primary" : ""}
          >
            <FolderOpen className="h-4 w-4 mr-2" />
            Meus Modelos
          </Button>
          <ExportarRelatorioPDFButton
            dados={{
              nucleo,
              produto: produtosMGS.find(p => p.id === produto)?.nome || segmentosAcelerai.find(s => s.id === segmentoAcelerai)?.nome || '',
              nomeCampanha,
              bigIdea,
              dor,
              transformacao,
              icp,
              objetivo: objetivosCampanha.find(o => o.id === objetivo)?.nome || '',
              tipoFunil: tiposFunil.find(f => f.id === tipoFunil)?.nome || '',
              linksFunil,
              oferta,
              entregaveis,
              ticketMedio,
              garantia: '',
              bonus: '',
              temManifesto,
              manifesto,
              roteiro: roteiroManifesto,
              criativosVideo,
              criativosEstaticos,
              temTeasers,
              notaCampanha,
              feedbackIA,
            }}
            disabled={!nucleo || !nomeCampanha}
          />
          <Button variant="outline" onClick={salvarCampanha}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Rascunho
          </Button>
          <Button onClick={analisarCampanha} disabled={analisando}>
            {analisando ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4 mr-2" />
            )}
            Analisar com IA
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Etapa {etapaAtual} de {totalEtapas}: {etapasNomes[etapaAtual - 1]}</span>
          <span className="text-muted-foreground">{Math.round((etapaAtual / totalEtapas) * 100)}%</span>
        </div>
        <Progress value={(etapaAtual / totalEtapas) * 100} className="h-2" />
        <div className="flex justify-between">
          {etapasNomes.map((nome, i) => (
            <div 
              key={i}
              className={`text-xs cursor-pointer hover:text-primary transition-colors ${i + 1 === etapaAtual ? "text-primary font-medium" : "text-muted-foreground"}`}
              onClick={() => setEtapaAtual(i + 1)}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Modelos Salvos */}
      {mostrarModelos && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Meus Modelos Salvos</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setMostrarModelos(false)}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Ocultar
              </Button>
            </div>
            <CardDescription>Selecione um modelo para usar como base da sua nova campanha</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {modelosSalvos.map((modelo) => {
                const tipoConfig: Record<string, { icon: React.ElementType; color: string; label: string }> = {
                  ref_historica: { icon: History, color: "bg-amber-500", label: "Ref. Histórica" },
                  combinado: { icon: Combine, color: "bg-pink-500", label: "Combinado" },
                  criado: { icon: Sparkles, color: "bg-cyan-500", label: "Criado" },
                  campanha_iconica: { icon: Target, color: "bg-red-500", label: "Campanha Icônica" },
                  livro: { icon: BookOpen, color: "bg-indigo-500", label: "Livro" },
                  tendencia: { icon: TrendingUp, color: "bg-blue-500", label: "Tendência" },
                };
                const config = tipoConfig[modelo.tipo] || { icon: Layers, color: "bg-gray-500", label: "Modelo" };
                const IconComponent = config.icon;
                
                return (
                  <Card 
                    key={modelo.id} 
                    className="cursor-pointer hover:border-primary transition-all group"
                    onClick={() => carregarModelo(modelo)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className={`p-2 rounded-lg ${config.color}/20`}>
                          <IconComponent className={`h-4 w-4 ${config.color.replace('bg-', 'text-')}`} />
                        </div>
                        {modelo.favorito && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                      </div>
                      <h4 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">{modelo.nome}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{modelo.fonteNome}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{config.label}</Badge>
                        <Button size="sm" variant="ghost" className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                          Usar
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {modelosSalvos.length} modelos salvos • {modelosSalvos.filter(m => m.favorito).length} favoritos
              </p>
              <Button variant="link" className="text-primary" onClick={() => window.location.href = '/meus-modelos'}>
                Ver todos em Meus Modelos
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Formulário Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Etapa 1: Núcleo e Produto */}
          {etapaAtual === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>1. Núcleo e Produto</CardTitle>
                <CardDescription>Defina se é campanha MGS ou Aceleraí</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card 
                    className={`cursor-pointer transition-all ${nucleo === "MGS" ? "border-red-500 bg-red-500/10" : "hover:border-muted-foreground"}`}
                    onClick={() => { setNucleo("MGS"); setProduto(""); setSegmentoAcelerai(""); }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-red-500 mb-2">MGS</div>
                      <p className="text-sm text-muted-foreground">Marketing Growth School</p>
                      <p className="text-xs text-muted-foreground mt-2">{produtosMGS.length} produtos</p>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all ${nucleo === "ACELERAI" ? "border-blue-500 bg-blue-500/10" : "hover:border-muted-foreground"}`}
                    onClick={() => { setNucleo("ACELERAI"); setProduto("acelerai"); setSegmentoAcelerai(""); }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl font-bold text-blue-500 mb-2">ACELERAÍ</div>
                      <p className="text-sm text-muted-foreground">Imersão de Aceleração</p>
                      <p className="text-xs text-muted-foreground mt-2">{segmentosAcelerai.length} segmentos</p>
                    </CardContent>
                  </Card>
                </div>

                {nucleo === "MGS" && (
                  <div className="space-y-2">
                    <Label>Produto MGS</Label>
                    <Select value={produto} onValueChange={setProduto}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o produto" />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Tier 1 - Lançamentos</div>
                        {produtosMGS.filter(p => p.tier === 1).map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>
                        ))}
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Tier 2 - Funis Diversos</div>
                        {produtosMGS.filter(p => p.tier === 2).map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>
                        ))}
                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground">Tier 3 - Perpétuo</div>
                        {produtosMGS.filter(p => p.tier === 3).map(p => (
                          <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {nucleo === "ACELERAI" && (
                  <div className="space-y-2">
                    <Label>Celebridade/Segmento</Label>
                    <Select value={segmentoAcelerai} onValueChange={setSegmentoAcelerai}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o segmento" />
                      </SelectTrigger>
                      <SelectContent>
                        {segmentosAcelerai.map(s => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.nome} - {s.segmento}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Nome da Campanha/Ação</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={nomeCampanha} 
                      onChange={(e) => setNomeCampanha(e.target.value)}
                      placeholder="Ex: Operação Decolagem"
                    />
                    <Button variant="outline" onClick={() => setNomeCampanha(gerarSugestaoNomeAcao())}>
                      <Sparkles className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {sugestoesNomeAcao.slice(0, 5).map((nome, i) => (
                      <Badge 
                        key={i} 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary/20 text-xs"
                        onClick={() => setNomeCampanha(`Operação ${nome}`)}
                      >
                        {nome}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Etapa 2: Conceito e Big Idea (MOVIDO PARA LOGO APÓS NÚCLEO) */}
          {etapaAtual === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  2. Conceito e Big Idea
                </CardTitle>
                <CardDescription>Defina a ideia central e o conceito criativo da campanha</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Big Idea</Label>
                    <JornadaHeroi 
                      produtoNome={produtosMGS.find(p => p.id === produto)?.nome || segmentosAcelerai.find(s => s.id === segmentoAcelerai)?.nome || 'seu produto'}
                      onComplete={(resultado) => {
                        setBigIdea(resultado.bigIdea);
                        setDor(resultado.dor);
                        setTransformacao(resultado.transformacao);
                      }}
                    />
                  </div>
                  <Textarea 
                    value={bigIdea} 
                    onChange={(e) => setBigIdea(e.target.value)}
                    placeholder="Qual é a grande ideia que vai guiar toda a comunicação? O conceito central que diferencia esta campanha..."
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    A Big Idea deve ser memorável, diferenciadora e conectar emocionalmente com o público. Use o botão "Preciso de Ajuda" para construir usando a Jornada do Herói.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Dor do Cliente</Label>
                  <Textarea 
                    value={dor} 
                    onChange={(e) => setDor(e.target.value)}
                    placeholder="Qual é a principal dor que seu cliente sente? O problema que tira o sono dele..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Transformação Prometida</Label>
                  <Textarea 
                    value={transformacao} 
                    onChange={(e) => setTransformacao(e.target.value)}
                    placeholder="Como será a vida do cliente após a transformação? O que ele vai conquistar..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>ICP (Perfil do Cliente Ideal)</Label>
                  <Textarea 
                    value={icp} 
                    onChange={(e) => setIcp(e.target.value)}
                    placeholder="Descreva detalhadamente quem é o cliente ideal desta campanha..."
                    rows={3}
                  />
                </div>

                {/* Assistente IA para Conceito */}
                <AssistenteIAEtapa
                  etapa="conceito"
                  placeholder="Descreva o que você quer gerar. Ex: 'Crie uma Big Idea baseada no estilo do Alex Hormozi para um curso de marketing digital' ou cole referências de campanhas que você gostou..."
                  campos={[
                    { nome: "Produto", valor: produtosMGS.find(p => p.id === produto)?.nome || segmentosAcelerai.find(s => s.id === segmentoAcelerai)?.nome || "" },
                    { nome: "Big Idea atual", valor: bigIdea },
                    { nome: "Dor", valor: dor },
                  ]}
                  onAplicar={(resultado) => {
                    // Extrair partes do resultado
                    const bigIdeaMatch = resultado.match(/Big Idea[^:]*:[\s\n]*"?([^"\n]+)"?/i);
                    const dorMatch = resultado.match(/Dor[^:]*:[\s\n]*([^\n]+)/i);
                    const transformacaoMatch = resultado.match(/Transformação[^:]*:[\s\n]*([^\n]+)/i);
                    const icpMatch = resultado.match(/ICP[^:]*:[\s\n]*([^\n]+)/i);
                    
                    if (bigIdeaMatch) setBigIdea(bigIdeaMatch[1].trim());
                    if (dorMatch) setDor(dorMatch[1].trim());
                    if (transformacaoMatch) setTransformacao(transformacaoMatch[1].trim());
                    if (icpMatch) setIcp(icpMatch[1].trim());
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Etapa 3: Objetivo e Funil (COM FLUXO VISUAL E CAMPOS DE LINKS) */}
          {etapaAtual === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>3. Objetivo e Funil</CardTitle>
                <CardDescription>Defina o objetivo, tipo de funil e configure os links de cada etapa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-end mb-4">
                  <HyperCube 
                    modo="diagnostico"
                    onComplete={(resultado) => {
                      toast.success(`Diagnóstico: Dificuldade ${resultado.dificuldadeGeral}. ${resultado.aspectosCriticos.length} aspectos críticos.`);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Objetivo da Campanha</Label>
                  <div className="grid gap-2 md:grid-cols-3">
                    {objetivosCampanha.map(obj => {
                      const Icon = obj.icon;
                      return (
                        <Card 
                          key={obj.id}
                          className={`cursor-pointer transition-all ${objetivo === obj.id ? "border-primary bg-primary/10" : "hover:border-muted-foreground"}`}
                          onClick={() => setObjetivo(obj.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Icon className="h-4 w-4 text-primary" />
                              <p className="font-medium text-sm">{obj.nome}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{obj.descricao}</p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Funil</Label>
                  <Select value={tipoFunil} onValueChange={(v) => { setTipoFunil(v); setLinksFunil({}); }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de funil" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposFunil.map(f => (
                        <SelectItem key={f.id} value={f.id}>
                          <span className="font-medium">{f.nome}</span>
                          <span className="text-muted-foreground ml-2">- {f.descricao}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Fluxo Visual do Funil */}
                {funilAtual && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Fluxo do Funil - Configure os Links
                      </Label>
                      <div className="flex gap-2">
                        <Button
                          variant={funilCustomizado ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            if (!funilCustomizado) {
                              setEtapasCustomizadas([...funilAtual.etapas]);
                            }
                            setFunilCustomizado(!funilCustomizado);
                          }}
                        >
                          {funilCustomizado ? "Salvar Customização" : "Customizar Funil"}
                        </Button>
                        {funilCustomizado && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setFunilCustomizado(false);
                              setEtapasCustomizadas([]);
                            }}
                          >
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Representação Visual */}
                    <div className="p-4 rounded-lg bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 border border-zinc-700">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {(funilCustomizado ? etapasCustomizadas : funilAtual.etapas).map((etapa, i) => {
                          const Icon = etapaIcons[etapa.tipo] || Globe;
                          const temLink = !!linksFunil[etapa.campo];
                          return (
                            <div key={i} className="flex items-center gap-2">
                              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${temLink ? "border-green-500/50 bg-green-500/10" : "border-zinc-600 bg-zinc-800/50"} ${funilCustomizado ? "cursor-move" : ""}`}>
                                <Icon className={`h-4 w-4 ${temLink ? "text-green-400" : "text-muted-foreground"}`} />
                                <span className="text-sm font-medium">{etapa.nome}</span>
                                {temLink && <CheckCircle className="h-3 w-3 text-green-400" />}
                                {funilCustomizado && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-5 w-5 ml-1 hover:bg-red-500/20"
                                    onClick={() => {
                                      setEtapasCustomizadas(etapasCustomizadas.filter((_, idx) => idx !== i));
                                    }}
                                  >
                                    <Trash2 className="h-3 w-3 text-red-400" />
                                  </Button>
                                )}
                              </div>
                              {i < (funilCustomizado ? etapasCustomizadas : funilAtual.etapas).length - 1 && (
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                          );
                        })}
                        {funilCustomizado && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-dashed"
                            onClick={() => {
                              const novaEtapa = {
                                nome: `Nova Etapa ${etapasCustomizadas.length + 1}`,
                                tipo: "lp",
                                campo: `etapa${Date.now()}`
                              };
                              setEtapasCustomizadas([...etapasCustomizadas, novaEtapa]);
                            }}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Adicionar Etapa
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Edição de Etapas Customizadas */}
                    {funilCustomizado && (
                      <div className="p-4 rounded-lg bg-zinc-900/30 border border-zinc-700 space-y-4">
                        <Label className="text-sm font-medium">Editar Etapas do Funil</Label>
                        <div className="grid gap-3">
                          {etapasCustomizadas.map((etapa, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
                              <span className="text-xs text-muted-foreground w-6">{i + 1}.</span>
                              <Input
                                value={etapa.nome}
                                onChange={(e) => {
                                  const novas = [...etapasCustomizadas];
                                  novas[i] = { ...novas[i], nome: e.target.value };
                                  setEtapasCustomizadas(novas);
                                }}
                                placeholder="Nome da etapa"
                                className="flex-1"
                              />
                              <Select
                                value={etapa.tipo}
                                onValueChange={(v) => {
                                  const novas = [...etapasCustomizadas];
                                  novas[i] = { ...novas[i], tipo: v };
                                  setEtapasCustomizadas(novas);
                                }}
                              >
                                <SelectTrigger className="w-[150px]">
                                  <SelectValue placeholder="Tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="lp">Landing Page</SelectItem>
                                  <SelectItem value="video">Vídeo</SelectItem>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="evento">Evento/Live</SelectItem>
                                  <SelectItem value="checkout">Checkout</SelectItem>
                                  <SelectItem value="ad">Anúncio</SelectItem>
                                  <SelectItem value="form">Formulário</SelectItem>
                                  <SelectItem value="call">Call/Reunião</SelectItem>
                                  <SelectItem value="quiz">Quiz</SelectItem>
                                  <SelectItem value="post">Post/Conteúdo</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-red-500/20"
                                onClick={() => {
                                  setEtapasCustomizadas(etapasCustomizadas.filter((_, idx) => idx !== i));
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-400" />
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-dashed"
                          onClick={() => {
                            const novaEtapa = {
                              nome: `Nova Etapa ${etapasCustomizadas.length + 1}`,
                              tipo: "lp",
                              campo: `etapa${Date.now()}`
                            };
                            setEtapasCustomizadas([...etapasCustomizadas, novaEtapa]);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Adicionar Nova Etapa
                        </Button>
                      </div>
                    )}

                    {/* Campos de Links */}
                    <div className="grid gap-4 md:grid-cols-2">
                      {(funilCustomizado && etapasCustomizadas.length > 0 ? etapasCustomizadas : funilAtual.etapas).map((etapa, i) => {
                        const Icon = etapaIcons[etapa.tipo] || Globe;
                        return (
                          <div key={i} className="space-y-2">
                            <Label className="flex items-center gap-2 text-sm">
                              <Icon className="h-4 w-4" />
                              {etapa.nome}
                            </Label>
                            <div className="flex gap-2">
                              <div className="relative flex-1">
                                <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                  value={linksFunil[etapa.campo] || ""}
                                  onChange={(e) => atualizarLinkFunil(etapa.campo, e.target.value)}
                                  placeholder={`https://...`}
                                  className="pl-10"
                                />
                              </div>
                              {linksFunil[etapa.campo] && (
                                <a href={linksFunil[etapa.campo]} target="_blank" rel="noopener noreferrer">
                                  <Button variant="outline" size="icon">
                                    <Globe className="h-4 w-4" />
                                  </Button>
                                </a>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Etapa 4: Oferta e Entregáveis */}
          {etapaAtual === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>4. Oferta e Entregáveis</CardTitle>
                <CardDescription>Defina a oferta e o que será entregue</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Oferta</Label>
                  <Textarea 
                    value={oferta} 
                    onChange={(e) => setOferta(e.target.value)}
                    placeholder="Descreva a oferta completa: o que está incluído, bônus, garantias..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ticket Médio</Label>
                  <Input 
                    value={ticketMedio} 
                    onChange={(e) => setTicketMedio(e.target.value)}
                    placeholder="Ex: R$ 2.997"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Entregáveis</Label>
                  <Textarea 
                    value={entregaveis} 
                    onChange={(e) => setEntregaveis(e.target.value)}
                    placeholder="Liste todos os entregáveis: módulos, aulas, materiais, suporte..."
                    rows={4}
                  />
                </div>

                {/* Assistente IA para Oferta */}
                <AssistenteIAEtapa
                  etapa="oferta"
                  placeholder="Descreva o que você quer gerar. Ex: 'Crie uma oferta irresistível com stack de valor para um curso de R$2.997' ou 'Sugira bônus e garantias baseados no método Hormozi'..."
                  campos={[
                    { nome: "Produto", valor: produtosMGS.find(p => p.id === produto)?.nome || segmentosAcelerai.find(s => s.id === segmentoAcelerai)?.nome || "" },
                    { nome: "Big Idea", valor: bigIdea },
                    { nome: "Ticket", valor: ticketMedio },
                  ]}
                  onAplicar={(resultado) => {
                    // Extrair partes do resultado
                    const ofertaMatch = resultado.match(/Oferta[^:]*:[\s\n]*([^\n]+)/i);
                    const ticketMatch = resultado.match(/(?:Ticket|Preço)[^:]*:[\s\n]*R?\$?\s*([\d.,]+)/i);
                    const entregaveisMatch = resultado.match(/(?:Stack|Entregáveis|Valor)[^:]*:[\s\n]*((?:[^\n]+\n?)+)/i);
                    
                    if (resultado.includes("**Oferta Estruturada") || resultado.includes("Stack de Valor")) {
                      setOferta(resultado);
                    } else if (ofertaMatch) {
                      setOferta(ofertaMatch[1].trim());
                    }
                    if (ticketMatch) setTicketMedio(`R$ ${ticketMatch[1].trim()}`);
                    if (entregaveisMatch && !resultado.includes("**Oferta Estruturada")) {
                      setEntregaveis(entregaveisMatch[1].trim());
                    }
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Etapa 5: Manifesto */}
          {etapaAtual === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  5. Manifesto
                </CardTitle>
                <CardDescription>Crie o manifesto e defina o roteiro</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Checkbox 
                    id="temManifesto" 
                    checked={temManifesto}
                    onCheckedChange={(checked) => setTemManifesto(checked as boolean)}
                  />
                  <Label htmlFor="temManifesto">Esta campanha terá manifesto</Label>
                </div>

                {temManifesto && (
                  <>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>Tipo de Manifesto</Label>
                        <Select value={tipoManifesto} onValueChange={setTipoManifesto}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {tiposCriativo.map(t => (
                              <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Metodologia de Copy</Label>
                        <Select value={metodologiaManifesto} onValueChange={setMetodologiaManifesto}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {metodologiasCopy.map(m => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.nome} - {m.descricao}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Duração Estimada</Label>
                        <Input 
                          value={duracaoManifesto}
                          onChange={(e) => setDuracaoManifesto(e.target.value)}
                          placeholder="Ex: 2:30"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Manifesto (Texto)</Label>
                      <Textarea 
                        value={manifesto} 
                        onChange={(e) => setManifesto(e.target.value)}
                        placeholder="Escreva o manifesto da campanha - a declaração de propósito e valores..."
                        rows={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Roteiro do Manifesto (Vídeo)</Label>
                      <Textarea 
                        value={roteiroManifesto} 
                        onChange={(e) => setRoteiroManifesto(e.target.value)}
                        placeholder="Descreva o roteiro do vídeo de manifesto: cenas, falas, trilha sonora, cortes..."
                        rows={6}
                      />
                    </div>
                  </>
                )}

                <div className="flex items-center gap-4">
                  <Checkbox 
                    id="temTeasers" 
                    checked={temTeasers}
                    onCheckedChange={(checked) => setTemTeasers(checked as boolean)}
                  />
                  <Label htmlFor="temTeasers">Criar teasers de pré-lançamento</Label>
                </div>

                {temTeasers && (
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Os teasers serão configurados na etapa de vídeos com os mesmos campos detalhados.
                    </p>
                  </div>
                )}

                {/* Assistente IA para Manifesto */}
                <AssistenteIAEtapa
                  etapa="manifesto"
                  placeholder="Descreva o que você quer gerar. Ex: 'Escreva um manifesto inspirador sobre transformação de negócios' ou 'Crie um roteiro de vídeo manifesto de 2 minutos no estilo Apple'..."
                  campos={[
                    { nome: "Big Idea", valor: bigIdea },
                    { nome: "Transformação", valor: transformacao },
                    { nome: "Dor", valor: dor },
                  ]}
                  onAplicar={(resultado) => {
                    if (resultado.includes("[ABERTURA") || resultado.includes("Roteiro")) {
                      setRoteiroManifesto(resultado);
                    } else {
                      setManifesto(resultado);
                    }
                    if (!temManifesto) setTemManifesto(true);
                  }}
                />
              </CardContent>
            </Card>
          )}

          {/* Etapa 6: Criativos em Vídeo */}
          {etapaAtual === 6 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5" />
                      6. Criativos em Vídeo
                    </CardTitle>
                    <CardDescription>Configure cada criativo em vídeo detalhadamente</CardDescription>
                  </div>
                  <Button onClick={adicionarCriativoVideo}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Vídeo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="space-y-4">
                  {criativosVideo.map((criativo, index) => (
                    <AccordionItem key={criativo.id} value={criativo.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">Vídeo {index + 1}</Badge>
                          {criativo.tipo && (
                            <Badge variant="secondary">
                              {tiposCriativo.find(t => t.id === criativo.tipo)?.nome}
                            </Badge>
                          )}
                          {criativo.metodologia && (
                            <Badge variant="outline" className="text-xs">
                              {metodologiasCopy.find(m => m.id === criativo.metodologia)?.nome}
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Tipo de Criativo</Label>
                            <Select 
                              value={criativo.tipo} 
                              onValueChange={(v) => atualizarCriativoVideo(criativo.id, "tipo", v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                              <SelectContent>
                                {tiposCriativo.map(t => {
                                  const Icon = t.icon;
                                  return (
                                    <SelectItem key={t.id} value={t.id}>
                                      <div className="flex items-center gap-2">
                                        <Icon className="h-4 w-4" />
                                        {t.nome}
                                      </div>
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Metodologia de Copy</Label>
                            <Select 
                              value={criativo.metodologia} 
                              onValueChange={(v) => atualizarCriativoVideo(criativo.id, "metodologia", v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a metodologia" />
                              </SelectTrigger>
                              <SelectContent>
                                {metodologiasCopy.map(m => (
                                  <SelectItem key={m.id} value={m.id}>
                                    {m.nome} - {m.descricao}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Duração</Label>
                            <Input 
                              value={criativo.duracao || ""}
                              onChange={(e) => atualizarCriativoVideo(criativo.id, "duracao", e.target.value)}
                              placeholder="Ex: 0:30, 1:00, 2:30"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Hook (Gancho Inicial)</Label>
                            <Input 
                              value={criativo.hook || ""}
                              onChange={(e) => atualizarCriativoVideo(criativo.id, "hook", e.target.value)}
                              placeholder="Frase de abertura que prende atenção"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Descrição/Roteiro</Label>
                          <Textarea 
                            value={criativo.descricao}
                            onChange={(e) => atualizarCriativoVideo(criativo.id, "descricao", e.target.value)}
                            placeholder="Descreva o roteiro, cenas, falas principais..."
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>CTA (Chamada para Ação)</Label>
                          <Input 
                            value={criativo.cta || ""}
                            onChange={(e) => atualizarCriativoVideo(criativo.id, "cta", e.target.value)}
                            placeholder="Ex: Clique no link da bio, Inscreva-se agora"
                          />
                        </div>

                        {criativosVideo.length > 1 && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => removerCriativoVideo(criativo.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remover
                          </Button>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Assistente IA para Criativos em Vídeo */}
                <div className="mt-6">
                  <AssistenteIAEtapa
                    etapa="criativos"
                    placeholder="Descreva o que você quer gerar. Ex: 'Sugira 5 hooks para anúncios em vídeo' ou 'Crie variações de roteiro para diferentes públicos' ou 'Gere ideias de criativos baseados em prova social'..."
                    campos={[
                      { nome: "Big Idea", valor: bigIdea },
                      { nome: "Dor", valor: dor },
                      { nome: "Oferta", valor: oferta },
                    ]}
                    onAplicar={(resultado) => {
                      // Extrair hooks do resultado
                      const hookMatches = resultado.match(/\d+\.\s*\*\*[^*]+\*\*[:\s]*"?([^"\n]+)"?/g);
                      if (hookMatches && hookMatches.length > 0) {
                        // Atualizar o primeiro criativo com o primeiro hook
                        const primeiroHook = hookMatches[0].replace(/\d+\.\s*\*\*[^*]+\*\*[:\s]*"?/, "").replace(/"?$/, "");
                        if (criativosVideo.length > 0) {
                          atualizarCriativoVideo(criativosVideo[0].id, "hook", primeiroHook);
                        }
                      }
                      toast.info("Sugestões geradas! Copie os hooks desejados para os campos acima.");
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Etapa 7: Criativos Estáticos */}
          {etapaAtual === 7 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="h-5 w-5" />
                      7. Criativos Estáticos
                    </CardTitle>
                    <CardDescription>Configure cada criativo estático detalhadamente</CardDescription>
                  </div>
                  <Button onClick={adicionarCriativoEstatico}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Estático
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="multiple" className="space-y-4">
                  {criativosEstaticos.map((criativo, index) => (
                    <AccordionItem key={criativo.id} value={criativo.id} className="border rounded-lg px-4">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-4">
                          <Badge variant="outline">Estático {index + 1}</Badge>
                          {criativo.formato && (
                            <Badge variant="secondary">{criativo.formato}</Badge>
                          )}
                          {criativo.metodologia && (
                            <Badge variant="outline" className="text-xs">
                              {metodologiasCopy.find(m => m.id === criativo.metodologia)?.nome}
                            </Badge>
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <Label>Formato</Label>
                            <Select 
                              value={criativo.formato || ""} 
                              onValueChange={(v) => atualizarCriativoEstatico(criativo.id, "formato", v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o formato" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="feed-1x1">Feed 1:1 (1080x1080)</SelectItem>
                                <SelectItem value="feed-4x5">Feed 4:5 (1080x1350)</SelectItem>
                                <SelectItem value="stories">Stories 9:16 (1080x1920)</SelectItem>
                                <SelectItem value="carrossel">Carrossel</SelectItem>
                                <SelectItem value="banner">Banner</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Metodologia de Copy</Label>
                            <Select 
                              value={criativo.metodologia} 
                              onValueChange={(v) => atualizarCriativoEstatico(criativo.id, "metodologia", v)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione a metodologia" />
                              </SelectTrigger>
                              <SelectContent>
                                {metodologiasCopy.map(m => (
                                  <SelectItem key={m.id} value={m.id}>
                                    {m.nome} - {m.descricao}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Hook (Headline Principal)</Label>
                          <Input 
                            value={criativo.hook || ""}
                            onChange={(e) => atualizarCriativoEstatico(criativo.id, "hook", e.target.value)}
                            placeholder="Frase principal que chama atenção"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Descrição/Conceito Visual</Label>
                          <Textarea 
                            value={criativo.descricao}
                            onChange={(e) => atualizarCriativoEstatico(criativo.id, "descricao", e.target.value)}
                            placeholder="Descreva o conceito visual, elementos, cores..."
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>CTA (Chamada para Ação)</Label>
                          <Input 
                            value={criativo.cta || ""}
                            onChange={(e) => atualizarCriativoEstatico(criativo.id, "cta", e.target.value)}
                            placeholder="Ex: Saiba mais, Inscreva-se, Garanta sua vaga"
                          />
                        </div>

                        {criativosEstaticos.length > 1 && (
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => removerCriativoEstatico(criativo.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remover
                          </Button>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Assistente IA para Criativos Estáticos */}
                <div className="mt-6">
                  <AssistenteIAEtapa
                    etapa="criativos"
                    placeholder="Descreva o que você quer gerar. Ex: 'Sugira headlines para carrossel' ou 'Crie variações de copy para stories' ou 'Gere ideias de estáticos para remarketing'..."
                    campos={[
                      { nome: "Big Idea", valor: bigIdea },
                      { nome: "Dor", valor: dor },
                      { nome: "Oferta", valor: oferta },
                    ]}
                    onAplicar={(resultado) => {
                      toast.info("Sugestões geradas! Copie os textos desejados para os campos acima.");
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Etapa 8: Assistente IA para Criativos */}
          {etapaAtual === 8 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500" />
                  8. Assistente IA para Criativos
                </CardTitle>
                <CardDescription>
                  Use IA para gerar variações de estáticos, analisar vídeos para cortes e criar documento orientador
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CriativosIASection
                  nucleo={nucleo.toLowerCase()}
                  produto={produtosMGS.find(p => p.id === produto)?.nome || segmentosAcelerai.find(s => s.id === segmentoAcelerai)?.nome || ''}
                  bigIdea={bigIdea}
                  dor={dor}
                  transformacao={transformacao}
                  icp={icp}
                  objetivo={objetivosCampanha.find(o => o.id === objetivo)?.nome || ''}
                  tipoFunil={tiposFunil.find(f => f.id === tipoFunil)?.nome || ''}
                />
              </CardContent>
            </Card>
          )}

          {/* Navegação */}
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              onClick={etapaAnterior}
              disabled={etapaAtual === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            <Button 
              onClick={proximaEtapa}
              disabled={etapaAtual === totalEtapas}
            >
              Próximo
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Painel Lateral - Análise IA */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Análise da Campanha
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notaCampanha !== null ? (
                <>
                  <div className="text-center">
                    <div className={`text-5xl font-bold ${notaCampanha >= 80 ? "text-green-500" : notaCampanha >= 60 ? "text-yellow-500" : "text-red-500"}`}>
                      {notaCampanha}
                    </div>
                    <p className="text-sm text-muted-foreground">Nota da Campanha</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Feedback:</p>
                    {feedbackIA.map((fb, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm">
                        {fb.includes("bem estruturada") || fb.includes("Recomendamos") ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                        )}
                        <span className="text-muted-foreground">{fb}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Clique em "Analisar com IA" para receber feedback sobre sua campanha
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Resumo da Campanha */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Resumo da Campanha</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Núcleo:</span>
                <Badge variant={nucleo === "MGS" ? "destructive" : nucleo === "ACELERAI" ? "default" : "outline"}>
                  {nucleo || "Não definido"}
                </Badge>
              </div>
              {nucleo === "MGS" && produto && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Produto:</span>
                  <span>{produtosMGS.find(p => p.id === produto)?.nome}</span>
                </div>
              )}
              {nucleo === "ACELERAI" && segmentoAcelerai && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Segmento:</span>
                  <span>{segmentosAcelerai.find(s => s.id === segmentoAcelerai)?.nome}</span>
                </div>
              )}
              {nomeCampanha && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Campanha:</span>
                  <span className="font-medium">{nomeCampanha}</span>
                </div>
              )}
              {objetivo && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Objetivo:</span>
                  <span>{objetivosCampanha.find(o => o.id === objetivo)?.nome}</span>
                </div>
              )}
              {tipoFunil && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funil:</span>
                  <span>{tiposFunil.find(f => f.id === tipoFunil)?.nome}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vídeos:</span>
                <span>{criativosVideo.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estáticos:</span>
                <span>{criativosEstaticos.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Manifesto:</span>
                <span>{temManifesto ? "Sim" : "Não"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
