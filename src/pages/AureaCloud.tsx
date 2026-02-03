import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

// Mock data structures - ready for Supabase integration via useFunilMetricas
interface FunilStep {
  name: string;
  value: string;
  percentage: string;
  conversion: string;
  metric: string;
  width: string; // Percentage width for funnel effect
}

interface MetricData {
  value: string;
  variation: string;
  variationPercent: number;
  conversion?: string;
  metric?: string;
}

interface ManagerialMetric {
  name: string;
  hoje: MetricData;
  ontem: MetricData;
  mes: MetricData;
}

// Static data - structured for easy Supabase integration
const funilConsolidado: FunilStep[] = [
  {
    name: "INVESTIMENTO",
    value: "R$ 425.049",
    percentage: "74%",
    conversion: "",
    metric: "",
    width: "100%",
  },
  {
    name: "VISITANTES",
    value: "125.886",
    percentage: "",
    conversion: "8.5%",
    metric: "CPV R$ 3.38",
    width: "92%",
  },
  {
    name: "LEADS RECEBIDOS",
    value: "10.657",
    percentage: "50%",
    conversion: "22.6%",
    metric: "CPL R$ 39.88",
    width: "84%",
  },
  {
    name: "OPORTUNIDADES",
    value: "2.409",
    percentage: "7%",
    conversion: "14.6%",
    metric: "CPO",
    width: "76%",
  },
  {
    name: "REUNIÕES",
    value: "351",
    percentage: "1%",
    conversion: "440.0%",
    metric: "R$ 1.219.96",
    width: "68%",
  },
  {
    name: "PROPOSTAS",
    value: "1.576",
    percentage: "17%",
    conversion: "6.8%",
    metric: "R$ 269.70",
    width: "60%",
  },
  {
    name: "VENDAS",
    value: "107",
    percentage: "20%",
    conversion: "",
    metric: "R$ 1.473.744.22, Ticket: R$ 3.972.42",
    width: "52%",
  },
];

const visaoGerencial: ManagerialMetric[] = [
  {
    name: "INVESTIMENTO",
    hoje: { value: "R$ 4.035", variation: "-31%", variationPercent: -31 },
    ontem: { value: "R$ 11.528", variation: "-52%", variationPercent: -52 },
    mes: { value: "R$ 24.098", variation: "+20%", variationPercent: 20 },
  },
  {
    name: "VISITANTES",
    hoje: { value: "341", variation: "-29%", variationPercent: -29, conversion: "116.7%" },
    ontem: { value: "2.135", variation: "-90%", variationPercent: -90, conversion: "5.4%" },
    mes: { value: "4.373", variation: "-10%", variationPercent: -10, conversion: "27.9%" },
  },
  {
    name: "LEADS RECEBIDOS",
    hoje: { value: "1.138", variation: "+600%", variationPercent: 600, conversion: "49.4%", metric: "R$ 3.15" },
    ontem: { value: "31", variation: "-71%", variationPercent: -71, conversion: "35.5%", metric: "R$ 371.87" },
    mes: { value: "1.220", variation: "+167%", variationPercent: 167, conversion: "47.5%", metric: "R$ 19.75" },
  },
  {
    name: "OPORTUNIDADES",
    hoje: { value: "89", variation: "+45%", variationPercent: 45, conversion: "7.8%", metric: "R$ 45.34" },
    ontem: { value: "15", variation: "-25%", variationPercent: -25, conversion: "48.4%", metric: "R$ 768.53" },
    mes: { value: "187", variation: "+12%", variationPercent: 12, conversion: "15.3%", metric: "R$ 128.87" },
  },
  {
    name: "REUNIÕES",
    hoje: { value: "12", variation: "+20%", variationPercent: 20, conversion: "13.5%", metric: "R$ 336.25" },
    ontem: { value: "8", variation: "-11%", variationPercent: -11, conversion: "53.3%", metric: "R$ 1.441.00" },
    mes: { value: "45", variation: "+28%", variationPercent: 28, conversion: "24.1%", metric: "R$ 535.51" },
  },
  {
    name: "PROPOSTAS",
    hoje: { value: "68", variation: "+89%", variationPercent: 89, conversion: "4.3%", metric: "R$ 59.34" },
    ontem: { value: "22", variation: "-35%", variationPercent: -35, conversion: "71.0%", metric: "R$ 523.99" },
    mes: { value: "156", variation: "+43%", variationPercent: 43, conversion: "9.9%", metric: "R$ 154.47" },
  },
  {
    name: "VENDAS",
    hoje: { value: "5", variation: "+25%", variationPercent: 25, metric: "R$ 19.867.50, Ticket: R$ 3.973.50" },
    ontem: { value: "3", variation: "-40%", variationPercent: -40, metric: "R$ 11.920.50, Ticket: R$ 3.973.50" },
    mes: { value: "18", variation: "+50%", variationPercent: 50, metric: "R$ 71.524.50, Ticket: R$ 3.973.58" },
  },
];

