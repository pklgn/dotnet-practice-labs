import { useEffect } from "react";
import styles from "./CurrencyEqualPrice.module.css";

type CurrencyEqualPriceProps = {
    sourceName: string;
    targetName: string;
    price: number;
};

function CurrencyEqualPrice(props: CurrencyEqualPriceProps) {
    const currentDate = new Date();
    useEffect(() => {
        const fetchLastTemplatePrice = async () => {
            const stepDate = new Date(currentDate.getTime() - 20 * 1000);
            const response = await fetch(
                `/api/prices?PaymentCurrency=${templates[currentTemplate].sourceCode}&PurchasedCurrency=${
                    templates[currentTemplate].targetCode
                }&FromDateTime=${stepDate.toISOString()}&ToDateTime=${currentDate.toISOString()}`,
            );
            if (response.ok) {
                const json: CurrencyTableRow[] = await response.json();
                console.log(json);
                setPrice(json.pop()?.price);
            }
        };

        //fetchLastTemplatePrice().catch(console.error);
    }, [currentTemplate]);
    const { sourceName, targetName, price } = props;
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
