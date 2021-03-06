import React from 'react';
import EditableComponent from '../../components/EditableComponent'


const initialState = {
    name: '',
    description: ''
};


class GroupForm extends EditableComponent {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        }

        this.handleCreation = this.handleCreation.bind(this)
    }

    handleCreation(){
        const {name, description} = this.state;
        const newGroup = {name, description};

        if (!!this.props.onCreate) {
            this.props.onCreate(newGroup).then(() =>
                this.setState({
                    ...initialState
                })
            );
        }
    }

    render() {
        const {name, description} = this.state;

        const buttonDisabled = name.length === 0;

        return (
            <div>
                <h4>Add group</h4>
                <label className="pt-label">
                    Group name
                    <input type="text" value={name} className="pt-input" onChange={this.onFieldChange('name')}/>
                </label>

                <label className="pt-label">
                    Description
                    <textarea type="text" value={description} className="pt-input pt-fill"
                              onChange={this.onFieldChange('description')} rows="10"/>
                </label>
                <p>
                    <button className="pt-button" disabled={buttonDisabled} onClick={this.handleCreation}>Add group</button>
                </p>
            </div>
        );
    }
}

export default GroupForm;
