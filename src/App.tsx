import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Estrategico from "./pages/Estrategico";
import Tatico from "./pages/Tatico";
import Operacional from "./pages/Operacional";
import Influencias from "./pages/Influencias";
import NovaCampanha from "./pages/NovaCampanha";
import Tendencias from "./pages/Tendencias";
import Biblioteca from "./pages/Biblioteca";
import Repositorio from "./pages/Repositorio";
import ClienteSintetico from "./pages/ClienteSintetico";
import Produtos from "./pages/Produtos";
import Manual from "./pages/Manual";
import ReferenciasHistoricas from "./pages/ReferenciasHistoricas";
import Analytics from "./pages/Analytics";
import BibliotecaMkt from "./pages/BibliotecaMkt";
import Headhunter from "./pages/Headhunter";
import MeusModelos from "./pages/MeusModelos";
import AureaCloud from "./pages/AureaCloud";
import Login from "./pages/Login";
import { useAuth } from "./_core/hooks/useAuth";
import { Loader2 } from "lucide-react";

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--md3-background)]">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--md3-primary)]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      {/* Public route */}
      <Route path="/login" component={Login} />

      {/* Protected routes */}
      <Route>
        <ProtectedRoute>
          <DashboardLayout>
            <Switch>
              <Route path="/" component={Dashboard} />
              <Route path="/aurea-cloud" component={AureaCloud} />
              <Route path="/estrategico" component={Estrategico} />
              <Route path="/tatico" component={Tatico} />
              <Route path="/operacional" component={Operacional} />
              <Route path="/influencias" component={Influencias} />
              <Route path="/nova-campanha" component={NovaCampanha} />
              <Route path="/tendencias" component={Tendencias} />
              <Route path="/biblioteca" component={Biblioteca} />
              <Route path="/repositorio" component={Repositorio} />
              <Route path="/cliente-sintetico" component={ClienteSintetico} />
              <Route path="/produtos" component={Produtos} />
              <Route path="/manual" component={Manual} />
              <Route path="/referencias-historicas" component={ReferenciasHistoricas} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/biblioteca-mkt" component={BibliotecaMkt} />
              <Route path="/headhunter" component={Headhunter} />
              <Route path="/meus-modelos" component={MeusModelos} />
              <Route path="/404" component={NotFound} />
              <Route component={NotFound} />
            </Switch>
          </DashboardLayout>
        </ProtectedRoute>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable={true}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
