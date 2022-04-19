import {Item, Product} from "@medusajs/medusa";

export const quantity = (item: Item) => {
    return item.quantity;
};

export const sum = (prev: number, next: number): number => {
    return prev + next;
};

export const formatPrice = (price: number, currency: string): string => {
    return `${(price / 100).toFixed(2)} ${currency.toUpperCase()}`;
};

export const getSlug = (path: string) => {
    const tmp = path.split("/");
    return tmp[tmp.length - 1];
};

export const resetOptions = (product: Product) => {
    const variantId = product.variants.slice(0).reverse()[0].id;
    const size = product.variants.slice(0).reverse()[0].title;
    return {
        variantId: variantId,
        quantity: 1,
        size: size,
    };
};

export const isEmpty = (obj: any) =>
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length;