import { useEffect, useState } from "react";
import { ConverterTemplate } from "../ConverterTemplatesContext/ConverterTemplatesContext";
import { CurrencyTableRow } from "../CurrencyTable/CurrencyTable";
import styles from "./CurrencyEqualPrice.module.css";

type CurrencyEqualPriceProps = {
    sourceName: string;
    targetName: string;
    template: ConverterTemplate;
    price: number;
    handlePriceUpdate: (price: number) => void;
};

function CurrencyEqualPrice(props: CurrencyEqualPriceProps) {
    const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString());
    const { sourceName, targetName, template, price, handlePriceUpdate } = props;
    useEffect(() => {
        const fetchLastTemplatePrice = async () => {
            const stepDate = new Date(new Date().getTime() - 20 * 1000);
            const response = await fetch(
                `/api/prices?PaymentCurrency=${template.sourceCode}&PurchasedCurrency=${
                    template.targetCode
                }&FromDateTime=${stepDate.toISOString()}&ToDateTime=${new Date().toISOString()}`,
            );
            if (response.ok) {
                const json: CurrencyTableRow[] = await response.json();
                const lastTableRow = [...json].pop();
                if (lastTableRow) {
                    handlePriceUpdate(lastTableRow.price);
                    setCurrentDate(lastTableRow.dateTime);
                }
            }
        };

        fetchLastTemplatePrice().catch(console.error);
    }, []);

    return (
        <>
            <div className={styles.source}>{`1 ${sourceName} equals`}</div>
            <div className={styles.target}>{`${price} ${targetName}`}</div>
            <div className={styles.datetime}>
                <div className={styles.date}>{new Date(currentDate).toLocaleDateString()}</div>
                <div className={styles.time}>{new Date(currentDate).toLocaleTimeString()}</div>
            </div>
        </>
    );
}

export default CurrencyEqualPrice;
