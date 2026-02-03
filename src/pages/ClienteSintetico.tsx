import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  User,
  Target,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  MessageSquare,
  Zap,
  Brain,
  ArrowRight,
  Sparkles,
  BookOpen,
  Tv,
  Music,
  Globe,
  ShoppingBag,
  Clock,
  DollarSign,
  Heart,
  Coffee,
  Plane,
  Car,
  Home,
  Smartphone,
  Plus,
  Send,
  Bot,
  Loader2,
  Save,
  Download,
  RefreshCw,
} from "lucide-react";
import { todosMQLs, todosICPs, type ICP, type MQL } from "@/data/icpData";
import { gerarCincoClientesSinteticos, gerarClientesPorSegmento, segmentosParaFiltro, type PerfilClienteReal } from "@/data/clientesReaisData";
import HyperCube from "@/components/HyperCube";

// ICPs pré-definidos da MGS
const icpsPredefinidos = [
  {
    id: "icp-empresario-economia-real",
    nome: "Empresário de Economia Real",
    avatar: "👔",
    faturamento: "R$ 1M - 10M/ano",
    idade: "35-55 anos",
    cargo: "CEO/Fundador",
    setor: "Varejo, Serviços, Indústria",
    doresPrincipais: [
      "Crescimento estagnado há 2+ anos",
      "Dependência total do dono",
      "Equipe desalinhada com objetivos",
      "Falta de processos escaláveis",
    ],
    desejos: [
      "Escalar sem perder qualidade de vida",
      "Ter uma equipe que funcione sem ele",
      "Previsibilidade de faturamento",
      "Reconhecimento como líder do setor",
    ],
    objecoes: [
      "Não tenho tempo para mais uma coisa",
      "Já fiz vários cursos e não funcionou",
      "Meu negócio é diferente",
      "Preciso ver resultados antes de investir",
    ],
    gatilhos: ["ROI comprovado", "Cases do mesmo setor", "Networking exclusivo"],
    consumoMedia: {
      podcasts: ["Os Sócios", "Primocast", "Jota Jota Podcast"],
      youtube: ["Primo Rico", "InfoMoney", "BTG Pactual"],
      livros: ["O Investidor Inteligente", "De Zero a Um"],
    },
    ticketMedio: "R$ 15.000 - R$ 50.000",
    cicloDecisao: "30-90 dias",
  },
  {
    id: "icp-profissional-liberal",
    nome: "Profissional Liberal em Transição",
    avatar: "⚖️",
    faturamento: "R$ 15K - 50K/mês",
    idade: "30-45 anos",
    cargo: "Advogado/Médico/Arquiteto",
    setor: "Serviços Profissionais",
    doresPrincipais: [
      "Renda limitada pelo tempo disponível",
      "Dependência de indicações",
      "Sem posicionamento claro no mercado",
      "Dificuldade em cobrar mais caro",
    ],
    desejos: [
      "Construir autoridade no segmento",
      "Atrair clientes de alto valor",
      "Ter agenda cheia com clientes ideais",
      "Escalar através de produtos digitais",
    ],
    objecoes: [
      "Não sei vender",
      "Marketing parece antiético",
      "Não tenho tempo para criar conteúdo",
      "Meus colegas vão me criticar",
    ],
    gatilhos: ["Autoridade", "Exclusividade", "Resultados de pares"],
    consumoMedia: {
      podcasts: ["Café com ADM", "Papo de Vendedor"],
      youtube: ["Conrado Adolpho", "Erico Rocha"],
      livros: ["Expert Secrets", "Marketing de Permissão"],
    },
    ticketMedio: "R$ 5.000 - R$ 20.000",
    cicloDecisao: "15-45 dias",
  },
  {
    id: "icp-empreendedor-digital",
    nome: "Empreendedor Digital",
    avatar: "💻",
    faturamento: "R$ 100K - 1M/ano",
    idade: "25-40 anos",
    cargo: "Infoprodutor/Expert",
    setor: "Educação Digital",
    doresPrincipais: [
      "Platô de crescimento",
      "Dependência de lançamentos",
      "Equipe pequena e sobrecarregada",
      "Dificuldade em escalar tráfego",
    ],
    desejos: [
      "Faturar 7 dígitos consistentemente",
      "Ter operação que funcione sem ele",
      "Diversificar fontes de receita",
      "Ser referência no nicho",
    ],
    objecoes: [
      "Já sei fazer lançamento",
      "Meu nicho é diferente",
      "Não preciso de mentoria",
      "Consigo resolver sozinho",
    ],
    gatilhos: ["Networking com players maiores", "Estratégias avançadas", "Acesso a bastidores"],
    consumoMedia: {
      podcasts: ["Podcast do Erico", "Marketing de Conteúdo"],
      youtube: ["Erico Rocha", "Leandro Ladeira", "Mairo Vergara"],
      livros: ["Launch", "DotCom Secrets", "Traffic Secrets"],
    },
    ticketMedio: "R$ 10.000 - R$ 100.000",
    cicloDecisao: "7-30 dias",
  },
];

