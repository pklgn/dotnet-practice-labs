import { ChangeEventHandler } from "react";
import styles from "./Input.module.css";

export type InputType = "number" | "text";

export type InputProps = {
    type?: InputType;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    className?: string;
};
function Input(props: InputProps) {
    const { type, onChange, placeholder, value, defaultValue, className } = props;
    return (
        <input
            className={`${styles.input} ${className ?? ""}`}
            placeholder={placeholder ?? ""}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            type={type}
        />
    );
}

export default Input;
