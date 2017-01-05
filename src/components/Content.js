import React from 'react'

const style = {
    padding: 20
};

export default ({children, style: ownStyles, col = 4}) => (
    <div className={`col-sm-${col} full-height`} style={{...style, ...ownStyles}}>
        {children}
    </div>
)