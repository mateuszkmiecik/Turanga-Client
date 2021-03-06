import React, {
    Component,
} from 'react';


import {WithContext as ReactTags} from 'react-tag-input';

class TagInput extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: props.tags || []
        };

        this.handleAddition = this.handleAddition.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
        if(!!this.props.onChange){
            this.props.onChange(tags)
        }
    }

    handleAddition(tag) {
        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
        if(!!this.props.onChange){
            this.props.onChange(tags)
        }
    }

    render() {
        const {className, style} = this.props;
        return (
            <div {...{className, style}}>
                <ReactTags tags={this.state.tags}
                           autofocus={false}
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                           placeholder={this.props.placeholder}/>
            </div>
        );
    }
}

export default TagInput;
