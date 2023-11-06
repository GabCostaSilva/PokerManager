import {getPhoneMasked} from "./utils";

describe('utils tests', () => {
    it.each([
        ["jkhsdjkf67993291747", "+55 (67) 99329-1747"],
        ["119993299938", "+55 (11) 99932-99938"],
        ["21 3898-8999", "+55 (21) 3898-8999"],
    ])('should return the string as a masked phoneNumber given locale', (phoneNumber, phoneExpected) => {
        const phoneMasked = getPhoneMasked(phoneNumber);
        expect(phoneMasked).toEqual(phoneExpected);
    });
});
