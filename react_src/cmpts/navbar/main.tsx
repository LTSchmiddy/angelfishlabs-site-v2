
import * as React from "react";
import * as ReactDOM from "react-dom";

interface INavbarProps {

}

interface INavbarState {

}

export class Navbar extends React.Component<INavbarProps, INavbarState> {
    constructor(props: INavbarProps | Readonly<INavbarProps>) {
        super(props);
    }

    render () {
        return (
            <nav>
                Navbar Area
            </nav>
        );
    }
}