import Grade from "../Grade/Grade";
import { useState } from "react";
import StarGrade from "../StarGrade/StarGrade";
import styles from "./Rating.module.css";

type RatingProps = {
    // TODO: fix any type
    style?: any;
};

function Rating(props: RatingProps) {
    // TODO: try to set max rating differently?
    const maxRating = 5;
    let [rating, setRating] = useState(0);

    return (
        <div className={`${styles.rating} ${props.style ?? ""}`}>
            <div className={styles.grade}>
                <Grade value={rating} maxValue={maxRating} />
            </div>
            <StarGrade value={rating} maxValue={maxRating} />
        </div>
    );
}

export default Rating;
