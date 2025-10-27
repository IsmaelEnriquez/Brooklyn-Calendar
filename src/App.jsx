import { Switch, Route, Router as WouterRouter } from "wouter";  // ← Add Router here
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./ui/toaster";
import { TooltipProvider } from "./ui/tooltip";
import { SidebarProvider } from "./ui/sidebar";
import HomePage from "./pages/HomePage";
function Router() {
  const base = import.meta.env.BASE_URL;
  
  return (
    <WouterRouter base={base}>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </WouterRouter>
  );
}
function App() {
  const style = {
    "--sidebar-width": "18rem",
    "--sidebar-width-icon": "4rem",
  };
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style}>
          <div className="flex h-screen w-full">
            <Router />
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
export default App;