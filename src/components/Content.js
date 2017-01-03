import React from 'react'

export default ({children, col = 4}) => (
    <div className={`col-sm-${col} full-height`} style={{padding: 20}}>
        {children}
    </div>
)