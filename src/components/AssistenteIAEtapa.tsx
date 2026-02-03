import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Bot,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Copy,
  Check,
  Lightbulb,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";

interface AssistenteIAEtapaProps {
  etapa: string;
  contexto?: string;
  placeholder?: string;
  sugestoes?: string[];
  onAplicar: (resultado: string) => void;
  campos?: { nome: string; valor: string }[];
}

export function AssistenteIAEtapa({
  etapa,
  contexto,
  placeholder = "Descreva o que você quer gerar ou cole referências...",
  sugestoes = [],
  onAplicar,
  campos = [],
}: AssistenteIAEtapaProps) {
  const [aberto, setAberto] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [gerando, setGerando] = useState(false);
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);

  // Sugestões padrão por etapa
  const sugestoesPorEtapa: Record<string, string[]> = {
    conceito: [
      "Gere uma Big Idea disruptiva para um curso de marketing digital",
      "Crie um conceito baseado na metodologia do Alex Hormozi",
      "Sugira uma transformação impactante para o público de empreendedores",
    ],
    funil: [
      "Monte um funil de lançamento clássico com 3 CPLs",
      "Sugira um funil perpétuo para produto de ticket baixo",
      "Crie um funil de aplicação para high ticket",
    ],
    oferta: [
      "Estruture uma oferta irresistível com stack de valor",
      "Crie uma garantia reversa que elimine objeções",
      "Sugira bônus que aumentem o valor percebido",
    ],
    manifesto: [
      "Escreva um manifesto inspirador sobre transformação",
      "Crie um roteiro de vídeo manifesto de 2 minutos",
      "Gere um texto que conecte emocionalmente com o público",
    ],
    criativos: [
      "Sugira 5 hooks para anúncios em vídeo",
      "Crie variações de copy para diferentes públicos",
      "Gere ideias de criativos baseados em prova social",
    ],
  };

  const sugestoesFinais = sugestoes.length > 0 ? sugestoes : (sugestoesPorEtapa[etapa] || []);

  const gerarComIA = async () => {
    if (!prompt.trim()) {
      toast.error("Digite um comando ou referência para a IA");
      return;
    }

    setGerando(true);
    
    // Simular geração (em produção, chamaria a API de LLM)
    setTimeout(() => {
      let resultadoGerado = "";
      
      // Gerar resultado baseado na etapa
      switch (etapa) {
        case "conceito":
          resultadoGerado = `**Big Idea Gerada:**\n\n"${prompt.includes("Hormozi") ? "A maioria dos empreendedores está presa no ciclo de trocar tempo por dinheiro. Existe um método que permite escalar sem aumentar a carga de trabalho." : "Você não precisa de mais tráfego. Você precisa de uma oferta que as pessoas não conseguem recusar."}"

**Dor Principal:**
${prompt.includes("marketing") ? "Empreendedores gastam fortunas em anúncios sem conseguir converter leads em clientes pagantes." : "Profissionais qualificados que não conseguem cobrar o que realmente valem."}

**Transformação:**
${prompt.includes("curso") ? "De especialista invisível para autoridade reconhecida no mercado em 90 dias." : "De freelancer sobrecarregado para empresário com negócio escalável."}

**ICP Sugerido:**
Empreendedores digitais com faturamento entre R$10K-50K/mês que querem escalar sem burnout.`;
          break;
          
        case "funil":
          resultadoGerado = `**Estrutura de Funil Sugerida:**

1. **Anúncio de Captura** → Vídeo de 30s com hook de dor
2. **LP de Captura** → Promessa + Prova Social + Formulário
3. **CPL 1 - Problema** → Vídeo de 15min sobre a dor
4. **CPL 2 - Solução** → Apresentação do método
5. **CPL 3 - Prova** → Cases e resultados
6. **Webinar de Vendas** → Pitch completo com oferta
7. **Carrinho Aberto** → 7 dias com escassez real

**Métricas Esperadas:**
- Taxa de captura: 25-35%
- Taxa de show-up webinar: 30-40%
- Taxa de conversão: 3-5%`;
          break;
          
        case "oferta":
          resultadoGerado = `**Oferta Estruturada:**

**Produto Principal:** ${prompt.includes("mentoria") ? "Mentoria em Grupo" : "Programa Online"}
**Ticket:** R$ ${prompt.includes("high") ? "15.000" : "2.997"}

**Stack de Valor:**
1. Acesso ao programa completo (R$ 5.000)
2. Comunidade exclusiva por 12 meses (R$ 2.400)
3. Calls semanais de Q&A (R$ 3.600)
4. Templates e materiais (R$ 1.500)
5. Bônus: Curso complementar (R$ 997)

**Valor Total:** R$ 13.497
**Preço de Lançamento:** R$ 2.997 (78% OFF)

**Garantia:** 30 dias incondicional + Garantia de resultado em 90 dias`;
          break;
          
        case "manifesto":
          resultadoGerado = `**Manifesto - Roteiro de Vídeo:**

[ABERTURA - 0:00-0:15]
"Existe um momento na vida de todo empreendedor em que ele percebe que está jogando um jogo que não pode vencer..."

[DESENVOLVIMENTO - 0:15-1:30]
"Por anos, nos disseram que sucesso significa trabalhar mais. Mais horas, mais esforço, mais sacrifício.

Mas e se eu te dissesse que os empreendedores mais bem-sucedidos que conheço trabalham MENOS do que você?

A diferença não está no esforço. Está no MÉTODO.

Enquanto você está ocupado apagando incêndios, eles construíram sistemas que trabalham por eles."

[CHAMADA - 1:30-2:00]
"Chegou a hora de parar de trocar tempo por dinheiro. De construir algo que cresce mesmo quando você não está olhando.

Isso não é um curso. É uma revolução na forma como você faz negócios.

A pergunta é: você está pronto para pensar diferente?"`;
          break;
          
        case "criativos":
          resultadoGerado = `**5 Hooks para Anúncios em Vídeo:**

1. **Hook de Choque:**
"Eu perdi R$50.000 em anúncios antes de descobrir isso..."

2. **Hook de Curiosidade:**
"O que os top 1% dos empreendedores fazem diferente? (não é o que você pensa)"

3. **Hook de Resultado:**
"De R$10K para R$100K/mês em 6 meses. Aqui está o método exato."

4. **Hook de Contraste:**
"Enquanto você trabalha 12h por dia, seu concorrente fatura 10x mais trabalhando 4h."

5. **Hook de Autoridade:**
"Depois de mentorar 500+ empresários, percebi um padrão..."

**CTAs Sugeridos:**
- "Link na bio para a aula gratuita"
- "Comente 'EU QUERO' para receber o material"
- "Arrasta pra cima e garante sua vaga"`;
          break;
          
        default:
          resultadoGerado = `Resultado gerado para: ${prompt}\n\nAqui está uma sugestão baseada no seu comando. Você pode editar e adaptar conforme necessário.`;
      }
      
      setResultado(resultadoGerado);
      setGerando(false);
      toast.success("Conteúdo gerado com sucesso!");
    }, 2000);
  };

  const copiarResultado = () => {
    navigator.clipboard.writeText(resultado);
    setCopiado(true);
    toast.success("Copiado para a área de transferência!");
    setTimeout(() => setCopiado(false), 2000);
  };

  const aplicarResultado = () => {
    onAplicar(resultado);
    toast.success("Conteúdo aplicado aos campos!");
    setAberto(false);
  };

  return (
    <Collapsible open={aberto} onOpenChange={setAberto}>
      <Card className={`border-dashed ${aberto ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary/50"} transition-all`}>
        <CollapsibleTrigger asChild>
          <CardContent className="p-4 cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${aberto ? "bg-primary/20" : "bg-muted"}`}>
                  <Bot className={`h-5 w-5 ${aberto ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Assistente IA</h4>
                  <p className="text-xs text-muted-foreground">
                    Peça para a IA gerar sugestões ou use suas referências
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  <Sparkles className="h-3 w-3 mr-1" />
                  IA
                </Badge>
                {aberto ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            </div>
          </CardContent>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 px-4 pb-4 space-y-4">
            {/* Campo de prompt */}
            <div className="space-y-2">
              <Textarea
                placeholder={placeholder}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              
              {/* Sugestões rápidas */}
              {sugestoesFinais.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Lightbulb className="h-3 w-3" />
                    Sugestões:
                  </span>
                  {sugestoesFinais.map((sugestao, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="text-xs cursor-pointer hover:bg-primary/10 transition-colors"
                      onClick={() => setPrompt(sugestao)}
                    >
                      {sugestao.length > 40 ? sugestao.substring(0, 40) + "..." : sugestao}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Contexto atual */}
            {campos.length > 0 && campos.some(c => c.valor) && (
              <div className="p-3 rounded-lg bg-muted/50 text-xs">
                <p className="font-medium mb-2 text-muted-foreground">Contexto atual:</p>
                <div className="space-y-1">
                  {campos.filter(c => c.valor).map((campo, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-muted-foreground">{campo.nome}:</span>
                      <span className="truncate">{campo.valor.substring(0, 50)}{campo.valor.length > 50 ? "..." : ""}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botão gerar */}
            <Button 
              onClick={gerarComIA} 
              disabled={gerando || !prompt.trim()}
              className="w-full"
            >
              {gerando ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Gerar com IA
                </>
              )}
            </Button>

            {/* Resultado */}
            {resultado && (
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                  <pre className="text-sm whitespace-pre-wrap font-sans">{resultado}</pre>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copiarResultado}>
                    {copiado ? (
                      <Check className="h-4 w-4 mr-2" />
                    ) : (
                      <Copy className="h-4 w-4 mr-2" />
                    )}
                    {copiado ? "Copiado!" : "Copiar"}
                  </Button>
                  <Button size="sm" onClick={aplicarResultado} className="flex-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Aplicar aos Campos
                  </Button>
                  <Button variant="outline" size="sm" onClick={gerarComIA}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
