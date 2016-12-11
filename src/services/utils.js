export function onInputChange(objectName, fieldName, isValueAlready) {
    return e =>
        this.setState({
            ...this.state,
            [objectName]: {
                ...this.state[objectName],
                [fieldName]: isValueAlready ? e : e.target.value
            }
        })
}