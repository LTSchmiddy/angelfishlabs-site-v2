
import * as React from "react";
import * as ReactDOM from "react-dom";

import './style.scss'

interface INavbarProps {
    onPageSelected: Function;
}

interface INavbarState {

}

export class Navbar extends React.Component<INavbarProps, INavbarState> {
    // onPageSelected: Function;

    constructor(props: INavbarProps | Readonly<INavbarProps>) {
        super(props);

        // this.onPageSelected
    }

    NavButton(Label: string, page_id: string) {
        return (
            <button
                onClick={()=>{this.props.onPageSelected(page_id)}}
                className={"btn-primary"}
            >
                {Label}
            </button>
        )
    }
    render () {
        return (
            <header>
                <nav>
                    {this.NavButton("Home", "home")}
                    {this.NavButton("My Projects", "my_projects")}
                </nav>
            </header>
        );
    }
}

