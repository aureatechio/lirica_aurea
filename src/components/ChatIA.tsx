import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Target,
  Loader2,
  X,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

// Respostas simuladas baseadas em contexto
const gerarResposta = (pergunta: string): { resposta: string; sugestoes: string[] } => {
  const perguntaLower = pergunta.toLowerCase();
  
  if (perguntaLower.includes("big idea") || perguntaLower.includes("ideia")) {
    return {
      resposta: `Para criar uma Big Idea impactante, considere estes elementos:

**1. Promessa Transformadora**
A Big Idea deve prometer uma transformação clara e desejável. Ex: "De empresário sobrecarregado a líder com tempo livre em 90 dias"

**2. Mecanismo Único**
O que torna sua solução diferente? Ex: "Metodologia HyperCube de 4 dimensões"

**3. Prova de Conceito**
Dados ou casos que validam a promessa. Ex: "Mais de 5.000 empresários já aplicaram"

**4. Urgência Natural**
Por que agora? Ex: "O mercado está mudando e quem não se adaptar..."

**Sugestões para sua campanha:**
- Foque na dor mais urgente do ICP
- Use números específicos (não "muitos", mas "5.847")
- Crie contraste entre antes/depois`,
      sugestoes: [
        "Me ajude a criar uma Big Idea para o Calendário Exponencial",
        "Quais são as principais dores do meu ICP?",
        "Como criar urgência sem parecer forçado?"
      ]
    };
  }
  
  if (perguntaLower.includes("icp") || perguntaLower.includes("cliente") || perguntaLower.includes("público")) {
    return {
      resposta: `Com base nos ICPs da MGS, aqui estão os perfis principais:

**ICP 1 - Empresário de Economia Real**
- Faturamento: R$ 1-10M/ano
- Dor: Crescimento estagnado, falta de estratégia
- Desejo: Escalar sem perder qualidade de vida

**ICP 2 - Profissional Liberal em Transição**
- Renda: R$ 15-50K/mês
- Dor: Dependência de indicações, sem previsibilidade
- Desejo: Construir autoridade e atrair clientes

**ICP 3 - Empreendedor Digital**
- Faturamento: R$ 100K-1M/ano
- Dor: Platô de crescimento, equipe limitada
- Desejo: Estruturar operação para escalar

**Para campanhas, foque em:**
- Linguagem que ressoa com cada perfil
- Exemplos de transformação similares
- Objeções específicas de cada grupo`,
      sugestoes: [
        "Como adaptar a comunicação para cada ICP?",
        "Quais objeções são mais comuns?",
        "Me ajude a criar uma oferta para o ICP 1"
      ]
    };
  }
  
  if (perguntaLower.includes("criativo") || perguntaLower.includes("video") || perguntaLower.includes("anúncio")) {
    return {
      resposta: `Para criativos de alta performance, siga estas diretrizes:

**Estrutura AIDA para Vídeos:**
1. **Atenção (0-3s):** Hook visual ou frase impactante
2. **Interesse (3-15s):** Apresente a dor/problema
3. **Desejo (15-45s):** Mostre a transformação
4. **Ação (45-60s):** CTA claro e urgente

**Tipos de Criativos que Funcionam:**
- **Cortes de Podcast:** Alta autenticidade, baixo custo
- **Prova Social:** Depoimentos de alunos
- **Behind the Scenes:** Bastidores de eventos
- **Nativo:** Parece conteúdo orgânico

**Métricas de Referência:**
- Hook Rate: >30% (3s view)
- CTR: >1.5%
- CPM: R$ 15-40
- CPC: R$ 1-5`,
      sugestoes: [
        "Quais hooks estão funcionando agora?",
        "Me ajude a criar um roteiro de 60s",
        "Como melhorar o CTR dos meus anúncios?"
      ]
    };
  }
  
  if (perguntaLower.includes("funil") || perguntaLower.includes("lançamento")) {
    return {
      resposta: `Os principais modelos de funil para infoprodutos:

**Lançamento Clássico (PLF)**
LP Captura → CPL 1 → CPL 2 → CPL 3 → Abertura → Carrinho
- Melhor para: Produtos de alto ticket
- Duração: 2-3 semanas
- ROAS esperado: 3-8x

**Webinar Evergreen**
Anúncio → LP Webinar → Webinar → Oferta → Follow-up
- Melhor para: Produtos de R$ 500-2000
- Duração: Perpétuo
- ROAS esperado: 2-4x

**VSL (Video Sales Letter)**
Anúncio → VSL → Checkout → Upsell
- Melhor para: Produtos de entrada
- Duração: Perpétuo
- ROAS esperado: 1.5-3x

**High Ticket**
Anúncio → Aplicação → Call → Fechamento
- Melhor para: Mentorias e consultorias
- Duração: Contínuo
- ROAS esperado: 5-15x`,
      sugestoes: [
        "Qual funil é melhor para o Calendário Exponencial?",
        "Como estruturar os CPLs de um lançamento?",
        "Quais métricas acompanhar em cada etapa?"
      ]
    };
  }
  
  if (perguntaLower.includes("tendência") || perguntaLower.includes("mercado")) {
    return {
      resposta: `Tendências atuais no mercado de educação digital:

**1. IA Generativa**
- Cursos sobre IA estão em alta demanda
- Ferramentas de IA para produtividade
- Automação de processos com IA

**2. Comunidades Pagas**
- Shift de cursos para comunidades
- Modelo de recorrência mais valorizado
- Engajamento como diferencial

**3. Eventos Presenciais**
- Retorno forte pós-pandemia
- Experiências imersivas premium
- Networking como valor principal

**4. Short-form Content**
- Reels e TikTok dominando aquisição
- Conteúdo educativo em formato curto
- Autenticidade > produção

**Oportunidades para MGS/Aceleraí:**
- Posicionar IA como diferencial
- Criar experiências híbridas
- Investir em conteúdo curto`,
      sugestoes: [
        "Como usar IA nas campanhas?",
        "Quais formatos de conteúdo priorizar?",
        "Como criar uma comunidade engajada?"
      ]
    };
  }
  
  // Resposta padrão
  return {
    resposta: `Entendi sua pergunta sobre "${pergunta}". 

Para te ajudar melhor, posso:
- Analisar dados das campanhas atuais
- Sugerir Big Ideas baseadas em tendências
- Criar roteiros de criativos
- Avaliar ofertas e funis
- Pesquisar referências de mercado

O que você gostaria de explorar?`,
    sugestoes: [
      "Me ajude a criar uma Big Idea",
      "Quais são as tendências do mercado?",
      "Como melhorar meus criativos?"
    ]
  };
};

