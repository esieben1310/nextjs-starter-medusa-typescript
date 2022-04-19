import {NextPage} from "next";
import {useContext, useEffect, useState} from "react";
import StoreContext from "../../context/store-context";
import {resetOptions} from "../../utils/helper-functions";
import {Cart, Product} from "@medusajs/medusa";
import {createClient} from "../../utils/client";
import Image from "next/image";
import styles from "../../styles/product.module.css";
import {formatPrices} from "../../utils/prices";
import {BiShoppingBag} from "react-icons/bi";
import ProductInfo from "../../components/ProductInfo";
import Script from "next/script";

const ProductPage: NextPage<{ product: Product }> = ({product}) => {
    const {addVariantToCart, cart} = useContext(StoreContext);
    const [options, setOptions] = useState({
        variantId: "",
        quantity: 0,
        size: "",
    });

    useEffect(() => {
        if (product) {
            setOptions(resetOptions(product));
        }
    }, [product]);

    const handleQtyChange = (action: string) => {
        if (action === "inc") {
            if (product.variants &&
                options.quantity < 1 &&
                // @ts-ignore
                product.variantsfind(({id}) => id === options.variantId)
                    .inventory_quantity
            )
                setOptions({
                    variantId: options.variantId,
                    quantity: options.quantity + 1,
                    size: options.size,
                });
        }
        if (action === "dec") {
            if (options.quantity > 1)
                setOptions({
                    variantId: options.variantId,
                    quantity: options.quantity - 1,
                    size: options.size,
                });
        }
    };

    const handleAddToBag = () => {
        // @ts-ignore
        addVariantToCart({
            variantId: options.variantId,
            quantity: options.quantity,
        });
        if (product) setOptions(resetOptions(product));
    };

    return (
        <ProductInfo product={product}/>
    );
}

const client = createClient();

export async function getStaticPaths() {
    // Call an external API endpoint to get products
    const {products} = await client.products.list();

    // Get the paths we want to pre-render based on the products
    const paths = products.map((product) => ({
        params: {id: product.id},
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return {paths, fallback: false};
}

// This also gets called at build time
// @ts-ignore
export async function getStaticProps({params}) {
    // params contains the product `id`.
    // If the route is like /product/prod_1, then params.id is 1
    const {product} = await client.products.retrieve(params.id);

    // Pass post data to the page via props
    return {props: {product}};
}

export default ProductPage;