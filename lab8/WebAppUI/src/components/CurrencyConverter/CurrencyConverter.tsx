import { useContext, useEffect, useState } from "react";
import { DEFAULT_DATE_TIME_RANGES_IN_MILLISECONDS } from "../../model/CurrencyConverter/ConverterConstants";
import { Currency } from "../../model/CurrencyConverter/Currency";
import {
    ConverterCurrenciesContext,
    ConverterExchangeContext,
} from "./ConverterTemplatesContext/ConverterTemplatesContext";
import ConverterTemplatesDropdown from "./ConverterTemplatesDropdown/ConverterTemplatesDropdown";
import styles from "./CurrencyConverter.module.css";
import CurrencyDateTimeRange from "./CurrencyDateTimeRange/CurrencyDateTimeRange";
import CurrencyEqualPrice from "./CurrencyEqualPrice/CurrencyEqualPrice";
import CurrencyExchangeInputs from "./CurrencyExchangeInputs/CurrencyExchangeInputs";
import CurrencyVisualization from "./CurrencyVisualization/CurrencyVisualization";
import MoreAboutCurrency from "./MoreAboutCurrency/MoreAboutCurrency";

const DEFAULT_PRICE = 1;

function CurrencyConverter() {
    const { setCurrencies } = useContext(ConverterCurrenciesContext);
    const { exchange } = useContext(ConverterExchangeContext);
    const [price, setPrice] = useState<number>(DEFAULT_PRICE);

    useEffect(() => {
        const fetchCurrencies = async () => {
            const response = await fetch("/api/Currencies");
            if (response.ok) {
                const json: Currency[] = await response.json();
                setCurrencies(json);
            }
        };

        fetchCurrencies().catch(console.error);
    }, []);

    const handlePriceUpdate = (price: number) => {
        setPrice(() => price);
    };

    // TODO: add preloader when server doesnt response
    return (
        <div className={styles.converterWrapper}>
            <div className={styles.converter}>
                <div className={styles.inputWrapper}>
                    <CurrencyEqualPrice price={price} handlePriceUpdate={handlePriceUpdate} />
                    <CurrencyExchangeInputs price={price} />
                </div>
                <div className={styles.tableWrapper}>
                    <ConverterTemplatesDropdown />
                    <CurrencyDateTimeRange
                        options={DEFAULT_DATE_TIME_RANGES_IN_MILLISECONDS}
                        selectedOption={exchange.dateTimeRange}
                    />
                    <CurrencyVisualization
                        fromDateTime={new Date(new Date().getTime() - exchange.dateTimeRange)}
                        toDateTime={new Date()}
                    />
                </div>
            </div>
            <MoreAboutCurrency />
        </div>
    );
}

export default CurrencyConverter;
