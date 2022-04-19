import React, {FunctionComponent, useContext} from 'react';
import {Cart, Product} from "@medusajs/medusa";
import Image from 'next/image';
import {formatPrice} from "../../utils/helper-functions";
import {formatPrices} from "../../utils/prices";
import StoreContext from "../../context/store-context";
import Link from "next/link";

type Props = {
    products: Product[];
}

const ProductGrid: FunctionComponent<Props> = ({products}) => {
    const {cart} = useContext(StoreContext);
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {
                        products &&
                        products.map((product, index) => (
                            <Link key={product.id} href={{ pathname: `/product/[id]`, query: { id: product.id } }}
                                  passHref>
                                <div className="lg:w-1/4 md:w-1/2 p-4 w-full hover:scale-105 hover:shadow-lg">
                                    <a className="block relative h-48 rounded overflow-hidden">
                                        <Image alt={product.title} layout='fill'
                                               className="object-cover object-center w-full h-full block"
                                               src={product.thumbnail}/>
                                    </a>
                                    <div className="mt-4">
                                        {product.collection_id &&
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{product.collection.title}</h3>}
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{product.title}</h2>
                                        <p className="mt-1">{formatPrices(cart as unknown as Cart, product.variants[0])}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
