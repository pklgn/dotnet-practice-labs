import { useContext, useEffect, useState } from "react";
import { DEFAULT_PRICE_UPDATE_IN_MILLISECONDS } from "../../../model/CurrencyConverter/ConverterConstants";
import { getCurrencyNameByCode } from "../../../model/CurrencyConverter/Currency";
import {
    ConverterCurrenciesContext,
    ConverterExchangeContext,
} from "../ConverterTemplatesContext/ConverterTemplatesContext";
import { CurrencyTableRow } from "../CurrencyTable/CurrencyTable";
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
    const fetchLastExchangePrice = async () => {
        const stepDate = new Date(new Date().getTime() - DEFAULT_PRICE_UPDATE_IN_MILLISECONDS);
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

    useEffect(() => {
        fetchLastExchangePrice().catch(console.error);
        const intervalId = setInterval(() => {
            fetchLastExchangePrice().catch(console.error);
        }, DEFAULT_PRICE_UPDATE_IN_MILLISECONDS);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

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
