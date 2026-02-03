// Página Produtos - Gestão de Produtos MGS e Aceleraí
// Design: Command Center Dark Theme com calendário mês a mês

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Calendar, Users, MapPin, AlertTriangle, Search, 
  Edit, Star, Building2, Sparkles, User, TrendingUp,
  ChevronLeft, ChevronRight, Zap, Target, Gift
} from "lucide-react";
import { celebridades, segmentos, getCelebridadesDestaque } from "@/data/aceleraiData";

// Produtos MGS com dados completos
const produtosMGS = [
  {
    id: "jornada-exponencial",
    nome: "Jornada Exponencial",
    descricao: "Imersão de 3 dias para transformação de negócios",
    datasConfirmadas: ["25-27 FEV 2026", "JUL 2026", "NOV 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: ["Alfredo Soares", "Tallis Gomes", "Flávio Augusto"],
    vagas: 50,
    local: "São Paulo - SP",
    ticketMedio: 15000,
    cronograma: [
      { dia: 1, tema: "Diagnóstico e Visão", horario: "09h-18h" },
      { dia: 2, tema: "Estratégia e Execução", horario: "09h-18h" },
      { dia: 3, tema: "Escala e Crescimento", horario: "09h-13h" },
    ],
    mes: 2,
    status: "confirmado",
  },
  {
    id: "calendario-exponencial",
    nome: "Calendário Exponencial",
    descricao: "Metodologia HyperCube para planejamento anual",
    datasConfirmadas: ["29-30 JAN 2026", "16-17 NOV 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: ["Ícaro de Carvalho", "Leandro Ladeira"],
    vagas: 50,
    local: "São Paulo - SP",
    ticketMedio: 8000,
    cronograma: [
      { dia: 1, tema: "Diagnóstico e Mapeamento", horario: "09h-18h" },
      { dia: 2, tema: "Construção do Calendário", horario: "09h-18h" },
    ],
    mes: 1,
    status: "confirmado",
  },
  {
    id: "brand-posicionamento",
    nome: "Brand e Posicionamento",
    descricao: "Construção de marca pessoal e posicionamento de mercado",
    datasConfirmadas: ["18-20 MAR 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: ["Ana Couto", "Fred Gelli"],
    vagas: 50,
    local: "São Paulo - SP",
    ticketMedio: 12000,
    cronograma: [],
    mes: 3,
    status: "confirmado",
  },
  {
    id: "criatividade-exponencial",
    nome: "Criatividade Exponencial",
    descricao: "Desbloqueio criativo e metodologias de inovação",
    datasConfirmadas: ["MAR 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: ["Murilo Gun", "Washington Olivetto"],
    vagas: 100,
    local: "Online + Presencial",
    ticketMedio: 4900,
    cronograma: [],
    mes: 3,
    status: "perpétuo",
  },
  {
    id: "sales-exponencial",
    nome: "Sales Exponencial",
    descricao: "Técnicas avançadas de vendas e negociação",
    datasConfirmadas: ["22-23 ABR 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: ["Ciro Bottini", "Thiago Concer"],
    vagas: 50,
    local: "São Paulo - SP",
    ticketMedio: 10000,
    cronograma: [],
    mes: 4,
    status: "planejado",
  },
  {
    id: "ia-exponencial",
    nome: "IA Exponencial",
    descricao: "Inteligência Artificial aplicada aos negócios",
    datasConfirmadas: ["MAI 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: ["Pedro Domingos", "Kai-Fu Lee"],
    vagas: 50,
    local: "São Paulo - SP",
    ticketMedio: 12000,
    cronograma: [],
    mes: 5,
    status: "planejado",
  },
  {
    id: "growth-exponencial",
    nome: "Growth Exponencial",
    descricao: "Estratégias de crescimento acelerado",
    datasConfirmadas: ["13-14 MAI 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: ["Sean Ellis", "Gabriel Costa"],
    vagas: 50,
    local: "São Paulo - SP",
    ticketMedio: 15000,
    cronograma: [],
    mes: 5,
    status: "planejado",
  },
  {
    id: "transnovacao-exponencial",
    nome: "Transnovação Exponencial (MBA)",
    descricao: "MBA executivo em inovação e transformação",
    datasConfirmadas: ["22-23 JUL 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: ["Silvio Meira", "Martha Gabriel"],
    vagas: 30,
    local: "São Paulo - SP",
    ticketMedio: 35000,
    cronograma: [],
    mes: 7,
    status: "planejado",
  },
  {
    id: "multiplica-exponencial",
    nome: "Multiplica Exponencial (MBA)",
    descricao: "MBA em multiplicação de negócios",
    datasConfirmadas: ["26-27 AGO 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: ["Flávio Augusto", "João Appolinário"],
    vagas: 30,
    local: "São Paulo - SP",
    ticketMedio: 30000,
    cronograma: [],
    mes: 8,
    status: "planejado",
  },
  {
    id: "cultura-exponencial",
    nome: "Cultura Exponencial (MBA)",
    descricao: "MBA em cultura organizacional",
    datasConfirmadas: ["28-29 SET 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: ["Daniel Pink", "Simon Sinek"],
    vagas: 30,
    local: "São Paulo - SP",
    ticketMedio: 35000,
    cronograma: [],
    mes: 9,
    status: "planejado",
  },
  {
    id: "black-exponencial",
    nome: "Black Exponencial",
    descricao: "Evento especial de Black Friday",
    datasConfirmadas: ["29-30 OUT 2026"],
    mentores: ["Allan Barros"],
    mentoresSugeridos: [],
    vagas: 100,
    local: "São Paulo - SP",
    ticketMedio: 5000,
    cronograma: [],
    mes: 10,
    status: "planejado",
  },
];

// Eventos externos - PERIGOS e OPORTUNIDADES por mês
const eventosPorMes: Record<number, { perigos: Array<{nome: string, organizador: string, tipo: string}>, oportunidades: Array<{nome: string, descricao: string, tipo: string}> }> = {
  1: {
    perigos: [
      { nome: "NRF Retail's Big Show", organizador: "NRF", tipo: "internacional" },
    ],
    oportunidades: [
      { nome: "Ano Novo - Metas e Planejamento", descricao: "Momento ideal para vender planejamento", tipo: "sazonal" },
      { nome: "Volta às aulas", descricao: "Pico de interesse em educação", tipo: "sazonal" },
    ]
  },
  2: {
    perigos: [
      { nome: "Carnaval", organizador: "Feriado Nacional", tipo: "feriado" },
    ],
    oportunidades: [
      { nome: "Pós-Carnaval", descricao: "Retomada de produtividade", tipo: "comportamental" },
      { nome: "Dia do Publicitário (01/02)", descricao: "Conteúdo para criativos", tipo: "data" },
    ]
  },
  3: {
    perigos: [
      { nome: "G4 Gestão e Estratégia", organizador: "G4 Educação", tipo: "concorrente" },
      { nome: "SXSW", organizador: "Austin", tipo: "internacional" },
    ],
    oportunidades: [
      { nome: "Dia da Mulher (08/03)", descricao: "Campanhas femininas", tipo: "data" },
      { nome: "Fim do Q1", descricao: "Revisão de metas", tipo: "business" },
    ]
  },
  4: {
    perigos: [
      { nome: "Imersão Vinci Society", organizador: "Thay Dantas", tipo: "concorrente" },
      { nome: "Páscoa", organizador: "Feriado", tipo: "feriado" },
    ],
    oportunidades: [
      { nome: "Dia do Empreendedor (05/04)", descricao: "Conteúdo empreendedorismo", tipo: "data" },
      { nome: "Início Q2", descricao: "Novas metas trimestrais", tipo: "business" },
    ]
  },
  5: {
    perigos: [
      { nome: "Novo Mercado Live", organizador: "Ícaro de Carvalho", tipo: "concorrente" },
      { nome: "Web Summit Rio", organizador: "Web Summit", tipo: "evento" },
    ],
    oportunidades: [
      { nome: "Dia das Mães", descricao: "Campanhas emocionais", tipo: "data" },
      { nome: "Dia do Trabalho (01/05)", descricao: "Conteúdo sobre carreira", tipo: "data" },
    ]
  },
  6: {
    perigos: [
      { nome: "Cannes Lions", organizador: "Cannes", tipo: "internacional" },
      { nome: "Festa Junina", organizador: "Tradição", tipo: "sazonal" },
    ],
    oportunidades: [
      { nome: "Dia dos Namorados (12/06)", descricao: "Campanhas de relacionamento", tipo: "data" },
      { nome: "Meio do ano", descricao: "Revisão semestral", tipo: "business" },
    ]
  },
  7: {
    perigos: [
      { nome: "Férias escolares", organizador: "Sazonal", tipo: "sazonal" },
    ],
    oportunidades: [
      { nome: "Prime Day Amazon", descricao: "Pico de e-commerce", tipo: "comercial" },
      { nome: "Início Q3", descricao: "Planejamento segundo semestre", tipo: "business" },
    ]
  },
  8: {
    perigos: [
      { nome: "Dia dos Pais", organizador: "Data Comercial", tipo: "sazonal" },
    ],
    oportunidades: [
      { nome: "Dia dos Pais (10/08)", descricao: "Campanhas paternidade", tipo: "data" },
      { nome: "Volta às aulas 2º semestre", descricao: "Educação corporativa", tipo: "sazonal" },
    ]
  },
  9: {
    perigos: [
      { nome: "Fire Festival", organizador: "Hotmart", tipo: "concorrente" },
      { nome: "Independência (07/09)", organizador: "Feriado", tipo: "feriado" },
    ],
    oportunidades: [
      { nome: "Semana Brasil", descricao: "Promoções nacionais", tipo: "comercial" },
      { nome: "Início Q4", descricao: "Sprint final do ano", tipo: "business" },
    ]
  },
  10: {
    perigos: [
      { nome: "Dia das Crianças", organizador: "Data Comercial", tipo: "sazonal" },
    ],
    oportunidades: [
      { nome: "Dia do Vendedor (01/10)", descricao: "Conteúdo de vendas", tipo: "data" },
      { nome: "Pré-Black Friday", descricao: "Aquecimento de base", tipo: "comercial" },
    ]
  },
  11: {
    perigos: [
      { nome: "RD Summit", organizador: "RD Station", tipo: "concorrente" },
      { nome: "Black Friday", organizador: "Varejo", tipo: "comercial" },
    ],
    oportunidades: [
      { nome: "Black Friday (27/11)", descricao: "Maior pico de vendas", tipo: "comercial" },
      { nome: "Cyber Monday", descricao: "Extensão de vendas", tipo: "comercial" },
    ]
  },
  12: {
    perigos: [
      { nome: "Festas de fim de ano", organizador: "Sazonal", tipo: "sazonal" },
      { nome: "Recesso empresarial", organizador: "Corporativo", tipo: "business" },
    ],
    oportunidades: [
      { nome: "Natal (25/12)", descricao: "Campanhas de gratidão", tipo: "data" },
      { nome: "Retrospectiva do ano", descricao: "Conteúdo de fechamento", tipo: "business" },
      { nome: "Planejamento próximo ano", descricao: "Venda de mentorias", tipo: "business" },
    ]
  },
};

const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

export default function Produtos() {
  const [nucleoAtivo, setNucleoAtivo] = useState<"MGS" | "ACELERAI">("MGS");
  const [mesSelecionado, setMesSelecionado] = useState(2); // Fevereiro
  const [segmentoSelecionado, setSegmentoSelecionado] = useState<string>("");
  const [buscaCelebridade, setBuscaCelebridade] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<typeof produtosMGS[0] | null>(null);
  
  const celebridadesDestaque = getCelebridadesDestaque();
  const celebridadesFiltradas = celebridades.filter(c => 
    c.nome.toLowerCase().includes(buscaCelebridade.toLowerCase()) ||
    c.categoria.toLowerCase().includes(buscaCelebridade.toLowerCase())
  );

  const produtosDoMes = produtosMGS.filter(p => p.mes === mesSelecionado);
  const eventosDoMes = eventosPorMes[mesSelecionado] || { perigos: [], oportunidades: [] };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "planejado": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "perpétuo": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "concorrente": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "internacional": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "feriado": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "sazonal": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "data": return "bg-pink-500/20 text-pink-400 border-pink-500/30";
      case "business": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "comercial": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-zinc-500/20 text-zinc-400 border-zinc-500/30";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Produtos</h1>
          <p className="text-zinc-400">Gestão de produtos e calendário de eventos</p>
        </div>
      </div>

      <Tabs value={nucleoAtivo} onValueChange={(v) => setNucleoAtivo(v as "MGS" | "ACELERAI")} className="space-y-6">
        <TabsList className="bg-zinc-900/50 border border-zinc-800">
          <TabsTrigger value="MGS" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Building2 className="w-4 h-4 mr-2" />
            MGS School
          </TabsTrigger>
          <TabsTrigger value="ACELERAI" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            Aceleraí
          </TabsTrigger>
        </TabsList>

        {/* MGS Products */}
        <TabsContent value="MGS" className="space-y-6">
          {/* Seletor de Mês */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMesSelecionado(mesSelecionado > 1 ? mesSelecionado - 1 : 12)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex gap-1">
                  {meses.map((mes, idx) => (
                    <button
                      key={mes}
                      onClick={() => setMesSelecionado(idx + 1)}
                      className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                        mesSelecionado === idx + 1
                          ? "bg-red-600 text-white"
                          : produtosMGS.some(p => p.mes === idx + 1)
                            ? "bg-zinc-800 text-white hover:bg-zinc-700"
                            : "bg-zinc-900 text-zinc-500 hover:bg-zinc-800"
                      }`}
                    >
                      {mes}
                    </button>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMesSelecionado(mesSelecionado < 12 ? mesSelecionado + 1 : 1)}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Layout do Mês */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna Principal - Produtos do Mês */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-400" />
                Produtos em {meses[mesSelecionado - 1]} 2026
                <Badge variant="outline" className="ml-2">{produtosDoMes.length} eventos</Badge>
              </h2>

              {produtosDoMes.length > 0 ? (
                <div className="space-y-3">
                  {produtosDoMes.map((produto) => (
                    <Card 
                      key={produto.id} 
                      className="bg-zinc-900/50 border-zinc-800 hover:border-red-500/50 transition-colors cursor-pointer"
                      onClick={() => setProdutoSelecionado(produto)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-white font-semibold">{produto.nome}</h3>
                              <Badge className={getStatusColor(produto.status)}>
                                {produto.status}
                              </Badge>
                            </div>
                            <p className="text-zinc-400 text-sm mb-3">{produto.descricao}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <span className="flex items-center gap-1 text-zinc-300">
                                <Calendar className="w-4 h-4 text-red-400" />
                                {produto.datasConfirmadas[0]}
                              </span>
                              <span className="flex items-center gap-1 text-zinc-300">
                                <Users className="w-4 h-4 text-blue-400" />
                                {produto.vagas} vagas
                              </span>
                              <span className="flex items-center gap-1 text-zinc-300">
                                <MapPin className="w-4 h-4 text-green-400" />
                                {produto.local}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-green-400 font-bold text-lg">
                              R$ {produto.ticketMedio.toLocaleString('pt-BR')}
                            </p>
                            <p className="text-zinc-500 text-xs">ticket médio</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-zinc-900/30 border-zinc-800 border-dashed">
                  <CardContent className="py-12 text-center">
                    <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                    <p className="text-zinc-500">Nenhum produto agendado para {meses[mesSelecionado - 1]}</p>
                    <Button variant="outline" className="mt-4 border-zinc-700">
                      Agendar Produto
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Coluna Lateral - Perigos e Oportunidades */}
            <div className="space-y-4">
              {/* Perigos */}
              <Card className="bg-red-950/20 border-red-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-red-400 flex items-center gap-2 text-base">
                    <AlertTriangle className="w-5 h-5" />
                    Perigos em {meses[mesSelecionado - 1]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {eventosDoMes.perigos.length > 0 ? (
                    eventosDoMes.perigos.map((evento, idx) => (
                      <div 
                        key={idx} 
                        className="bg-red-900/20 border border-red-500/20 rounded-lg px-3 py-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-red-300 font-medium text-sm">{evento.nome}</span>
                          <Badge className={getTipoColor(evento.tipo)} variant="outline">
                            {evento.tipo}
                          </Badge>
                        </div>
                        <p className="text-red-400/60 text-xs mt-1">{evento.organizador}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-red-400/50 text-sm text-center py-4">Nenhum perigo identificado</p>
                  )}
                </CardContent>
              </Card>

              {/* Oportunidades */}
              <Card className="bg-green-950/20 border-green-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-400 flex items-center gap-2 text-base">
                    <TrendingUp className="w-5 h-5" />
                    Oportunidades em {meses[mesSelecionado - 1]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {eventosDoMes.oportunidades.length > 0 ? (
                    eventosDoMes.oportunidades.map((oportunidade, idx) => (
                      <div 
                        key={idx} 
                        className="bg-green-900/20 border border-green-500/20 rounded-lg px-3 py-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-green-300 font-medium text-sm">{oportunidade.nome}</span>
                          <Badge className={getTipoColor(oportunidade.tipo)} variant="outline">
                            {oportunidade.tipo}
                          </Badge>
                        </div>
                        <p className="text-green-400/60 text-xs mt-1">{oportunidade.descricao}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-green-400/50 text-sm text-center py-4">Nenhuma oportunidade mapeada</p>
                  )}
                </CardContent>
              </Card>

              {/* Resumo do Mês */}
              <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white flex items-center gap-2 text-base">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Resumo {meses[mesSelecionado - 1]}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Produtos</span>
                    <span className="text-white font-medium">{produtosDoMes.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Vagas totais</span>
                    <span className="text-white font-medium">
                      {produtosDoMes.reduce((acc, p) => acc + p.vagas, 0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Potencial</span>
                    <span className="text-green-400 font-medium">
                      R$ {produtosDoMes.reduce((acc, p) => acc + (p.vagas * p.ticketMedio), 0).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Perigos</span>
                    <span className="text-red-400 font-medium">{eventosDoMes.perigos.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Oportunidades</span>
                    <span className="text-green-400 font-medium">{eventosDoMes.oportunidades.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Visão Anual Compacta */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-400" />
                Visão Anual 2026
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-2">
                {meses.map((mes, idx) => {
                  const produtos = produtosMGS.filter(p => p.mes === idx + 1);
                  const eventos = eventosPorMes[idx + 1] || { perigos: [], oportunidades: [] };
                  return (
                    <div 
                      key={mes}
                      className={`p-2 rounded-lg border cursor-pointer transition-all ${
                        mesSelecionado === idx + 1 
                          ? "border-red-500 bg-red-500/10" 
                          : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-700"
                      }`}
                      onClick={() => setMesSelecionado(idx + 1)}
                    >
                      <p className="text-xs font-medium text-center text-zinc-400 mb-2">{mes}</p>
                      <div className="space-y-1">
                        {produtos.length > 0 && (
                          <div className="flex items-center justify-center gap-1">
                            <Target className="w-3 h-3 text-red-400" />
                            <span className="text-xs text-white">{produtos.length}</span>
                          </div>
                        )}
                        {eventos.perigos.length > 0 && (
                          <div className="flex items-center justify-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            <span className="text-xs text-amber-400">{eventos.perigos.length}</span>
                          </div>
                        )}
                        {eventos.oportunidades.length > 0 && (
                          <div className="flex items-center justify-center gap-1">
                            <Gift className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400">{eventos.oportunidades.length}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Modal de detalhes do produto */}
          {produtoSelecionado && (
            <Dialog open={!!produtoSelecionado} onOpenChange={() => setProdutoSelecionado(null)}>
              <DialogContent className="bg-zinc-900 border-zinc-800 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white text-xl flex items-center gap-3">
                    {produtoSelecionado.nome}
                    <Badge className={getStatusColor(produtoSelecionado.status)}>
                      {produtoSelecionado.status}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <p className="text-zinc-400">{produtoSelecionado.descricao}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <p className="text-xs text-zinc-500 mb-1">Datas Confirmadas</p>
                      <div className="space-y-1">
                        {produtoSelecionado.datasConfirmadas.map((data, idx) => (
                          <p key={idx} className="text-white font-medium">{data}</p>
                        ))}
                      </div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-4">
                      <p className="text-xs text-zinc-500 mb-1">Vagas / Ticket</p>
                      <p className="text-white font-medium">{produtoSelecionado.vagas} vagas</p>
                      <p className="text-green-400 font-medium">
                        R$ {produtoSelecionado.ticketMedio.toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>

                  {produtoSelecionado.cronograma.length > 0 && (
                    <div>
                      <p className="text-xs text-zinc-500 mb-2">Cronograma</p>
                      <div className="space-y-2">
                        {produtoSelecionado.cronograma.map((dia, idx) => (
                          <div key={idx} className="bg-zinc-800/50 rounded-lg p-3 flex items-center justify-between">
                            <div>
                              <span className="text-red-400 font-medium">Dia {dia.dia}:</span>
                              <span className="text-white ml-2">{dia.tema}</span>
                            </div>
                            <span className="text-zinc-500 text-sm">{dia.horario}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-zinc-500 mb-2">Mentores Sugeridos</p>
                    <div className="flex flex-wrap gap-2">
                      {produtoSelecionado.mentoresSugeridos.map((mentor, idx) => (
                        <Badge key={idx} variant="outline" className="border-zinc-700 text-zinc-300">
                          <Star className="w-3 h-3 mr-1 text-yellow-500" />
                          {mentor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-red-600 hover:bg-red-700">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Produto
                    </Button>
                    <Button variant="outline" className="border-zinc-700">
                      <Search className="w-4 h-4 mr-2" />
                      Pesquisar Leads
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        {/* Aceleraí */}
        <TabsContent value="ACELERAI" className="space-y-6">
          {/* Segmentos */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-400" />
                Segmentos de Atuação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {segmentos.map((segmento) => (
                  <div 
                    key={segmento.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      segmentoSelecionado === segmento.id 
                        ? "bg-red-600/20 border-red-500" 
                        : "bg-zinc-800/50 border-zinc-700 hover:border-zinc-600"
                    }`}
                    onClick={() => setSegmentoSelecionado(
                      segmentoSelecionado === segmento.id ? "" : segmento.id
                    )}
                  >
                    <p className="text-white font-medium">{segmento.nome}</p>
                    <p className="text-zinc-400 text-xs mt-1">{segmento.descricao}</p>
                    <p className="text-red-400 text-xs mt-2">
                      {segmento.celebridadesSugeridas.length} celebridades
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Celebridades em Destaque */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Celebridades em Destaque
                </CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <Input 
                    placeholder="Buscar celebridade..."
                    value={buscaCelebridade}
                    onChange={(e) => setBuscaCelebridade(e.target.value)}
                    className="pl-9 bg-zinc-800 border-zinc-700"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {(buscaCelebridade ? celebridadesFiltradas : celebridadesDestaque).slice(0, 12).map((celeb) => (
                  <div 
                    key={celeb.id}
                    className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 text-center hover:border-red-500/50 transition-colors"
                  >
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mb-3">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white font-medium text-sm">{celeb.nome}</p>
                    <Badge variant="outline" className="mt-2 text-xs border-zinc-600 text-zinc-400">
                      {celeb.categoria}
                    </Badge>
                  </div>
                ))}
              </div>
              
              {buscaCelebridade && celebridadesFiltradas.length === 0 && (
                <p className="text-center text-zinc-500 py-8">
                  Nenhuma celebridade encontrada para "{buscaCelebridade}"
                </p>
              )}
            </CardContent>
          </Card>

          {/* Lista completa de celebridades */}
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-white">
                Elenco Completo ({celebridades.length} artistas)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {celebridades.map((celeb) => (
                    <div 
                      key={celeb.id}
                      className="bg-zinc-800/30 border border-zinc-800 rounded px-3 py-2 text-sm hover:bg-zinc-800/50 transition-colors"
                    >
                      <p className="text-white truncate">{celeb.nome}</p>
                      <p className="text-zinc-500 text-xs">{celeb.categoria}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
