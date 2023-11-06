import {getLocales} from "expo-localization";


export function onlyNumbers(text: string): number {
    return Number.parseInt(text?.replace(/[^0-9]/g, '')) || 0;
}

const phoneLocales = {
    "BR": {
        regex: /^(\d{2})(\d{4,5})(\d{4})/g,
        mask: "+55 ($1) $2-$3"
    }
}

export function getPhoneMasked(value: string): string {
    const regionCode = getLocales()[0].regionCode;
    const phoneLocale = phoneLocales[regionCode];

    return value ?
        value
            .replace(/\D/g, "")
            .replace(phoneLocale.regex, phoneLocale.mask)
        : null
}
