import React, { memo } from 'react'

const Container = ({data, ...props} : any) => {
  return (
    <div>Container</div>
  )
}

export default memo(Container) 