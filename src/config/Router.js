import { NewObject } from './index';

export class ActionConfig extends String {
  /**
   * title:String,
   * path: String,
   * page:Component,
   * options:{
   *      params:Object,
   *      layout:Component || null
   * }*/
  constructor(title, path, page, options = {}) {
    super(path ?? '/404');
    const regex = /:[a-zA-Z]{1,}/g;
    const { params, layout } = options;
    Object.defineProperty(this, 'title', {
      enumerable: false,
      writable: true,
      value: title,
    });
    Object.defineProperty(this, 'params', {
      enumerable: false,
      value: params,
    });
    Object.defineProperty(this, 'layout', {
      enumerable: false,
      writable: true,
      value: layout,
    });
    Object.defineProperty(this, 'page', {
      enumerable: false,
      value: page,
    });
    Object.defineProperty(this, 'parent', {
      enumerable: false,
      writable: true,
    });
    Object.defineProperty(this, 'getAction', {
      enumerable: false,
      value: function (values) {
        let str = `/${path}`;
        let parent = this.parent;
        do {
          const parentPath = parent?.path;
          str = (parentPath ? '/' + parentPath : '') + str;
          parent = parent?.parent;
        } while (parent);
        if (typeof str === 'string') {
          const args = str.match(regex);
          if (args && Array.isArray(args)) {
            args.forEach((arg) => {
              const key = arg.replace(':', '');
              str = str.replaceAll(
                arg,
                (values && values[key]) || params?.[key] || '',
              );
            });
          }
          return str;
        }
        return '/404';
      },
    });
  }
}
export class ControllerConfig extends NewObject {
  /**
   * path: string,
   * actions:{
   *    action:ActionConfig
   * },
   * options:{
   *    checkpage:Component || null,
   *    layout:Component || null,
   *    title:String
   * }*/
  constructor(path, actions, { checkpage, layout, title }) {
    super()
    Object.keys(actions).forEach((key) => {
      if (actions[key] instanceof ActionConfig) {
        this[key] = actions[key];
        this[key].parent = this;
        if (this[key].layout === undefined) {
          this[key].layout = layout;
        }
      }
    });
    Object.defineProperty(this, 'title', { enumerable: false, value: title });
    Object.defineProperty(this, 'checkpage', {
      enumerable: false,
      value: checkpage,
    });
    Object.defineProperty(this, 'layout', { enumerable: false, value: layout });
    Object.defineProperty(this, 'path', { enumerable: false, value: path });
    Object.defineProperty(this, 'parent', {
      enumerable: false,
      writable: true,
    });
  }
}

export class RouterConfig extends NewObject {
  /** routers: {
   *    router:ControllerConfig || ActionConfig
   * }*/
  constructor(routers) {
    super()
    Object.keys(routers).forEach((key) => {
      if (
        routers[key] instanceof ControllerConfig ||
        routers[key] instanceof ActionConfig
      ) {
        this[key] = routers[key];
        this[key].parent = this;
      }
    });
  }
}
