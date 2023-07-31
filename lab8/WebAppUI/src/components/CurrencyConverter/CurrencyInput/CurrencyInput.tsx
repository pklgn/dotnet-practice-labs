import { ChangeEventHandler, useContext } from "react";
import { Currency } from "../../../model/CurrencyConverter/Currency";
import Input, { InputType } from "../../Common/Input/Input";
import Select from "../../Common/Select/Select";
import { ConverterCurrenciesContext } from "../ConverterTemplatesContext/ConverterTemplatesContext";
import styles from "./CurrencyInput.module.css";

// TODO: maybe replace with common InputProps
export type CurrencyInputProps = {
    type: InputType;
    selectedCurrency: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onSelectChange?: ChangeEventHandler<HTMLSelectElement>;
    value?: string;
    defaultValue?: string;
    className?: any;
};

function CurrencyInput(props: CurrencyInputProps) {
    const { currencies, _ } = useContext(ConverterCurrenciesContext);

    const { type, selectedCurrency, onChange, onSelectChange, value, className } = props;
    return (
        <div className={`${styles.inputWrapper} ${className ?? ""}`}>
            <Input type={type} value={value} onChange={onChange} className={styles.input} />
            <div className={styles.selectWrapper}>
                <div className={styles.selectDivider}></div>
                <Select
                    options={currencies.map((currency: Currency) => currency.name)}
                    title={"Test"}
                    value={selectedCurrency}
                    onChange={onSelectChange}
                    className={styles.select}
                />
            </div>
        </div>
    );
}

export default CurrencyInput;
