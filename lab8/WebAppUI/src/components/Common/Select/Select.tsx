import styles from "./Select.module.css";

export type SelectProps = {
    options: string[];
    title?: string;
    className?: string;
};
function Select(props: SelectProps) {
    const { options, title, className } = props;
    return (
        <select className={`${styles.select} ${className ?? ""}`} title={title ?? ""}>
            {options.length !== 0 && options.map((option, index) => <option key={index}>{option}</option>)}
        </select>
    );
}

export default Select;
