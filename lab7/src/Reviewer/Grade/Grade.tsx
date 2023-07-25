import styles from "./Grade.module.css";

// TODO: maybe I shouldn't export props type
export type GradeProps = {
    value: number;
    maxValue: number;
};

function Grade(props: GradeProps) {
    return (
        <div className={styles.grade}>
            {props.value}/{props.maxValue}
        </div>
    );
}

export default Grade;
