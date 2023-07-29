import { ChangeEventHandler, useEffect, useState } from "react";
import Button from "../Common/Button/Button";
import styles from "./CurrencyConverter.module.css";
import CurrencyEqualPrice from "./CurrencyEqualPrice/CurrencyEqualPrice";
import CurrencyInput from "./CurrencyInput/CurrencyInput";
import CurrencyTable from "./CurrencyTable/CurrencyTable";

export type Currency = {
    code: string;
    name: string;
    description: string;
    symbol: string;
};

export type ConverterTemplate = {
    sourceCode: string;
    targetCode: string;
};

function CurrencyConverter() {
    const [currentTemplate, setCurrentTemplate] = useState<number>(0);
    const [templates, setTemplates] = useState<ConverterTemplate[]>([{ sourceCode: "AUD", targetCode: "JPY" }]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [price, setPrice] = useState<number>(1.2);
    const [source, setSource] = useState<number>(1);
    const [target, setTarget] = useState<number>(price);
    const [sourceName, setSourceName] = useState<string>("Australian dollar");
    const [targetName, setTargetName] = useState<string>("Japanese yen");
    // TODO: refactor this ASAP
    const currentDate = new Date();
    const [fromDatetime, setFromDateTime] = useState<Date>(new Date(currentDate.getTime() - 2 * 60 * 1000));
    const [toDatetime, setToDateTime] = useState<Date>(currentDate);

    const handleSourceOnChange: ChangeEventHandler<HTMLInputElement> = event => {
        if (event.currentTarget.value) {
            const value = Number(event.currentTarget.value);
            setSource(() => value);
        }
    };

    const handleTargetOnChange: ChangeEventHandler<HTMLInputElement> = event => {
        if (event.currentTarget.value) {
            const value = Number(event.currentTarget.value);
            setTarget(() => value);
        }
    };

    useEffect(() => {
        setTarget(source * price);
    }, [source]);

    useEffect(() => {
        setSource(target / price);
    }, [target]);

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

    // TODO: set max source input
    return (
        <div className={styles.converterWrapper}>
            <div className={styles.converter}>
                <div className={styles.inputWrapper}>
                    <CurrencyEqualPrice sourceName={sourceName} targetName={targetName} price={price} />
                    <CurrencyInput
                        currencies={currencies.map((currency: Currency) => currency.name)}
                        type={"number"}
                        value={`${source}`}
                        defaultValue={"1"}
                        onChange={handleSourceOnChange}
                    />
                    <CurrencyInput
                        currencies={currencies.map((currency: Currency) => currency.name)}
                        type={"number"}
                        value={`${target}`}
                        defaultValue={`${price}`}
                        onChange={handleTargetOnChange}
                    />
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
