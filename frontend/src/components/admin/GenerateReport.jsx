import React from 'react'
import { backend_url } from '../utils/api'
import { FaRightLong } from 'react-icons/fa6'

const GenerateReport = () => {
  return (
    <div className='flex flex-col items-center justify-center '>
      <h1 className='yuji-mai-regular text-4xl  text-center mb-4'>Generate Report</h1>
      <p className='yuji-mai-regular text-xl text-center mb-4'>Here you can generate reports</p>
      {/* Add report generation functionality here */}
      <a href={`${backend_url}/auth/generate-reports`} target='_blank' className='bg-green-400 p-3 text-white rounded-lg mt-4 flex items-center justify-center'>Generate Report <FaRightLong/></a>

    </div>
  )
}

export default GenerateReport