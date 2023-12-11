import React from 'react'

const NotFoundPage = () => {
  return (
    <div className='flex flex-col items-center mt-12 gap-2'>
        <h3 className='font-bold text-[60px]'>404</h3>
        <h3 className='font-semibold text-[28px]'>Not Found Page</h3>
        <p className='text-[20px]'>The resource requested could not be found on this server!</p>
    </div>
  )
}

export default NotFoundPage