export default function AureaCloud() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="container mx-auto space-y-8 py-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-headline-large text-[var(--md3-on-surface)]">
          AureaCloud
        </h1>
        <p className="text-body-small text-[var(--md3-on-surface-variant)]">
          Visão consolidada do funil de vendas e métricas gerenciais
        </p>
      </div>

      {/* Section 1: Funil Consolidado Vertical */}
      <Card elevation={1}>
        <CardHeader>
          <CardTitle className="text-title-large">Funil Consolidado Vertical</CardTitle>
          <CardDescription>
            Conversão ao longo do funil de vendas com métricas detalhadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {funilConsolidado.map((step, index) => (
              <div
                key={index}
                className="transition-all duration-md3-short4 ease-md3-standard"
                style={{
                  width: step.width,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  className={`
                    bg-[var(--md3-surface-variant)]
                    rounded-md3-lg
                    p-4
                    border
                    border-[var(--md3-outline-variant)]
                    transition-all
                    duration-md3-short4
                    ease-md3-standard
                    ${hoveredStep === index ? "shadow-md3-2 scale-[1.02]" : "shadow-md3-1"}
                  `}
                >
                  {/* Step Name */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-title-medium text-[var(--md3-on-surface-variant)] font-medium">
                      {step.name}
                    </h3>
                    {step.percentage && (
                      <span className="text-label-small text-[var(--md3-on-surface-variant)] bg-[var(--md3-surface)] px-2 py-1 rounded-md">
                        {step.percentage}
                      </span>
                    )}
                  </div>

                  {/* Main Value */}
                  <div className="text-headline-small text-[var(--md3-primary)] font-bold mb-2">
                    {step.value}
                  </div>

                  {/* Conversion & Metric */}
                  <div className="flex items-center gap-4 text-body-small text-[var(--md3-on-surface-variant)]">
                    {step.conversion && (
                      <div>
                        <span className="text-label-small">Conv: </span>
                        <span className="font-medium">{step.conversion}</span>
                      </div>
                    )}
                    {step.metric && (
                      <div className="flex-1">
                        <span className="font-medium">{step.metric}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Visão Gerencial Consolidada */}
      <Card elevation={1}>
        <CardHeader>
          <CardTitle className="text-title-large">Visão Gerencial Consolidada</CardTitle>
          <CardDescription>
            Comparação de métricas entre hoje, ontem e mês atual
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Responsive wrapper with horizontal scroll on mobile */}
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 mb-4 pb-3 border-b border-[var(--md3-outline-variant)]">
                <div className="text-title-small text-[var(--md3-on-surface)] font-medium">
                  Métrica
                </div>
                <div className="text-title-small text-[var(--md3-on-surface)] font-medium text-center">
                  HOJE
                </div>
                <div className="text-title-small text-[var(--md3-on-surface)] font-medium text-center">
                  ONTEM
                </div>
                <div className="text-title-small text-[var(--md3-on-surface)] font-medium text-center">
                  MÊS ATUAL
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {visaoGerencial.map((metric, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 gap-4 items-start"
                  >
                    {/* Metric Name */}
                    <div className="text-body-medium text-[var(--md3-on-surface)] font-medium pt-3">
                      {metric.name}
                    </div>

                    {/* HOJE */}
                    <div className="bg-[var(--md3-surface-variant)] rounded-md3-lg p-3 space-y-1">
                      <div className="text-title-medium text-[var(--md3-on-surface)]">
                        {metric.hoje.value}
                      </div>
                      <div className="flex items-center gap-1">
                        {metric.hoje.variationPercent >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={`text-label-small font-medium ${
                            metric.hoje.variationPercent >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {metric.hoje.variation}
                        </span>
                      </div>
                      {metric.hoje.conversion && (
                        <div className="text-body-small text-[var(--md3-on-surface-variant)]">
                          Conv: {metric.hoje.conversion}
                        </div>
                      )}
                      {metric.hoje.metric && (
                        <div className="text-body-small text-[var(--md3-on-surface-variant)]">
                          {metric.hoje.metric}
                        </div>
                      )}
                    </div>

                    {/* ONTEM */}
                    <div className="bg-[var(--md3-surface-variant)] rounded-md3-lg p-3 space-y-1">
                      <div className="text-title-medium text-[var(--md3-on-surface)]">
                        {metric.ontem.value}
                      </div>
                      <div className="flex items-center gap-1">
                        {metric.ontem.variationPercent >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={`text-label-small font-medium ${
                            metric.ontem.variationPercent >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {metric.ontem.variation}
                        </span>
                      </div>
                      {metric.ontem.conversion && (
                        <div className="text-body-small text-[var(--md3-on-surface-variant)]">
                          Conv: {metric.ontem.conversion}
                        </div>
                      )}
                      {metric.ontem.metric && (
                        <div className="text-body-small text-[var(--md3-on-surface-variant)]">
                          {metric.ontem.metric}
                        </div>
                      )}
                    </div>

                    {/* MÊS ATUAL */}
                    <div className="bg-[var(--md3-surface-variant)] rounded-md3-lg p-3 space-y-1">
                      <div className="text-title-medium text-[var(--md3-on-surface)]">
                        {metric.mes.value}
                      </div>
                      <div className="flex items-center gap-1">
                        {metric.mes.variationPercent >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span
                          className={`text-label-small font-medium ${
                            metric.mes.variationPercent >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {metric.mes.variation}
                        </span>
                      </div>
                      {metric.mes.conversion && (
                        <div className="text-body-small text-[var(--md3-on-surface-variant)]">
                          Conv: {metric.mes.conversion}
                        </div>
                      )}
                      {metric.mes.metric && (
                        <div className="text-body-small text-[var(--md3-on-surface-variant)]">
                          {metric.mes.metric}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
