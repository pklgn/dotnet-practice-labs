import { useContext, useState } from "react";
import Button from "../../Common/Button/Button";
import ArrowDropDownIcon from "../../Icons/ArrowDropDownIcon/ArrowDropDownIcon";
import {
    ConverterExchangeContext,
    ConverterTemplate,
    ConverterTemplatesContext,
} from "../ConverterTemplatesContext/ConverterTemplatesContext";
import styles from "./ConverterTemplatesDropdown.module.css";

function ConverterTemplatesDropdown() {
    const [toggle, setToggle] = useState<boolean>(false);
    const { templates, setTemplates } = useContext(ConverterTemplatesContext);
    const { exchange, setExchange } = useContext(ConverterExchangeContext);

    const handleDropdownOnClick = () => {
        setToggle(toggle => !toggle);
    };

    const handleSaveTemplateOnClick = () => {
        // TODO: add duplicates checking
        setTemplates((prevTemplates: ConverterTemplate[]) => prevTemplates.concat(exchange));
    };

    return (
        <div>
            <div className={styles.buttonsWrapper}>
                <Button text={"Save template"} type={"button"} onClick={handleSaveTemplateOnClick} />
                <Button
                    text={""}
                    type={"button"}
                    children={
                        <ArrowDropDownIcon width={15} height={15} fillColor={"#FFFFFF"} rotate={toggle ? 180 : 0} />
                    }
                    onClick={handleDropdownOnClick}
                />
            </div>
            {toggle && (
                <div className={styles.templates}>
                    {templates.map((template: ConverterTemplate, index: number) => {
                        return (
                            <div
                                key={index}
                                onClick={() => {
                                    setExchange(() => templates[index]);
                                    setToggle(toggle => !toggle);
                                }}
                                className={styles.template}
                            >
                                {`${template.sourceCode} -> ${template.targetCode} in last ${Math.floor(
                                    template.dateTimeRange / 1000 / 60,
                                )} min(s)`}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default ConverterTemplatesDropdown;
