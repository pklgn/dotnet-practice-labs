import styles from "./Button.module.css";

type ButtonType = "submit" | "button";

type ButtonProps = {
    text: string;
    type: ButtonType;
    onClick?: (event: React.MouseEvent) => void;
    // TODO: fix any type
    style?: any;
};

function Button(props: ButtonProps) {
    return (
        <button
            type={props.type}
            className={`${styles.btn} ${props.style ?? ""}`}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

export default Button;
