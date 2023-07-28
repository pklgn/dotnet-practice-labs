import { ChangeEventHandler, useEffect, useState } from "react";
import Button from "../Common/Button/Button";
import styles from "./CurrencyConverter.module.css";
import CurrencyInput from "./CurrencyInput/CurrencyInput";
import CurrencyTable from "./CurrencyTable/CurrencyTable";

export type Currency = {
    code: string;
    name: string;
    description: string;
    symbol: string;
};

function CurrencyConverter() {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [price, setPrice] = useState<number>(1.2);
    const [source, setSource] = useState<number>(1);
    const [target, setTarget] = useState<number>(price);
    const [sourceName, setSourceName] = useState<string>("Australian dollar");
    const [targetName, setTargetName] = useState<string>("Japanese yen");

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
    }, [source, price]);

    useEffect(() => {
        setSource(target / price);
    }, [target, price]);

    useEffect(() => {
        fetch("/api/Currencies")
            .then(response => response.json())
            .then((json: Currency[]) => {
                setCurrencies(json);
            });
    });
    // TODO: set max source input
    return (
        <div className={styles.converterWrapper}>
            <div className={styles.converter}>
                <div className={styles.inputWrapper}>
                    <div className={styles.source}>{`1 ${sourceName} equals`}</div>
                    <div className={styles.target}>{`${price} ${targetName}`}</div>
                    <div className={styles.datetime}>
                        <div className={styles.date}>
                            {new Date("2023-07-26T16:18:09Z").toLocaleDateString("ru-RU")}
                        </div>
                        <div className={styles.time}>
                            {new Date("2023-07-26T16:18:09Z").toLocaleTimeString("ru-RU")}
                        </div>
                    </div>
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
                    <CurrencyTable rows={[]} />
                </div>
            </div>
            <Button text={"More about currency"} type={"button"} />
        </div>
    );
}

export default CurrencyConverter;
