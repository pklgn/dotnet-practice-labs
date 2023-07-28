import styles from "./Select.module.css";

export type SelectProps = {
    options: string[];
    title?: string;
    style?: string;
};
function Select(props: SelectProps) {
    const { options, title, style } = props;
    return (
        <select className={`${styles.select} ${style ?? ""}`} title={title ?? ""}>
            {options.length !== 0 && options.map((option, index) => <option key={index}>{option}</option>)}
        </select>
    );
}

export default Select;
