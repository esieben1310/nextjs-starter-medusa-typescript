/**
 * This is a singleton to ensure we only instantiate Stripe once.
 */
import {loadStripe, Stripe} from "@stripe/stripe-js";
const STRIPE_API_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY || null;
let stripePromise: Promise<Stripe | null>;
const getStripe = (STRIPE_API_KEY: string): Promise<Stripe | null> => {
    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_API_KEY);
    }
    return stripePromise;
};
export default getStripe;