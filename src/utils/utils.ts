export function onlyNumbers(text: string): number {
    return Number.parseInt(text?.replace(/[^0-9]/g, '')) || 0;
}

export function getPhoneMasked(value: string): string {
    return value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d{4,5})(\d{4})/g, "+55 ($1) $2-$3")
}