export function ChatIA() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Olá! Sou o assistente de campanhas da MGS. Posso ajudar com:\n\n• Criação de Big Ideas\n• Análise de ICPs\n• Sugestões de criativos\n• Estruturação de funis\n• Tendências de mercado\n\nComo posso ajudar?",
      timestamp: new Date(),
      suggestions: [
        "Me ajude a criar uma Big Idea",
        "Quais são os ICPs da MGS?",
        "Tendências do mercado digital"
      ]
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simular delay de resposta
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    const { resposta, sugestoes } = gerarResposta(messageText);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: resposta,
      timestamp: new Date(),
      suggestions: sugestoes,
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Botão flutuante */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Sheet do Chat */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] p-0 flex flex-col">
          <SheetHeader className="p-4 border-b border-zinc-800 bg-gradient-to-r from-red-600/20 to-orange-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <SheetTitle className="text-left">Assistente de Campanhas</SheetTitle>
                  <SheetDescription className="text-left">
                    IA para ajudar na criação de campanhas
                  </SheetDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                Online
              </Badge>
            </div>
          </SheetHeader>

          {/* Área de mensagens */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] ${message.role === "user" ? "order-2" : ""}`}>
                    <div className={`flex items-start gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "user" 
                          ? "bg-primary" 
                          : "bg-gradient-to-r from-red-600 to-orange-500"
                      }`}>
                        {message.role === "user" ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-zinc-800 text-foreground"
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                    
                    {/* Sugestões */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2 ml-10">
                        {message.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="text-xs h-auto py-1 px-2 bg-zinc-900/50 hover:bg-zinc-800"
                            onClick={() => handleSend(suggestion)}
                          >
                            <Lightbulb className="h-3 w-3 mr-1" />
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua pergunta..."
                className="flex-1 bg-zinc-800 border-zinc-700"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by IA • Respostas baseadas em dados de campanhas
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ChatIA;
