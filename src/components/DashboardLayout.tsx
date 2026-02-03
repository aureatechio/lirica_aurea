import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Target,
  Rocket,
  Users,
  PlusCircle,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FolderOpen,
  UserCircle,
  Package,
  HelpCircle,
  History,
  BarChart3,
  Menu,
  Library,
  UserSearch,
  Layers,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useSwipeNavigation } from "@/hooks/useSwipe";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  badge?: string;
  disabled?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const navItems: NavSection[] = [
  {
    title: "Visão Geral",
    items: [
      { label: "Dashboard", href: "/", icon: LayoutDashboard },
      { label: "Aurea Cloud", href: "/aurea-cloud", icon: Cloud, description: "Funis de dados", badge: "Novo" },
    ],
  },
  {
    title: "Produtos",
    items: [
      { label: "Produtos", href: "/produtos", icon: Package, description: "MGS & Aceleraí", disabled: true },
    ],
  },
  {
    title: "Planejamento",
    items: [
      { label: "Estratégico", href: "/estrategico", icon: Calendar, description: "Visão Anual" },
      { label: "Tático", href: "/tatico", icon: Target, description: "Visão Mensal" },
      { label: "Operacional", href: "/operacional", icon: Rocket, description: "Campanhas" },
    ],
  },
  {
    title: "Inteligência",
    items: [
      { label: "Influências", href: "/influencias", icon: Users, disabled: true },
      { label: "Tendências", href: "/tendencias", icon: TrendingUp, disabled: true },
      { label: "Cliente Sintético", href: "/cliente-sintetico", icon: UserCircle, badge: "Beta", disabled: true },
      { label: "Analytics", href: "/analytics", icon: BarChart3, description: "Métricas de Campanha", disabled: true },
      { label: "Headhunter", href: "/headhunter", icon: UserSearch, description: "Busca de Mentores", badge: "Novo", disabled: true },
    ],
  },
  {
    title: "Criação",
    items: [
      { label: "Nova Campanha", href: "/nova-campanha", icon: PlusCircle, disabled: true },
      { label: "Biblioteca", href: "/biblioteca", icon: BookOpen, description: "Referências", disabled: true },
      { label: "Ref. Históricas", href: "/referencias-historicas", icon: History, description: "Campanhas Clássicas", disabled: true },
      { label: "Biblioteca MKT", href: "/biblioteca-mkt", icon: Library, description: "Livros & Cases", badge: "Novo", disabled: true },
      { label: "Repositório", href: "/repositorio", icon: FolderOpen, description: "Materiais", disabled: true },
      { label: "Meus Modelos", href: "/meus-modelos", icon: Layers, description: "Modelos Salvos", badge: "Novo", disabled: true },
    ],
  },
  {
    title: "Ajuda",
    items: [
      { label: "Manual", href: "/manual", icon: HelpCircle, description: "Como usar", disabled: true },
    ],
  },
];

// Lista ordenada de rotas para navegação por swipe (apenas rotas ativas)
const swipeRoutes = [
  "/",
  "/aurea-cloud",
  "/estrategico",
  "/tatico",
  "/operacional",
];

