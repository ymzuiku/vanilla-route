import queryString from "querystring-number";

const ua = navigator.userAgent.toLocaleLowerCase();
const isIOS = /(?:iphone)/.test(ua);
const isWechat = /micromessenger/.test(ua);

export interface AoifeRouteProps {
  url: string | (() => boolean);
  render: any;
  keep?: boolean;
  preload?: boolean | number;
}

const keepTags = {} as { [key: string]: string };

/** 添加 window.listen */
const listFn = [] as any[];

["popstate", "pushState", "replaceState", "backState"].forEach((v) => {
  window.addEventListener(v, () => {
    Route.state = queryString.parse(location.search);
    if (v === "popstate" || v === "backState") {
      delete keepTags[_lastUrl];
    }
    listFn.forEach((fn) => fn());
    if (v === "popstate") {
      _urls.pop();
    }
  });
});

// 记录是否渲染过
// const renderdedList = {} as any;

/** 渲染空元素 */
function renderEmpty(tar: string) {
  const span = document.createElement("span");
  span.style.display = "none";
  span.setAttribute("vanilla-route", tar);
  span.setAttribute("vanilla-route-empty", tar);

  // 若没渲染过，添加first标签
  // if (!renderdedList[tar]) {
  //   renderdedList[tar] = true;
  //   span.setAttribute("vanilla-route-first", tar);
  // }

  return span;
}

function checkIsUrl(url: any) {
  if (typeof url === "function") {
    return url();
  }
  return queryString.decode(window.location.pathname) === url;
}

/** 路由编码 */
let _n = 0;
/** 记录上一个URL */
let _lastUrl = "";
const _urls = [] as { state: any; url: string }[];
const renderFns = {} as { [key: string]: any };

/** 路由 */
export const Route = ({ url, render, preload, keep }: AoifeRouteProps) => {
  if (typeof render !== "function") {
    throw "AoifeRoute.render need a Function";
  }

  if (!preload && typeof url === "string") {
    renderFns[url] = render;
  }

  _n += 1;
  const tar = "" + _n;

  const fn = () => {
    /** 预渲染 */
    if (preload) {
      const time = typeof preload === "number" ? preload : 50;
      setTimeout(() => {
        render();
      }, time);
    }

    const lastTar = keepTags[url as any];

    // 若有元素缓存，直接读取
    if (typeof url === "string" && lastTar) {
      const old = document.querySelector(`[vanilla-route="${lastTar}"]`) as any;
      if (!old.__display) {
        old.__display = window.getComputedStyle
          ? window.getComputedStyle(old).display
          : "block";
      }
      if (checkIsUrl(url)) {
        old.style.display = old.__display;
      } else {
        old.style.display = "none";
      }
      return old;
    }

    if (!checkIsUrl(url)) {
      return renderEmpty(tar);
    }

    const isNeedKeep = keep && typeof url == "string";

    /** 击中的路由，但是为一个异步对象 */
    const out = render();
    if (out.then) {
      const tempEle = renderEmpty(tar);
      Promise.resolve(out).then((v) => {
        if (v.default) {
          const old = document.querySelector(`[vanilla-route="${tar}"]`);
          if (!old) {
            return;
          }
          const nextEle = v.default();
          nextEle.setAttribute("vanilla-route", tar);
          // 对元素tar做一个缓存
          if (isNeedKeep) {
            keepTags[url as string] = tar;
          }
          old.replaceWith(nextEle);
        }
      });
      return tempEle;
    }

    out.setAttribute("vanilla-route", tar);

    // 对元素tar做一个缓存
    if (isNeedKeep) {
      keepTags[url as string] = tar;
    }
    return out;
  };

  // 添加监听，每当 listing 时，尝试获取新的子组件并重新替换当前
  listFn.push(() => {
    const old = document.querySelector(
      `[vanilla-route="${tar}"]`
    ) as HTMLElement;
    if (!old) {
      return;
    }
    const nextEl = fn() as HTMLElement;
    // 若两个都是空路由，不进行dom替换
    if (
      nextEl.getAttribute("vanilla-route-empty") &&
      old.getAttribute("vanilla-route-empty")
    ) {
      return;
    }
    if (nextEl === old) {
      return;
    }
    old.replaceWith(nextEl);
  });
  return fn();
};

Route.onlyReplace = isWechat && isIOS;

Route.preload = (url: string) => {
  const fn = renderFns[url];
  if (typeof fn === "function") {
    fn();
    // 每个 url，preload 只需要加载一次执行一次
    renderFns[url] = true;
  }
};

Route.state = {};
Route.queryString = queryString;
Route.push = (url: string, state?: any) => {
  // saveOldScrollTop();
  if (Route.onlyReplace) {
    Route.replace(url, state);
    return;
  }
  _urls.push({ state, url });
  if (state) {
    url += "?" + queryString.stringify(state);
  }
  if (window.scrollTo) {
    window.scrollTo({ top: 0 });
  }
  setTimeout(() => {
    history.pushState(state, "", url);
    window.dispatchEvent(new Event("pushState"));
  });
};
Route.replace = (url: string, state?: any) => {
  _urls.push({ state, url });

  if (state) {
    url += "?" + queryString.stringify(state);
  }
  if (window.scrollTo) {
    window.scrollTo({ top: 0 });
  }
  setTimeout(() => {
    history.replaceState(state, "", url);
    window.dispatchEvent(new Event("replaceState"));
  });
};

const _back = () => {
  _lastUrl = location.pathname;
  // 若在第一个页面，点返回，重新渲染 '/'
  if (_urls.length === 0) {
    history.replaceState({}, "", "/");
    window.dispatchEvent(new Event("backState"));
    return;
  }

  // 处理不增加 history 的方案返回
  if (Route.onlyReplace) {
    _urls.pop();
    if (_urls.length === 0) {
      history.replaceState({}, "", "/");
    } else {
      const { state, url } = _urls[_urls.length - 1];
      history.replaceState(state, "", url);
    }

    window.dispatchEvent(new Event("backState"));
    return;
  }

  history.back();
};

const __back = (num = 1, callback?: Function) => {
  if (num <= 0) {
    if (callback) {
      setTimeout(() => {
        callback();
      });
    }
    return;
  }
  num -= 1;
  _back();
  setTimeout(() => {
    __back(num, callback);
  });
};

Route.back = (num = 1) => {
  return new Promise((res) => {
    __back(num, res);
  });
};

Route.rootURL = "/";
