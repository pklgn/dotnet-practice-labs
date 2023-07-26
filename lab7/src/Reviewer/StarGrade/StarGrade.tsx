import { MouseEvent, useEffect, useState } from "react";
import Star from "../Star/Star";
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

    function handleMouseOver(event: React.SyntheticEvent<HTMLDivElement>) {
        if (event.currentTarget.dataset && event.currentTarget.dataset.index) {
            setGrade(Number(event.currentTarget.dataset.index) + 1);
        }
    }

    return (
        <div className={styles.starGrades}>
            {filledStars.length !== 0 &&
                filledStars.map((filledStar, index) => (
                    <div
                        data-index={JSON.stringify(index)}
                        key={index}
                        onMouseOver={handleMouseOver}
                    >
                        {filledStar}
                    </div>
                ))}
            {defaultStars.length !== 0 &&
                defaultStars.map((defaultStar, index) => (
                    <div
                        data-index={JSON.stringify(index + filledStars.length)}
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
