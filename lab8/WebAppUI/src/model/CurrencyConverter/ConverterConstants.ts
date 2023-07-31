export const DEFAULT_PRICE_UPDATE_IN_MILLISECONDS = 10 * 1000;

export const DEFAULT_DATE_TIME_RANGES_IN_MILLISECONDS = [
    1 * 6 * 10 * 1000, // One minute
    2 * 6 * 10 * 1000, // Two minutes
    5 * 6 * 10 * 1000, // Five minutes
    10 * 6 * 10 * 1000, // Ten minutes
];

export const DEFAULT_PRICE = 1;

export type ConverterTemplate = {
    sourceCode: string;
    targetCode: string;
    dateTimeRange: number;
};

export const DEFAULT_DATETIME_RANGE = 1 * 60 * 1000;
export const DEFAULT_CONVERTER_CURRENT_TEMPLATE_INDEX = 0;
export const DEFAULT_CONVERTER_TEMPLATE: ConverterTemplate = {
    sourceCode: "ZAR",
    targetCode: "JPY",
    dateTimeRange: DEFAULT_DATETIME_RANGE,
};
