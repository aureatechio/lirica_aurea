import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Box,
  Target,
  Users,
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
  Shield,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";
import { toast } from "sonner";

interface HyperCubeProps {
  onComplete?: (resultado: HyperCubeResultado) => void;
  modo?: "diagnostico" | "selecao";
  onSelectAspecto?: (aspecto: Aspecto) => void;
}

interface HyperCubeResultado {
  pontuacoes: Record<string, number>;
  dificuldadeGeral: "baixa" | "media" | "alta" | "muito_alta";
  aspectosCriticos: string[];
  recomendacoes: string[];
}

interface Aspecto {
  id: string;
  nome: string;
  descricao: string;
  icon: React.ElementType;
  cor: string;
  eixo: "x" | "y" | "z";
  polo: "positivo" | "negativo";
  perguntas: Pergunta[];
  abordagemCliente: string;
  objecoesTipicas: string[];
}

interface Pergunta {
  id: string;
  texto: string;
  opcoes: { valor: number; texto: string }[];
}

const aspectosHyperCube: Aspecto[] = [
  {
    id: "autoridade",
    nome: "Autoridade",
    descricao: "Nível de reconhecimento e credibilidade do expert/marca no mercado",
    icon: Shield,
    cor: "text-purple-500",
    eixo: "x",
    polo: "positivo",
    abordagemCliente: "Cliente que valoriza credenciais, cases de sucesso e prova social de autoridades reconhecidas",
    objecoesTipicas: [
      "Quem é esse cara? Nunca ouvi falar.",
      "Tem algum case comprovado?",
      "Por que eu deveria confiar nele?",
    ],
    perguntas: [
      {
        id: "aut1",
        texto: "Qual o nível de reconhecimento do expert no mercado?",
        opcoes: [
          { valor: 1, texto: "Desconhecido - ninguém conhece" },
          { valor: 2, texto: "Iniciante - poucos conhecem" },
          { valor: 3, texto: "Conhecido - reconhecido no nicho" },
          { valor: 4, texto: "Autoridade - referência no segmento" },
          { valor: 5, texto: "Celebridade - conhecido nacionalmente" },
        ],
      },
      {
        id: "aut2",
        texto: "Quantos cases de sucesso documentados existem?",
        opcoes: [
          { valor: 1, texto: "Nenhum case documentado" },
          { valor: 2, texto: "1-5 cases" },
          { valor: 3, texto: "6-20 cases" },
          { valor: 4, texto: "21-50 cases" },
          { valor: 5, texto: "50+ cases documentados" },
        ],
      },
    ],
  },
  {
    id: "audiencia",
    nome: "Audiência",
    descricao: "Tamanho e engajamento da base de seguidores/leads",
    icon: Users,
    cor: "text-blue-500",
    eixo: "x",
    polo: "negativo",
    abordagemCliente: "Cliente que precisa ver comunidade ativa, depoimentos de alunos e senso de pertencimento",
    objecoesTipicas: [
      "Quantas pessoas já fizeram isso?",
      "Tem uma comunidade de apoio?",
      "Vou ficar sozinho nessa jornada?",
    ],
    perguntas: [
      {
        id: "aud1",
        texto: "Qual o tamanho da audiência atual?",
        opcoes: [
          { valor: 1, texto: "Menos de 1.000 seguidores" },
          { valor: 2, texto: "1.000 - 10.000 seguidores" },
          { valor: 3, texto: "10.000 - 50.000 seguidores" },
          { valor: 4, texto: "50.000 - 200.000 seguidores" },
          { valor: 5, texto: "200.000+ seguidores" },
        ],
      },
      {
        id: "aud2",
        texto: "Qual o nível de engajamento da audiência?",
        opcoes: [
          { valor: 1, texto: "Muito baixo (< 1%)" },
          { valor: 2, texto: "Baixo (1-2%)" },
          { valor: 3, texto: "Médio (2-5%)" },
          { valor: 4, texto: "Alto (5-10%)" },
          { valor: 5, texto: "Muito alto (> 10%)" },
        ],
      },
    ],
  },
  {
    id: "oferta",
    nome: "Oferta",
    descricao: "Clareza, valor percebido e diferenciação da oferta",
    icon: Target,
    cor: "text-green-500",
    eixo: "y",
    polo: "positivo",
    abordagemCliente: "Cliente que precisa entender exatamente o que vai receber e por que vale o investimento",
    objecoesTipicas: [
      "O que exatamente eu vou receber?",
      "Por que é tão caro/barato?",
      "Qual a diferença para os concorrentes?",
    ],
    perguntas: [
      {
        id: "ofe1",
        texto: "Quão clara e específica é a oferta?",
        opcoes: [
          { valor: 1, texto: "Muito vaga - difícil entender" },
          { valor: 2, texto: "Pouco clara - gera dúvidas" },
          { valor: 3, texto: "Razoável - entendível" },
          { valor: 4, texto: "Clara - fácil de entender" },
          { valor: 5, texto: "Cristalina - impossível não entender" },
        ],
      },
      {
        id: "ofe2",
        texto: "Qual o nível de diferenciação da oferta?",
        opcoes: [
          { valor: 1, texto: "Commodity - igual aos outros" },
          { valor: 2, texto: "Pouco diferente" },
          { valor: 3, texto: "Diferenciada em alguns pontos" },
          { valor: 4, texto: "Muito diferenciada" },
          { valor: 5, texto: "Única no mercado" },
        ],
      },
    ],
  },
  {
    id: "urgencia",
    nome: "Urgência",
    descricao: "Nível de urgência e escassez real ou percebida",
    icon: Clock,
    cor: "text-red-500",
    eixo: "y",
    polo: "negativo",
    abordagemCliente: "Cliente que precisa de gatilhos de urgência e escassez para tomar decisão",
    objecoesTipicas: [
      "Posso pensar mais um pouco?",
      "Vai ter outra turma depois?",
      "Preciso consultar meu sócio/esposa",
    ],
    perguntas: [
      {
        id: "urg1",
        texto: "Existe urgência real na oferta?",
        opcoes: [
          { valor: 1, texto: "Nenhuma urgência" },
          { valor: 2, texto: "Urgência fraca/artificial" },
          { valor: 3, texto: "Urgência moderada" },
          { valor: 4, texto: "Urgência forte e real" },
          { valor: 5, texto: "Urgência extrema (evento único)" },
        ],
      },
      {
        id: "urg2",
        texto: "Existe escassez real?",
        opcoes: [
          { valor: 1, texto: "Nenhuma escassez" },
          { valor: 2, texto: "Escassez artificial" },
          { valor: 3, texto: "Escassez moderada" },
          { valor: 4, texto: "Escassez real (vagas limitadas)" },
          { valor: 5, texto: "Escassez extrema (última chance)" },
        ],
      },
    ],
  },
  {
    id: "preco",
    nome: "Preço/Valor",
    descricao: "Relação entre preço cobrado e valor percebido",
    icon: DollarSign,
    cor: "text-yellow-500",
    eixo: "z",
    polo: "positivo",
    abordagemCliente: "Cliente que precisa justificar o investimento com ROI claro e garantias",
    objecoesTipicas: [
      "Está muito caro para mim",
      "Não tenho esse dinheiro agora",
      "Qual o retorno que vou ter?",
    ],
    perguntas: [
      {
        id: "pre1",
        texto: "Como o preço se compara ao valor entregue?",
        opcoes: [
          { valor: 1, texto: "Muito caro para o que entrega" },
          { valor: 2, texto: "Um pouco acima do valor" },
          { valor: 3, texto: "Preço justo" },
          { valor: 4, texto: "Bom custo-benefício" },
          { valor: 5, texto: "Barganha - vale muito mais" },
        ],
      },
      {
        id: "pre2",
        texto: "Existem garantias ou redutores de risco?",
        opcoes: [
          { valor: 1, texto: "Nenhuma garantia" },
          { valor: 2, texto: "Garantia fraca" },
          { valor: 3, texto: "Garantia padrão (7 dias)" },
          { valor: 4, texto: "Garantia forte (30 dias)" },
          { valor: 5, texto: "Garantia incondicional + bônus" },
        ],
      },
    ],
  },
  {
    id: "transformacao",
    nome: "Transformação",
    descricao: "Clareza e magnitude da transformação prometida",
    icon: Zap,
    cor: "text-orange-500",
    eixo: "z",
    polo: "negativo",
    abordagemCliente: "Cliente que precisa visualizar claramente o antes e depois da transformação",
    objecoesTipicas: [
      "Isso realmente funciona?",
      "Quanto tempo leva para ver resultado?",
      "E se não funcionar para mim?",
    ],
    perguntas: [
      {
        id: "tra1",
        texto: "Quão clara é a transformação prometida?",
        opcoes: [
          { valor: 1, texto: "Muito vaga" },
          { valor: 2, texto: "Pouco clara" },
          { valor: 3, texto: "Razoavelmente clara" },
          { valor: 4, texto: "Bem clara" },
          { valor: 5, texto: "Extremamente clara e específica" },
        ],
      },
      {
        id: "tra2",
        texto: "Existem provas da transformação?",
        opcoes: [
          { valor: 1, texto: "Nenhuma prova" },
          { valor: 2, texto: "Poucas provas" },
          { valor: 3, texto: "Algumas provas" },
          { valor: 4, texto: "Muitas provas" },
          { valor: 5, texto: "Provas irrefutáveis" },
        ],
      },
    ],
  },
  {
    id: "timing",
    nome: "Timing",
    descricao: "Momento do mercado e relevância temporal",
    icon: TrendingUp,
    cor: "text-cyan-500",
    eixo: "x",
    polo: "positivo",
    abordagemCliente: "Cliente que precisa entender por que AGORA é o momento certo",
    objecoesTipicas: [
      "O mercado está saturado",
      "Já passou a hora disso",
      "Vou esperar o momento certo",
    ],
    perguntas: [
      {
        id: "tim1",
        texto: "O timing do mercado é favorável?",
        opcoes: [
          { valor: 1, texto: "Péssimo timing" },
          { valor: 2, texto: "Timing ruim" },
          { valor: 3, texto: "Timing neutro" },
          { valor: 4, texto: "Bom timing" },
          { valor: 5, texto: "Timing perfeito" },
        ],
      },
      {
        id: "tim2",
        texto: "Existe tendência de mercado a favor?",
        opcoes: [
          { valor: 1, texto: "Tendência contra" },
          { valor: 2, texto: "Sem tendência clara" },
          { valor: 3, texto: "Tendência neutra" },
          { valor: 4, texto: "Tendência favorável" },
          { valor: 5, texto: "Mega tendência a favor" },
        ],
      },
    ],
  },
  {
    id: "confianca",
    nome: "Confiança",
    descricao: "Nível de confiança e credibilidade geral",
    icon: Shield,
    cor: "text-emerald-500",
    eixo: "y",
    polo: "positivo",
    abordagemCliente: "Cliente que precisa de múltiplas provas sociais e validações externas",
    objecoesTipicas: [
      "Como sei que não é golpe?",
      "Tem CNPJ? É empresa séria?",
      "Quem mais já comprou?",
    ],
    perguntas: [
      {
        id: "con1",
        texto: "Qual o nível de prova social?",
        opcoes: [
          { valor: 1, texto: "Nenhuma prova social" },
          { valor: 2, texto: "Poucas provas" },
          { valor: 3, texto: "Provas razoáveis" },
          { valor: 4, texto: "Muitas provas sociais" },
          { valor: 5, texto: "Prova social massiva" },
        ],
      },
      {
        id: "con2",
        texto: "Existem validações externas (mídia, prêmios)?",
        opcoes: [
          { valor: 1, texto: "Nenhuma validação" },
          { valor: 2, texto: "Poucas validações" },
          { valor: 3, texto: "Algumas validações" },
          { valor: 4, texto: "Várias validações" },
          { valor: 5, texto: "Validações de peso" },
        ],
      },
    ],
  },
];

