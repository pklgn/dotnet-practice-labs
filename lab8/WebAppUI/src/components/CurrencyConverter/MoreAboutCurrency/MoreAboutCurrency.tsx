import { useContext, useEffect, useState } from "react";
import { Currency } from "../../../model/CurrencyConverter/Currency";
import Button from "../../Common/Button/Button";
import ArrowDropDownIcon from "../../Icons/ArrowDropDownIcon/ArrowDropDownIcon";
import { ConverterExchangeContext } from "../ConverterTemplatesContext/ConverterTemplatesContext";
import styles from "./MoreAboutCurrency.module.css";

const fetchCurrency = async (code: string, setCurrency: (currency: Currency) => void) => {
    const response = await fetch(`/api/Currencies/${code}`);
    if (response.ok) {
        const json: Currency = await response.json();
        setCurrency(json);
    }
};

function MoreAboutCurrency() {
    const [toggle, setToggle] = useState<boolean>(false);
    const [sourceCurrency, setSourceCurrency] = useState<Currency>();
    const [targetCurrency, setTargetCurrency] = useState<Currency>();
    const { exchange } = useContext(ConverterExchangeContext);

    useEffect(() => {
        fetchCurrency(exchange.sourceCode, setSourceCurrency).catch(console.error);
        fetchCurrency(exchange.targetCode, setTargetCurrency).catch(console.error);
    }, [exchange]);

    const handleOnClick = () => {
        setToggle(toggle => !toggle);
    };

    // TODO: extract each about into common component
    return (
        <>
            <Button
                text={"More about currency"}
                type={"button"}
                onClick={handleOnClick}
                children={<ArrowDropDownIcon width={15} height={15} fillColor={"#FFFFFF"} rotate={toggle ? 180 : 0} />}
            />
            {toggle && (
                <>
                    <div className={styles.aboutCurrency}>
                        <div className={styles.code}>
                            {sourceCurrency?.code} {sourceCurrency?.symbol}
                        </div>
                        <div className={styles.name}>{sourceCurrency?.name}</div>
                        <div className={styles.description}>{sourceCurrency?.description}</div>
                    </div>
                    <div className={styles.aboutCurrency}>
                        <div className={styles.code}>
                            {targetCurrency?.code} {targetCurrency?.symbol}
                        </div>
                        <div className={styles.name}>{targetCurrency?.name}</div>
                        <div className={styles.description}>{targetCurrency?.description}</div>
                    </div>
                </>
            )}
        </>
    );
}

export default MoreAboutCurrency;
