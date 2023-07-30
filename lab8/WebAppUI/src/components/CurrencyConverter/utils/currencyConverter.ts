import { Currency } from "../CurrencyConverter";

export const getCurrencyNameByCode = (code: string, currencies: Currency[]): string => {
    const currency = currencies.find(currency => currency.code === code);

    return currency?.name ?? "";
};

export const getCurrencyCodeByName = (name: string, currencies: Currency[]): string => {
    const currency = currencies.find(currency => currency.name === name);

    return currency?.code ?? "";
};
