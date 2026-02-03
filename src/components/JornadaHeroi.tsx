import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  HelpCircle,
  Home,
  Phone,
  Footprints,
  Users,
  Sword,
  Skull,
  Gift,
  RotateCcw,
  Crown,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  Copy,
} from "lucide-react";
import { toast } from "sonner";

interface JornadaHeroiProps {
  onComplete?: (resultado: JornadaResultado) => void;
  produtoNome?: string;
}

interface JornadaResultado {
  mundoComum: string;
  chamadoAventura: string;
  recusaChamado: string;
  encontroMentor: string;
  travessiaLimiar: string;
  testesAliadosInimigos: string;
  aproximacaoCaverna: string;
  provacaoSuprema: string;
  recompensa: string;
  caminhoVolta: string;
  ressurreicao: string;
  retornoElixir: string;
  bigIdea: string;
  dor: string;
  transformacao: string;
}

const etapasJornada = [
  {
    id: 1,
    nome: "Mundo Comum",
    icon: Home,
    cor: "text-blue-400",
    descricao: "O herói é apresentado em seu mundo normal, antes da aventura começar.",
    pergunta: "Descreva a situação ATUAL do seu cliente ideal. Como é o dia a dia dele? Quais são suas frustrações cotidianas?",
    exemplo: "Empresário que trabalha 12h por dia, não consegue escalar o negócio, sente que está sempre apagando incêndios.",
    campo: "mundoComum",
  },
  {
    id: 2,
    nome: "Chamado à Aventura",
    icon: Phone,
    cor: "text-yellow-400",
    descricao: "Um evento ou mensageiro apresenta ao herói um desafio ou aventura.",
    pergunta: "O que faz seu cliente perceber que precisa mudar? Qual é o gatilho que o faz buscar uma solução?",
    exemplo: "Vê um concorrente crescendo, perde um cliente importante, percebe que está perdendo oportunidades.",
    campo: "chamadoAventura",
  },
  {
    id: 3,
    nome: "Recusa do Chamado",
    icon: RotateCcw,
    cor: "text-red-400",
    descricao: "O herói hesita ou recusa o chamado por medo ou insegurança.",
    pergunta: "Quais são as objeções e medos que impedem seu cliente de agir? Por que ele hesita?",
    exemplo: "Medo de investir e não ter retorno, achar que não tem tempo, pensar que já tentou de tudo.",
    campo: "recusaChamado",
  },
  {
    id: 4,
    nome: "Encontro com o Mentor",
    icon: Users,
    cor: "text-green-400",
    descricao: "O herói encontra um mentor que oferece sabedoria, treinamento ou um presente mágico.",
    pergunta: "Como seu produto/serviço se posiciona como o mentor? Que 'presente mágico' você oferece?",
    exemplo: "Allan Barros como mentor que já passou pelo mesmo, metodologia comprovada, comunidade de apoio.",
    campo: "encontroMentor",
  },
  {
    id: 5,
    nome: "Travessia do Limiar",
    icon: Footprints,
    cor: "text-purple-400",
    descricao: "O herói cruza o limiar entre o mundo comum e o mundo especial.",
    pergunta: "Qual é o momento de decisão? O que representa 'cruzar o limiar' para seu cliente?",
    exemplo: "Fazer a inscrição, participar da primeira aula, comprometer-se com a mudança.",
    campo: "travessiaLimiar",
  },
  {
    id: 6,
    nome: "Testes, Aliados e Inimigos",
    icon: Sword,
    cor: "text-orange-400",
    descricao: "O herói enfrenta testes, encontra aliados e confronta inimigos.",
    pergunta: "Quais desafios seu cliente enfrentará durante a jornada? Quem são os aliados e 'inimigos'?",
    exemplo: "Desafio de implementar, aliados na comunidade, 'inimigos' são velhos hábitos e crenças limitantes.",
    campo: "testesAliadosInimigos",
  },
  {
    id: 7,
    nome: "Aproximação da Caverna",
    icon: Skull,
    cor: "text-gray-400",
    descricao: "O herói se prepara para o confronto central da história.",
    pergunta: "Qual é o maior medo ou desafio que seu cliente precisa enfrentar? O que ele evita?",
    exemplo: "Medo de se expor, de liderar, de cobrar mais caro, de demitir funcionários ruins.",
    campo: "aproximacaoCaverna",
  },
  {
    id: 8,
    nome: "Provação Suprema",
    icon: Skull,
    cor: "text-red-500",
    descricao: "O herói enfrenta seu maior medo ou inimigo mais poderoso.",
    pergunta: "Qual é o momento de 'morte e renascimento'? O que precisa 'morrer' para o novo surgir?",
    exemplo: "Abandonar a mentalidade de funcionário, deixar de ser operacional, assumir o papel de CEO.",
    campo: "provacaoSuprema",
  },
  {
    id: 9,
    nome: "Recompensa",
    icon: Gift,
    cor: "text-yellow-500",
    descricao: "O herói obtém a recompensa após enfrentar a provação.",
    pergunta: "Qual é a recompensa tangível e intangível que seu cliente obtém?",
    exemplo: "Negócio escalável, liberdade de tempo, reconhecimento no mercado, confiança como líder.",
    campo: "recompensa",
  },
  {
    id: 10,
    nome: "Caminho de Volta",
    icon: RotateCcw,
    cor: "text-blue-500",
    descricao: "O herói começa a jornada de volta ao mundo comum.",
    pergunta: "Como seu cliente aplica o que aprendeu no dia a dia? Quais são os primeiros passos práticos?",
    exemplo: "Implementar os processos, treinar a equipe, ajustar o modelo de negócio.",
    campo: "caminhoVolta",
  },
  {
    id: 11,
    nome: "Ressurreição",
    icon: Sparkles,
    cor: "text-purple-500",
    descricao: "O herói enfrenta um último teste onde tudo está em jogo.",
    pergunta: "Qual é o teste final que prova que a transformação é real e permanente?",
    exemplo: "Primeiro grande contrato fechado, equipe funcionando sem ele, negócio lucrativo por 3 meses seguidos.",
    campo: "ressurreicao",
  },
  {
    id: 12,
    nome: "Retorno com o Elixir",
    icon: Crown,
    cor: "text-amber-500",
    descricao: "O herói retorna ao mundo comum com o elixir que beneficiará a todos.",
    pergunta: "Como seu cliente transformado impacta os outros? Qual é o legado que ele deixa?",
    exemplo: "Inspira outros empresários, gera empregos, transforma sua família, vira case de sucesso.",
    campo: "retornoElixir",
  },
];

