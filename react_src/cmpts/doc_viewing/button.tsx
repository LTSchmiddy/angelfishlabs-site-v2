import * as React from "react";
import * as ReactDOM from "react-dom";

import "./style.scss"

export interface IDocBtnProps {
    name: string;
    type: string;
    path: string;
    onClickHandler: Function;
    title?: string;
}

interface IDocBtnState {
    selected: boolean
}

// Buttons used for selecting doc to display:
export class DocBtn extends React.Component<IDocBtnProps, IDocBtnState> {
    constructor(props: IDocBtnProps | Readonly<IDocBtnProps>) {
        super(props);
        this.state = {
            selected: false
        }
    }

    render () {
        return (
            <button onClick={()=>{this.props.onClickHandler(this.props.path)}} className="doc-button btn-dark">
                {this.props.name}
            </button>
        );
    }
}

