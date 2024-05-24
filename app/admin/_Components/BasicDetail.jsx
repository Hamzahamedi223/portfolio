import { Camera } from 'lucide-react'
import React from 'react'

const BasicDetail = () => {
  return (
    <div className='p-7 rounded-lg bg-gray-800 my-7'>
        <div className='flex gap-2 items-center'>
              <Camera className='rounded-full p-3 h-12 w-12 bg-gray-500'/>
              <input type="text" placeholder="Username" className="input input-bordered input-primary w-full max-w-full" />
              </div>
              <textarea className="textarea textarea-primary mt-2 w-full" placeholder="About you"></textarea>

    </div>
  )
}

export default BasicDetail