// Componente de navegação reutilizável
function NavContent({
  collapsed = false,
  onItemClick
}: {
  collapsed?: boolean;
  onItemClick?: () => void;
}) {
  const [location] = useLocation();

  return (
    <nav className="space-y-6 px-2">
      {navItems.map((section) => (
        <div key={section.title}>
          {!collapsed && (
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {section.title}
            </h3>
          )}
          <div className="space-y-1">
            {section.items.map((item) => {
              const isActive = location === item.href;
              const isDisabled = item.disabled;

              // If disabled, render a div instead of Link
              if (isDisabled) {
                return (
                  <div
                    key={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                      "opacity-50 cursor-not-allowed text-sidebar-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                    {!collapsed && (
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 text-muted-foreground border-muted-foreground/50">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link key={item.href} href={item.href} onClick={onItemClick}>
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground glow-red"
                        : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    {!collapsed && (
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 text-yellow-400 border-yellow-400/50">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <span className="text-xs text-muted-foreground">
                            {item.description}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

// Componente indicador de swipe
function SwipeIndicator({ 
  currentIndex, 
  totalRoutes, 
  canGoPrevious, 
  canGoNext 
}: { 
  currentIndex: number; 
  totalRoutes: number; 
  canGoPrevious: boolean; 
  canGoNext: boolean;
}) {
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden">
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/90 backdrop-blur-sm rounded-full border border-zinc-700 shadow-lg">
        {/* Seta esquerda */}
        <div className={cn(
          "transition-opacity",
          canGoPrevious ? "opacity-100" : "opacity-30"
        )}>
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </div>
        
        {/* Indicadores de página */}
        <div className="flex gap-1">
          {Array.from({ length: Math.min(totalRoutes, 7) }).map((_, i) => {
            // Mostrar apenas 7 dots ao redor do atual
            const startIndex = Math.max(0, currentIndex - 3);
            const actualIndex = startIndex + i;
            if (actualIndex >= totalRoutes) return null;
            
            return (
              <div
                key={actualIndex}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  actualIndex === currentIndex 
                    ? "w-4 bg-primary" 
                    : "w-1.5 bg-zinc-600"
                )}
              />
            );
          })}
        </div>
        
        {/* Seta direita */}
        <div className={cn(
          "transition-opacity",
          canGoNext ? "opacity-100" : "opacity-30"
        )}>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {/* Dica de swipe */}
      {showHint && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-xs text-muted-foreground bg-zinc-900/80 px-2 py-1 rounded">
            Deslize para navegar
          </span>
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [location, setLocation] = useLocation();

  // Navegação por swipe
  const navigate = useCallback((path: string) => {
    setLocation(path);
  }, [setLocation]);

  const { currentIndex, totalRoutes, canGoPrevious, canGoNext } = useSwipeNavigation(
    swipeRoutes,
    location,
    navigate
  );

  // Detectar tamanho da tela
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fechar menu mobile ao mudar de página
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="flex h-14 items-center justify-between px-4 bg-sidebar border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <img src="/lirica-logo.png" alt="Lírica" className="h-10 w-10 rounded-lg" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-sidebar-foreground">
                Lírica
              </span>
              <span className="text-[9px] text-muted-foreground leading-tight">O Renascimento da Comunicação</span>
            </div>
          </div>
          
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-sidebar border-sidebar-border">
              <SheetHeader className="p-4 border-b border-sidebar-border">
                <SheetTitle className="flex items-center gap-3 text-sidebar-foreground">
                  <img src="/lirica-logo.png" alt="Lírica" className="h-10 w-10 rounded-lg" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold">Lírica</span>
                    <span className="text-[9px] text-muted-foreground font-normal leading-tight">O Renascimento da Comunicação</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-80px)] py-4">
                <NavContent onItemClick={() => setMobileOpen(false)} />
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <img src="/lirica-logo.png" alt="Lírica" className="h-10 w-10 rounded-lg" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-sidebar-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                  Lírica
                </span>
                <span className="text-[9px] text-muted-foreground leading-tight">O Renascimento da Comunicação</span>
              </div>
            </div>
          )}
          {collapsed && (
            <img src="/lirica-logo.png" alt="Lírica" className="h-8 w-8 rounded-lg mx-auto" />
          )}
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-4">
          <NavContent collapsed={collapsed} />
        </ScrollArea>

        {/* Collapse Button */}
        <Separator />
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="pt-14 md:pt-0 pb-16 md:pb-0">
            <div className="p-4 md:p-6">{children}</div>
          </div>
        </ScrollArea>
      </main>

      {/* Indicador de Swipe Mobile */}
      {isMobile && (
        <SwipeIndicator 
          currentIndex={currentIndex}
          totalRoutes={totalRoutes}
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
        />
      )}
    </div>
  );
}
