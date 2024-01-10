import {getPhoneMasked} from "./utils";

jest.mock('expo-localization', () => ({
    getLocales: () => [
        {
            regionCode: "BR"
        }
    ],
}));

describe('utils tests', () => {
    it.each([
        ["119993299938", "+55 (11) 99932-99938"],
        ["21 3898-8999", "+55 (21) 3898-8999"],
    ])('should return the string as a masked phoneNumber given location', async (phoneNumber, phoneExpected) => {
        const phoneMasked = getPhoneMasked(phoneNumber);

        expect(phoneMasked).toEqual(phoneExpected);
    });
});
