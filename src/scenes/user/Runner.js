import React, {Component} from 'react'

import Categories from '../../services/Categories'

class Runner extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){
        let {id} = this.props.params;
        Categories.getCategory(id).then(category => this.setState({category}))
    }

    render(){
        let {category} = this.state;
        return !category ? <div>Loading</div> : (
            <div>
                {JSON.stringify(this.state.category)}
            </div>
        )
    }
}

export default Runner