import React, {
    Component,
} from 'react';

import {Link} from 'react-router'

import API from '../services/API'

import {Content, Sidebar} from '../components'

class CategoryDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {}
        }
    }

    componentDidMount() {

        const {id} = this.props.params;
        if (id) {
            API.get(`/categories/${id}`).then(category => this.setState({
                category
            }))
        }

    }


    render() {

        const {category} = this.state;

        return (
            <Content col="10">
                <div className="panel relative full-height">
                    <div className="panel-body full-height">

                        <div className="row">
                            <div className="col-sm-8">

                                <Link to="/" className="pt-button space-bottom">
                                    <i className="fa fa-arrow-left"/>
                                </Link>
                                <h3>Category: {category.name}</h3>

                                <div dangerouslySetInnerHTML={{__html: category.description}}></div>

                            </div>

                            <Sidebar col="4"
                                     style={{position: 'absolute', top: 0, right: 0, width: '30%', paddingTop: 15}}>
                                <h3>Run test</h3>

                            </Sidebar>
                        </div>
                    </div>
                </div>
            </Content>
        );
    }
}


export default CategoryDetails;
