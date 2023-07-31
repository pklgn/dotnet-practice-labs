import Star from "../../Common/Star/Star";
import styles from "./StarGrade.module.css";

type StarGradeProps = {
    currentGrade: number;
    maxGrade: number;
    setGrade: (grade: number) => void;
};

function StarGrade(props: StarGradeProps) {
    const { currentGrade, maxGrade, setGrade } = props;

    // TODO: add isGrading or smth like that to commit user input
    const filledStars = Array.from({ length: currentGrade }, () => (
        <Star state="filled" />
    ));
    const defaultStars = Array.from({ length: maxGrade - currentGrade }, () => (
        <Star state="default" />
    ));

    return (
        <div className={styles.starGrades}>
            {filledStars.length !== 0 &&
                filledStars.map((filledStar, index) => (
                    <div key={index} onMouseOver={() => setGrade(index + 1)}>
                        {filledStar}
                    </div>
                ))}
            {defaultStars.length !== 0 &&
                defaultStars.map((defaultStar, index) => (
                    <div
                        key={index + filledStars.length}
                        onMouseOver={() =>
                            setGrade(index + +filledStars.length + 1)
                        }
                    >
                        {defaultStar}
                    </div>
                ))}
        </div>
    );
}

export default StarGrade;
