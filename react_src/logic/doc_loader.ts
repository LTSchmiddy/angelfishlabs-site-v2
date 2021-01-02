export interface ILoadedDocInfo {
    title: string;
    format: string;
    [selector: string]: string;
}
export interface ILoadedDoc {
    info: ILoadedDocInfo;
    content: string;
}