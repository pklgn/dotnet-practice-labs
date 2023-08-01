import styles from "./CurrencyTable.module.css";

export type CurrencyTableRow = {
    source: string;
    target: string;
    price: number;
    dateTime: string;
};

export type CurrencyTableFilter = {
    fromDateTime: Date;
    toDateTime?: Date;
};

type CurrencyTableProps = { rows: CurrencyTableRow[] };

function CurrencyTable(props: CurrencyTableProps) {
    const { rows } = props;

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
