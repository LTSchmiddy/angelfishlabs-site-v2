import * as React from "react";
import * as ReactDOM from "react-dom";

import {SidebarHandler, getSidebarStyle, getContentStyle} from "./sidebar_handler";

import "./style.scss"

interface ISidebarProps {
    sidebar_side: string
    sidebar_id: string;
}

interface ISidebarState {
    side: string
}

interface ISidebarContentFieldState {
    side: string
}

export class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
    sidebar_id_base: string;
    sidebar_id: string;
    handler: SidebarHandler;

    constructor(props: ISidebarProps | Readonly<ISidebarProps>) {
        super(props);

        this.sidebar_id_base = props.sidebar_id;
        this.sidebar_id = "sidebar->" + props.sidebar_id;
        this.state = {
            side: props.sidebar_side
        };

        this.handler = new SidebarHandler(props.sidebar_id, props.sidebar_side);
    }

    render () {
        return (
            <div
                className={`sidebar ${this.state.side}-sidebar`}
                id={this.sidebar_id}
                style={getSidebarStyle(this.sidebar_id_base)}
            >
                <div className={"sidebar-content"}>
                    {this.props.children}
                </div>
                <div
                    className={"sidebar-drag-handle"}
                    onMouseDown={this.handler.init_listener}
                />
            </div>
        );
    }
}

export class ContentField extends React.Component<ISidebarProps, ISidebarContentFieldState> {
    sidebar_id_base: string;
    sidebar_id: string;

    constructor(props: ISidebarProps | Readonly<ISidebarProps>) {
        super(props);
        this.sidebar_id_base = props.sidebar_id;
        this.sidebar_id = "sidebar-content->" + props.sidebar_id;

        let other_side: string;
        if (props.sidebar_side === 'right'){
            other_side = 'left';
        } else if (props.sidebar_side === 'left'){
            other_side = 'right';
        }

        this.state = {
            side: other_side
        };
    }

    render () {
        return (
            <div
                className={`content-field ${this.state.side}-sidebar`}
                id={this.sidebar_id}
                style={getContentStyle(this.sidebar_id_base)}
            >
                {this.props.children}
            </div>
        );
    }
}