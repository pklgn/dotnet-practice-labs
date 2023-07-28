import AuthorThumbnail from "../../Common/Thumbnail/AuthorThumbnail/AuthorThumbnail";
import Grade, { GradeProps } from "../Grade/Grade";
import styles from "./Review.module.css";

export type ReviewProps = {
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
                    grade={props.grade.grade}
                    maxGrade={props.grade.maxGrade}
                />
            </div>
        </div>
    );
}

export default Review;
