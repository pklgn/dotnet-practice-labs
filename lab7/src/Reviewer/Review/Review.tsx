import AuthorThumbnail from "../../Common/Thumbnail/AuthorThumbnail/AuthorThumbnail";
import Grade, { GradeProps } from "../Grade/Grade";
import styles from "./Review.module.css";

type ReviewProps = {
    author: string;
    text: string;
    grade: GradeProps;
};

function Review(props: ReviewProps) {
    return (
        <div className={styles.review}>
            <div className={styles.authorThumbnail}>
                <AuthorThumbnail />
            </div>
            <div className={styles.content}>
                <h3 className={styles.author}>{props.author}</h3>
                <div className={styles.text}>{props.text}</div>
            </div>
            <div className={styles.grade}>
                <Grade
                    value={props.grade.value}
                    maxValue={props.grade.maxValue}
                />
            </div>
        </div>
    );
}

export default Review;
