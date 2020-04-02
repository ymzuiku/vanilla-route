const target = document.createElement("div");
target.style.cssText = 'width:100%; height:100%';

const router = {
  target,
  registers: {} as any,
  use: function(path: string, component: () => HTMLElement) {
    router.registers[path] = component;
  },
  push: (path: string) => {
    window.history.pushState(null, "", "#" + path);
    router.render();
  },
  pop: () => {
    window.history.back();
    router.render();
  },
  replace: (path:string) => {
    window.history.replaceState(null, "", "#" + path);
    router.render();
  },
  render: () => {
    const url = window.location.hash.split("#")[1] || "/";
    const path = url.split("?")[0];

    router.target.innerText = "";
    router.target.appendChild(router.registers[path]());
  },
};

// 监听浏览器路由是否变化
window.addEventListener("popstate", function() {
  router.render();
});

export default router;
