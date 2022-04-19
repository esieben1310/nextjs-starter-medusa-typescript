import React, { FunctionComponent } from 'react';
import { Field } from "formik";
import styles from "../../styles/input-field.module.css";
import { MdError } from "react-icons/md";
import {Country} from "@medusajs/medusa";

type Props = {
    id: string;
    error: any;
    errorMsg: any;
    type?: any;
    disabled?: boolean;
    options: any;
}

const SelectField: FunctionComponent<Props> = ({id, error, errorMsg, options, type, disabled}) => {
    return options ? (
        <div className={styles.container}>
            {error ? (
                <p className={styles.errortext}>{errorMsg}</p>
            ) : (
                <p className={styles.fill} aria-hidden="true">
                    fill
                </p>
            )}
            <div
                className={`${styles.fieldcontainer} ${error ? styles.errorfield : ""}`}
            >
                <Field
                    id={id}
                    name={id}
                    className={styles.styledselect}
                    type={type}
                    disabled={disabled}
                    as="select"
                >
                    {options.map((o: Country) => {
                        return (
                            <option key={o.id} value={o.iso_2}>
                                {o.display_name}
                            </option>
                        );
                    })}
                </Field>
                {error && <MdError className={styles.erroricon} />}
            </div>
        </div>
    ) : (
        <div className={styles.fetching} />
    );
};

export default SelectField;
