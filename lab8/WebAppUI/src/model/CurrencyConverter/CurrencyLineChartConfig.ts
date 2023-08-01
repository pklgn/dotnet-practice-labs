export const CHART_OPTIONS = {
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function (context: any) {
                    const labelItem = context.label;
                    if (labelItem) {
                        return labelItem + ": " + context.formattedValue;
                    }
                    return "";
                },
            },
        },
    },
    scales: {
        x: {
            display: false,
            grid: {
                display: false,
            },
            ticks: {
                font: {
                    size: 12,
                },
                color: "rgba(0, 0, 0, 0.54)",
            },
        },
        y: {
            grid: {
                color: "rgba(0, 0, 0, 0.1)",
                drawBorder: false,
                drawTicks: false,
                borderDash: [3, 3],
            },
            ticks: {
                font: {
                    size: 12,
                },
                color: "rgba(0, 0, 0, 0.54)",
            },
        },
    },
};

export const DEFAULT_DATASETS = [
    {
        label: "Price",
        backgroundColor: "rgba(66, 133, 244, 0.2)",
        borderColor: "rgba(66, 133, 244, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(66, 133, 244, 1)",
        pointBorderColor: "rgba(255, 255, 255, 1)",
        pointHoverBackgroundColor: "rgba(66, 133, 244, 1)",
        pointHoverBorderColor: "rgba(255, 255, 255, 1)",
    },
];
