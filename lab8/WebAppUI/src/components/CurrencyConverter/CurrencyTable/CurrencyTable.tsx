import { useEffect, useState } from "react";

export type CurrencyTableRow = {
    source: string;
    target: string;
    price: number;
    dateTime: string;
};

type CurrencyTableFilter = {
    paymentCurrency: string;
    purchasedCurrency: string;
    fromDateTime: Date;
    toDateTime?: Date;
};

type CurrencyTableProps = CurrencyTableFilter;

function CurrencyTable(props: CurrencyTableProps) {
    const { paymentCurrency, purchasedCurrency, fromDateTime, toDateTime } = props;
    const [rows, setRows] = useState<CurrencyTableRow[]>([]);

    useEffect(() => {
        console.log(fromDateTime.toISOString());
        const fetchCurrencyData = async () => {
            const response = await fetch(
                `/api/prices?PaymentCurrency=${paymentCurrency}&PurchasedCurrency=${purchasedCurrency}&FromDateTime=${fromDateTime.toISOString()}&ToDateTime=${toDateTime?.toISOString()}`,
            );
            const data: CurrencyTableRow[] = await response.json();
            setRows(data);
        };

        fetchCurrencyData().catch(console.log);
    }, [paymentCurrency, purchasedCurrency, fromDateTime, toDateTime]);

    console.log();
    return (
        <div>
            {rows.length !== 0 &&
                rows.map((row, index) => (
                    <div key={index}>
                        <span>{row.source}</span>
                        <span>{row.target}</span>
                        <span>{row.price}</span>
                        <span>{new Date(row.dateTime).toLocaleDateString("en-US")}</span>
                        <span>{new Date(row.dateTime).toLocaleTimeString("en-US")}</span>
                    </div>
                ))}
        </div>
    );
}

export default CurrencyTable;
