export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      icps: {
        Row: {
          id: string
          user_id: string
          nome: string
          avatar: string | null
          segmento: string
          faturamento: string | null
          ticket_medio: number | null
          dores: string[] | null
          desejos: string[] | null
          objecoes: string[] | null
          gatilhos: string[] | null
          momento: string | null
          objetivo: string | null
          is_from_real_data: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          nome: string
          avatar?: string | null
          segmento: string
          faturamento?: string | null
          ticket_medio?: number | null
          dores?: string[] | null
          desejos?: string[] | null
          objecoes?: string[] | null
          gatilhos?: string[] | null
          momento?: string | null
          objetivo?: string | null
          is_from_real_data?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          nome?: string
          avatar?: string | null
          segmento?: string
          faturamento?: string | null
          ticket_medio?: number | null
          dores?: string[] | null
          desejos?: string[] | null
          objecoes?: string[] | null
          gatilhos?: string[] | null
          momento?: string | null
          objetivo?: string | null
          is_from_real_data?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      campanhas: {
        Row: {
          id: string
          user_id: string
          nome: string
          nucleo: string | null
          tier: string | null
          status: string
          orcamento: number | null
          meta_faturamento: number | null
          conceito: Json | null
          funil: Json | null
          oferta: Json | null
          criativos: Json | null
          score_ia: number | null
          analise_ia: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          nome: string
          nucleo?: string | null
          tier?: string | null
          status?: string
          orcamento?: number | null
          meta_faturamento?: number | null
          conceito?: Json | null
          funil?: Json | null
          oferta?: Json | null
          criativos?: Json | null
          score_ia?: number | null
          analise_ia?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          nome?: string
          nucleo?: string | null
          tier?: string | null
          status?: string
          orcamento?: number | null
          meta_faturamento?: number | null
          conceito?: Json | null
          funil?: Json | null
          oferta?: Json | null
          criativos?: Json | null
          score_ia?: number | null
          analise_ia?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      funil_metricas: {
        Row: {
          id: string
          user_id: string
          data: string
          investimento: number | null
          investimento_percentual: number | null
          visitantes: number | null
          visitantes_conversao: number | null
          visitantes_cpv: number | null
          leads_recebidos: number | null
          leads_percentual: number | null
          leads_conversao: number | null
          leads_cpl: number | null
          oportunidades: number | null
          oportunidades_percentual: number | null
          oportunidades_conversao: number | null
          oportunidades_cpo: number | null
          reunioes: number | null
          reunioes_percentual: number | null
          reunioes_conversao: number | null
          reunioes_metrica: number | null
          propostas: number | null
          propostas_percentual: number | null
          propostas_conversao: number | null
          propostas_metrica: number | null
          vendas: number | null
          vendas_percentual: number | null
          vendas_valor_total: number | null
          vendas_ticket_medio: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          data: string
          investimento?: number | null
          investimento_percentual?: number | null
          visitantes?: number | null
          visitantes_conversao?: number | null
          visitantes_cpv?: number | null
          leads_recebidos?: number | null
          leads_percentual?: number | null
          leads_conversao?: number | null
          leads_cpl?: number | null
          oportunidades?: number | null
          oportunidades_percentual?: number | null
          oportunidades_conversao?: number | null
          oportunidades_cpo?: number | null
          reunioes?: number | null
          reunioes_percentual?: number | null
          reunioes_conversao?: number | null
          reunioes_metrica?: number | null
          propostas?: number | null
          propostas_percentual?: number | null
          propostas_conversao?: number | null
          propostas_metrica?: number | null
          vendas?: number | null
          vendas_percentual?: number | null
          vendas_valor_total?: number | null
          vendas_ticket_medio?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          data?: string
          investimento?: number | null
          investimento_percentual?: number | null
          visitantes?: number | null
          visitantes_conversao?: number | null
          visitantes_cpv?: number | null
          leads_recebidos?: number | null
          leads_percentual?: number | null
          leads_conversao?: number | null
          leads_cpl?: number | null
          oportunidades?: number | null
          oportunidades_percentual?: number | null
          oportunidades_conversao?: number | null
          oportunidades_cpo?: number | null
          reunioes?: number | null
          reunioes_percentual?: number | null
          reunioes_conversao?: number | null
          reunioes_metrica?: number | null
          propostas?: number | null
          propostas_percentual?: number | null
          propostas_conversao?: number | null
          propostas_metrica?: number | null
          vendas?: number | null
          vendas_percentual?: number | null
          vendas_valor_total?: number | null
          vendas_ticket_medio?: number | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
