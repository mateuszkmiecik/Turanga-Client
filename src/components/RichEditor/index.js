import React, {
    Component
} from 'react';

import 'medium-draft/lib/index.css'

import {
    Editor,
    createEditorState,
} from 'medium-draft';

import {stateToHTML} from 'draft-js-export-html';

import {
    convertFromHTML,
    convertToRaw,
    ContentState
} from 'draft-js'


import './rich-editor.less'
class RichEditor extends Component {

    constructor(props) {
        super(props);

        let {value = ''} = this.props;

        let blocks = convertFromHTML(value);
        let state = ContentState.createFromBlockArray(blocks);

        this.state = {
            editorState: createEditorState(convertToRaw(state)), // for empty content,
            informedValue: ''
        };

        this.onChange = this.onChange.bind(this)
    }


    componentDidMount() {
        this.refs.editor.focus();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.value){
            let blocks = convertFromHTML(nextProps.value);
            let state = ContentState.createFromBlockArray(blocks);

            this.setState({
                editorState: createEditorState(convertToRaw(state)), // for empty content
            });
        }
    }


    onChange(editorState) {
        let changedValue = stateToHTML(editorState._immutable.currentContent);
        if(!!this.props.onChange && changedValue !== this.state.informedValue) {
            this.props.onChange(changedValue)
        }
        this.setState({editorState,informedValue:changedValue});
    };

    render() {
        const {editorState} = this.state;
        return (
            <Editor
                ref="editor"
                className="rich-editor full-height"
                editorState={editorState}
                placeholder="Type something..."
                onChange={this.onChange}/>
        );
    }
}

export default RichEditor;
