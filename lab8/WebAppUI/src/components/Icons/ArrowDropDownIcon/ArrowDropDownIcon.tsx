export type ArrowDropDownIconProps = {
    height: number;
    width: number;
};

function ArrowDropDownIcon(props: ArrowDropDownIconProps) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={props.height} viewBox="0 -960 960 960" width={props.width}>
            <path d="M480-360 280-559h400L480-360Z" />
        </svg>
    );
}

export default ArrowDropDownIcon;
