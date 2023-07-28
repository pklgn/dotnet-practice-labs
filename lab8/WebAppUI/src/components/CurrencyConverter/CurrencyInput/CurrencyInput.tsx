import { ChangeEventHandler } from "react";
import Input, { InputType } from "../../Common/Input/Input";
import Select from "../../Common/Select/Select";
import styles from "./CurrencyInput.module.css";

// TODO: maybe replace with common InputProps
export type CurrencyInputProps = {
    type: InputType;
    currencies: string[];
    onChange?: ChangeEventHandler<HTMLInputElement>;
    value?: string;
    defaultValue?: string;
    style?: any;
};
function CurrencyInput(props: CurrencyInputProps) {
    const { type, currencies, onChange, value, style } = props;
    return (
        <div className={`${styles.inputWrapper} ${style ?? ""}`}>
            <Input type={type} value={value} onChange={onChange} />
            <div className={styles.selectWrapper}>
                <div className={styles.selectDivider}></div>
                <Select options={currencies} title={"Test"} />
            </div>
        </div>
    );
}

export default CurrencyInput;
