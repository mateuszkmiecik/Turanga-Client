import React from 'react'

const style = {
    backgroundColor: '#fafafa',
    borderLeft: '1px solid #ddd'
};

export default ({children, style: ownStyles}) => (
    <div style={{...style, ...ownStyles}} className="col-sm-6 full-height">
        {children}
    </div>
)