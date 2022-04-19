import React, {FunctionComponent, useContext} from 'react';
import NavBar from "./nav-bar";
import Blur from "./blur";
import CartView from "../cart-view/cart-view";
import DisplayContext from "../../context/display-context";
import styles from "../../styles/layout.module.css";

type Props = {
    children: React.ReactNode;
}

const Layout: FunctionComponent<Props> = ({children}) => {
    const { cartView } = useContext(DisplayContext);

    return (
        <div className={cartView ? styles.noscroll : ""}>
            <CartView />
            <Blur />
            <NavBar />
            <main>{children}</main>
        </div>
    );
};

export default Layout;
