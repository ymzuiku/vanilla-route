declare const route: {
    target: HTMLDivElement;
    qs: {
        parse: typeof import("querystring-number").parse;
        stringify: typeof import("querystring-number").stringify;
        decode: typeof import("querystring-number").decode;
        encode: typeof import("querystring-number").encode;
    };
    params: () => any;
    loading: () => string;
    errorPath: string;
    nowRenderPath: string;
    routerMap: any;
    /** return isCanRender */
    beforeRender: (path: string) => string | boolean;
    use: (path: string, component: any, delay?: number | undefined) => void;
    saveScrollTop: (ele?: HTMLElement | undefined) => void;
    replaceScrollTop: (ele?: HTMLElement | undefined) => Promise<number>;
    getLastScrollTop: () => number;
    push: (path: string) => void;
    pop: () => void;
    replace: (path: string) => void;
    getPath: () => string;
    render: () => Promise<void>;
};
export default route;
