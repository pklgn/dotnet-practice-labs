import { createContext, useState } from "react";
import CurrencyConverter from "../CurrencyConverter";

export type ConverterTemplate = {
    sourceCode: string;
    targetCode: string;
};

const DEFAULT_CONVERTER_CURRENT_TEMPLATE = 0;
const DEFAULT_CONVERTER_TEMPLATE: ConverterTemplate = { sourceCode: "AUD", targetCode: "JPY" };

// TODO: fix any type
export const ConverterTemplatesContext = createContext<any>(null);
export const ConverterCurrentTemplateContext = createContext<any>(null);

function ConverterTemplatesContextFC() {
    const [currentTemplate, setCurrentTemplate] = useState<number>(DEFAULT_CONVERTER_CURRENT_TEMPLATE);
    const [templates, setTemplates] = useState<ConverterTemplate[]>([DEFAULT_CONVERTER_TEMPLATE]);

    return (
        <ConverterTemplatesContext.Provider value={{ templates, setTemplates }}>
            <ConverterCurrentTemplateContext.Provider value={{ currentTemplate, setCurrentTemplate }}>
                <CurrencyConverter />
            </ConverterCurrentTemplateContext.Provider>
        </ConverterTemplatesContext.Provider>
    );
}

export default ConverterTemplatesContextFC;
