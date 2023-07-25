import styles from "./Button.module.css";

type ButtonProps = {
    text: string;
    // TODO: fix any type
    style?: any;
};

function Button(props: ButtonProps) {
    return (
        <button className={`${styles.btn} ${props.style ?? ""}`}>
            {props.text}
        </button>
    );
}

export default Button;
