
import * as React from "react";
import * as ReactDOM from "react-dom";

import './style.scss'

import {address} from "../../logic/url_handler";

interface INavbarProps {
    onPageSelected: Function;
}

interface INavbarState {
    selected_page: string;
}

export class Navbar extends React.Component<INavbarProps, INavbarState> {
    // onPageSelected: Function;

    constructor(props: INavbarProps | Readonly<INavbarProps>) {
        super(props);

        this.state = {
            selected_page: address.pageView
        }
    }

    setActivePage(page_id: string) {
        this.setState({selected_page: page_id})
    }

    NavButton(Label: string, page_id: string) {
        return (
            <button
                onClick={()=>{
                    this.setActivePage(page_id);
                    this.props.onPageSelected(page_id);
                }}
                className={function(){
                    if (this.state.selected_page == page_id){
                        return "btn-primary"
                    }
                    return "btn-secondary"
                }.bind(this)()}
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

