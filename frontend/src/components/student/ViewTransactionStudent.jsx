import React from 'react'
import { useCollege } from '../utils/GlobalContext';

const ViewTransactionStudent = () => {
  const {payments}=useCollege()
  return (
    <div>
        <div className="">
            <h1 className='text-2xl font-bold text-center'>All Transaction</h1>
            <ul>
               {payments?.map((item)=> <li className='border-b border-gray-300 p-3 flex justify-between items-center'>
                    <span className='text-gray-500'>ID{item.id}</span>
<span className='font-bold'>{item.paymentMethod}</span>
{/* <span className='font-semibold'>John Doe</span> */}
<span className='text-green-500 font-bold'>₹ {item.amount}</span>
<span className='italic text-gray-500'>{item.paymentDate}</span>

                </li>)}
            </ul>
        </div>
    </div>
  )
}

export default ViewTransactionStudent;