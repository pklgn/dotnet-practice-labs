import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CHART_OPTIONS, DEFAULT_DATASETS } from "../../../model/CurrencyConverter/CurrencyLineChartConfig";
import { CurrencyTableRow } from "../CurrencyTable/CurrencyTable";

Chart.register(CategoryScale);

type CurrencyLineChartProps = {
    rows: CurrencyTableRow[];
};

function CurrencyLineChart(props: CurrencyLineChartProps) {
    const { rows } = props;
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
            <Line data={chartData} options={CHART_OPTIONS} width={250} height={150} />
        </div>
    );
}

export default CurrencyLineChart;
