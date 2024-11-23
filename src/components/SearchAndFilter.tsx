import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Button } from "./ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onPriceFilter: (range: string) => void;
}

export function SearchAndFilter({ onSearch, onPriceFilter }: SearchAndFilterProps) {
  return (
    <div className="w-full space-y-4 mb-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un produit..."
            className="pl-10"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Select onValueChange={onPriceFilter}>
          <Select.Trigger className="w-full sm:w-[180px]">
            <Select.Value placeholder="Prix" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="all">Tous les prix</Select.Item>
            <Select.Item value="0-100">0€ - 100€</Select.Item>
            <Select.Item value="100-500">100€ - 500€</Select.Item>
            <Select.Item value="500+">500€ et plus</Select.Item>
          </Select.Content>
        </Select>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}