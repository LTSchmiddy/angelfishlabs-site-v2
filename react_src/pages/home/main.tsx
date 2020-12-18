import * as React from "react";
import * as ReactDOM from "react-dom";

import {Sidebar, ContentField} from "../../cmpts/sidebar/main";
import {DocBtnList} from "../../cmpts/doc_viewing/list";

import * as sd from "showdown";
// import {DocView, IDocViewProps} from "../../cmpts/doc_viewing/view";

import "./style.scss"
import * as Showdown from "showdown";

interface IHomePageProps {
    list_path: string;
}

interface IHomePageState {
    list_path: string;
    displayed_doc: string;
    loaded: string;
}


let showdown = new Showdown.Converter();
showdown.setFlavor("github");
showdown.setOption("headerLevelStart", 2);

export class HomePage extends React.Component<IHomePageProps, IHomePageState> {


    constructor(props: IHomePageProps | Readonly<IHomePageProps>) {
        super(props);

        this.state = {
            list_path: props.list_path,
            displayed_doc: "docs/home/index.md",
            loaded: null
        }
    }

    setView (doc_path: string) {
        console.log("HOME: "+ doc_path);
        this.setState({
            displayed_doc: doc_path
        },
            // ()=>{console.log(this.state)}
        );
    }

    componentDidMount() {
        console.log("Mounted")
        if (this.state.displayed_doc === null) {
            return;
        }
        this.loadDoc();
    }

    componentDidUpdate(prevProps: Readonly<IHomePageProps>, prevState: Readonly<IHomePageState>, snapshot?: any) {
        console.log("UPDATED");
        console.log(this.props);
        if (this.state.displayed_doc !== prevState.displayed_doc) {
            this.loadDoc();
        }
        if (prevProps.list_path !== this.props.list_path) {
            this.setState({
                list_path: this.props.list_path
            })
        }
    }

    loadDoc(){
        console.log("Attempt LOAD");
        $.post(`/md/${this.state.displayed_doc}`, (data, status)=>{
            console.log("LOADED");
            this.setState({
                loaded: data
            });
        });
    }

    render () {
        return (
            <div className={"page-view"}>
                <ContentField
                    sidebar_side={"left"}
                    sidebar_id={"home_bar"}
                >
                    <DocViewF doc={this.state.loaded}/>
                </ContentField >
                <Sidebar
                    sidebar_side={"left"}
                    sidebar_id={"home_bar"}
                >
                    <DocBtnList onClickHandler={this.setView.bind(this)} list_path={this.state.list_path} selected_doc={this.state.displayed_doc}/>
                </Sidebar>
            </div>
        );
    }
}

interface IDocViewFProps {
    doc: string;
}

function DocViewF (props: IDocViewFProps) {
    // console.log("VIEW: " + props.doc);
    return (
        <div
            className="doc-view"
            dangerouslySetInnerHTML={{__html: showdown.makeHtml(props.doc)}}
        >

        </div>
    );
}