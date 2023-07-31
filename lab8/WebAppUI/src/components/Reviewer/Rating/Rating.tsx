import Grade from "../Grade/Grade";
import StarGrade from "../StarGrade/StarGrade";
import styles from "./Rating.module.css";

type RatingProps = {
    rating: number;
    maxRating: number;
    setRating: (rating: number) => void;
    // TODO: fix any type
    style?: any;
};

function Rating(props: RatingProps) {
    const { rating, maxRating, setRating } = props;
    return (
        <div className={`${styles.rating} ${props.style ?? ""}`}>
            <div className={styles.grade}>
                <Grade grade={rating} maxGrade={maxRating} />
            </div>
            <StarGrade currentGrade={rating} maxGrade={maxRating} setGrade={setRating} />
        </div>
    );
}

export default Rating;
