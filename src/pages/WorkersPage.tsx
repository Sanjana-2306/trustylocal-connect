import { useState } from "react";
import { mockWorkers } from "@/lib/mock-data";
import WorkerCard from "@/components/app/WorkerCard";
import WorkerMap from "@/components/app/WorkerMap";
import { Search, Filter } from "lucide-react";

export default function WorkersPage() {
  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  const allSkills = [...new Set(mockWorkers.flatMap(w => w.skills))];
  const visibleWorkers = mockWorkers
    .filter(w => w.visible && w.status === "Active")
    .filter(w => !search || w.name.toLowerCase().includes(search.toLowerCase()))
    .filter(w => !skillFilter || w.skills.includes(skillFilter));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-foreground">Find Verified Workers</h1>
        <p className="text-sm text-muted-foreground">Only workers with trust score ≥70 appear here</p>
      </div>

      <WorkerMap workers={mockWorkers} />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search workers by name..."
            className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="bg-card border border-border rounded-lg pl-10 pr-8 py-2.5 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary appearance-none"
          >
            <option value="">All Skills</option>
            {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleWorkers.map((w, i) => (
          <WorkerCard key={w.id} worker={w} index={i} />
        ))}
        {visibleWorkers.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground text-sm">
            No workers found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