export default function JornadaHeroi({ onComplete, produtoNome = "seu produto" }: JornadaHeroiProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [respostas, setRespostas] = useState<Record<string, string>>({});

  const etapa = etapasJornada[etapaAtual];
  const progresso = ((etapaAtual + 1) / etapasJornada.length) * 100;

  const handleNext = () => {
    if (etapaAtual < etapasJornada.length - 1) {
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const handlePrev = () => {
    if (etapaAtual > 0) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const gerarResultado = (): JornadaResultado => {
    // Gerar Big Idea baseada nas respostas
    const bigIdea = `Transforme ${respostas.mundoComum?.split(" ").slice(0, 5).join(" ") || "sua situação atual"} em ${respostas.recompensa?.split(" ").slice(0, 5).join(" ") || "seu maior objetivo"} através de ${produtoNome}`;
    
    // Gerar Dor baseada nas respostas
    const dor = respostas.mundoComum || "Dor não definida";
    
    // Gerar Transformação baseada nas respostas
    const transformacao = respostas.retornoElixir || respostas.recompensa || "Transformação não definida";

    return {
      mundoComum: respostas.mundoComum || "",
      chamadoAventura: respostas.chamadoAventura || "",
      recusaChamado: respostas.recusaChamado || "",
      encontroMentor: respostas.encontroMentor || "",
      travessiaLimiar: respostas.travessiaLimiar || "",
      testesAliadosInimigos: respostas.testesAliadosInimigos || "",
      aproximacaoCaverna: respostas.aproximacaoCaverna || "",
      provacaoSuprema: respostas.provacaoSuprema || "",
      recompensa: respostas.recompensa || "",
      caminhoVolta: respostas.caminhoVolta || "",
      ressurreicao: respostas.ressurreicao || "",
      retornoElixir: respostas.retornoElixir || "",
      bigIdea,
      dor,
      transformacao,
    };
  };

  const handleComplete = () => {
    const resultado = gerarResultado();
    onComplete?.(resultado);
    toast.success("Jornada do Herói concluída! Big Idea, Dor e Transformação gerados.");
    setIsOpen(false);
  };

  const copiarResultado = () => {
    const resultado = gerarResultado();
    const texto = `
BIG IDEA: ${resultado.bigIdea}

DOR: ${resultado.dor}

TRANSFORMAÇÃO: ${resultado.transformacao}

--- JORNADA COMPLETA ---

1. MUNDO COMUM: ${resultado.mundoComum}
2. CHAMADO À AVENTURA: ${resultado.chamadoAventura}
3. RECUSA DO CHAMADO: ${resultado.recusaChamado}
4. ENCONTRO COM O MENTOR: ${resultado.encontroMentor}
5. TRAVESSIA DO LIMIAR: ${resultado.travessiaLimiar}
6. TESTES, ALIADOS E INIMIGOS: ${resultado.testesAliadosInimigos}
7. APROXIMAÇÃO DA CAVERNA: ${resultado.aproximacaoCaverna}
8. PROVAÇÃO SUPREMA: ${resultado.provacaoSuprema}
9. RECOMPENSA: ${resultado.recompensa}
10. CAMINHO DE VOLTA: ${resultado.caminhoVolta}
11. RESSURREIÇÃO: ${resultado.ressurreicao}
12. RETORNO COM O ELIXIR: ${resultado.retornoElixir}
    `.trim();
    
    navigator.clipboard.writeText(texto);
    toast.success("Resultado copiado para a área de transferência!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HelpCircle className="h-4 w-4" />
          Preciso de Ajuda
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Jornada do Herói de Campbell
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Responda as perguntas para construir a narrativa da sua campanha
          </p>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Etapa {etapaAtual + 1} de {etapasJornada.length}</span>
              <span>{Math.round(progresso)}% completo</span>
            </div>
            <Progress value={progresso} className="h-2" />
          </div>

          {/* Visualização da Jornada */}
          <div className="relative">
            <div className="flex justify-between items-center overflow-x-auto pb-4">
              {etapasJornada.map((e, i) => {
                const Icon = e.icon;
                const isActive = i === etapaAtual;
                const isCompleted = i < etapaAtual;
                const hasResponse = !!respostas[e.campo];
                
                return (
                  <div
                    key={e.id}
                    className={`flex flex-col items-center min-w-[60px] cursor-pointer transition-all ${
                      isActive ? "scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    onClick={() => setEtapaAtual(i)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        isActive
                          ? "border-amber-500 bg-amber-500/20"
                          : isCompleted || hasResponse
                          ? "border-green-500 bg-green-500/20"
                          : "border-muted bg-muted/20"
                      }`}
                    >
                      {isCompleted || hasResponse ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Icon className={`h-4 w-4 ${isActive ? e.cor : "text-muted-foreground"}`} />
                      )}
                    </div>
                    <span className={`text-[10px] mt-1 text-center ${isActive ? "font-bold" : ""}`}>
                      {e.nome}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card da Etapa Atual */}
          <Card className="border-amber-500/30">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                {(() => {
                  const Icon = etapa.icon;
                  return <Icon className={`h-6 w-6 ${etapa.cor}`} />;
                })()}
                <div>
                  <CardTitle className="text-lg">{etapa.nome}</CardTitle>
                  <p className="text-sm text-muted-foreground">{etapa.descricao}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="text-sm font-medium">{etapa.pergunta}</p>
              </div>
              
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-xs text-muted-foreground mb-1">Exemplo:</p>
                <p className="text-sm italic">{etapa.exemplo}</p>
              </div>

              <Textarea
                placeholder="Digite sua resposta..."
                value={respostas[etapa.campo] || ""}
                onChange={(e) => setRespostas({ ...respostas, [etapa.campo]: e.target.value })}
                rows={4}
              />
            </CardContent>
          </Card>

          {/* Navegação */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={etapaAtual === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={copiarResultado}>
                <Copy className="h-4 w-4 mr-1" />
                Copiar Resultado
              </Button>
              
              {etapaAtual === etapasJornada.length - 1 ? (
                <Button onClick={handleComplete} className="bg-amber-500 hover:bg-amber-600">
                  <Check className="h-4 w-4 mr-1" />
                  Concluir e Aplicar
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </div>

          {/* Preview do Resultado */}
          {Object.keys(respostas).length > 0 && (
            <Card className="bg-muted/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Preview do Resultado</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Badge variant="outline" className="mb-1">Big Idea (gerada)</Badge>
                  <p className="text-sm">{gerarResultado().bigIdea}</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-1">Dor Principal</Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">{respostas.mundoComum || "Preencha o Mundo Comum"}</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-1">Transformação</Badge>
                  <p className="text-sm text-muted-foreground line-clamp-2">{respostas.retornoElixir || respostas.recompensa || "Preencha a Recompensa ou Retorno"}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
