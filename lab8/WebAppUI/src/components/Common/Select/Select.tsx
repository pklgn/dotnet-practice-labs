import { ChangeEventHandler } from "react";
import styles from "./Select.module.css";

export type SelectProps = {
    value: string;
    options: string[];
    title?: string;
    className?: string;
    onChange?: ChangeEventHandler<HTMLSelectElement>;
};
function Select(props: SelectProps) {
    const { value, options, title, className, onChange } = props;
    return (
        <select className={`${styles.select} ${className ?? ""}`} title={title ?? ""} value={value} onChange={onChange}>
            {options.length !== 0 &&
                options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
        </select>
    );
}

export default Select;
