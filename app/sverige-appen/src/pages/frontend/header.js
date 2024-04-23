'use client'

import React from 'react';
import dynamic from 'next/dynamic'
//importing globals
import '../globals.css';


//importing components
const Map = dynamic(() => import('./map'), { ssr: false })
export const Header = () => {

   return (
    <div>
    <div style={{position: 'relative', zIndex: 2000}}>
        <div className="testHeader"> </div>
         <Map />
      </div>
 </div>
   );
} 
