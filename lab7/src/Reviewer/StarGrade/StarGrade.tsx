import Star from "../Star/Star";
import styles from "./StarGrade.module.css";

type StarGradeProps = {
    value: number;
    maxValue: number;
};

function StarGrade(props: StarGradeProps) {
    const { value, maxValue } = props;
    const filledStars = Array.from({ length: value }, () => (
        <Star state="filled" />
    ));
    const defaultStars = Array.from({ length: maxValue - value }, () => (
        <Star state="default" />
    ));

    function handleMouseOver(event: React.MouseEvent) {
        const currentElement = event.target;
        event.stopPropagation();
        console.log("Current element:", currentElement);
    }

    return (
        <div className={styles.starGrades}>
            {filledStars.length !== 0 &&
                filledStars.map((filledStar, index) => (
                    <div key={index} onMouseOver={handleMouseOver}>
                        {filledStar}
                    </div>
                ))}
            {defaultStars.length !== 0 &&
                defaultStars.map((defaultStar, index) => (
                    <div
                        key={index + filledStars.length}
                        onMouseOver={handleMouseOver}
                    >
                        {defaultStar}
                    </div>
                ))}
        </div>
    );
}

export default StarGrade;
