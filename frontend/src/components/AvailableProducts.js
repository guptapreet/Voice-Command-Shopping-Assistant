import React from 'react'

const AvailableProducts = ({ onAddItem, availableProducts, shoppingList }) => {

    return (
        <div className=' p-2 h-full'>
            <h3 className='text-lg font-semibold text-blue-600'>Available products</h3>
            <ul className='grid grid-cols-4 gap-5 mt-3'>
                {availableProducts.map((item) => (
                    <li key={item.product_id} className='flex flex-col shadow-sm bg-slate-100 rounded-lg p-4 gap-1'>
                        <div className='flex justify-between'>
                            <p>{item.name}</p>
                            <p>&#8377; {item.price}</p>
                        </div>
                        <button
                            className='px-5 mt-4 py-1 bg-blue-600 rounded-md text-slate-100 w-fit hover:bg-blue-500 transition-all duration-150 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed'
                            onClick={() => onAddItem(item, 1)}
                            disabled={shoppingList.some((listItem) => listItem.product.name === item.name)}
                        >
                            Add
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AvailableProducts