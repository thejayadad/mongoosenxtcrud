
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='bg-white text-neutral-900'>
        {children}
    </div>
  )
}

export default layout