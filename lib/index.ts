import qs from "querystring-number";
const target = document.createElement("div");
target.style.cssText = "width:100%; height:100%";

const cacheScrollTop: { [key: string]: number } = {};
(window as any).cacheScrollTop = cacheScrollTop;

interface Params {
  url: string;
  path: string;
  [key: string]: any;
}

const route = {
  $$: {
    beforePush: [] as any[],
    beforeRender: [] as any[],
    paramsCache: {} as any,
    paramsRouter: {} as any,
    nowRenderPath: "",
    routerMap: {} as any,
    liveRouterFns: [] as any[],
    getLiveRoute: () => {
      const l = route.$$.liveRouterFns.length;
      const params = route.params();
      for (let i = 0; i < l; i++) {
        const component = route.$$.liveRouterFns[i](params);
        if (component) {
          return component;
        }
      }
      return null;
    },
  },
  target,
  qs,
  params: (): Params => {
    const href = window.location.href;
    const last = route.$$.paramsCache[href];
    if (last) {
      return last;
    }

    const path = route.getPath();
    const urlParams = {} as any;

    Object.keys(route.$$.paramsRouter).forEach((v) => {
      if (path.indexOf(v) === 0) {
        const p = route.$$.paramsRouter[v];
        const _p = p.replace(/:/g, "").replace(v, "");
        const _v = path.replace(v, "");
        const listp = _p.split("/");
        const listv = _v.split("/");
        listp.forEach((k: string, i: number) => {
          urlParams[k] = listv[i] || "";
        });
      }
    });

    const hash = window.location.hash.split("?");
    const url = window.location.hash.replace("#", "");
    if (!hash[1]) {
      const out = {
        path,
        url,
        ...urlParams,
      };
      route.$$.paramsCache[href] = out;
      return out;
    }

    const out = {
      url,
      path,
      ...urlParams,
      ...route.qs.parse(hash[1]),
    };

    route.$$.paramsCache[href] = out;

    return out;
  },
  loading: () => "loading...",
  errorPath: "/",
  listenEvents: [] as ((params: Params) => any)[],
  beforeRender: (fn: (path: string) => any) => {
    route.$$.beforeRender.push(fn);
  },
  beforePush: (fn: (path: string) => boolean | string) => {
    route.$$.beforePush.push(fn);
  },
  use: function (path: string, component: any, delay?: number) {
    if (/:/.test(path)) {
      route.$$.paramsRouter[path.split(":")[0]] = path;
    }
    route.$$.routerMap[path] = component;
    if (delay !== undefined) {
      setTimeout(() => {
        if (!component.__promising) {
          component().then((v: any) => {
            route.$$.routerMap[path as any] = v;
          });
        }
      }, delay);
    }
  },
  scroll: {
    saveScrollTop: (ele?: HTMLElement) => {
      if (ele) {
        cacheScrollTop[window.location.href] = ele.scrollTop;
      } else {
        cacheScrollTop[window.location.href] = window.scrollY;
      }
    },
    replaceScrollTop: (ele?: HTMLElement): Promise<number> => {
      return new Promise((res) => {
        requestAnimationFrame(() => {
          const top = cacheScrollTop[window.location.href] as number;
          if (top) {
            if (ele) {
              ele.scrollTo(0, top);
              (window as any).scrollElement = undefined;
            } else {
              window.scrollTo({ top });
            }
          }
          res(top || 0);
        });
      });
    },
    getLastScrollTop: () =>
      (cacheScrollTop[window.location.href] as number) || 0,
  },
  push: async (path: string) => {
    if (typeof route.beforePush === "function") {
      for (const fn of route.$$.beforePush) {
        path = await Promise.resolve(fn(path));
      }
    }
    if (typeof path !== "string") {
      return;
    }
    window.history.pushState(null, "", "#" + path);
    route.render();
  },
  replace: async (path: string) => {
    if (typeof route.beforePush === "function") {
      for (const fn of route.$$.beforePush) {
        path = await Promise.resolve(fn(path));
      }
    }
    if (typeof path !== "string") {
      return;
    }
    window.history.replaceState(null, "", "#" + path);
    route.render();
  },
  pop: () => {
    window.history.back();
    route.render();
    cacheScrollTop[window.location.href] = undefined as any;
  },
  getPath: () => {
    const url = window.location.hash.split("#")[1] || "/";
    return url.split("?")[0];
  },
  render: async () => {
    if (!route.$$.routerMap[route.errorPath]) {
      console.error("Undefined route.errorPath:", route.errorPath);
      return;
    }
    const path = route.getPath();
    if (typeof route.beforeRender === "function") {
      for (const fn of route.$$.beforeRender) {
        await Promise.resolve(fn(path));
      }
    }

    if (route.$$.nowRenderPath === path) {
      return;
    }

    let component = route.$$.routerMap[path];

    // 处理动态路由
    if (!component) {
      Object.keys(route.$$.paramsRouter).forEach((v) => {
        if (path.indexOf(v) === 0) {
          const p = route.$$.paramsRouter[v];
          component = route.$$.routerMap[p];
        }
      });
    }

    if (!component) {
      route.replace(route.errorPath + "?" + path);
      return;
    }

    route.$$.nowRenderPath = path;

    const timer = setTimeout(() => {
      route.target.append(route.loading());
    }, 200);

    component.__promising = true;
    let comp = await Promise.resolve(component());
    if (comp.default) {
      comp = comp.default;
    }

    const params = route.params();

    route.listenEvents.forEach((fn) => {
      fn(params);
    });
    if (typeof comp === "function") {
      clearTimeout(timer);
      route.target.innerText = "";
      const c = comp();
      if (c.then) {
        c.then((res: any) => {
          if (res && (res as HTMLElement).nodeName) {
            route.target.appendChild(res);
          }
        });
      }
      route.target.appendChild(c);
    } else {
      clearTimeout(timer);
      route.target.innerText = "";
      route.target.appendChild(comp);
    }
  },
};

// 监听浏览器路由是否变化
window.addEventListener("popstate", function () {
  route.render();
});

export default route;
