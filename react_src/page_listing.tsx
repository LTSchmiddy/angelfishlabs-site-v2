import * as React from "react";
import * as ReactDOM from "react-dom";

import {HomePage} from "./pages/doc_viewer/main";
import {MyProjectsPage} from "./pages/my_projects/main";

interface ILookupSig {
    [selector: string]: Function;
}
export function create_lookup(): ILookupSig {
    return {
        home: ()=>{ return <HomePage list_path={"home"}/>; },
        my_projects: ()=>{ return <HomePage list_path={"my_projects"}/>; },
    };
}