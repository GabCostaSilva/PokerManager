import {getLocales} from "expo-localization";


export function onlyNumbers(text: string): number {
    return Number.parseInt(text?.replace(/[^0-9]/g, '')) || 0;
}

const phoneLocales = {
    "BR": {
        regex: /[+](\d{1,3})\s[(](\d{2,3})[)]\s(\d{3,5})-(\d{4})/g,
        mask: "+55 ($1) $2-$3"
    }
}

export function getPhoneMasked(value: string): RegExpMatchArray {
    const regionCode = getLocales()[0].regionCode;
    const phoneLocale = phoneLocales[regionCode];

    return value ?
        value
            .replace(/\D/g, "")
            .match(phoneLocale.regex)
        : null
}
