import * as React from "react";
import * as ReactDOM from "react-dom";

import {Navbar} from "./cmpts/navbar/main";


interface ISiteRootProps {}
interface ISiteRootState {}
export class SiteRoot extends React.Component<ISiteRootProps, ISiteRootState> {
    constructor(props: ISiteRootProps | Readonly<ISiteRootProps>) {
        super(props);
    }

    render() {
        return (
            <Navbar/>
        );
    }

}