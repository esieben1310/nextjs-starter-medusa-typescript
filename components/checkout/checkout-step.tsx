import React, {FunctionComponent, useContext, useState} from 'react';
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import styles from "../../styles/checkout-step.module.css";
import CheckoutSummary from "./checkout-summary";
import InformationStep from "./information-step";
import PaymentStep from "./payment-step";
import ShippingStep from "./shipping-step";
import StepOverview from "./step-overview";
import {Address, Cart} from "@medusajs/medusa";

const CheckoutStep: FunctionComponent = () => {
    const { checkoutStep, updateCheckoutStep, updateOrderSummaryDisplay } = useContext(DisplayContext);
    const { cart, updateAddress, setShippingMethod } = useContext(StoreContext);

    const [isProcessingInfo, setIsProcessingInfo] = useState(false);
    const [isProcessingShipping, setIsProcessingShipping] = useState(false);

    const handleShippingSubmit = async (address: Address, email: string) => {
        setIsProcessingInfo(true);

        // @ts-ignore
        await updateAddress(address, email);
        setIsProcessingInfo(false);
        // @ts-ignore
        updateCheckoutStep(2);
    };

    const handleDeliverySubmit = async (option: any) => {
        setIsProcessingShipping(true);
        // @ts-ignore
        await setShippingMethod(option.id)
            .then(() => {
                // @ts-ignore
                updateCheckoutStep(3);
            })
            .finally(() => {
                setIsProcessingShipping(false);
            });
    };

    const handleStep = () => {
        switch (checkoutStep) {
            case 1:
                return (
                    <InformationStep
                        isProcessing={isProcessingInfo}
                        savedValues={{
                            ...(cart as unknown as Cart).shipping_address,
                            email: (cart as unknown as Cart).email,
                            country: (cart as unknown as Cart).region?.countries.find(
                                (country) => country.iso_2 === (cart as unknown as Cart).shipping_address?.country_code
                            )?.display_name,
                        }}
                        handleSubmit={(submittedAddr: Address, submittedEmail: string) =>
                            handleShippingSubmit(submittedAddr, submittedEmail)
                        }
                    />
                );
            case 2:
                return (
                    <ShippingStep
                        isProcessing={isProcessingShipping}
                        cart={(cart as unknown as Cart)}
                        handleDeliverySubmit={handleDeliverySubmit}
                        savedMethods={(cart as unknown as Cart).shipping_methods}
                    />
                );
            case 3:
                return <PaymentStep />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.steps}>
                <div className={styles.breadcrumbs}>
                    <p className={checkoutStep === 1 ? styles.activeStep : ""}>
                        Information
                    </p>
                    <p>/</p>
                    <p className={checkoutStep === 2 ? styles.activeStep : ""}>
                        Delivery
                    </p>
                    <p>/</p>
                    <p className={checkoutStep === 3 ? styles.activeStep : ""}>Payment</p>
                </div>
                {checkoutStep !== 1 ? <StepOverview /> : null}
                {handleStep()}
                <button
                    className={styles.orderBtn}
                    onClick={() => updateOrderSummaryDisplay()}
                >
                    View Order Summary
                </button>
            </div>
            <div className={styles.summary}>
                <CheckoutSummary cart={(cart as unknown as Cart)} />
            </div>
        </div>
    );
};

export default CheckoutStep;
