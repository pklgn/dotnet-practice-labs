import { ChangeEventHandler, useEffect, useLayoutEffect, useState } from "react";
import { Currency } from "../CurrencyConverter";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

type CurrencyExchangeInputsProps = {
    currencies: Currency[];
    price: number;
};

const CURRENCY_INPUT_PRECISION = 3;

function CurrencyExchangeInputs(props: CurrencyExchangeInputsProps) {
    const { currencies, price } = props;

    const [source, setSource] = useState<number>(1);
    const [target, setTarget] = useState<number>(price);

    const handleSourceOnChange: ChangeEventHandler<HTMLInputElement> = event => {
        if (event.currentTarget.value) {
            const value = Number(event.currentTarget.value);
            console.log(value);
            setSource(() => value);
            setTarget(() => value * price);
        }
    };

    const handleTargetOnChange: ChangeEventHandler<HTMLInputElement> = event => {
        if (event.currentTarget.value) {
            const value = Number(event.currentTarget.value);
            setSource(() => value / price);
            setTarget(() => value);
        }
    };

    useEffect(() => {
        setSource(1);
        setTarget(parseFloat((source * price).toFixed(CURRENCY_INPUT_PRECISION)));
    }, [price]);

    useLayoutEffect(() => {
        setSource(() => parseFloat(source.toFixed(CURRENCY_INPUT_PRECISION)));
        setTarget(() => parseFloat((source * price).toFixed(CURRENCY_INPUT_PRECISION)));
    });

    return (
        <>
            <CurrencyInput
                currencies={currencies.map((currency: Currency) => currency.name)}
                type={"number"}
                value={`${source}`}
                onChange={handleSourceOnChange}
            />
            <CurrencyInput
                currencies={currencies.map((currency: Currency) => currency.name)}
                type={"number"}
                value={`${target}`}
                onChange={handleTargetOnChange}
            />
        </>
    );
}

export default CurrencyExchangeInputs;
