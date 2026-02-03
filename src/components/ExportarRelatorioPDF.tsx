import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { FileDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Interfaces para os dados da campanha
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

interface LinksFunil {
  [key: string]: string;
}

interface DadosCampanha {
  // Básicos
  nucleo: string;
  produto: string;
  nomeCampanha: string;
  
  // Conceito
  bigIdea: string;
  dor: string;
  transformacao: string;
  icp: string;
  
  // Funil
  objetivo: string;
  tipoFunil: string;
  linksFunil: LinksFunil;
  
  // Oferta
  oferta: string;
  entregaveis: string;
  ticketMedio: string;
  garantia: string;
  bonus: string;
  
  // Manifesto
  temManifesto: boolean;
  manifesto: string;
  roteiro: string;
  
  // Criativos
  criativosVideo: Criativo[];
  criativosEstaticos: Criativo[];
  temTeasers: boolean;
  
  // Análise IA
  notaCampanha: number | null;
  feedbackIA: string[];
}

// Mapeamento de tipos de criativo
const tiposCriativoNomes: Record<string, string> = {
  "corte-podcast": "Corte de Podcast",
  "nativo": "Nativo/Orgânico",
  "reaproveitado": "Reaproveitado",
  "estudio": "Gravado em Estúdio",
  "ia": "Feito com IA",
  "corte-aula": "Corte de Aula",
  "prova-social": "Prova Social/Depoimento",
  "animacao": "Animação/Motion",
};

// Mapeamento de metodologias
const metodologiasNomes: Record<string, string> = {
  "aida": "AIDA - Atenção, Interesse, Desejo, Ação",
  "pas": "PAS - Problema, Agitação, Solução",
  "bab": "BAB - Before, After, Bridge",
  "4ps": "4Ps - Promise, Picture, Proof, Push",
  "hso": "Hook-Story-Offer",
  "fab": "FAB - Features, Advantages, Benefits",
  "quest": "QUEST - Qualify, Understand, Educate, Stimulate, Transition",
  "star": "STAR - Situation, Task, Action, Result",
};

export function gerarRelatorioPDF(dados: DadosCampanha): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 20;

  // Função auxiliar para adicionar nova página se necessário
  const checkNewPage = (height: number) => {
    if (yPos + height > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Função para adicionar título de seção
  const addSectionTitle = (title: string) => {
    checkNewPage(15);
    doc.setFillColor(220, 38, 38); // Vermelho MGS
    doc.rect(margin, yPos, pageWidth - 2 * margin, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin + 5, yPos + 7);
    doc.setTextColor(0, 0, 0);
    yPos += 15;
  };

  // Função para adicionar campo
  const addField = (label: string, value: string, multiline = false) => {
    if (!value) return;
    checkNewPage(multiline ? 30 : 12);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(label + ":", margin, yPos);
    doc.setFont("helvetica", "normal");
    
    if (multiline) {
      const lines = doc.splitTextToSize(value, pageWidth - 2 * margin - 5);
      yPos += 5;
      lines.forEach((line: string) => {
        checkNewPage(6);
        doc.text(line, margin + 5, yPos);
        yPos += 5;
      });
      yPos += 3;
    } else {
      const textWidth = doc.getTextWidth(label + ": ");
      doc.text(value, margin + textWidth + 2, yPos);
      yPos += 8;
    }
  };

  // ==================== CABEÇALHO ====================
  doc.setFillColor(24, 24, 27); // Zinc-900
  doc.rect(0, 0, pageWidth, 45, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("RELATÓRIO DE CAMPANHA", pageWidth / 2, 20, { align: "center" });
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(dados.nomeCampanha || "Campanha sem nome", pageWidth / 2, 32, { align: "center" });
  
  doc.setFontSize(10);
  doc.text(`${dados.nucleo} • ${new Date().toLocaleDateString("pt-BR")}`, pageWidth / 2, 40, { align: "center" });
  
  doc.setTextColor(0, 0, 0);
  yPos = 55;

  // ==================== RESUMO EXECUTIVO ====================
  addSectionTitle("RESUMO EXECUTIVO");
  
  // Tabela de resumo
  autoTable(doc, {
    startY: yPos,
    head: [["Campo", "Valor"]],
    body: [
      ["Núcleo", dados.nucleo],
      ["Produto", dados.produto],
      ["Nome da Campanha", dados.nomeCampanha],
      ["Objetivo", dados.objetivo],
      ["Tipo de Funil", dados.tipoFunil],
      ["Ticket Médio", dados.ticketMedio ? `R$ ${dados.ticketMedio}` : "Não definido"],
      ["Criativos em Vídeo", dados.criativosVideo.length.toString()],
      ["Criativos Estáticos", dados.criativosEstaticos.length.toString()],
      ["Tem Manifesto", dados.temManifesto ? "Sim" : "Não"],
      ["Nota IA", dados.notaCampanha ? `${dados.notaCampanha}/100` : "Não analisado"],
    ],
    theme: "striped",
    headStyles: { fillColor: [220, 38, 38] },
    margin: { left: margin, right: margin },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 15;

  // ==================== CONCEITO E BIG IDEA ====================
  addSectionTitle("CONCEITO E BIG IDEA");
  addField("Big Idea", dados.bigIdea, true);
  addField("Dor do Cliente", dados.dor, true);
  addField("Transformação Prometida", dados.transformacao, true);
  addField("ICP (Perfil do Cliente Ideal)", dados.icp, true);

  // ==================== FUNIL E ESTRATÉGIA ====================
  addSectionTitle("FUNIL E ESTRATÉGIA");
  addField("Objetivo da Campanha", dados.objetivo);
  addField("Tipo de Funil", dados.tipoFunil);
  
  // Links do funil
  if (Object.keys(dados.linksFunil).length > 0) {
    checkNewPage(30);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Links do Funil:", margin, yPos);
    yPos += 8;
    
    Object.entries(dados.linksFunil).forEach(([key, value]) => {
      if (value) {
        checkNewPage(8);
        doc.setFont("helvetica", "normal");
        doc.text(`• ${key}: ${value}`, margin + 5, yPos);
        yPos += 6;
      }
    });
    yPos += 5;
  }

  // ==================== OFERTA E ENTREGÁVEIS ====================
  addSectionTitle("OFERTA E ENTREGÁVEIS");
  addField("Oferta Principal", dados.oferta, true);
  addField("Entregáveis", dados.entregaveis, true);
  addField("Ticket Médio", dados.ticketMedio ? `R$ ${dados.ticketMedio}` : "");
  addField("Garantia", dados.garantia, true);
  addField("Bônus", dados.bonus, true);

  // ==================== MANIFESTO ====================
  if (dados.temManifesto) {
    addSectionTitle("MANIFESTO");
    addField("Texto do Manifesto", dados.manifesto, true);
    addField("Roteiro", dados.roteiro, true);
  }

  // ==================== CRIATIVOS EM VÍDEO ====================
  if (dados.criativosVideo.length > 0) {
    addSectionTitle(`CRIATIVOS EM VÍDEO (${dados.criativosVideo.length})`);
    
    dados.criativosVideo.forEach((criativo, index) => {
      checkNewPage(50);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`Vídeo ${index + 1}`, margin, yPos);
      yPos += 8;
      
      const tipoNome = tiposCriativoNomes[criativo.tipo] || criativo.tipo;
      const metodologiaNome = metodologiasNomes[criativo.metodologia] || criativo.metodologia;
      
      addField("Tipo", tipoNome);
      addField("Metodologia", metodologiaNome);
      addField("Duração", criativo.duracao || "");
      addField("Hook (Gancho)", criativo.hook || "");
      addField("Descrição/Roteiro", criativo.descricao, true);
      addField("CTA", criativo.cta || "");
      
      yPos += 5;
    });
  }

  // ==================== CRIATIVOS ESTÁTICOS ====================
  if (dados.criativosEstaticos.length > 0) {
    addSectionTitle(`CRIATIVOS ESTÁTICOS (${dados.criativosEstaticos.length})`);
    
    dados.criativosEstaticos.forEach((criativo, index) => {
      checkNewPage(40);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(`Estático ${index + 1}`, margin, yPos);
      yPos += 8;
      
      const metodologiaNome = metodologiasNomes[criativo.metodologia] || criativo.metodologia;
      
      addField("Formato", criativo.formato || "");
      addField("Metodologia", metodologiaNome);
      addField("Descrição/Conceito Visual", criativo.descricao, true);
      addField("CTA", criativo.cta || "");
      
      yPos += 5;
    });
  }

  // ==================== ANÁLISE DE IA ====================
  if (dados.notaCampanha !== null) {
    addSectionTitle("ANÁLISE DE IA");
    
    // Nota grande
    checkNewPage(30);
    doc.setFontSize(36);
    doc.setFont("helvetica", "bold");
    
    if (dados.notaCampanha >= 80) {
      doc.setTextColor(34, 197, 94); // Verde
    } else if (dados.notaCampanha >= 60) {
      doc.setTextColor(234, 179, 8); // Amarelo
    } else {
      doc.setTextColor(239, 68, 68); // Vermelho
    }
    
    doc.text(`${dados.notaCampanha}`, pageWidth / 2, yPos + 10, { align: "center" });
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("Nota da Campanha", pageWidth / 2, yPos + 20, { align: "center" });
    doc.setTextColor(0, 0, 0);
    yPos += 35;
    
    // Feedbacks
    if (dados.feedbackIA.length > 0) {
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Feedback da IA:", margin, yPos);
      yPos += 8;
      
      dados.feedbackIA.forEach((feedback) => {
        checkNewPage(15);
        doc.setFont("helvetica", "normal");
        const lines = doc.splitTextToSize(`• ${feedback}`, pageWidth - 2 * margin - 10);
        lines.forEach((line: string) => {
          doc.text(line, margin + 5, yPos);
          yPos += 5;
        });
        yPos += 3;
      });
    }
  }

  // ==================== RODAPÉ ====================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Central de Campanhas • MGS & Aceleraí • Página ${i} de ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  // Salvar o PDF
  const fileName = `relatorio-campanha-${dados.nomeCampanha?.replace(/\s+/g, "-").toLowerCase() || "sem-nome"}-${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);
}

// Componente de botão de exportação
interface ExportarRelatorioPDFProps {
  dados: DadosCampanha;
  disabled?: boolean;
}

export function ExportarRelatorioPDFButton({ dados, disabled }: ExportarRelatorioPDFProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      // Pequeno delay para mostrar o loading
      await new Promise((resolve) => setTimeout(resolve, 500));
      gerarRelatorioPDF(dados);
      toast.success("Relatório exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar PDF:", error);
      toast.error("Erro ao exportar relatório. Tente novamente.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || isExporting}
      variant="outline"
      className="gap-2"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Exportando...
        </>
      ) : (
        <>
          <FileDown className="h-4 w-4" />
          Exportar PDF
        </>
      )}
    </Button>
  );
}

export default ExportarRelatorioPDFButton;
