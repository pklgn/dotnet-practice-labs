import styles from "./Textarea.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

type TextareaProps = {
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    // TODO: fix any type
    style?: any;
};

function Textarea(props: TextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useLayoutEffect(() => handleOnInput(), []);

    const handleOnInput = () => {
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
            onInput={handleOnInput}
            onChange={props.onChange}
            value={props.value}
        />
    );
}

export default Textarea;
