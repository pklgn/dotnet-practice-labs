import { useContext, useEffect, useRef, useState } from "react";
import Button from "../Common/Button/Button";
import {
    ConverterCurrenciesContext,
    ConverterCurrentTemplateIndexContext,
    ConverterTemplatesContext,
} from "./ConverterTemplatesContext/ConverterTemplatesContext";
import styles from "./CurrencyConverter.module.css";
import CurrencyEqualPrice from "./CurrencyEqualPrice/CurrencyEqualPrice";
import CurrencyExchangeInputs from "./CurrencyExchangeInputs/CurrencyExchangeInputs";
import CurrencyTable from "./CurrencyTable/CurrencyTable";
import { getCurrencyNameByCode } from "./utils/currencyConverter";

export type Currency = {
    code: string;
    name: string;
    description: string;
    symbol: string;
};

function CurrencyConverter() {
    const { currentTemplate, setCurrentTemplate } = useContext(ConverterCurrentTemplateIndexContext);
    const { templates, setTemplates } = useContext(ConverterTemplatesContext);
    const { currencies, setCurrencies } = useContext(ConverterCurrenciesContext);
    const price = useRef<number>(1);
    const [sourceName, setSourceName] = useState<string>();
    const [targetName, setTargetName] = useState<string>();
    // TODO: refactor this ASAP
    const currentDate = new Date();
    const [fromDatetime, setFromDateTime] = useState<Date>(new Date(currentDate.getTime() - 2 * 60 * 1000));
    const [toDatetime, setToDateTime] = useState<Date>(currentDate);

    useEffect(() => {
        setSourceName(getCurrencyNameByCode(templates[currentTemplate].sourceCode, currencies));
        setTargetName(getCurrencyNameByCode(templates[currentTemplate].targetCode, currencies));
    }, [currentTemplate, templates, currencies]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            const response = await fetch("/api/Currencies");
            if (response.ok) {
                const json: Currency[] = await response.json();
                setCurrencies(json);
            }
        };

        fetchCurrencies().catch(console.error);
    }, []);

    const handlePriceUpdate = (newPrice: number) => {
        price.current = newPrice;
    };

    // TODO: set max source input
    return (
        <div className={styles.converterWrapper}>
            <div className={styles.converter}>
                <div className={styles.inputWrapper}>
                    <CurrencyEqualPrice price={price.current} handlePriceUpdate={handlePriceUpdate} />
                    <CurrencyExchangeInputs price={price.current} />
                </div>
                <div className={styles.tableWrapper}>
                    <Button text={"Save template"} type={"button"} />
                    <CurrencyTable
                        paymentCurrency={templates[currentTemplate].sourceCode}
                        purchasedCurrency={templates[currentTemplate].targetCode}
                        fromDateTime={fromDatetime}
                        toDateTime={toDatetime}
                    />
                </div>
            </div>
            <Button text={"More about currency"} type={"button"} />
        </div>
    );
}

export default CurrencyConverter;
