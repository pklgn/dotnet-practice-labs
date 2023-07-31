import { useState } from "react";
import Textarea from "../Common/Textarea/Textarea";
import Rating from "../Reviewer/Rating/Rating";
import Review from "../Reviewer/Review/Review";
import styles from "./Reviewer.module.css";
import Button from "../Common/Button/Button";
import { GradeType } from "./Grade/Grade";

type Review = {
    author: string;
    text: string;
    grade: GradeType;
};

function Reviewer() {
    const MAX_RATING: number = 5;

    const [rating, setRating] = useState<number>(0);
    const [text, setText] = useState<string>("");
    const [reviews, setReviews] = useState<Review[]>([]);

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };

    const handleOnClick = (event: React.MouseEvent) => {
        event.preventDefault();

        const review: Review = {
            author: "John Doe",
            text: text,
            grade: {
                grade: rating,
                maxGrade: MAX_RATING,
            },
        };
        setText("");
        setRating(0);
        setReviews([review]);
    };

    // TODO: add l10n
    return (
        <div className={styles.wrapper}>
            <div className={styles.reviewer}>
                <form className={styles.form}>
                    <h1 className={styles.title}>How nice was my reply?</h1>
                    <Rating
                        className={styles.rating}
                        rating={rating}
                        maxRating={MAX_RATING}
                        setRating={setRating}
                    />
                    <Textarea
                        className={styles.textarea}
                        value={text}
                        onChange={handleOnChange}
                    />
                    <Button
                        className={styles.btn}
                        text="Send"
                        type="submit"
                        onClick={handleOnClick}
                    />
                </form>
            </div>
            {reviews.length != 0 &&
                reviews.map((review, index) => (
                    <div key={index}>
                        <Review
                            author={review.author}
                            text={review.text}
                            grade={review.grade}
                        />
                    </div>
                ))}
        </div>
    );
}

export default Reviewer;
