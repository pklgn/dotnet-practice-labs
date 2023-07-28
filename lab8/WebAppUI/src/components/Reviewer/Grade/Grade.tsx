import styles from "./Grade.module.css";

// TODO: maybe I shouldn't export props type
export type GradeProps = {
    grade: number;
    maxGrade: number;
};

function Grade(props: GradeProps) {
    return (
        <div className={styles.grade}>
            {props.grade}/{props.maxGrade}
        </div>
    );
}

export default Grade;
