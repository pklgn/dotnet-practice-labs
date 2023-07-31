import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonType = "submit" | "button";

type ButtonProps = {
    text: string;
    type: ButtonType;
    children?: ReactNode;
    onClick?: (event: React.MouseEvent) => void;
    // TODO: fix any type
    className?: string;
};

function Button(props: ButtonProps) {
    const { text, type, children, className, onClick } = props;
    return (
        <button type={type} className={`${styles.btn} ${className ?? ""}`} onClick={onClick}>
            {text}
            {children}
        </button>
    );
}

export default Button;
