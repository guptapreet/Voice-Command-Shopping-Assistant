import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Loader from "./Loader";

const ShoppingList = ({ cartLoading, shoppingList, onRemoveItem, onUpdateQuantity,placeOrder }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <h3 className="text-lg font-semibold text-emerald-700 mb-2">Cart</h3>
            {
                shoppingList.length === 0 ?
                    <div className="w-full h-full flex pb-8 items-center justify-center text-slate-500">No products added</div>
                    :

                    cartLoading ?
                        <Loader />
                        :
                        <div className="flex flex-col justify-between h-full w-full"> 
                        
                        <div className="relative w-full h-full">
                            <div className="absolute overflow-y-scroll flex flex-col h-full w-full scroll">

                                <ul className="space-y-2">
                                    {shoppingList.map((item, index) => (
                                        <li key={index} className="flex items-center justify-between border-b px-2 pb-1 shadow-sm ">
                                            <span className="text-base font-medium text-slate-500">{item.product.name}</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    className='bg-red-200 px-2 rounded-md text-red-600 py-[0.5rem]'
                                                    onClick={() => onRemoveItem(item._id)}
                                                >
                                                    <MdOutlineDeleteOutline />
                                                </button>

                                                <button
                                                    className="w-8 pb-1 bg-gray-300 rounded-md text-lg font-bold"
                                                    onClick={() => onUpdateQuantity(item.product, -1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="text-base font-semibold">{item.quantity}</span>
                                                <button
                                                    className="w-8 pb-1 bg-green-500 text-white rounded-md text-lg font-bold"
                                                    onClick={() => onUpdateQuantity(item.product, 1)}
                                                >
                                                    +
                                                </button>

                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex justify-end">
                        <button
                            className='px-5 mt-4 py-1 bg-green-700 rounded-md text-slate-100 w-fit hover:bg-green-600 transition-all duration-150 ease-in-out '
                            onClick={placeOrder}
                        >
                            Place order
                        </button>
                        </div>
                        </div>

            }
        </div>
    );
};


export default ShoppingList;
