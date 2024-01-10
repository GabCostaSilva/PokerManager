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
    const locale = getLocales()[0];
    const regionCode = locale.regionCode;
    const phoneLocale = phoneLocales[regionCode];

    if (!value)
        throw new Error("Phone number is needed.")


    const s = value
        .replace(/\D/g, "");
    console.log(s)
    const regExpMatchArray = s
        .match(phoneLocale.regex);

    return regExpMatchArray
}
