import * as React from "react";
import * as ReactDOM from "react-dom";

import {DocBtn, IDocBtnProps} from "./button";

import "./style.scss"

export interface IDocBtnListProps {
    list_path: string;
    selected_doc: string;
    onClickHandler: Function;
}

interface IDocBtnListState {
    list_loaded: boolean;
    selected_doc: string;
}

interface IDocListResults {
    files: IDocBtnProps[];
    dirs: IDocBtnProps[];
}

export class DocBtnList extends React.Component<IDocBtnListProps, IDocBtnListState> {
    doc_results: IDocListResults;
    // list_path: string;
    onClickHandler: Function;

    constructor(props: IDocBtnListProps | Readonly<IDocBtnListProps>) {
        super(props);
        // this.list_path = props.list_path
        this.doc_results = null;

        this.onClickHandler = props.onClickHandler;

        this.state = {
            list_loaded: false,
            selected_doc: props.selected_doc
        }
    }

    componentDidMount() {
        this.load_list();
    }

    componentDidUpdate(prevProps: Readonly<IDocBtnListProps>) {
        if (prevProps.list_path !== this.props.list_path) {
            this.load_list();
        }
    }

    load_list() {
        this.setState({
            list_loaded: false
        });

        $.post(
            `/md/list/${this.props.list_path}`,
            (data: IDocListResults, status)=>{
                this.doc_results = data;
                this.setState({
                    list_loaded: true
                });
            }
        );
    }

    setView(doc_path: string) {
        // console.log(doc_path);
        this.onClickHandler(doc_path);
    }

    render () {
        if (!this.state.list_loaded) {
            return (
                <div className={"doc-btn-list"}>Loading...</div>
            );
        } else {
            let dir_btns = this.doc_results.dirs.map((i, index, array)=>{
                return (
                    <DocBtn key={`dir-${index}`} name={i.name} type={i.type} path={i.path} onClickHandler={this.setView.bind(this)}/>
                );
            });

            let file_btns = this.doc_results.files.map((i, index, array)=>{
                return (
                    <DocBtn key={`file-${index}`} name={i.name} type={i.type} path={i.path} onClickHandler={this.setView.bind(this)}/>
                );
            });
            return (
                <div className={"doc-btn-list"}>
                    {dir_btns}
                    {file_btns}
                </div>
            );

        }
    }
}


