

declare module '*.html' {
    const value: any;
    export default value;
}

declare module '*.m.scss' {
    const value: any;
    export default value;
}

declare module '*.scss' {
    const value: any;
    export default value;
}

declare module "*.json" {
  const value: any;
  export default value;
}

interface Window {
    startPage: string;
}