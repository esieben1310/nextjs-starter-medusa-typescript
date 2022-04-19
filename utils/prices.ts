import {Cart, MoneyAmount, ProductVariant} from "@medusajs/medusa";

function getTaxRate(cart: Cart): number {
    if ("tax_rate" in cart) {
        // @ts-ignore
        return cart.tax_rate / 100;
    } else if (cart.region) {
        return cart.region && cart.region.tax_rate / 100;
    }
    return 0;
}

export function formatMoneyAmount(moneyAmount: {currency_code: string, amount: number}, digits: number, taxRate = 0): string {
    let locale = "en-US";
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: moneyAmount.currency_code,
        minimumFractionDigits: digits,
    }).format(moneyAmount.amount * (1 + taxRate / 100));
}

export function getVariantPrice(cart: Cart, variant: ProductVariant): number | undefined {
    let taxRate = getTaxRate(cart);
    let moneyAmount = variant.prices.find(
        (p) =>
            p.currency_code.toLowerCase() === cart.region.currency_code.toLowerCase()
    );
    if (moneyAmount && moneyAmount.amount) {
        return (moneyAmount.amount * (1 + taxRate)) / 100;
    }
    return undefined;
}

export function formatPrices(cart: Cart | undefined, variant: ProductVariant, digits = 2) {
    if (!cart || !cart.region || !variant) return;
    if (!variant.prices) return `15.00 EUR`;
    return formatMoneyAmount(
        {
            currency_code: cart.region.currency_code,
            amount: getVariantPrice(cart, variant) || 0,
        },
        digits
    );
}