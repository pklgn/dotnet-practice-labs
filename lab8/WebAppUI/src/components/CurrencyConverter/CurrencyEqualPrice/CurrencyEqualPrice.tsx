import { useEffect } from "react";
import { CurrencyTableRow } from "../CurrencyTable/CurrencyTable";
import styles from "./CurrencyEqualPrice.module.css";

export type ConverterTemplate = {
    sourceCode: string;
    targetCode: string;
};

type CurrencyEqualPriceProps = {
    sourceName: string;
    targetName: string;
    template: ConverterTemplate;
    price: number;
    handlePriceUpdate: (price: number) => void;
};

function CurrencyEqualPrice(props: CurrencyEqualPriceProps) {
    const { sourceName, targetName, template, price, handlePriceUpdate } = props;
    const currentDate = new Date();
    useEffect(() => {
        const fetchLastTemplatePrice = async () => {
            const stepDate = new Date(currentDate.getTime() - 20 * 1000);
            const response = await fetch(
                `/api/prices?PaymentCurrency=${template.sourceCode}&PurchasedCurrency=${
                    template.targetCode
                }&FromDateTime=${stepDate.toISOString()}&ToDateTime=${currentDate.toISOString()}`,
            );
            if (response.ok) {
                const json: CurrencyTableRow[] = await response.json();
                console.log(json);
                handlePriceUpdate([...json].pop()?.price ?? 1);
            }
        };

        fetchLastTemplatePrice().catch(console.error);
    }, []);
    return (
        <>
            <div className={styles.source}>{`1 ${sourceName} equals`}</div>
            <div className={styles.target}>{`${price} ${targetName}`}</div>
            <div className={styles.datetime}>
                <div className={styles.date}>{new Date("2023-07-26T16:18:09Z").toLocaleDateString("ru-RU")}</div>
                <div className={styles.time}>{new Date("2023-07-26T16:18:09Z").toLocaleTimeString("ru-RU")}</div>
            </div>
        </>
    );
}

export default CurrencyEqualPrice;
