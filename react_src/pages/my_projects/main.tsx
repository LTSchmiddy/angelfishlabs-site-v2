
import * as React from "react";
import * as ReactDOM from "react-dom";

import {Sidebar, ContentField} from "../../cmpts/sidebar/main";

import "./style.scss"

interface IMyProjectsPageProps {
}

interface IMyProjectsPageState {
}

export class MyProjectsPage extends React.Component<IMyProjectsPageProps, IMyProjectsPageState> {
    constructor(props: IMyProjectsPageProps | Readonly<IMyProjectsPageProps>) {
        super(props);
    }

    render () {
        return (
            <div className={"page-view"}>
                <ContentField
                    sidebar_side={"left"}
                    sidebar_id={"home_bar"}
                >
                    Project Details:
                </ContentField >
                <Sidebar
                    sidebar_side={"left"}
                    sidebar_id={"home_bar"}
                >
                    Project List:
                </Sidebar>
            </div>
        );
    }
}