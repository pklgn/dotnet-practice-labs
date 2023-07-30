import { createContext, useState } from "react";
import CurrencyConverter, { Currency } from "../CurrencyConverter";

export type ConverterTemplate = {
    sourceCode: string;
    targetCode: string;
};

const DEFAULT_CONVERTER_CURRENT_TEMPLATE_INDEX = 0;
const DEFAULT_CONVERTER_TEMPLATE: ConverterTemplate = { sourceCode: "AUD", targetCode: "JPY" };

// TODO: fix any type
export const ConverterTemplatesContext = createContext<any>(null);
export const ConverterCurrentTemplateIndexContext = createContext<any>(null);
export const ConverterCurrenciesContext = createContext<any>(null);
export const ConverterExchangeContext = createContext<any>(null);

function CurrencyConverterContext() {
    const [currentTemplateIndex, setCurrentTemplateIndex] = useState<number>(DEFAULT_CONVERTER_CURRENT_TEMPLATE_INDEX);
    const [templates, setTemplates] = useState<ConverterTemplate[]>([DEFAULT_CONVERTER_TEMPLATE]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [exchange, setExchange] = useState<ConverterTemplate>(DEFAULT_CONVERTER_TEMPLATE);

    return (
        <ConverterCurrenciesContext.Provider value={{ currencies, setCurrencies }}>
            <ConverterTemplatesContext.Provider value={{ templates, setTemplates }}>
                <ConverterCurrentTemplateIndexContext.Provider
                    value={{ currentTemplate: currentTemplateIndex, setCurrentTemplate: setCurrentTemplateIndex }}
                >
                    <ConverterExchangeContext.Provider value={{ exchange, setExchange }}>
                        <CurrencyConverter />
                    </ConverterExchangeContext.Provider>
                </ConverterCurrentTemplateIndexContext.Provider>
            </ConverterTemplatesContext.Provider>
        </ConverterCurrenciesContext.Provider>
    );
}

export default CurrencyConverterContext;
