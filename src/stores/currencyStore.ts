import { create } from 'zustand';

type Currency = {
  code: string;
  symbol: string;
  rate: number;
};

interface CurrencyStore {
  currencies: Currency[];
  currentCurrency: Currency;
  setCurrentCurrency: (currency: Currency) => void;
}

const defaultCurrencies: Currency[] = [
  { code: 'EUR', symbol: '€', rate: 1 },
  { code: 'USD', symbol: '$', rate: 1.08 },
  { code: 'TND', symbol: 'د.ت', rate: 3.37 }
];

export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currencies: defaultCurrencies,
  currentCurrency: defaultCurrencies[0],
  setCurrentCurrency: (currency) => set({ currentCurrency: currency }),
}));