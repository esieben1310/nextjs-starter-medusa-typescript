import React, {FunctionComponent, useContext, useEffect} from 'react';
import { Elements } from "@stripe/react-stripe-js";
import StoreContext from "../../context/store-context";
import InjectablePaymentCard from "./injectable-payment-card";
import styles from "../../styles/injectable-payment-card.module.css";
import getStripe from "../../utils/stripe";
import { useRouter } from "next/router";
import {Cart} from "@medusajs/medusa";

const PaymentStep: FunctionComponent = () => {
  const router = useRouter()
  const { cart, createPaymentSession, setPaymentSession } = useContext(StoreContext);

  useEffect(() => {
    createPaymentSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePayment = async () => {
    // @ts-ignore
    await setPaymentSession("manual")
    router.push(`/payment`);
  };

  return (
      <div style={{ flexGrow: "1" }}>
        {cart &&
            (cart as unknown as Cart).payment_sessions &&
            (cart as unknown as Cart).payment_sessions.map((ps) => {
              switch (ps.provider_id) {
                case "stripe":
                  return (
                      // @ts-ignore
                      <Elements key={"stripe"} stripe={getStripe()}>
                        <h2>Stripe Payment</h2>
                        <InjectablePaymentCard
                            session={ps}
                            // @ts-ignore
                            onSetPaymentSession={() => setPaymentSession("stripe")}
                        />
                      </Elements>
                  );
                case "manual":
                  return (
                      <div key={"manual"}>
                        <h2>Test Payment</h2>
                        <button
                            onClick={handlePayment}
                            className={styles.payBtn}
                            id="submit"
                        >
                          <span id="button-text">Pay</span>
                        </button>
                      </div>
                  );
                default:
                  return null;
              }
            })}
      </div>
  );
};

export default PaymentStep;
