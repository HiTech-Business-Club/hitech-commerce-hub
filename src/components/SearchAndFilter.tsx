import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onPriceFilter: (range: string) => void;
  onSortChange: (sort: string) => void;
  maxPrice: number;
}

export function SearchAndFilter({
  onSearch,
  onPriceFilter,
  onSortChange,
  maxPrice,
}: SearchAndFilterProps) {
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  return (
    <div className="space-y-4 mb-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          placeholder="Rechercher un produit..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full"
        />
        <Select onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
            <SelectItem value="name-asc">Nom A-Z</SelectItem>
            <SelectItem value="name-desc">Nom Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Prix: {priceRange[0]}€ - {priceRange[1]}€
        </label>
        <Slider
          min={0}
          max={maxPrice}
          step={10}
          value={priceRange}
          onValueChange={(value) => {
            setPriceRange(value);
            onPriceFilter(`${value[0]}-${value[1]}`);
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}