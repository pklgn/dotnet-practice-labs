import { ChangeEventHandler } from "react";
import styles from "./Input.module.css";

export type InputType = "number" | "text";

export type InputProps = {
    type?: InputType;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    style?: any;
};
function Input(props: InputProps) {
    const { type, onChange, placeholder, value, defaultValue, style } = props;
    return (
        <input
            className={`${styles.input} ${style ?? ""}`}
            placeholder={placeholder ?? ""}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            type={type}
        />
    );
}

export default Input;
