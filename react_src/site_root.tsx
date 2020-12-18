import * as React from "react";
import * as ReactDOM from "react-dom";

import {Navbar} from "./cmpts/navbar/main";
import {Footer} from "./cmpts/footer/main";

import {create_lookup} from "./page_listing";


interface ISiteRootProps {}
interface ISiteRootState {
    page_id: string
}

export class SiteRoot extends React.Component<ISiteRootProps, ISiteRootState> {
    constructor(props: ISiteRootProps | Readonly<ISiteRootProps>) {
        super(props);

        this.state = {
            page_id: "home"
        }
    }

    setPage(new_page_id: string) {
        this.setState({
            page_id: new_page_id
        })
    }

    render() {
        return (
            <div id={"site-root"}>
                <Navbar onPageSelected={this.setPage.bind(this)}/>
                    <PageView page_id={this.state.page_id}/>
                <Footer/>
            </div>
        );
    }

}

interface IPageViewPropsBase {
    page_id: string;
}

const lookup = create_lookup();

// function Welcome(props: IPageViewPropsBase) {
function PageView(props: IPageViewPropsBase) {

    console.log(props.page_id);
    return lookup[props.page_id]();
}