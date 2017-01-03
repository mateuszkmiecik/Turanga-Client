import React, {
    Component,
} from 'react';

import {SideMenu, Content} from '../components'

class SingleResult extends Component {
    render() {
        console.log(this.props)
        return (
            <div className="row full-height">
                <SideMenu>
                    <button className="pt-button pt-fill" onClick={() => this.props.router.push('/results')}>Back to results</button>
                </SideMenu>Single result for user {this.props.params.id}</div>
        );
    }
}

export default SingleResult;
