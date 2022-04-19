import React, {FunctionComponent, useContext} from 'react';
import {Cart, Product, ProductOptionValue, ProductVariant} from "@medusajs/medusa";
import {formatPrices} from "../../utils/prices";
import StoreContext from "../../context/store-context";
import {resetOptions} from "../../utils/helper-functions";

type Props = {
    product: Product;
}

const ProductInfo: FunctionComponent<Props> = ({product}) => {
    const {cart, addVariantToCart} = useContext(StoreContext);
    const [toast, setToast] = React.useState<boolean>(false);
    const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant>(product.variants[0]);
    const [quantity, setQuantity] = React.useState(1);

    const handleAddToBag = () => {
        // @ts-ignore
        addVariantToCart({
            variantId: selectedVariant.id,
            quantity: quantity
        });
        setToast(true);
        if (product) {
            setSelectedVariant(product.variants[0]);
            setQuantity(1);
        }
    };
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div id={"toast-info"} className={"w-full flex justify-center absolute pt-24"}>
                <div id="toast-success"
                     className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${!toast && "hidden"}`}
                     role="alert">
                    <div
                        className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        <p className="text-sm">
                            {product.title} added to cart!
                        </p>
                    </div>
                    <button type="button" onClick={() => setToast(false)} className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                            aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                         src={product.thumbnail}/>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        {product.collection_id &&
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.collection.title}</h2>}
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                            {product.title}
                        </h1>
                        <p className="leading-relaxed">
                            {product.description}
                        </p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                            <div className="flex ml-6 items-center">
                                <span className="mr-3">{product.options.map((option, index) => index > 0 ? "/" + option.title : option.title)}</span>
                                <div className="relative">
                                    <select
                                        value={selectedVariant.id}
                                        onChange={(e) => {
                                            const variant: ProductVariant = product.variants.find(variant => variant.id === e.target.value) || product.variants[0];
                                            setSelectedVariant(variant);
                                        }}
                                        className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                        {
                                            product.variants.map(variant => (
                                                <option value={variant.id} key={variant.id}>{variant.options.map((option, index) => index > 0 ? "/" + option.value : option.value)}</option>
                                            ))
                                        }
                                    </select>
                                    <span
                                        className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                        <svg fill="none" stroke="currentColor" strokeLinecap="round"
                                             strokeLinejoin="round" strokeWidth="2" className="w-4 h-4"
                                             viewBox="0 0 24 24">
                                            <path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <span
                                className="title-font font-medium text-2xl text-gray-900">{formatPrices(cart as unknown as Cart, product.variants[0])}</span>
                            <div className="flex ml-auto custom-number-input h-10 w-32">
                                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
                                    <button data-action="decrement" onClick={() => setQuantity(quantity > 1 ? quantity-1 : 1)}
                                            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                                        <span className="m-auto text-2xl font-thin">−</span>
                                    </button>
                                    <input type="number"
                                           className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                                           name="custom-input-number" value={quantity} onChange={
                                        (e) => {
                                            const value = parseInt(e.target.value);
                                            if (value > 0) {
                                                setQuantity(value);
                                            }
                                        }
                                    }></input>
                                    <button data-action="increment" onClick={() => setQuantity(quantity+1)} className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                        <span className="m-auto text-2xl font-thin">+</span>
                                    </button>
                                </div>
                            </div>
                            <button onClick={handleAddToBag} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

function filterProductOptionValues(array: ProductOptionValue[]): ProductOptionValue[] {
    return array.filter((value, index, self) =>
        self.findIndex(v => v.value.toLowerCase() === value.value.toLowerCase()) === index
    );
}

export default ProductInfo;
