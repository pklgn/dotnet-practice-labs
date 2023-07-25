import Button from "../Common/Button/Button";
import Textarea from "../Common/Textarea/Textarea";
import { GradeProps } from "./Grade/Grade";
import Rating from "./Rating/Rating";
import Review from "./Review/Review";
import styles from "./Reviewer.module.css";

function Reviewer() {
    // TODO: add l10n

    const grade: GradeProps = { value: 0, maxValue: 5 };
    return (
        <div className={styles.wrapper}>
            <div className={styles.reviewer}>
                <form className={styles.form}>
                    <h1 className={styles.title}>How nice was my reply?</h1>
                    <Rating style={styles.rating} />
                    <Textarea style={styles.textarea} />
                    <Button style={styles.btn} text="Send" />
                </form>
            </div>
            <Review author="John Doe" text="Some short text" grade={grade} />
        </div>
    );
}

export default Reviewer;
