import styles from "./Grade.module.css";

// FIXED: maybe I shouldn't export props type
export type GradeType = {
    grade: number;
    maxGrade: number;
};

type GradeProps = GradeType;

function Grade(props: GradeProps) {
    return (
        <div className={styles.grade}>
            {props.grade}/{props.maxGrade}
        </div>
    );
}

export default Grade;
