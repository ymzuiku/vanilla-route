declare const router: {
    target: HTMLDivElement;
    registers: any;
    use: (path: string, component: () => HTMLElement) => void;
    push: (path: string) => void;
    pop: () => void;
    replace: (path: string) => void;
    render: () => void;
};
export default router;
