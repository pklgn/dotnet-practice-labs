import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CHART_OPTIONS, DEFAULT_DATASETS } from "../../../model/CurrencyConverter/CurrencyLineChartConfig";
import { ConverterExchangeContext } from "../ConverterTemplatesContext/ConverterTemplatesContext";
import { CurrencyTableFilter, CurrencyTableRow } from "../CurrencyTable/CurrencyTable";

Chart.register(CategoryScale);

type CurrencyLineChartProps = CurrencyTableFilter;

function CurrencyLineChart(props: CurrencyLineChartProps) {
    const { exchange } = useContext(ConverterExchangeContext);
    const { fromDateTime, toDateTime } = props;
    const [rows, setRows] = useState<CurrencyTableRow[]>([]);

    const [chartData, setChartData] = useState({
        labels: rows.map(data => data.dateTime),
        datasets: [
            {
                ...DEFAULT_DATASETS[0],
                data: rows.map(data => data.price),
            },
        ],
    });

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

        fetchCurrencyData();
    }, [exchange, fromDateTime, toDateTime]);

    useEffect(() => {
        setChartData(chartData => ({
            ...chartData,
            labels: rows.map(data => new Date(data.dateTime).toLocaleTimeString()),
            datasets: [
                {
                    ...chartData.datasets[0],
                    data: rows.map(data => data.price),
                },
            ],
        }));
        console.log(chartData);
    }, [rows]);

    return (
        <div className="chart-container">
            <Line data={chartData} options={CHART_OPTIONS} />
        </div>
    );
}

export default CurrencyLineChart;
