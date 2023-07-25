import styles from "./Textarea.module.css";
import { useEffect, useRef } from "react";

type TextareaProps = {
    // TODO: fix any type
    style?: any;
};

function Textarea(props: TextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => handleInput(), []);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    return (
        <textarea
            ref={textareaRef}
            className={`${styles.textarea} ${props.style ?? ""}`}
            placeholder="What could we improve"
            onInput={handleInput}
        />
    );
}

export default Textarea;
