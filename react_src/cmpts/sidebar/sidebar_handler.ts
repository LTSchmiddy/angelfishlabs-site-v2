import * as utils from "../../my_utils"

interface ISidebarMemoryEntry {
    sidebar: string;
    content: string;
}
interface ISidebarMemory {
    [selector: string]: ISidebarMemoryEntry;
}

export const sidebar_memory: ISidebarMemory = {};
utils.bindToWindow("sidebar_memory", sidebar_memory);

export function getSidebarStyle(sidebar_id: string) {
    if (sidebar_memory.hasOwnProperty(sidebar_id)) {
        return {width: sidebar_memory[sidebar_id].sidebar};
    } else {
        return {};
    }
}

export function getContentStyle(sidebar_id: string) {
    if (sidebar_memory.hasOwnProperty(sidebar_id)) {
        return {width: sidebar_memory[sidebar_id].content};
    } else {
        return {};
    }
}


export class SidebarHandler {
    sidebar_id: string;
    side: string;

    init_listener: any;
    resize_listener: any;
    stop_resize_listener: any;

    sidebar: HTMLElement;
    contentField: HTMLElement;

    getSidebar() {
        return document.getElementById("sidebar->" + this.sidebar_id);
    }
    getContentField() {
        return document.getElementById("sidebar-content->" + this.sidebar_id);
    }

    constructor(sidebar_id: string, side: string) {
        this.sidebar_id = sidebar_id;
        this.side = side;

        this.init_listener = this.initResize.bind(this);
        this.resize_listener = this.Resize.bind(this);
        this.stop_resize_listener = this.stopResize.bind(this);

        if (!sidebar_memory.hasOwnProperty(this.sidebar_id)) {
            sidebar_memory[this.sidebar_id] = {
                sidebar: "",
                content: ""
            }
        }

        // this.resizer.addEventListener('mousedown', this.init_listener, false);
    }


    initResize() {
        // In case React did something to these, we're going to re-find these.
        this.sidebar = this.getSidebar();
        this.contentField = this.getContentField();

        window.addEventListener("mousemove", this.resize_listener, false);
        window.addEventListener("mouseup", this.stop_resize_listener, false);

        // console.log("should be resizing sidebar");
    }

    offsetRight = function(elem: HTMLElement) {
      return window.innerWidth - (elem.offsetLeft + elem.offsetWidth);
    }

    Resize(e: any) {
        e.preventDefault();


        if (this.side === 'left') {
            this.sidebar.style.width = (e.clientX - this.sidebar.offsetLeft) + 'px';

            if (this.contentField !== null){
                this.contentField.style.width = 'calc(100vw - ' + (e.clientX - this.sidebar.offsetLeft) + 'px)';
            }
        } else if (this.side === 'right')  {
            this.sidebar.style.width = 'calc(100vw - ' + (e.clientX - this.offsetRight(this.sidebar)) + 'px)';

            if (this.contentField !== null){
                this.contentField.style.width = (e.clientX - this.offsetRight(this.sidebar)) + 'px';
            }
        }

        sidebar_memory[this.sidebar_id].sidebar = this.sidebar.style.width;
        if (this.contentField !== null) {
            sidebar_memory[this.sidebar_id].content = this.contentField.style.width;
        }

    }

    stopResize() {
        window.removeEventListener('mousemove', this.resize_listener, false);
        window.removeEventListener('mouseup', this.stop_resize_listener, false);
    }
}