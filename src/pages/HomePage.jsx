import { useState } from "react";
import { AppSidebar } from "../components/AppSidebar";
import Calendar from "../components/Calendar";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { Menu } from "lucide-react";

export default function HomePage() {
  const [viewMode, setViewMode] = useState("month");
  const [selectedCategories, setSelectedCategories] = useState(
    new Set([
      "ACAIC Brooklyn",
      "ADAIC Brooklyn",
      "AJAIC Brooklyn",
      "Servico Misonero",
      "Servico De Bautismo",
      "Boro De Brooklyn",
      "AJUVAIC Brooklyn",
    ])
  );

  const handleToggleCategory = (category) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

  return (
    <>
      <AppSidebar
        viewMode={viewMode}
        onViewChange={setViewMode}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
      />
      <SidebarInset>
        <header className="flex items-center gap-4 p-4 border-b border-border bg-card">
          <SidebarTrigger data-testid="button-sidebar-toggle">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
          <h1 className="text-xl font-semibold text-foreground">
            Brooklyn Events
          </h1>
        </header>
        <main className="flex-1 overflow-hidden bg-background">
          <Calendar
            viewMode={viewMode}
            onViewChange={setViewMode}
            selectedCategories={selectedCategories}
          />
        </main>
      </SidebarInset>
    </>
  );
}