// Componente de Chat com Cliente Sintético
function ChatClienteSintetico({ 
  icp, 
  oferta,
  onSaveConversa
}: { 
  icp: typeof icpsPredefinidos[0]; 
  oferta: string;
  onSaveConversa?: (conversa: {
    icpNome: string;
    icpSegmento: string;
    oferta: string;
    mensagens: Array<{ role: string; content: string }>;
    resultado?: 'positivo' | 'negativo' | 'neutro';
  }) => void;
}) {
  const [messages, setMessages] = useState<{ role: "user" | "cliente"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Gerar resposta do cliente sintético baseado no ICP
  const gerarRespostaCliente = (mensagem: string): string => {
    const msgLower = mensagem.toLowerCase();
    
    // Respostas baseadas nas objeções do ICP
    if (msgLower.includes("preço") || msgLower.includes("valor") || msgLower.includes("investimento")) {
      const objecao = icp.objecoes[Math.floor(Math.random() * icp.objecoes.length)];
      return `Hmm, interessante... Mas ${objecao.toLowerCase()}. Quanto exatamente estamos falando aqui? E o que garante que vai funcionar no meu caso específico?`;
    }
    
    if (msgLower.includes("resultado") || msgLower.includes("case") || msgLower.includes("prova")) {
      return `Tá, entendi os resultados que você mostrou. Mas ${icp.doresPrincipais[0].toLowerCase()}. Como vocês lidam com isso especificamente? Tem alguém do meu setor (${icp.setor}) que passou por isso?`;
    }
    
    if (msgLower.includes("tempo") || msgLower.includes("dedicação") || msgLower.includes("horas")) {
      return `Esse é justamente meu problema... ${icp.doresPrincipais[1].toLowerCase()}. Quantas horas por semana realmente preciso dedicar? Porque minha agenda já está lotada.`;
    }
    
    if (msgLower.includes("garantia") || msgLower.includes("risco")) {
      return `Olha, já investi em outras coisas antes e não tive o retorno esperado. ${icp.objecoes[1]}. O que vocês oferecem de diferente? Tem alguma garantia?`;
    }
    
    if (msgLower.includes("diferente") || msgLower.includes("único") || msgLower.includes("especial")) {
      return `Interessante... Mas o que me garante que isso funciona para ${icp.setor.toLowerCase()}? ${icp.objecoes[2]}. Vocês já trabalharam com alguém na minha situação?`;
    }
    
    // Resposta padrão baseada nas dores
    const dor = icp.doresPrincipais[Math.floor(Math.random() * icp.doresPrincipais.length)];
    const desejo = icp.desejos[Math.floor(Math.random() * icp.desejos.length)];
    
    return `Entendi o que você está dizendo. Minha maior dor hoje é: ${dor.toLowerCase()}. O que eu realmente quero é ${desejo.toLowerCase()}. Como exatamente vocês me ajudam com isso?`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

    const resposta = gerarRespostaCliente(input);
    setMessages(prev => [...prev, { role: "cliente", content: resposta }]);
    setIsLoading(false);
  };

  const iniciarConversa = () => {
    const abertura = `Olá! Vi algo sobre ${oferta || "seu produto"}. Sou ${icp.cargo} no setor de ${icp.setor}, faturando cerca de ${icp.faturamento}. ${icp.doresPrincipais[0]}. Me conta mais sobre como vocês podem ajudar?`;
    setMessages([{ role: "cliente", content: abertura }]);
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-3 border-b border-zinc-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-2xl">
              {icp.avatar}
            </div>
            <div>
              <CardTitle className="text-lg">{icp.nome}</CardTitle>
              <CardDescription>{icp.cargo} • {icp.setor}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
            Online
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center space-y-4">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground" />
              <div>
                <p className="font-medium">Teste sua oferta com o cliente sintético</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Simule uma conversa de vendas e veja como o ICP reagiria
                </p>
              </div>
              <Button onClick={iniciarConversa}>
                <Zap className="h-4 w-4 mr-2" />
                Iniciar Conversa
              </Button>
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-zinc-800"
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 rounded-lg p-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t border-zinc-800">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Digite sua mensagem de vendas..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
                {messages.length > 0 && onSaveConversa && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => onSaveConversa({
                      icpNome: icp.nome,
                      icpSegmento: icp.setor,
                      oferta: oferta,
                      mensagens: messages.map(m => ({ role: m.role, content: m.content })),
                    })}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                )}
              </form>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

// Componente Construtor de ICP
function ConstrutorICP({ onSave }: { onSave: (icp: typeof icpsPredefinidos[0]) => void }) {
  const [novoICP, setNovoICP] = useState({
    nome: "",
    avatar: "👤",
    faturamento: "",
    idade: "",
    cargo: "",
    setor: "",
    doresPrincipais: ["", "", "", ""],
    desejos: ["", "", "", ""],
    objecoes: ["", "", "", ""],
    gatilhos: ["", "", ""],
    ticketMedio: "",
    cicloDecisao: "",
  });

  const avatares = ["👔", "⚖️", "💻", "🏥", "🎨", "📊", "🏭", "🛒", "🎓", "💼"];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nome do ICP</Label>
          <Input
            value={novoICP.nome}
            onChange={(e) => setNovoICP({ ...novoICP, nome: e.target.value })}
            placeholder="Ex: Empresário de Varejo"
          />
        </div>
        <div className="space-y-2">
          <Label>Avatar</Label>
          <div className="flex gap-2 flex-wrap">
            {avatares.map((av) => (
              <Button
                key={av}
                variant={novoICP.avatar === av ? "default" : "outline"}
                size="sm"
                onClick={() => setNovoICP({ ...novoICP, avatar: av })}
              >
                {av}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Faturamento</Label>
          <Input
            value={novoICP.faturamento}
            onChange={(e) => setNovoICP({ ...novoICP, faturamento: e.target.value })}
            placeholder="R$ 1M - 10M/ano"
          />
        </div>
        <div className="space-y-2">
          <Label>Idade</Label>
          <Input
            value={novoICP.idade}
            onChange={(e) => setNovoICP({ ...novoICP, idade: e.target.value })}
            placeholder="35-55 anos"
          />
        </div>
        <div className="space-y-2">
          <Label>Cargo</Label>
          <Input
            value={novoICP.cargo}
            onChange={(e) => setNovoICP({ ...novoICP, cargo: e.target.value })}
            placeholder="CEO/Fundador"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Setor</Label>
          <Input
            value={novoICP.setor}
            onChange={(e) => setNovoICP({ ...novoICP, setor: e.target.value })}
            placeholder="Varejo, Serviços"
          />
        </div>
        <div className="space-y-2">
          <Label>Ticket Médio</Label>
          <Input
            value={novoICP.ticketMedio}
            onChange={(e) => setNovoICP({ ...novoICP, ticketMedio: e.target.value })}
            placeholder="R$ 15.000 - R$ 50.000"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Dores Principais (4)</Label>
        <div className="grid grid-cols-2 gap-2">
          {novoICP.doresPrincipais.map((dor, idx) => (
            <Input
              key={idx}
              value={dor}
              onChange={(e) => {
                const newDores = [...novoICP.doresPrincipais];
                newDores[idx] = e.target.value;
                setNovoICP({ ...novoICP, doresPrincipais: newDores });
              }}
              placeholder={`Dor ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Desejos (4)</Label>
        <div className="grid grid-cols-2 gap-2">
          {novoICP.desejos.map((desejo, idx) => (
            <Input
              key={idx}
              value={desejo}
              onChange={(e) => {
                const newDesejos = [...novoICP.desejos];
                newDesejos[idx] = e.target.value;
                setNovoICP({ ...novoICP, desejos: newDesejos });
              }}
              placeholder={`Desejo ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Objeções Comuns (4)</Label>
        <div className="grid grid-cols-2 gap-2">
          {novoICP.objecoes.map((objecao, idx) => (
            <Input
              key={idx}
              value={objecao}
              onChange={(e) => {
                const newObjecoes = [...novoICP.objecoes];
                newObjecoes[idx] = e.target.value;
                setNovoICP({ ...novoICP, objecoes: newObjecoes });
              }}
              placeholder={`Objeção ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <Button 
        className="w-full" 
        onClick={() => {
          if (novoICP.nome && novoICP.cargo) {
            onSave({
              id: `icp-custom-${Date.now()}`,
              ...novoICP,
              consumoMedia: { podcasts: [], youtube: [], livros: [] },
              cicloDecisao: novoICP.cicloDecisao || "30 dias",
            });
          }
        }}
        disabled={!novoICP.nome || !novoICP.cargo}
      >
        <Save className="h-4 w-4 mr-2" />
        Salvar ICP Personalizado
      </Button>
    </div>
  );
}

// Componente de Análise de Oferta
function AnaliseOferta({ 
  oferta, 
  icp 
}: { 
  oferta: string; 
  icp: typeof icpsPredefinidos[0];
}) {
  const [analise, setAnalise] = useState<{
    nota: number;
    pontosFavoraveis: string[];
    pontosAtencao: string[];
    sugestoes: string[];
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analisarOferta = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Análise simulada baseada no ICP
    const nota = Math.floor(Math.random() * 3) + 6; // 6-8
    
    setAnalise({
      nota,
      pontosFavoraveis: [
        `Alinhamento com a dor: "${icp.doresPrincipais[0]}"`,
        `Potencial de conversão para ticket de ${icp.ticketMedio}`,
        "Linguagem adequada ao perfil do ICP",
      ],
      pontosAtencao: [
        `Considerar objeção comum: "${icp.objecoes[0]}"`,
        "Adicionar mais prova social do setor específico",
        "Fortalecer a urgência da oferta",
      ],
      sugestoes: [
        `Incluir case de sucesso de ${icp.setor}`,
        `Destacar ROI para justificar ticket de ${icp.ticketMedio}`,
        `Usar gatilho: ${icp.gatilhos[0]}`,
        "Adicionar garantia para reduzir percepção de risco",
      ],
    });
    setIsAnalyzing(false);
  };

  if (!oferta) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Digite sua oferta no campo acima para receber uma análise</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Análise da Oferta</CardTitle>
          <Button onClick={analisarOferta} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Brain className="h-4 w-4 mr-2" />
            )}
            {isAnalyzing ? "Analisando..." : "Analisar"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {analise ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className={`text-4xl font-bold ${
                analise.nota >= 8 ? "text-green-400" : 
                analise.nota >= 6 ? "text-yellow-400" : "text-red-400"
              }`}>
                {analise.nota}/10
              </div>
              <div className="flex-1">
                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      analise.nota >= 8 ? "bg-green-500" : 
                      analise.nota >= 6 ? "bg-yellow-500" : "bg-red-500"
                    }`}
                    style={{ width: `${analise.nota * 10}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2 text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  Pontos Favoráveis
                </h4>
                <ul className="text-sm space-y-1">
                  {analise.pontosFavoraveis.map((p, i) => (
                    <li key={i} className="text-muted-foreground">• {p}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2 text-yellow-400">
                  <AlertTriangle className="h-4 w-4" />
                  Pontos de Atenção
                </h4>
                <ul className="text-sm space-y-1">
                  {analise.pontosAtencao.map((p, i) => (
                    <li key={i} className="text-muted-foreground">• {p}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-800">
              <h4 className="font-medium flex items-center gap-2 text-primary">
                <Lightbulb className="h-4 w-4" />
                Sugestões de Melhoria
              </h4>
              <ul className="text-sm space-y-1">
                {analise.sugestoes.map((s, i) => (
                  <li key={i} className="text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Clique em "Analisar" para receber feedback sobre sua oferta</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ClienteSintetico() {
  const [icpSelecionado, setIcpSelecionado] = useState(icpsPredefinidos[0]);
  const [icpsCustomizados, setIcpsCustomizados] = useState<typeof icpsPredefinidos>([]);
  const [oferta, setOferta] = useState("");
  const [showConstrutor, setShowConstrutor] = useState(false);
  const [clientesGerados, setClientesGerados] = useState<ReturnType<typeof gerarCincoClientesSinteticos>>([]);
  const [showClientesGerados, setShowClientesGerados] = useState(false);
  const [gerandoClientes, setGerandoClientes] = useState(false);
  const [segmentoFiltro, setSegmentoFiltro] = useState("Todos");
  const [showHistorico, setShowHistorico] = useState(false);

  // Buscar histórico de conversas do backend
  const { data: historicoConversas = [], refetch: refetchHistorico } = trpc.conversas.list.useQuery(
    { limit: 50 },
    { 
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  // Mutation para salvar conversa
  const salvarConversaMutation = trpc.conversas.create.useMutation({
    onSuccess: () => {
      toast.success("Conversa salva no histórico!");
      refetchHistorico();
    },
    onError: (error) => {
      console.error("Erro ao salvar conversa:", error);
      toast.error("Erro ao salvar conversa. Faça login para salvar.");
    },
  });

  const handleGerarClientes = async () => {
    setGerandoClientes(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const novosClientes = gerarClientesPorSegmento(segmentoFiltro, 5);
    setClientesGerados(novosClientes);
    setShowClientesGerados(true);
    setGerandoClientes(false);
  };

  const converterParaICP = (cliente: ReturnType<typeof gerarCincoClientesSinteticos>[0]) => {
    const novoICP = {
      id: `icp-gerado-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      nome: cliente.nome,
      avatar: cliente.genero === 'M' ? '👔' : '👩‍💼',
      faturamento: cliente.perfil.investimento || 'Não informado',
      idade: `${cliente.idade} anos`,
      cargo: cliente.perfil.cargo,
      setor: cliente.perfil.segmento,
      doresPrincipais: cliente.dores,
      desejos: [cliente.perfil.objetivo, cliente.perfil.prioridade, 'Crescer o negócio', 'Ter mais previsibilidade'],
      objecoes: cliente.objecoes,
      gatilhos: ['Resultados comprovados', 'Cases de sucesso', 'Garantia de resultado'],
      consumoMedia: {
        podcasts: ['Podcasts de negócios'],
        youtube: ['Canais de marketing'],
        livros: ['Livros de vendas'],
      },
      ticketMedio: cliente.perfil.investimento || 'R$ 1.000 - R$ 5.000',
      cicloDecisao: '7-14 dias',
    };
    setIcpsCustomizados([...icpsCustomizados, novoICP]);
    setIcpSelecionado(novoICP);
    setShowClientesGerados(false);
  };

  const todosICPs = [...icpsPredefinidos, ...icpsCustomizados];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Cliente Sintético
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Teste suas ofertas com ICPs simulados baseados em dados reais
          </p>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {/* Filtro por Segmento */}
          <Select value={segmentoFiltro} onValueChange={setSegmentoFiltro}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar segmento" />
            </SelectTrigger>
            <SelectContent>
              {segmentosParaFiltro.map((seg) => (
                <SelectItem key={seg} value={seg}>{seg}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={handleGerarClientes}
            disabled={gerandoClientes}
          >
            {gerandoClientes ? (
              <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Gerando...</>
            ) : (
              <><RefreshCw className="h-4 w-4 mr-2" />Gerar 5 Clientes {segmentoFiltro !== 'Todos' ? `de ${segmentoFiltro}` : 'Aleatórios'}</>
            )}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setShowHistorico(true)}
          >
            <Clock className="h-4 w-4 mr-2" />
            Histórico ({historicoConversas.length})
          </Button>
          <HyperCube 
            modo="selecao"
            onSelectAspecto={(aspecto) => {
              // Atualizar abordagem do chat com base no aspecto selecionado
              console.log('Aspecto selecionado:', aspecto);
            }}
          />
          <Dialog open={showConstrutor} onOpenChange={setShowConstrutor}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar ICP Personalizado
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Construtor de ICP</DialogTitle>
              <DialogDescription>
                Crie um perfil de cliente ideal personalizado para testar suas ofertas
              </DialogDescription>
            </DialogHeader>
            <ConstrutorICP 
              onSave={(novoICP) => {
                setIcpsCustomizados([...icpsCustomizados, novoICP]);
                setShowConstrutor(false);
              }} 
            />
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Modal de Clientes Gerados Aleatoriamente */}
      <Dialog open={showClientesGerados} onOpenChange={setShowClientesGerados}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              5 Clientes Sintéticos Gerados
            </DialogTitle>
            <DialogDescription>
              Clientes gerados com base em dados reais de pesquisas do Aceleraí e Janeiro de Vantagens. Clique em um para usá-lo como ICP.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            {clientesGerados.map((cliente, idx) => (
              <Card 
                key={idx} 
                className="cursor-pointer hover:border-orange-500/50 transition-colors"
                onClick={() => converterParaICP(cliente)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-xl">
                      {cliente.genero === 'M' ? '👔' : '👩‍💼'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{cliente.nome}</h3>
                        <Badge variant="outline">{cliente.idade} anos</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {cliente.perfil.cargo} • {cliente.perfil.segmento} • {cliente.perfil.cidade}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-xs font-medium text-orange-400">Momento:</p>
                          <p className="text-xs text-muted-foreground">{cliente.perfil.momento}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-orange-400">Objetivo:</p>
                          <p className="text-xs text-muted-foreground">{cliente.perfil.objetivo}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs font-medium text-red-400">Dores:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cliente.dores.map((dor, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{dor.substring(0, 40)}...</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={handleGerarClientes} disabled={gerandoClientes}>
              {gerandoClientes ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Gerando...</>
              ) : (
                <><RefreshCw className="h-4 w-4 mr-2" />Gerar Novos</>
              )}
            </Button>
            <Button variant="ghost" onClick={() => setShowClientesGerados(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Seletor de ICP */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selecione o ICP para Teste</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {todosICPs.map((icp) => (
              <Button
                key={icp.id}
                variant={icpSelecionado.id === icp.id ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-start gap-2 ${
                  icpSelecionado.id === icp.id ? "" : "hover:bg-zinc-800/50"
                }`}
                onClick={() => setIcpSelecionado(icp)}
              >
                <span className="text-2xl">{icp.avatar}</span>
                <span className="text-sm font-medium text-left">{icp.nome}</span>
                <span className="text-xs text-muted-foreground">{icp.faturamento}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detalhes do ICP Selecionado */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-3xl">
                {icpSelecionado.avatar}
              </div>
              <div>
                <CardTitle>{icpSelecionado.nome}</CardTitle>
                <CardDescription>{icpSelecionado.cargo} • {icpSelecionado.setor}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Faturamento:</span>
                <p className="font-medium">{icpSelecionado.faturamento}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Idade:</span>
                <p className="font-medium">{icpSelecionado.idade}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Ticket Médio:</span>
                <p className="font-medium">{icpSelecionado.ticketMedio}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Ciclo de Decisão:</span>
                <p className="font-medium">{icpSelecionado.cicloDecisao}</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-red-400">Dores Principais</h4>
              <ul className="text-sm space-y-1">
                {icpSelecionado.doresPrincipais.map((dor, i) => (
                  <li key={i} className="text-muted-foreground">• {dor}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-green-400">Desejos</h4>
              <ul className="text-sm space-y-1">
                {icpSelecionado.desejos.map((desejo, i) => (
                  <li key={i} className="text-muted-foreground">• {desejo}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-yellow-400">Objeções Comuns</h4>
              <ul className="text-sm space-y-1">
                {icpSelecionado.objecoes.map((obj, i) => (
                  <li key={i} className="text-muted-foreground">• {obj}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-primary">Gatilhos de Compra</h4>
              <div className="flex flex-wrap gap-2">
                {icpSelecionado.gatilhos.map((gatilho, i) => (
                  <Badge key={i} variant="outline">{gatilho}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chat com Cliente Sintético */}
        <ChatClienteSintetico 
          icp={icpSelecionado} 
          oferta={oferta} 
          onSaveConversa={(conversa) => {
            salvarConversaMutation.mutate({
              icpNome: conversa.icpNome,
              icpSegmento: conversa.icpSegmento,
              ofertaTestada: conversa.oferta || oferta || "Oferta não especificada",
              mensagens: conversa.mensagens.map(m => ({
                role: m.role === "user" ? "user" as const : "assistant" as const,
                content: m.content,
                timestamp: Date.now(),
              })),
              resultado: conversa.resultado,
            });
          }}
        />
      </div>

      {/* Campo de Oferta e Análise */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sua Oferta</CardTitle>
            <CardDescription>
              Descreva sua oferta para testar com o cliente sintético
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={oferta}
              onChange={(e) => setOferta(e.target.value)}
              placeholder="Ex: Mentoria de 12 semanas para empresários que querem escalar seu negócio de R$ 1M para R$ 10M, com acompanhamento semanal, acesso a comunidade exclusiva e garantia de resultado..."
              className="min-h-[200px]"
            />
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setOferta("")}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        <AnaliseOferta oferta={oferta} icp={icpSelecionado} />
      </div>

      {/* Modal de Histórico de Conversas */}
      <Dialog open={showHistorico} onOpenChange={setShowHistorico}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Histórico de Conversas
            </DialogTitle>
            <DialogDescription>
              Todas as conversas de teste realizadas com clientes sintéticos
            </DialogDescription>
          </DialogHeader>
          {historicoConversas.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Nenhuma conversa salva ainda</p>
              <p className="text-sm text-muted-foreground mt-2">
                Inicie uma conversa com um cliente sintético e salve para ver aqui
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {historicoConversas.map((conversa) => (
                <Card key={conversa.id} className="cursor-pointer hover:border-blue-500/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">{conversa.icpNome}</h4>
                          <p className="text-sm text-muted-foreground">{conversa.icpSegmento}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={conversa.resultado === 'positivo' ? 'default' : conversa.resultado === 'negativo' ? 'destructive' : 'secondary'}
                        >
                          {conversa.resultado || 'Em andamento'}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(conversa.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-zinc-900/50 rounded-lg">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        <strong>Oferta:</strong> {conversa.ofertaTestada}
                      </p>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {conversa.mensagens?.length || 0} mensagens trocadas
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button variant="ghost" onClick={() => setShowHistorico(false)}>
              Fechar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
