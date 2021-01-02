import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Showdown from "showdown";

import {ILoadedDocInfo, ILoadedDoc} from "../../logic/doc_loader";

import {Sidebar, ContentField} from "../../cmpts/sidebar/main";
import {DocBtnList} from "../../cmpts/doc_viewing/list";
import "./style.scss"

import {address} from "../../logic/url_handler";

interface IHomePageProps {
    list_path: string;
}

interface IHomePageState {
    list_path: string;
    displayed_doc: string;
    loaded: string;
}

export let showdown: Showdown.Converter = new Showdown.Converter();
showdown.setFlavor("github");
showdown.setOption("headerLevelStart", 2);


// let showdown = new Showdown.Converter();
// showdown.setFlavor("github");
// showdown.setOption("headerLevelStart", 2);

export class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    doc_root: string;
    constructor(props: IHomePageProps | Readonly<IHomePageProps>) {
        super(props);
        this.doc_root = props.list_path;

        // let doc_path = `/docs/${this.doc_root}/${address.pageParams.join("/")}`;
        let doc_path = address.pageParams.join("/");

        this.state = {
            list_path: props.list_path,
            displayed_doc: doc_path,
            loaded: null
        }
    }


    setView (doc_path: string) {
        console.log("HOME: "+ doc_path);
        this.setState({
            displayed_doc: doc_path
        }, ()=>{
            address.pageParams = this.state.displayed_doc.split("/");
            address.recordPage();
        });
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
        // console.log(this.props);
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
        $.post(`/md/${this.state.displayed_doc}`, (doc, status)=>{
            console.log("LOADED");

            this.setupDocInfo(doc);
            this.setState({
                loaded: doc.content
            });
        });
    }

    setupDocInfo(doc: ILoadedDoc) {
        if (doc.info.format === "markdown") {
            doc.content = showdown.makeHtml(doc.content);
        }

        document.title = doc.info.title + " - Angelfish Labs";
    }

    render () {
        console.log("LIST PATH: " + this.state.list_path);
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
                    <DocBtnList
                        onClickHandler={this.setView.bind(this)}
                        list_path={this.state.list_path}
                        selected_doc={this.state.displayed_doc}/>
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