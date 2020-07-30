import qs from "querystring-number";
const target = document.createElement("div");
target.style.cssText = "width:100%; height:100%";

const cacheScrollTop: { [key: string]: number } = {};
(window as any).st = cacheScrollTop;

const route = {
  target,
  qs,
  params: () => {
    const hash = location.hash.split("?");
    if (!hash[1]) {
      return {};
    }
    return route.qs.parse(hash[1]);
  },
  loading: () => "loading...",
  errorPath: "/",
  nowRenderPath: "",
  routerMap: {} as any,
  /** return isCanRender */
  beforeRender: (undefined as any) as (path: string) => boolean | string,
  use: function (path: string, component: any, delay?: number) {
    route.routerMap[path] = component;
    if (delay !== undefined) {
      setTimeout(() => {
        if (!component.__promising) {
          component().then((v: any) => {
            route.routerMap[path] = v;
          });
        }
      }, delay);
    }
  },
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
  getLastScrollTop: () => (cacheScrollTop[window.location.href] as number) || 0,
  push: (path: string) => {
    window.history.pushState(null, "", "#" + path);
    route.render();
  },
  pop: () => {
    window.history.back();
    route.render();
    cacheScrollTop[window.location.href] = undefined as any;
  },
  replace: (path: string) => {
    window.history.replaceState(null, "", "#" + path);
    route.render();
  },
  getPath: () => {
    const url = window.location.hash.split("#")[1] || "/";
    return url.split("?")[0];
  },
  render: async () => {
    let path = route.getPath();

    if (route.nowRenderPath === path) {
      return;
    }

    if (typeof route.beforeRender === "function") {
      const nextPath = route.beforeRender(path);
      if (nextPath === false) {
        return;
      }
      if (typeof nextPath === "string") {
        path = nextPath;
      }
    }

    if (!route.routerMap[path]) {
      route.replace(route.errorPath);
      return;
    }

    const component = route.routerMap[path];
    route.nowRenderPath = path;

    const timer = setTimeout(() => {
      route.target.append(route.loading());
    }, 200);

    component.__promising = true;
    const comp = await Promise.resolve(component());
    if (typeof comp === "function") {
      clearTimeout(timer);
      route.target.innerText = "";
      route.target.appendChild(comp());
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
