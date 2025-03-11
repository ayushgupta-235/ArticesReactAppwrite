import React from 'react'

function Container({children}) {
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
        {children}
    </div>
  )
}

export default Container



 // Usage
 
//Before Using Container


//<div className="w-full max-w-7xl mx-auto px-4">
//  <h1 className="text-2xl font-bold">Welcome to My Blog</h1>
//</div>


// After Using Container


//<Container>
//  <h1 className="text-2xl font-bold">Welcome to My Blog</h1>
//</Container>