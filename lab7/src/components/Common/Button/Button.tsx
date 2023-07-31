import styles from "./Button.module.css";

type ButtonType = "submit" | "button";

type ButtonProps = {
    text: string;
    type: ButtonType;
    onClick?: (event: React.MouseEvent) => void;
    // FIXED: fix any type
    className?: string;
};

function Button(props: ButtonProps) {
    return (
        <button
            type={props.type}
            className={`${styles.btn} ${props.className ?? ""}`}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

export default Button;
