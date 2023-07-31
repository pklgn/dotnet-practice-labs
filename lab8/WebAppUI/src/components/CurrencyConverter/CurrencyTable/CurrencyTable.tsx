import { useContext, useEffect, useState } from "react";
import { ConverterExchangeContext } from "../ConverterTemplatesContext/ConverterTemplatesContext";
import styles from "./CurrencyTable.module.css";

export type CurrencyTableRow = {
    source: string;
    target: string;
    price: number;
    dateTime: string;
};

type CurrencyTableFilter = {
    fromDateTime: Date;
    toDateTime?: Date;
};

type CurrencyTableProps = CurrencyTableFilter;

function CurrencyTable(props: CurrencyTableProps) {
    const { exchange } = useContext(ConverterExchangeContext);
    const { fromDateTime, toDateTime } = props;
    const [rows, setRows] = useState<CurrencyTableRow[]>([]);

    useEffect(() => {
        const fetchCurrencyData = async () => {
            const response = await fetch(
                `/api/prices?PaymentCurrency=${exchange.sourceCode}&PurchasedCurrency=${
                    exchange.targetCode
                }&FromDateTime=${fromDateTime.toISOString()}&ToDateTime=${new Date().toISOString()}`,
            );
            const data: CurrencyTableRow[] = await response.json();
            setRows(data);
        };

        fetchCurrencyData().catch(console.log);
    }, [exchange, fromDateTime, toDateTime]);

    return (
        <div className={styles.tableWrapper}>
            {rows.length !== 0 &&
                rows.map((row, index) => (
                    <div key={index} className={styles.tableRow}>
                        <div>{row.source}</div>
                        <div>{row.target}</div>
                        <div>{row.price}</div>
                        <div>{new Date(row.dateTime).toLocaleDateString()}</div>
                        <div>{new Date(row.dateTime).toLocaleTimeString()}</div>
                    </div>
                ))}
        </div>
    );
}

export default CurrencyTable;
