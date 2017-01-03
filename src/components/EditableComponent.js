import {Component} from 'react';

class EditableComponent extends Component {

    constructor(props) {
        super(props)
        this.onFieldChange = onFieldChange.bind(this)
        this.addToArray = addToArray.bind(this)
        this.removeFromArrayByIndex = removeFromArrayByIndex.bind(this)
        this.onObjectFieldChange = onObjectFieldChange.bind(this)
    }

}

export default EditableComponent;


function onObjectFieldChange(objectName, fieldName, isValueAlready) {
    return e =>
        this.setState({
            ...this.state,
            [objectName]: {
                ...this.state[objectName],
                [fieldName]: isValueAlready ? e : e.target.value
            }
        })
}

function onFieldChange(fieldName, mapFn) {
    return e =>
        this.setState({
            [fieldName]: mapFn ? mapFn(e) : e.target.value
        })
}

function removeFromArrayByIndex(arr, idx) {
    this.setState({
        [arr]: this.state[arr].filter((obj, oIdx) => {
            return idx !== oIdx;
        })
    })
}

function addToArray(arr, obj) {
    this.setState({
        [arr]: this.state[arr].concat([obj])
    })
}