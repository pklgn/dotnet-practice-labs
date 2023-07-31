import { useContext } from "react";
import { ConverterTemplate } from "../../../model/CurrencyConverter/ConverterConstants";
import { ConverterExchangeContext } from "../ConverterTemplatesContext/ConverterTemplatesContext";
import styles from "./CurrencyDateTimeRange.module.css";

type CurrencyDateTimeRangeProps = {
    selectedOption: number;
    // each option is datetime in ms to currentDate
    options: number[];
};

function CurrencyDateTimeRange(props: CurrencyDateTimeRangeProps) {
    const { selectedOption, options } = props;
    const { _, setExchange } = useContext(ConverterExchangeContext);

    return (
        <div className={styles.wrapper}>
            {options.map((option: number, index: number) => {
                return (
                    <div
                        key={index}
                        className={`${styles.dateTime} ${selectedOption == option ? styles.selected : ""}`}
                        onClick={() =>
                            setExchange((prevExchange: ConverterTemplate) => ({
                                ...prevExchange,
                                dateTimeRange: option,
                            }))
                        }
                    >
                        {Math.floor(option / 1000 / 60)} min(s)
                    </div>
                );
            })}
        </div>
    );
}

export default CurrencyDateTimeRange;
