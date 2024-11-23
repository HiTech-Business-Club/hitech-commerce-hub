import { useCurrencyStore } from "@/stores/currencyStore";

export function usePrice() {
  const { currentCurrency } = useCurrencyStore();

  const formatPrice = (priceInEUR: number) => {
    const convertedPrice = priceInEUR * currentCurrency.rate;
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currentCurrency.code,
    }).format(convertedPrice);
  };

  return { formatPrice };
}