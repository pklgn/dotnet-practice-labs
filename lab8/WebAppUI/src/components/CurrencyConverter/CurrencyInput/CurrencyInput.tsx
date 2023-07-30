import { ChangeEventHandler, useContext } from "react";
import Input, { InputType } from "../../Common/Input/Input";
import Select from "../../Common/Select/Select";
import { ConverterCurrenciesContext } from "../ConverterTemplatesContext/ConverterTemplatesContext";
import { Currency } from "../CurrencyConverter";
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
            <Input type={type} value={value} onChange={onChange} />
            <div className={styles.selectWrapper}>
                <div className={styles.selectDivider}></div>
                <Select
                    options={currencies.map((currency: Currency) => currency.name)}
                    title={"Test"}
                    value={selectedCurrency}
                    onChange={onSelectChange}
                />
            </div>
        </div>
    );
}

export default CurrencyInput;
