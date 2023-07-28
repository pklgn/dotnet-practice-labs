export type CurrencyTableRow = {
    source: string;
    target: string;
    price: number;
    dateTime: Date;
};

export type CurrencyTableProps = {
    rows: CurrencyTableRow[];
};

function CurrencyTable(props: CurrencyTableProps) {
    const { rows } = props;

    return (
        <div>
            {rows.length !== 0 &&
                rows.map((row, index) => (
                    <div key={index}>
                        <span>{row.source}</span>
                        <span>{row.target}</span>
                        <span>{row.price}</span>
                        <span>{row.dateTime.toLocaleDateString()}</span>
                        <span>{row.dateTime.toLocaleTimeString()}</span>
                    </div>
                ))}
        </div>
    );
}

export default CurrencyTable;
