import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Upload, 
  Wand2, 
  Play, 
  Clock, 
  Music, 
  Copy, 
  Check, 
  Image as ImageIcon,
  Video,
  Scissors,
  Sparkles,
  Link,
  FileText,
  RefreshCw
} from 'lucide-react';
import { metodologiasCriativo, sugestoesTrilhas } from '@/data/frameworksData';

// Tipos
interface VariacaoEstatico {
  id: string;
  titulo: string;
  textoSugerido: string;
  metodologia: string;
  estilo: string;
  editado: boolean;
}

interface CorteVideo {
  id: string;
  inicio: string;
  fim: string;
  duracao: string;
  descricao: string;
  motivo: string;
  trilhaSugerida: string;
  tipoTrilha: string;
  score: number;
}

interface VideoAnalise {
  url: string;
  titulo: string;
  duracao: string;
  cortesSugeridos: CorteVideo[];
}

// Componente de Upload de Referência
export function UploadReferencia({ 
  onUpload 
}: { 
  onUpload: (file: File | string) => void 
}) {
  const [urlInput, setUrlInput] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      setTimeout(() => {
        onUpload(file);
        setUploading(false);
      }, 1000);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput) {
      onUpload(urlInput);
      setUrlInput('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-red-500/50 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-400">
            {uploading ? 'Enviando...' : 'Arraste uma imagem ou clique para fazer upload'}
          </p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG até 10MB</p>
        </label>
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder="Ou cole o link de uma referência..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="bg-black/30 border-white/10"
        />
        <Button onClick={handleUrlSubmit} variant="outline" size="icon">
          <Link className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Componente de Variações de Estáticos
export function VariacoesEstaticos({ 
  bigIdea,
  dor,
  transformacao,
  produto
}: { 
  bigIdea: string;
  dor: string;
  transformacao: string;
  produto: string;
}) {
  const [referencia, setReferencia] = useState<File | string | null>(null);
  const [variacoes, setVariacoes] = useState<VariacaoEstatico[]>([]);
  const [gerando, setGerando] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const gerarVariacoes = () => {
    setGerando(true);
    
    // Simulação de geração de variações com IA
    setTimeout(() => {
      const novasVariacoes: VariacaoEstatico[] = [
        {
          id: '1',
          titulo: 'Variação AIDA - Atenção',
          textoSugerido: `🚀 ${bigIdea || 'Transforme seu negócio'}\n\n${dor || 'Cansado de resultados medianos?'}\n\n${transformacao || 'Descubra o método que já ajudou +1000 empresários'}\n\n👉 Link na bio`,
          metodologia: 'AIDA',
          estilo: 'Impactante',
          editado: false
        },
        {
          id: '2',
          titulo: 'Variação PAS - Problema',
          textoSugerido: `❌ O PROBLEMA:\n${dor || 'Você trabalha 12h por dia e não vê resultado'}\n\n✅ A SOLUÇÃO:\n${produto || 'Calendário Exponencial'}\n\n🎯 ${transformacao || 'Fature 10x mais trabalhando menos'}\n\n🔗 Saiba mais`,
          metodologia: 'PAS',
          estilo: 'Direto',
          editado: false
        },
        {
          id: '3',
          titulo: 'Variação BAB - Antes/Depois',
          textoSugerido: `ANTES: 😰 ${dor || 'Sem previsibilidade de faturamento'}\n\nDEPOIS: 🎯 ${transformacao || 'Calendário completo com todas as ações do ano'}\n\nA PONTE: ${produto || 'Calendário Exponencial'}\n\n📲 Clique e transforme seu negócio`,
          metodologia: 'BAB',
          estilo: 'Transformacional',
          editado: false
        },
        {
          id: '4',
          titulo: 'Variação Hook-Story-Offer',
          textoSugerido: `⚡ ${bigIdea || 'E se você pudesse planejar todo seu ano em 3 dias?'}\n\nEu também achava impossível até descobrir esse método...\n\n${produto || 'Calendário Exponencial'} - Vagas limitadas\n\n🔥 Link na bio`,
          metodologia: 'Hook-Story-Offer',
          estilo: 'Storytelling',
          editado: false
        },
        {
          id: '5',
          titulo: 'Variação Prova Social',
          textoSugerido: `📊 RESULTADOS REAIS:\n\n✅ +R$ 30M faturados pelos alunos\n✅ +1000 empresários transformados\n✅ ROAS médio de 5x\n\n${bigIdea || 'Seu negócio pode ser o próximo'}\n\n👇 Garanta sua vaga`,
          metodologia: '4Ps',
          estilo: 'Prova Social',
          editado: false
        }
      ];
      
      setVariacoes(novasVariacoes);
      setGerando(false);
    }, 2000);
  };

  const handleTextChange = (id: string, novoTexto: string) => {
    setVariacoes(prev => prev.map(v => 
      v.id === id ? { ...v, textoSugerido: novoTexto, editado: true } : v
    ));
  };

  const copyToClipboard = (texto: string, id: string) => {
    navigator.clipboard.writeText(texto);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ImageIcon className="w-5 h-5 text-red-500" />
          Gerador de Variações de Estáticos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-400 mb-2">Referência (opcional)</p>
            <UploadReferencia onUpload={(file) => setReferencia(file)} />
            {referencia && (
              <Badge className="mt-2 bg-green-500/20 text-green-400">
                <Check className="w-3 h-3 mr-1" /> Referência carregada
              </Badge>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Metodologia preferida</p>
            <Select>
              <SelectTrigger className="bg-black/30 border-white/10">
                <SelectValue placeholder="Todas as metodologias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as metodologias</SelectItem>
                {metodologiasCriativo.map(m => (
                  <SelectItem key={m.id} value={m.id}>{m.nome} - {m.descricao}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              onClick={gerarVariacoes} 
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 mt-4"
              disabled={gerando}
            >
              {gerando ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Gerando variações...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Gerar 5 Variações com IA
                </>
              )}
            </Button>
          </div>
        </div>

        {variacoes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {variacoes.map((variacao) => (
              <Card key={variacao.id} className="bg-black/30 border-white/10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {variacao.metodologia}
                    </Badge>
                    {variacao.editado && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                        Editado
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-sm">{variacao.titulo}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={variacao.textoSugerido}
                    onChange={(e) => handleTextChange(variacao.id, e.target.value)}
                    className="bg-black/30 border-white/10 text-sm min-h-[150px]"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => copyToClipboard(variacao.textoSugerido, variacao.id)}
                    >
                      {copiedId === variacao.id ? (
                        <><Check className="w-3 h-3 mr-1" /> Copiado</>
                      ) : (
                        <><Copy className="w-3 h-3 mr-1" /> Copiar</>
                      )}
                    </Button>
                    <Badge className="bg-gray-700/50 text-xs">
                      {variacao.estilo}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Componente de Análise de Vídeo
export function AnaliseVideo({ 
  produto 
}: { 
  produto: string 
}) {
  const [videos, setVideos] = useState<VideoAnalise[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [analisando, setAnalisando] = useState(false);
  const [tipoTrilha, setTipoTrilha] = useState<'motivacional' | 'educacional' | 'urgencia' | 'emocional'>('motivacional');

  const adicionarVideo = () => {
    if (!urlInput) return;
    
    setAnalisando(true);
    
    // Simulação de análise de vídeo com IA
    setTimeout(() => {
      const novoVideo: VideoAnalise = {
        url: urlInput,
        titulo: `Vídeo ${videos.length + 1} - ${produto || 'Conteúdo'}`,
        duracao: '45:32',
        cortesSugeridos: [
          {
            id: '1',
            inicio: '02:15',
            fim: '03:42',
            duracao: '1:27',
            descricao: 'Momento de insight sobre transformação de negócios',
            motivo: 'Alta energia emocional + frase de impacto + expressão facial engajante',
            trilhaSugerida: 'Epic Cinematic',
            tipoTrilha: 'motivacional',
            score: 95
          },
          {
            id: '2',
            inicio: '08:30',
            fim: '09:15',
            duracao: '0:45',
            descricao: 'Explicação do método com exemplo prático',
            motivo: 'Clareza na explicação + gestos enfáticos + conteúdo educacional valioso',
            trilhaSugerida: 'Minimal Tech',
            tipoTrilha: 'educacional',
            score: 88
          },
          {
            id: '3',
            inicio: '15:20',
            fim: '16:45',
            duracao: '1:25',
            descricao: 'História de superação de aluno',
            motivo: 'Prova social forte + emoção genuína + resultado concreto mencionado',
            trilhaSugerida: 'Heartfelt Strings',
            tipoTrilha: 'emocional',
            score: 92
          },
          {
            id: '4',
            inicio: '28:10',
            fim: '29:30',
            duracao: '1:20',
            descricao: 'Chamada para ação com urgência',
            motivo: 'Tom de voz urgente + escassez real + benefícios claros',
            trilhaSugerida: 'Countdown Tension',
            tipoTrilha: 'urgencia',
            score: 90
          },
          {
            id: '5',
            inicio: '42:00',
            fim: '43:15',
            duracao: '1:15',
            descricao: 'Fechamento inspiracional',
            motivo: 'Mensagem de empoderamento + olhar direto para câmera + frase memorável',
            trilhaSugerida: 'Victory Theme',
            tipoTrilha: 'motivacional',
            score: 94
          }
        ]
      };
      
      setVideos(prev => [...prev, novoVideo]);
      setUrlInput('');
      setAnalisando(false);
    }, 3000);
  };

  const getTrilhasSugeridas = () => {
    return sugestoesTrilhas[tipoTrilha] || [];
  };

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Video className="w-5 h-5 text-red-500" />
          Analisador de Vídeos para Cortes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Cole o link do YouTube, entrevista ou podcast..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="bg-black/30 border-white/10"
          />
          <Button 
            onClick={adicionarVideo}
            disabled={analisando || !urlInput}
            className="bg-red-600 hover:bg-red-700"
          >
            {analisando ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <Scissors className="w-4 h-4 mr-2" />
                Analisar
              </>
            )}
          </Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          <p className="text-sm text-gray-400 w-full mb-1">Tipo de trilha preferido:</p>
          {(['motivacional', 'educacional', 'urgencia', 'emocional'] as const).map((tipo) => (
            <Button
              key={tipo}
              size="sm"
              variant={tipoTrilha === tipo ? 'default' : 'outline'}
              onClick={() => setTipoTrilha(tipo)}
              className={tipoTrilha === tipo ? 'bg-red-600' : ''}
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </Button>
          ))}
        </div>

        {/* Sugestões de Trilhas */}
        <div className="bg-black/30 rounded-lg p-4">
          <p className="text-sm font-medium mb-2 flex items-center gap-2">
            <Music className="w-4 h-4 text-red-500" />
            Trilhas Sugeridas ({tipoTrilha})
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {getTrilhasSugeridas().map((trilha, idx) => (
              <div key={idx} className="bg-black/40 rounded p-2 text-xs">
                <p className="font-medium text-white">{trilha.nome}</p>
                <p className="text-gray-400">{trilha.estilo}</p>
                <p className="text-gray-500">Uso: {trilha.uso}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vídeos Analisados */}
        {videos.map((video, videoIdx) => (
          <Card key={videoIdx} className="bg-black/30 border-white/10">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Play className="w-4 h-4 text-red-500" />
                  {video.titulo}
                </CardTitle>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {video.duracao}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 truncate">{video.url}</p>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                5 Melhores Cortes Sugeridos pela IA
              </p>
              <div className="space-y-3">
                {video.cortesSugeridos.map((corte, idx) => (
                  <div key={corte.id} className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-red-600 text-white">
                          #{idx + 1}
                        </Badge>
                        <span className="text-sm font-mono text-green-400">
                          {corte.inicio} → {corte.fim}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {corte.duracao}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${corte.score >= 90 ? 'bg-green-600' : 'bg-yellow-600'}`}>
                          Score: {corte.score}%
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-white mb-1">{corte.descricao}</p>
                    <p className="text-xs text-gray-400 mb-2">
                      <strong>Por que esse corte:</strong> {corte.motivo}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <Music className="w-3 h-3 text-purple-400" />
                      <span className="text-purple-400">Trilha sugerida:</span>
                      <Badge variant="outline" className="text-purple-300">
                        {corte.trilhaSugerida}
                      </Badge>
                      <Badge className="bg-purple-900/50 text-purple-300">
                        {corte.tipoTrilha}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}

// Componente de Documento Orientador
export function DocumentoOrientador({
  nucleo,
  produto,
  bigIdea,
  dor,
  transformacao,
  icp,
  objetivo,
  tipoFunil
}: {
  nucleo: string;
  produto: string;
  bigIdea: string;
  dor: string;
  transformacao: string;
  icp: string;
  objetivo: string;
  tipoFunil: string;
}) {
  const [gerando, setGerando] = useState(false);
  const [documentoGerado, setDocumentoGerado] = useState(false);

  const gerarDocumento = () => {
    setGerando(true);
    setTimeout(() => {
      setGerando(false);
      setDocumentoGerado(true);
    }, 2500);
  };

  if (nucleo !== 'mgs') {
    return (
      <Card className="bg-black/40 border-white/10">
        <CardContent className="py-8 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-gray-500" />
          <p className="text-gray-400">
            O Documento Orientador com Framework Teórico está disponível apenas para produtos MGS.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="w-5 h-5 text-red-500" />
          Documento Orientador
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-400">
          Gere um briefing completo com base na metodologia Allan Barros, incluindo framework teórico, 
          pesquisa de mercado, histórico de campanhas e recomendações estratégicas.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-xs text-gray-500">Produto</p>
            <p className="text-sm font-medium">{produto || 'Não definido'}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-xs text-gray-500">Objetivo</p>
            <p className="text-sm font-medium">{objetivo || 'Não definido'}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-xs text-gray-500">Tipo de Funil</p>
            <p className="text-sm font-medium">{tipoFunil || 'Não definido'}</p>
          </div>
          <div className="bg-black/30 rounded-lg p-3">
            <p className="text-xs text-gray-500">ICP</p>
            <p className="text-sm font-medium truncate">{icp || 'Não definido'}</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-900/30 to-black/30 rounded-lg p-4 border border-red-500/20">
          <p className="text-sm font-medium mb-2">O documento incluirá:</p>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>✓ Briefing completo do produto com histórico</li>
            <li>✓ Framework teórico da metodologia Allan Barros (módulos específicos)</li>
            <li>✓ Pesquisa de mercado e concorrentes</li>
            <li>✓ Referências selecionadas de campanhas similares</li>
            <li>✓ Pontos definidos vs pontos a definir</li>
            <li>✓ Alertas e riscos identificados</li>
            <li>✓ Vantagens competitivas</li>
            <li>✓ Checklist de entregáveis</li>
          </ul>
        </div>

        <Button 
          onClick={gerarDocumento}
          disabled={gerando}
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
        >
          {gerando ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Gerando documento...
            </>
          ) : documentoGerado ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Documento Gerado - Clique para Regenerar
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Gerar Documento Orientador
            </>
          )}
        </Button>

        {documentoGerado && (
          <Card className="bg-black/30 border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-green-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Documento Orientador - {produto}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium text-white mb-2">1. Briefing do Produto</h4>
                <p className="text-gray-400">
                  {produto} é um produto Tier 1 da MGS focado em {objetivo?.toLowerCase() || 'transformação de negócios'}. 
                  Histórico de campanhas anteriores mostra ROAS médio de 4.5x com ticket médio de R$ 15.000.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">2. Framework Teórico (Metodologia Allan Barros)</h4>
                <div className="bg-black/40 rounded p-3">
                  <p className="text-xs text-red-400 mb-2">Módulos aplicáveis a esta campanha:</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    <li>• Módulo 1: Diagnóstico Exponencial - Análise do estado atual</li>
                    <li>• Módulo 2: Visão de Futuro - Definição de metas exponenciais</li>
                    <li>• Módulo 3: Construção do Calendário - Planejamento de ações</li>
                    <li>• Módulo 4: Plano de Execução - Detalhamento operacional</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">3. Big Idea e Conceito</h4>
                <p className="text-gray-400">{bigIdea || 'A definir pelo copy'}</p>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">4. Dor e Transformação</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-red-900/20 rounded p-2">
                    <p className="text-xs text-red-400">DOR</p>
                    <p className="text-xs text-gray-300">{dor || 'A definir'}</p>
                  </div>
                  <div className="bg-green-900/20 rounded p-2">
                    <p className="text-xs text-green-400">TRANSFORMAÇÃO</p>
                    <p className="text-xs text-gray-300">{transformacao || 'A definir'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">5. Alertas</h4>
                <ul className="text-xs text-yellow-400 space-y-1">
                  <li>⚠️ Verificar disponibilidade de datas com produção</li>
                  <li>⚠️ Evento concorrente no mesmo período (G4 Summit)</li>
                  <li>⚠️ Necessário aprovar criativos com antecedência</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">6. Vantagens Competitivas</h4>
                <ul className="text-xs text-green-400 space-y-1">
                  <li>✓ Metodologia exclusiva HyperCube</li>
                  <li>✓ Cases de sucesso documentados</li>
                  <li>✓ Presença do Allan Barros</li>
                  <li>✓ Networking com outros empresários</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline">
                  <Copy className="w-3 h-3 mr-1" /> Copiar
                </Button>
                <Button size="sm" variant="outline">
                  <FileText className="w-3 h-3 mr-1" /> Exportar PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

// Componente principal que agrupa tudo
export function CriativosIASection({
  nucleo,
  produto,
  bigIdea,
  dor,
  transformacao,
  icp,
  objetivo,
  tipoFunil
}: {
  nucleo: string;
  produto: string;
  bigIdea: string;
  dor: string;
  transformacao: string;
  icp: string;
  objetivo: string;
  tipoFunil: string;
}) {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="estaticos" className="w-full">
        <TabsList className="bg-black/40 border border-white/10">
          <TabsTrigger value="estaticos" className="data-[state=active]:bg-red-600">
            <ImageIcon className="w-4 h-4 mr-2" />
            Estáticos
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-red-600">
            <Video className="w-4 h-4 mr-2" />
            Vídeos
          </TabsTrigger>
          <TabsTrigger value="documento" className="data-[state=active]:bg-red-600">
            <FileText className="w-4 h-4 mr-2" />
            Documento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="estaticos" className="mt-4">
          <VariacoesEstaticos
            bigIdea={bigIdea}
            dor={dor}
            transformacao={transformacao}
            produto={produto}
          />
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          <AnaliseVideo produto={produto} />
        </TabsContent>

        <TabsContent value="documento" className="mt-4">
          <DocumentoOrientador
            nucleo={nucleo}
            produto={produto}
            bigIdea={bigIdea}
            dor={dor}
            transformacao={transformacao}
            icp={icp}
            objetivo={objetivo}
            tipoFunil={tipoFunil}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CriativosIASection;
