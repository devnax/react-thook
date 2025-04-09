import React from 'react'
const RenderingContext = ({ useBucket, Template }: any) => {
   const us = useBucket()
   return <Template />
}

export default RenderingContext