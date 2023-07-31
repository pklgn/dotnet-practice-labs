import styles from "./ArrowDropDownIcon.module.css";

export type ArrowDropDownIconProps = {
    width: number;
    height: number;
    rotate?: 0 | 180;
    fillColor?: "#FFFFFF" | "#000000";
};

function ArrowDropDownIcon(props: ArrowDropDownIconProps) {
    const { width, height, rotate, fillColor } = props;
    return (
        <svg
            className={rotate == 180 ? styles.reflectX : ""}
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 -960 960 960"
        >
            <path fill={fillColor ?? "000000"} d="M480-360 280-559h400L480-360Z" />
        </svg>
    );
}

export default ArrowDropDownIcon;
