import React from 'react'

const style = {
    backgroundColor: '#fafafa',
    borderLeft: '1px solid #ddd'
};

export default ({children, style: ownStyles, col = '6'}) => (
    <div style={{...style, ...ownStyles}} className={`col-sm-${col} full-height`}>
        {children}
    </div>
)