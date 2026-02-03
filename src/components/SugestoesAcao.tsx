import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Lightbulb, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  Target,
  ChevronRight,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';
import { 
  gerarSugestoesAcao, 
  principiosAllanBarros, 
  datasEConjecturas2026,
  sugestoesPorProdutoMGS,
  sugestoesPorSegmentoAcelerai,
  type SugestaoAcao 
} from '@/data/ensinamentosAllanBarros';

interface SugestoesAcaoProps {
  campanhasExistentes?: any[];
  onAplicarSugestao?: (sugestao: SugestaoAcao) => void;
}

const meses = [
  { value: '1', label: 'Janeiro' },
  { value: '2', label: 'Fevereiro' },
  { value: '3', label: 'Março' },
  { value: '4', label: 'Abril' },
  { value: '5', label: 'Maio' },
  { value: '6', label: 'Junho' },
  { value: '7', label: 'Julho' },
  { value: '8', label: 'Agosto' },
  { value: '9', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' },
];

const tiers = [
  { value: '1', label: 'T1 - Lançamento' },
  { value: '2', label: 'T2 - Funis Diversos' },
  { value: '3', label: 'T3 - Perpétuo' },
  { value: '4', label: 'T4 - Recuperação/RMKT' },
  { value: '5', label: 'T5 - Upsell' },
];

const produtosMGS = [
  'Calendário Exponencial',
  'Criatividade Exponencial',
  'Growth Exponencial',
  'Branding Exponencial',
  'Black Exponencial',
  'Sales Exponencial',
  'IA Exponencial',
];

export function SugestoesAcao({ campanhasExistentes = [], onAplicarSugestao }: SugestoesAcaoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filtroNucleo, setFiltroNucleo] = useState<string>('todos');
  const [filtroMesInicio, setFiltroMesInicio] = useState<string>('1');
  const [filtroMesFim, setFiltroMesFim] = useState<string>('12');
  const [filtroTier, setFiltroTier] = useState<string>('todos');
  const [filtroProduto, setFiltroProduto] = useState<string>('todos');
  const [abaAtiva, setAbaAtiva] = useState<'gaps' | 'principios' | 'calendario'>('gaps');

  // Gerar sugestões baseadas nos filtros
  const sugestoes = useMemo(() => {
    const todasSugestoes = gerarSugestoesAcao(
      campanhasExistentes,
      filtroNucleo as 'mgs' | 'acelerai' | 'todos',
      parseInt(filtroMesInicio),
      parseInt(filtroMesFim)
    );

    return todasSugestoes.filter(s => {
      if (filtroTier !== 'todos' && s.tier !== parseInt(filtroTier)) return false;
      if (filtroNucleo !== 'todos' && s.nucleo !== filtroNucleo && s.nucleo !== 'ambos') return false;
      return true;
    });
  }, [campanhasExistentes, filtroNucleo, filtroMesInicio, filtroMesFim, filtroTier]);

  // Sugestões por produto
  const sugestoesProduto = useMemo(() => {
    if (filtroProduto === 'todos') return [];
    return sugestoesPorProdutoMGS[filtroProduto] || [];
  }, [filtroProduto]);

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'media': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'baixa': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'gap_mes': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'data_nao_aproveitada': return <Calendar className="w-4 h-4 text-yellow-400" />;
      case 'conjectura': return <TrendingUp className="w-4 h-4 text-blue-400" />;
      case 'oportunidade': return <Sparkles className="w-4 h-4 text-green-400" />;
      default: return <Lightbulb className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10">
          <Lightbulb className="w-4 h-4" />
          Sugestões de Ação
          {sugestoes.filter(s => s.prioridade === 'alta').length > 0 && (
            <Badge variant="destructive" className="ml-1 px-1.5 py-0.5 text-xs">
              {sugestoes.filter(s => s.prioridade === 'alta').length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Sugestões de Ação - Metodologia Allan Barros
          </DialogTitle>
        </DialogHeader>

        {/* Abas */}
        <div className="flex gap-2 border-b border-zinc-700 pb-2">
          <Button
            variant={abaAtiva === 'gaps' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setAbaAtiva('gaps')}
            className="gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Gaps e Oportunidades
            <Badge variant="secondary" className="ml-1">{sugestoes.length}</Badge>
          </Button>
          <Button
            variant={abaAtiva === 'principios' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setAbaAtiva('principios')}
            className="gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Princípios Allan
          </Button>
          <Button
            variant={abaAtiva === 'calendario' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setAbaAtiva('calendario')}
            className="gap-2"
          >
            <Calendar className="w-4 h-4" />
            Calendário 2026
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 p-3 bg-zinc-800/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-400" />
            <span className="text-sm text-zinc-400">Filtros:</span>
          </div>
          
          <Select value={filtroNucleo} onValueChange={setFiltroNucleo}>
            <SelectTrigger className="w-32 h-8 text-sm bg-zinc-800 border-zinc-600">
              <SelectValue placeholder="Núcleo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="mgs">MGS</SelectItem>
              <SelectItem value="acelerai">Aceleraí</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-1">
            <Select value={filtroMesInicio} onValueChange={setFiltroMesInicio}>
              <SelectTrigger className="w-28 h-8 text-sm bg-zinc-800 border-zinc-600">
                <SelectValue placeholder="Mês início" />
              </SelectTrigger>
              <SelectContent>
                {meses.map(m => (
                  <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-zinc-500">a</span>
            <Select value={filtroMesFim} onValueChange={setFiltroMesFim}>
              <SelectTrigger className="w-28 h-8 text-sm bg-zinc-800 border-zinc-600">
                <SelectValue placeholder="Mês fim" />
              </SelectTrigger>
              <SelectContent>
                {meses.map(m => (
                  <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Select value={filtroTier} onValueChange={setFiltroTier}>
            <SelectTrigger className="w-40 h-8 text-sm bg-zinc-800 border-zinc-600">
              <SelectValue placeholder="Tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Tiers</SelectItem>
              {tiers.map(t => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {filtroNucleo === 'mgs' && (
            <Select value={filtroProduto} onValueChange={setFiltroProduto}>
              <SelectTrigger className="w-44 h-8 text-sm bg-zinc-800 border-zinc-600">
                <SelectValue placeholder="Produto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Produtos</SelectItem>
                {produtosMGS.map(p => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <ScrollArea className="h-[50vh] pr-4">
          {/* Aba Gaps e Oportunidades */}
          {abaAtiva === 'gaps' && (
            <div className="space-y-3">
              {sugestoes.length === 0 ? (
                <div className="text-center py-8 text-zinc-500">
                  <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum gap identificado com os filtros atuais.</p>
                  <p className="text-sm mt-1">Seu planejamento está bem estruturado!</p>
                </div>
              ) : (
                sugestoes.map((sugestao) => (
                  <div
                    key={sugestao.id}
                    className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        {getTipoIcon(sugestao.tipo)}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-white">{sugestao.titulo}</h4>
                            <Badge className={`text-xs ${getPrioridadeColor(sugestao.prioridade)}`}>
                              {sugestao.prioridade}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              T{sugestao.tier}
                            </Badge>
                            {sugestao.mes && (
                              <Badge variant="secondary" className="text-xs">
                                {meses.find(m => m.value === String(sugestao.mes))?.label}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-zinc-400">{sugestao.descricao}</p>
                          <div className="p-2 bg-zinc-900/50 rounded border-l-2 border-yellow-500/50">
                            <p className="text-xs text-zinc-500 italic">
                              <BookOpen className="w-3 h-3 inline mr-1" />
                              {sugestao.fundamentacao}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-green-400">
                            <ChevronRight className="w-4 h-4" />
                            <span>{sugestao.acaoSugerida}</span>
                          </div>
                        </div>
                      </div>
                      {onAplicarSugestao && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onAplicarSugestao(sugestao)}
                          className="shrink-0"
                        >
                          Aplicar
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Sugestões específicas por produto */}
              {filtroProduto !== 'todos' && sugestoesProduto.length > 0 && (
                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <h4 className="font-medium text-blue-400 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Sugestões específicas para {filtroProduto}
                  </h4>
                  <ul className="space-y-2">
                    {sugestoesProduto.map((sugestao, idx) => (
                      <li key={idx} className="text-sm text-zinc-300 flex items-start gap-2">
                        <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        {sugestao}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Aba Princípios Allan */}
          {abaAtiva === 'principios' && (
            <div className="space-y-4">
              {principiosAllanBarros.map((principio) => (
                <div
                  key={principio.id}
                  className="p-4 bg-zinc-800/50 rounded-lg border border-zinc-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <BookOpen className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white">{principio.titulo}</h4>
                        <Badge variant="outline" className="text-xs capitalize">
                          {principio.categoria}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-300">{principio.principio}</p>
                      <div className="p-2 bg-zinc-900/50 rounded">
                        <p className="text-xs text-zinc-400">
                          <strong className="text-green-400">Aplicação:</strong> {principio.aplicacao}
                        </p>
                      </div>
                      <p className="text-sm text-yellow-400 italic">
                        "{principio.perguntaChave}"
                      </p>
                      <div className="flex gap-2 mt-2">
                        {principio.tiersRecomendados.map(t => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            T{t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Aba Calendário 2026 */}
          {abaAtiva === 'calendario' && (
            <div className="space-y-3">
              {datasEConjecturas2026.map((data, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700 flex items-center gap-4"
                >
                  <div className="w-16 text-center">
                    <div className="text-2xl font-bold text-white">
                      {String(data.mes).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {meses.find(m => m.value === String(data.mes))?.label.slice(0, 3)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-white">{data.evento}</h4>
                      <Badge 
                        variant="outline" 
                        className={data.tipo === 'data' ? 'text-blue-400 border-blue-400/30' : 'text-purple-400 border-purple-400/30'}
                      >
                        {data.tipo === 'data' ? 'Data' : 'Conjectura'}
                      </Badge>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">
                      <Sparkles className="w-3 h-3 inline mr-1 text-green-400" />
                      Oportunidade: {data.oportunidade}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default SugestoesAcao;
