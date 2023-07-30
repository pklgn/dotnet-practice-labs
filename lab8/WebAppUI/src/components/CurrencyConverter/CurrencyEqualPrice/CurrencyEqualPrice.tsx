import { useContext, useEffect, useState } from "react";
import {
    ConverterCurrenciesContext,
    ConverterExchangeContext,
} from "../ConverterTemplatesContext/ConverterTemplatesContext";
import { CurrencyTableRow } from "../CurrencyTable/CurrencyTable";
import { getCurrencyNameByCode } from "../utils/currencyConverter";
import styles from "./CurrencyEqualPrice.module.css";

type CurrencyEqualPriceProps = {
    price: number;
    handlePriceUpdate: (price: number) => void;
};

function CurrencyEqualPrice(props: CurrencyEqualPriceProps) {
    const [currentDate, setCurrentDate] = useState<string>(new Date().toISOString());
    const { currencies, setCurrencies } = useContext(ConverterCurrenciesContext);
    const { exchange, setExchange } = useContext(ConverterExchangeContext);
    const { price, handlePriceUpdate } = props;
    useEffect(() => {
        const fetchLastTemplatePrice = async () => {
            const stepDate = new Date(new Date().getTime() - 20 * 1000);
            const response = await fetch(
                `/api/prices?PaymentCurrency=${exchange.sourceCode}&PurchasedCurrency=${
                    exchange.targetCode
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
    }, [exchange]);

    return (
        <>
            <div className={styles.source}>{`1 ${getCurrencyNameByCode(exchange.sourceCode, currencies)} equals`}</div>
            <div className={styles.target}>{`${price} ${getCurrencyNameByCode(exchange.targetCode, currencies)}`}</div>
            <div className={styles.datetime}>
                <div className={styles.date}>{new Date(currentDate).toLocaleDateString()}</div>
                <div className={styles.time}>{new Date(currentDate).toLocaleTimeString()}</div>
            </div>
        </>
    );
}

export default CurrencyEqualPrice;
