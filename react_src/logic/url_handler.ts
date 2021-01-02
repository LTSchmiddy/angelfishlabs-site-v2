import {bindToWindow} from "../my_utils";


export class AddressHandler {
    pageView: string;
    pageParams: string[];
    constructor() {
        this.pageParams = window.startPage.split("/");
        this.pageView = this.pageParams.shift();
    }

    recordPage() {
        window.history.pushState("", document.title, `/page/${this.pageView}/${this.pageParams.join("/")}`);
    }
}

export const address = new AddressHandler();
bindToWindow("address", address);