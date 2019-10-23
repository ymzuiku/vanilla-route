import { createHistory, IRouteProps } from './createHistory';

const SHOW_DISPLAY = 'block';
const HIDDEN_DISPLAY = 'block';
const HIDDEN_ZINDEX = 1;
const LAST_ZINDEX = 2;
const SHOW_ZINDEX = 3;
const HIDDEN_POSITION = 'absolute';
const SHOW_POSIRION = 'relative';
const SHOW_POINTEREVENTS = 'auto';
const HIDDEN_POINTEREVENTS = 'none';

const nuageRoute = createHistory();

/**
 *  Route 使用 history.listen 而不使用 consumer 是因为 Route 属于非常固定的模式.
 *  Route 会常驻 ReactNode 对象树，使用 listen 可以有效减少不必要的 consumer 订阅。
 */
function Route<S>({ path, component, delay, keep = true, leaveTime }: IRouteProps) {
  const route = document.createElement('div');
  route.setAttribute('route', path);

  const state = {
    animeTimer: null as any,
    unListen: null as any,
    isRenderChild: false,
    style: {
      pointerEvents: HIDDEN_POINTEREVENTS,
      display: HIDDEN_DISPLAY,
      position: HIDDEN_POSITION,
      zIndex: HIDDEN_ZINDEX,
    },
    realChild: null as any,
  };

  const setRouteStyle = () => {
    route.style.cssText = `
        width: 100%;
        height: 100%;
        overflow: hidden;
        left: 0px;
        top: 0px;
        background-color: #fff;
        pointer-events: ${state.style.pointerEvents};
        display: ${state.style.display};
        position: ${state.style.position};
        z-index: ${state.style.zIndex};
    `;
  };
  setRouteStyle();

  const onHistoryUpdate = () => {
    const [match, stackMatch, lastPage] = nuageRoute.checkPathMatch(path);

    if (match) {
      // 如果没有 child, 先读取，再重新执行

      if (!state.realChild) {
        if (delay === undefined) {
          state.realChild = component();
          route.innerHTML = '';
          route.append(state.realChild);
          onHistoryUpdate();
        } else {
          component().then((comp: any) => {
            state.realChild = comp();
            route.innerHTML = '';
            route.append(state.realChild);
            onHistoryUpdate();
          });
        }
      }
      state.isRenderChild = true;
      state.style = {
        pointerEvents: SHOW_POINTEREVENTS,
        display: SHOW_DISPLAY,
        position: SHOW_POSIRION,
        zIndex: SHOW_ZINDEX,
      };
      setRouteStyle();
    } else {
      // 如果不需要保持组件，清空child
      const isKeepChild = keep && stackMatch;
      const oldIsRenderChild = state.isRenderChild;

      if (state.isRenderChild === undefined || state.isRenderChild === true) {
        if (lastPage > 0 && leaveTime && leaveTime > 0) {
          state.style = {
            pointerEvents: SHOW_POINTEREVENTS,
            display: SHOW_DISPLAY,
            position: HIDDEN_POSITION,
            zIndex: SHOW_ZINDEX,
          };
          setRouteStyle();

          setTimeout(() => {
            state.isRenderChild = isKeepChild;
            state.style = {
              pointerEvents: HIDDEN_POINTEREVENTS,
              display: HIDDEN_DISPLAY,
              position: HIDDEN_POSITION,
              zIndex: HIDDEN_ZINDEX,
            };
            setRouteStyle();
            if (oldIsRenderChild && !state.isRenderChild) {
              route.innerHTML = '';
            } else {
              if (!oldIsRenderChild) {
                route.innerHTML = '';
                route.append(state.realChild);
              }
            }
          }, leaveTime);
        } else {
          state.isRenderChild = isKeepChild;
          state.style = {
            pointerEvents: HIDDEN_POINTEREVENTS,
            display: HIDDEN_DISPLAY,
            position: HIDDEN_POSITION,
            zIndex: lastPage > 0 ? LAST_ZINDEX : HIDDEN_ZINDEX,
          };
          setRouteStyle();
          if (oldIsRenderChild && !state.isRenderChild) {
            route.innerHTML = '';
          } else {
            if (!oldIsRenderChild) {
              route.innerHTML = '';
              route.append(state.realChild);
            }
          }
        }
      }
    }
  };

  nuageRoute.listen(onHistoryUpdate);

  return route;
}

nuageRoute.Route = Route;

export default nuageRoute;
