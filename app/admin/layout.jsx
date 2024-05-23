import React from 'react'
import SideNav from './_Components/SideNav'

const Adminlayout = ({children}) => {
  return (
    <div>
    <div className='w-24 fixed'>
      <SideNav/>
      </div> 
      <div className='ml-24'>
      {children}
    </div>
    </div>
  )
}

export default Adminlayout
