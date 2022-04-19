import React, { FunctionComponent } from 'react';
import styles from "../../styles/shipping-method.module.css";
import { formatPrice } from "../../utils/helper-functions";

type Props = {
    handleOption: any;
    option: any;
    chosen: any;
}

const ShippingMethod: FunctionComponent<Props> = ({handleOption, option, chosen}) => {
    return (
        <div
            className={`${styles.shippingOption} mt-4 ${
                option.id === chosen?.id ? styles.chosen : ""
            }`}
            onClick={() => handleOption(option)}
            role="button"
            tabIndex={0}
        >
            <p>{option.name}</p>
            <p>{formatPrice(option.amount, "EUR")}</p>
        </div>
    );
};

export default ShippingMethod;
