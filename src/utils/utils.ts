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

    console.log(value)
    if (!value)
        throw new Error("Phone number is needed.")

    const s = value
        .replace(/\D/g, "");

    const regExpMatchArray = s
        .match(phoneLocale.regex);

    return regExpMatchArray
}

export function getPhoneIso(value: string): string {
    return `+55${onlyNumbers(value)}`
}

export function getPhoneBR(phoneNumber: string) {
    if (!phoneNumber)
        return "";
    // if (phoneNumber.length < 11)
    //     return phoneNumber;
    return `${phoneNumber.substring(0,3)} (${phoneNumber.substring(3, 5)}) ${phoneNumber.substring(5, 10)}-${phoneNumber.substring(10, phoneNumber.length)}`
}
