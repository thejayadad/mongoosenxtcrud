
import { AppHeader } from '@/components/header/app-header';
import React from 'react'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='bg-white text-neutral-900 h-full grid grid-rows-12'>
        <div className='row-span-1'>
          <AppHeader />
        </div>
        {children}
    </div>
  )
}

export default layout