export default function HyperCube({ onComplete, modo = "diagnostico", onSelectAspecto }: HyperCubeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, number>>({});
  const [aspectoSelecionado, setAspectoSelecionado] = useState<Aspecto | null>(null);

  const aspecto = aspectosHyperCube[etapaAtual];
  const progresso = ((etapaAtual + 1) / aspectosHyperCube.length) * 100;

  const calcularPontuacao = (aspectoId: string): number => {
    const aspecto = aspectosHyperCube.find((a) => a.id === aspectoId);
    if (!aspecto) return 0;
    
    const pontos = aspecto.perguntas.map((p) => respostas[p.id] || 0);
    return pontos.reduce((a, b) => a + b, 0) / pontos.length;
  };

  const calcularResultado = (): HyperCubeResultado => {
    const pontuacoes: Record<string, number> = {};
    let somaTotal = 0;
    
    aspectosHyperCube.forEach((a) => {
      const pontuacao = calcularPontuacao(a.id);
      pontuacoes[a.id] = pontuacao;
      somaTotal += pontuacao;
    });

    const mediaGeral = somaTotal / aspectosHyperCube.length;
    
    let dificuldadeGeral: "baixa" | "media" | "alta" | "muito_alta";
    if (mediaGeral >= 4) dificuldadeGeral = "baixa";
    else if (mediaGeral >= 3) dificuldadeGeral = "media";
    else if (mediaGeral >= 2) dificuldadeGeral = "alta";
    else dificuldadeGeral = "muito_alta";

    const aspectosCriticos = aspectosHyperCube
      .filter((a) => calcularPontuacao(a.id) < 3)
      .map((a) => a.nome);

    const recomendacoes = aspectosCriticos.map((nome) => {
      const aspecto = aspectosHyperCube.find((a) => a.nome === nome);
      if (nome === "Autoridade") return "Investir em construção de autoridade: participar de podcasts, publicar artigos, buscar parcerias";
      if (nome === "Audiência") return "Focar em crescimento de audiência: conteúdo consistente, colaborações, tráfego pago";
      if (nome === "Oferta") return "Refinar a oferta: clarificar entregáveis, criar comparativos, destacar diferenciais";
      if (nome === "Urgência") return "Criar urgência real: datas limite, vagas limitadas, bônus por tempo";
      if (nome === "Preço/Valor") return "Trabalhar percepção de valor: garantias, bônus, parcelamento, ROI claro";
      if (nome === "Transformação") return "Documentar transformações: coletar depoimentos, criar cases, mostrar antes/depois";
      if (nome === "Timing") return "Aproveitar tendências: conectar com momento do mercado, usar ganchos de atualidade";
      if (nome === "Confiança") return "Construir confiança: mostrar bastidores, CNPJ, endereço, equipe, mídia";
      return "Melhorar este aspecto";
    });

    return { pontuacoes, dificuldadeGeral, aspectosCriticos, recomendacoes };
  };

  const handleNext = () => {
    if (etapaAtual < aspectosHyperCube.length - 1) {
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const handlePrev = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const handleComplete = () => {
    const resultado = calcularResultado();
    onComplete?.(resultado);
    toast.success("Diagnóstico HyperCube concluído!");
    setIsOpen(false);
  };

  const handleSelectAspecto = (aspecto: Aspecto) => {
    setAspectoSelecionado(aspecto);
    onSelectAspecto?.(aspecto);
    toast.success(`Aspecto "${aspecto.nome}" selecionado para simulação`);
  };

  const getDificuldadeColor = (dif: string) => {
    switch (dif) {
      case "baixa": return "text-green-500";
      case "media": return "text-yellow-500";
      case "alta": return "text-orange-500";
      case "muito_alta": return "text-red-500";
      default: return "text-muted-foreground";
    }
  };

  const getDificuldadeLabel = (dif: string) => {
    switch (dif) {
      case "baixa": return "Baixa";
      case "media": return "Média";
      case "alta": return "Alta";
      case "muito_alta": return "Muito Alta";
      default: return dif;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Box className="h-4 w-4" />
          {modo === "diagnostico" ? "Diagnóstico HyperCube" : "Selecionar Aspecto"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Box className="h-5 w-5 text-primary" />
            HyperCube - {modo === "diagnostico" ? "Diagnóstico de Campanha" : "Seleção de Aspecto"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {modo === "diagnostico" 
              ? "Avalie os 8 aspectos para descobrir a dificuldade da sua campanha"
              : "Selecione um aspecto do HyperCube para construir a abordagem do cliente sintético"
            }
          </p>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Visualização do Cubo */}
          <Card className="p-4">
            <div className="grid grid-cols-4 gap-3">
              {aspectosHyperCube.map((a) => {
                const Icon = a.icon;
                const pontuacao = calcularPontuacao(a.id);
                const isActive = modo === "diagnostico" && etapaAtual === aspectosHyperCube.indexOf(a);
                const isSelected = aspectoSelecionado?.id === a.id;
                
                return (
                  <div
                    key={a.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isActive ? "border-primary bg-primary/10" :
                      isSelected ? "border-amber-500 bg-amber-500/10" :
                      "border-border hover:border-primary/50"
                    }`}
                    onClick={() => modo === "selecao" ? handleSelectAspecto(a) : setEtapaAtual(aspectosHyperCube.indexOf(a))}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`h-4 w-4 ${a.cor}`} />
                      <span className="text-sm font-medium">{a.nome}</span>
                    </div>
                    {modo === "diagnostico" && (
                      <div className="space-y-1">
                        <Progress value={pontuacao * 20} className="h-1.5" />
                        <span className="text-xs text-muted-foreground">
                          {pontuacao > 0 ? `${pontuacao.toFixed(1)}/5` : "Não avaliado"}
                        </span>
                      </div>
                    )}
                    {modo === "selecao" && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{a.descricao}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>

          {modo === "diagnostico" && (
            <>
              {/* Progresso */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Aspecto {etapaAtual + 1} de {aspectosHyperCube.length}</span>
                  <span>{Math.round(progresso)}% completo</span>
                </div>
                <Progress value={progresso} className="h-2" />
              </div>

              {/* Card do Aspecto Atual */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const Icon = aspecto.icon;
                      return <Icon className={`h-6 w-6 ${aspecto.cor}`} />;
                    })()}
                    <div>
                      <CardTitle className="text-lg">{aspecto.nome}</CardTitle>
                      <p className="text-sm text-muted-foreground">{aspecto.descricao}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {aspecto.perguntas.map((pergunta) => (
                    <div key={pergunta.id} className="space-y-3">
                      <p className="font-medium">{pergunta.texto}</p>
                      <RadioGroup
                        value={respostas[pergunta.id]?.toString() || ""}
                        onValueChange={(value) => setRespostas({ ...respostas, [pergunta.id]: parseInt(value) })}
                      >
                        {pergunta.opcoes.map((opcao) => (
                          <div key={opcao.valor} className="flex items-center space-x-2">
                            <RadioGroupItem value={opcao.valor.toString()} id={`${pergunta.id}-${opcao.valor}`} />
                            <Label htmlFor={`${pergunta.id}-${opcao.valor}`} className="cursor-pointer">
                              {opcao.texto}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Navegação */}
              <div className="flex justify-between items-center">
                <Button variant="outline" onClick={handlePrev} disabled={etapaAtual === 0}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>

                {etapaAtual === aspectosHyperCube.length - 1 ? (
                  <Button onClick={handleComplete} className="bg-primary">
                    Ver Resultado
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Próximo
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>

              {/* Preview do Resultado */}
              {Object.keys(respostas).length > 0 && (
                <Card className="bg-muted/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Info className="h-4 w-4" />
                      Preview do Diagnóstico
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Dificuldade Geral:</p>
                        <p className={`font-bold ${getDificuldadeColor(calcularResultado().dificuldadeGeral)}`}>
                          {getDificuldadeLabel(calcularResultado().dificuldadeGeral)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Aspectos Críticos:</p>
                        <div className="flex gap-1 flex-wrap">
                          {calcularResultado().aspectosCriticos.length > 0 ? (
                            calcularResultado().aspectosCriticos.map((ac) => (
                              <Badge key={ac} variant="destructive" className="text-xs">{ac}</Badge>
                            ))
                          ) : (
                            <Badge variant="secondary" className="text-xs">Nenhum crítico</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {modo === "selecao" && aspectoSelecionado && (
            <Card className="border-amber-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const Icon = aspectoSelecionado.icon;
                    return <Icon className={`h-5 w-5 ${aspectoSelecionado.cor}`} />;
                  })()}
                  {aspectoSelecionado.nome} - Abordagem do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Perfil do Cliente:</p>
                  <p className="text-sm text-muted-foreground">{aspectoSelecionado.abordagemCliente}</p>
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Objeções Típicas:</p>
                  <ul className="space-y-1">
                    {aspectoSelecionado.objecoesTipicas.map((obj, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                        "{obj}"
                      </li>
                    ))}
                  </ul>
                </div>
                <Button onClick={() => setIsOpen(false)} className="w-full">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Usar Este Aspecto na Simulação
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
