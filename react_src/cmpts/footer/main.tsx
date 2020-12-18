
import * as React from "react";
import * as ReactDOM from "react-dom";

import './style.scss'

interface IFooterProps {

}

interface IFooterState {

}

export class Footer extends React.Component<IFooterProps, IFooterState> {
    constructor(props: IFooterProps | Readonly<IFooterProps>) {
        super(props);
    }

    render () {
        return (
            <footer>
                Footer Content
            </footer>
        );
    }
}