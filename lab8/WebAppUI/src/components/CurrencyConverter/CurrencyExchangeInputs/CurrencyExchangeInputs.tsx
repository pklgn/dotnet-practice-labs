import { ChangeEventHandler, useContext, useEffect, useLayoutEffect, useState } from "react";
import { getCurrencyCodeByName, getCurrencyNameByCode } from "../../../model/CurrencyConverter/Currency";
import {
    ConverterCurrenciesContext,
    ConverterExchangeContext,
} from "../ConverterTemplatesContext/ConverterTemplatesContext";
import CurrencyInput from "../CurrencyInput/CurrencyInput";

type CurrencyExchangeInputsProps = {
    price: number;
};

const CURRENCY_INPUT_PRECISION = 3;

function CurrencyExchangeInputs(props: CurrencyExchangeInputsProps) {
    const { price } = props;

    const { currencies, setCurrencies } = useContext(ConverterCurrenciesContext);
    const { exchange, setExchange } = useContext(ConverterExchangeContext);

    const [source, setSource] = useState<number>(1);
    const [target, setTarget] = useState<number>(price);

    const handleSourceOnChange: ChangeEventHandler<HTMLInputElement> = event => {
        if (event.currentTarget.value) {
            const value = Number(event.currentTarget.value);
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
    const handleSourceSelectOnChange: ChangeEventHandler<HTMLSelectElement> = event => {
        if (event.target.value) {
            setExchange(() => {
                return { ...exchange, sourceCode: getCurrencyCodeByName(event.target.value, currencies) };
            });
        }
    };

    const handleTargetSelectOnChange: ChangeEventHandler<HTMLSelectElement> = event => {
        if (event.target.value) {
            setExchange(() => {
                return { ...exchange, targetCode: getCurrencyCodeByName(event.target.value, currencies) };
            });
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
                type={"number"}
                value={`${source}`}
                onChange={handleSourceOnChange}
                onSelectChange={handleSourceSelectOnChange}
                selectedCurrency={getCurrencyNameByCode(exchange.sourceCode, currencies)}
            />
            <CurrencyInput
                type={"number"}
                value={`${target}`}
                onChange={handleTargetOnChange}
                onSelectChange={handleTargetSelectOnChange}
                selectedCurrency={getCurrencyNameByCode(exchange.targetCode, currencies)}
            />
        </>
    );
}

export default CurrencyExchangeInputs;
