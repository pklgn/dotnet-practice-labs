import styles from "./Textarea.module.css";
import { useEffect, useRef } from "react";

type TextareaProps = {
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    // TODO: fix any type
    style?: any;
};

function Textarea(props: TextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "inherit";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    });

    return (
        <textarea
            ref={textareaRef}
            className={`${styles.textarea} ${props.style ?? ""}`}
            placeholder="What could we improve"
            onChange={props.onChange}
            value={props.value}
        />
    );
}

export default Textarea;
