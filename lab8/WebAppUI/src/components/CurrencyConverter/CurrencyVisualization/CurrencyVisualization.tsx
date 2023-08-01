import { useContext, useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import { ConverterExchangeContext } from "../ConverterTemplatesContext/ConverterTemplatesContext";
import CurrencyLineChart from "../CurrencyLineChart/CurrencyLineChart";
import CurrencyTable, { CurrencyTableFilter, CurrencyTableRow } from "../CurrencyTable/CurrencyTable";
import styles from "./CurrencyVisualization.module.css";

type CurrencyVisualizationProps = CurrencyTableFilter;

function CurrencyVisualization(props: CurrencyVisualizationProps) {
    const { exchange } = useContext(ConverterExchangeContext);
    const { fromDateTime, toDateTime } = props;
    const [rows, setRows] = useState<CurrencyTableRow[]>([]);
    const [chartMode, setChartMode] = useState<boolean>(true);

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
        <div className={styles.contentWrapper}>
            {chartMode ? <CurrencyLineChart rows={rows} /> : <CurrencyTable rows={rows} />}
            <Button text={"Change mode"} type={"button"} onClick={() => setChartMode(mode => !mode)} />
        </div>
    );
}

export default CurrencyVisualization;
