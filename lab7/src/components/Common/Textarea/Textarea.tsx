import {
    CSSProperties,
    ChangeEvent,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import styles from "./Textarea.module.css";

type TextareaProps = {
    value?: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    // FIXED: fix any type
    className?: string;
};

function Textarea(props: TextareaProps) {
    const [textAreaHeight, setTextAreaHeight] = useState<number | null>();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        props.onChange(event);
        setTextAreaHeight(null);
    };

    useLayoutEffect(() => {
        if (textareaRef.current) {
            setTextAreaHeight(null);
        }
    }, []);

    useLayoutEffect(() => {
        if (textareaRef.current) {
            if (textareaRef.current.value) {
                setTextAreaHeight(textareaRef.current.scrollHeight);
            } else {
                setTextAreaHeight(null);
            }
        }
    }, [props.value]);

    const textAreaStyles: CSSProperties = {
        height: textAreaHeight ? `${textAreaHeight}px` : "inherit",
    };

    return (
        <textarea
            ref={textareaRef}
            className={`${styles.textarea} ${props.className ?? ""}`}
            placeholder="What could we improve"
            onChange={handleTextChange}
            value={props.value}
            style={textAreaStyles}
        />
    );
}

export default Textarea;
