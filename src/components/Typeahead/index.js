import React, {Component} from "react";

import {
    Classes,
    Keys,
    Menu,
    Popover,
    Position,
    Utils
} from "@blueprintjs/core";

import classNames from "classnames";

export class Typeahead extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            selectedIndex: 0
        };

        const _defaultRenderer = (obj) => JSON.stringify(obj);

        this.inputRef = null;

        this.handleSetSearchInputRef = (ref) => {
            this.inputRef = ref;
        };
        this.renderer = this.props.renderer || _defaultRenderer;

        this.handleKeyDown = createKeyEventHandler({
            [Keys.ARROW_DOWN]: this.selectNext(),
            [Keys.ARROW_UP]: this.selectNext(-1),
            [Keys.ENTER]: () => {
                let selectedValue = this.props.items[this.state.selectedIndex];
                this.handleSelection(selectedValue);
            },
            [Keys.ESCAPE]: () => this.resetState()
        }, true);

        this.handlePopoverInteraction = (nextOpenState) => {
            if (!nextOpenState) {
                this.resetState();
            }
        };

        this.handleSelection = (value) => {
            let {onValueSelect} = this.props;
            if(!!onValueSelect){
                onValueSelect(value)
            }
            this.resetState();
        };

        this.handleResultHover = (e) => {
            const el = e.currentTarget;
            const selectedIndex = Array.from(el.parentElement.children).indexOf(el);
            this.setState({selectedIndex});
        };

        this.handleQueryChange = (e) => {
            let {onValueChange} = this.props;
            this.setState({
                query: e.target.value
            });

            if(!!onValueChange){
                onValueChange(e.target.value);
            }
        };

        this.selectNext = this.selectNext.bind(this)
    }

    resetState(query = "") {
        this.setState({query, selectedIndex: 0});
    }

    render() {
        return (
            <Popover
                autoFocus={false}
                enforceFocus={false}
                content={this.renderPopover()}
                onInteraction={this.handlePopoverInteraction}
                isOpen={this.state.query.length > 0}
                className={this.props.className}
                popoverClassName={Classes.MINIMAL}
                position={Position.BOTTOM_LEFT}
            >
                <input
                    className={["pt-input", this.props.className].join(' ')}
                    ref={this.handleSetSearchInputRef}
                    onChange={this.handleQueryChange}
                    onKeyDown={this.handleKeyDown}
                    placeholder={this.props.placeholder ? this.props.placeholder : "Enter value"}
                    type="text"
                    value={this.state.query}
                />
            </Popover>
        );
    }


    renderPopover() {
        const matches = this.props.items || [];
        const selectedIndex = Math.min(matches.length, this.state.selectedIndex);
        let items = matches.map((section, index) => {
            const classes = classNames(Classes.MENU_ITEM, Classes.POPOVER_DISMISS, {
                [Classes.ACTIVE]: index === selectedIndex,
            });
            return (
                <a className={classes}
                   key={index}
                   onMouseEnter={this.handleResultHover}
                   onClick={() => this.handleSelection(section)}>
                    <div>{this.renderer(section)}</div>
                </a>
            );
        });
        if (items.length === 0) {
            items = [
                <a className={classNames(Classes.MENU_ITEM, Classes.DISABLED)} key="none">
                    No results. Press <code>esc</code> to reset.
                </a>,
            ];
        }
        return <Menu>{items}</Menu>;
    }


    selectNext(direction = 1) {
        return () => {
            let newIndex = Math.max(0, this.state.selectedIndex + direction);
            if(newIndex >= this.props.items.length){
                newIndex = this.props.items.length-1;
            }
            this.setState({
                selectedIndex: newIndex,
            });
        }
    }
}

export default Typeahead

function createKeyEventHandler(actions, preventDefault = false) {
    return (e) => {
        for (const k of Object.keys(actions)) {
            const key = Number(k);
            if (e.which === key) {
                if (preventDefault) {
                    e.preventDefault();
                }
                actions[key](e);
            }
        }
        Utils.safeInvoke(actions.all, e);
    };
}