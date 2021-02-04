interface Params {
    url: string;
    path: string;
    [key: string]: any;
}
export declare const route: {
    $$: {
        beforePush: any[];
        beforeRender: any[];
        paramsCache: any;
        paramsRouter: any;
        nowRenderPath: string;
        routerMap: any;
        liveRouterFns: any[];
        getLiveRoute: () => any;
    };
    target: HTMLDivElement;
    qs: {
        parse: typeof import("querystring-number").parse;
        stringify: typeof import("querystring-number").stringify;
        decode: typeof import("querystring-number").decode;
        encode: typeof import("querystring-number").encode;
    };
    params: () => Params;
    loading: () => string;
    errorPath: string;
    listenEvents: ((params: Params) => any)[];
    beforeRender: (fn: (path: string) => any) => void;
    beforePush: (fn: (path: string) => string | boolean) => void;
    use: (path: string, component: any, delay?: number | undefined) => void;
    scroll: {
        saveScrollTop: (ele?: HTMLElement | undefined) => void;
        replaceScrollTop: (ele?: HTMLElement | undefined) => Promise<number>;
        getLastScrollTop: () => number;
    };
    push: (path: string) => Promise<void>;
    replace: (path: string) => Promise<void>;
    pop: () => void;
    getPath: () => string;
    render: () => Promise<void>;
};
export default route;
