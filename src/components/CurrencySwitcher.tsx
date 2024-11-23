import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrencyStore } from "@/stores/currencyStore";

export function CurrencySwitcher() {
  const { currencies, currentCurrency, setCurrentCurrency } = useCurrencyStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {currentCurrency.code}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            onClick={() => setCurrentCurrency(currency)}
          >
            {currency.code} ({currency.symbol})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}