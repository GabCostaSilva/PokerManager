export function onlyNumbers(text: string): number {
    return Number.parseInt(text?.replace(/[^0-9]/g, '')) || 0;
}