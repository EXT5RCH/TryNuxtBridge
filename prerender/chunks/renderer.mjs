import { withLeadingSlash, joinURL } from 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/ufo/dist/index.mjs';
import { eventHandler, getQuery } from 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/h3/dist/index.mjs';
import { u as useRuntimeConfig } from './nitro/nitro-prerenderer.mjs';
import 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/ohmyfetch/dist/node.mjs';
import 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/destr/dist/index.mjs';
import 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/radix3/dist/index.mjs';
import 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/hookable/dist/index.mjs';
import 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/scule/dist/index.mjs';
import 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/ohash/dist/index.mjs';
import 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/unstorage/dist/index.mjs';
import 'file:///home/runner/work/TryNuxtBridge/TryNuxtBridge/node_modules/unstorage/dist/drivers/fs.mjs';

const defaultShouldPrefetch = () => true;
const defaultShouldPreload = (resource) => ["module", "script", "style"].includes(resource.resourceType || "");
function createRendererContext({ manifest, buildAssetsURL, shouldPrefetch, shouldPreload }) {
  const ctx = {
    shouldPrefetch: shouldPrefetch || defaultShouldPrefetch,
    shouldPreload: shouldPreload || defaultShouldPreload,
    buildAssetsURL: buildAssetsURL || withLeadingSlash,
    manifest: void 0,
    updateManifest,
    _dependencies: void 0,
    _dependencySets: void 0,
    _entrypoints: void 0
  };
  function updateManifest(manifest2) {
    const manifestEntries = Object.entries(manifest2);
    ctx.manifest = manifest2;
    ctx._dependencies = {};
    ctx._dependencySets = {};
    ctx._entrypoints = manifestEntries.filter((e) => e[1].isEntry).map(([module]) => module);
  }
  updateManifest(manifest);
  return ctx;
}
function getModuleDependencies(id, rendererContext) {
  if (rendererContext._dependencies[id]) {
    return rendererContext._dependencies[id];
  }
  const dependencies = {
    scripts: {},
    styles: {},
    preload: {},
    prefetch: {}
  };
  const meta = rendererContext.manifest[id];
  if (!meta) {
    rendererContext._dependencies[id] = dependencies;
    return dependencies;
  }
  if (meta.file) {
    dependencies.scripts[id] = dependencies.preload[id] = rendererContext.manifest[id];
  }
  for (const css of meta.css || []) {
    dependencies.styles[css] = dependencies.preload[css] = dependencies.prefetch[css] = rendererContext.manifest[css];
  }
  for (const asset of meta.assets || []) {
    dependencies.preload[asset] = dependencies.prefetch[asset] = rendererContext.manifest[asset];
  }
  for (const depId of meta.imports || []) {
    const depDeps = getModuleDependencies(depId, rendererContext);
    Object.assign(dependencies.styles, depDeps.styles);
    Object.assign(dependencies.preload, depDeps.preload);
    Object.assign(dependencies.prefetch, depDeps.prefetch);
  }
  const filteredPreload = {};
  for (const id2 in dependencies.preload) {
    const dep = dependencies.preload[id2];
    if (rendererContext.shouldPreload(dep)) {
      filteredPreload[id2] = dep;
    }
  }
  dependencies.preload = filteredPreload;
  rendererContext._dependencies[id] = dependencies;
  return dependencies;
}
function getAllDependencies(ids, rendererContext) {
  const cacheKey = Array.from(ids).join(",");
  if (rendererContext._dependencySets[cacheKey]) {
    return rendererContext._dependencySets[cacheKey];
  }
  const allDeps = {
    scripts: {},
    styles: {},
    preload: {},
    prefetch: {}
  };
  for (const id of ids) {
    const deps = getModuleDependencies(id, rendererContext);
    Object.assign(allDeps.scripts, deps.scripts);
    Object.assign(allDeps.styles, deps.styles);
    Object.assign(allDeps.preload, deps.preload);
    Object.assign(allDeps.prefetch, deps.prefetch);
    for (const dynamicDepId of rendererContext.manifest[id]?.dynamicImports || []) {
      const dynamicDeps = getModuleDependencies(dynamicDepId, rendererContext);
      Object.assign(allDeps.prefetch, dynamicDeps.scripts);
      Object.assign(allDeps.prefetch, dynamicDeps.styles);
      Object.assign(allDeps.prefetch, dynamicDeps.preload);
    }
  }
  const filteredPrefetch = {};
  for (const id in allDeps.prefetch) {
    const dep = allDeps.prefetch[id];
    if (rendererContext.shouldPrefetch(dep)) {
      filteredPrefetch[id] = dep;
    }
  }
  allDeps.prefetch = filteredPrefetch;
  for (const id in allDeps.prefetch) {
    if (id in allDeps.preload) {
      delete allDeps.prefetch[id];
    }
  }
  rendererContext._dependencySets[cacheKey] = allDeps;
  return allDeps;
}
function getRequestDependencies(ssrContext, rendererContext) {
  if (ssrContext._requestDependencies) {
    return ssrContext._requestDependencies;
  }
  const ids = new Set(Array.from([
    ...rendererContext._entrypoints,
    ...ssrContext.modules || ssrContext._registeredComponents || []
  ]));
  const deps = getAllDependencies(ids, rendererContext);
  ssrContext._requestDependencies = deps;
  return deps;
}
function renderStyles(ssrContext, rendererContext) {
  const { styles } = getRequestDependencies(ssrContext, rendererContext);
  return Object.values(styles).map(
    (resource) => renderLinkToString({ rel: "stylesheet", href: rendererContext.buildAssetsURL(resource.file) })
  ).join("");
}
function getResources(ssrContext, rendererContext) {
  return [...getPreloadLinks(ssrContext, rendererContext), ...getPrefetchLinks(ssrContext, rendererContext)];
}
function renderResourceHints(ssrContext, rendererContext) {
  return getResources(ssrContext, rendererContext).map(renderLinkToString).join("");
}
function renderResourceHeaders(ssrContext, rendererContext) {
  return {
    link: getResources(ssrContext, rendererContext).map(renderLinkToHeader).join(", ")
  };
}
function getPreloadLinks(ssrContext, rendererContext) {
  const { preload } = getRequestDependencies(ssrContext, rendererContext);
  return Object.values(preload).map((resource) => ({
    rel: resource.module ? "modulepreload" : "preload",
    as: resource.resourceType,
    type: resource.mimeType ?? null,
    crossorigin: resource.resourceType === "font" || resource.module ? "" : null,
    href: rendererContext.buildAssetsURL(resource.file)
  }));
}
function getPrefetchLinks(ssrContext, rendererContext) {
  const { prefetch } = getRequestDependencies(ssrContext, rendererContext);
  return Object.values(prefetch).map((resource) => ({
    rel: "prefetch" + (resource.resourceType === "style" ? " stylesheet" : ""),
    as: resource.resourceType !== "style" ? resource.resourceType : null,
    type: resource.mimeType ?? null,
    crossorigin: resource.resourceType === "font" || resource.module ? "" : null,
    href: rendererContext.buildAssetsURL(resource.file)
  }));
}
function renderScripts(ssrContext, rendererContext) {
  const { scripts } = getRequestDependencies(ssrContext, rendererContext);
  return Object.values(scripts).map((resource) => renderScriptToString({
    type: resource.module ? "module" : null,
    src: rendererContext.buildAssetsURL(resource.file),
    defer: resource.module ? null : "",
    crossorigin: ""
  })).join("");
}
function createRenderer(createApp, renderOptions) {
  const rendererContext = createRendererContext(renderOptions);
  return {
    rendererContext,
    async renderToString(ssrContext) {
      ssrContext._registeredComponents = ssrContext._registeredComponents || /* @__PURE__ */ new Set();
      const _createApp = await Promise.resolve(createApp).then((r) => r.default || r);
      const app = await _createApp(ssrContext);
      const html = await renderOptions.renderToString(app, ssrContext);
      const wrap = (fn) => () => fn(ssrContext, rendererContext);
      return {
        html,
        renderResourceHeaders: wrap(renderResourceHeaders),
        renderResourceHints: wrap(renderResourceHints),
        renderStyles: wrap(renderStyles),
        renderScripts: wrap(renderScripts)
      };
    }
  };
}
function renderScriptToString(attrs) {
  return `<script${Object.entries(attrs).map(([key, value]) => value === null ? "" : value ? ` ${key}="${value}"` : " " + key).join("")}><\/script>`;
}
function renderLinkToString(attrs) {
  return `<link${Object.entries(attrs).map(([key, value]) => value === null ? "" : value ? ` ${key}="${value}"` : " " + key).join("")}>`;
}
function renderLinkToHeader(attrs) {
  return `<${attrs.href}>${Object.entries(attrs).map(([key, value]) => key === "href" || value === null ? "" : value ? `; ${key}="${value}"` : `; ${key}`).join("")}`;
}

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
const unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
const reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
const escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
const objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  const counts = new Map();
  let logNum = 0;
  function log(message) {
    if (logNum < 100) {
      console.warn(message);
      logNum += 1;
    }
  }
  function walk(thing) {
    if (typeof thing === "function") {
      log(`Cannot stringify a function ${thing.name}`);
      return;
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            if (typeof thing.toJSON !== "function") {
              log(`Cannot stringify arbitrary non-POJOs ${thing.constructor.name}`);
            }
          } else if (Object.getOwnPropertySymbols(thing).length > 0) {
            log(`Cannot stringify POJOs with symbolic keys ${Object.getOwnPropertySymbols(thing).map((symbol) => symbol.toString())}`);
          } else {
            Object.keys(thing).forEach((key) => walk(thing[key]));
          }
      }
    }
  }
  walk(value);
  const names = new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    const type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify(thing.valueOf())})`;
      case "RegExp":
        return thing.toString();
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map((v, i) => i in thing ? stringify(v) : "");
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify).join(",")}])`;
      default:
        if (thing.toJSON) {
          let json = thing.toJSON();
          if (getType(json) === "String") {
            try {
              json = JSON.parse(json);
            } catch (e) {
            }
          }
          return stringify(json);
        }
        if (Object.getPrototypeOf(thing) === null) {
          if (Object.keys(thing).length === 0) {
            return "Object.create(null)";
          }
          return `Object.create(null,{${Object.keys(thing).map((key) => `${safeKey(key)}:{writable:true,enumerable:true,value:${stringify(thing[key])}}`).join(",")}})`;
        }
        return `{${Object.keys(thing).map((key) => `${safeKey(key)}:${stringify(thing[key])}`).join(",")}}`;
    }
  }
  const str = stringify(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (isPrimitive(thing)) {
        values.push(stringifyPrimitive(thing));
        return;
      }
      const type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify(v)}`);
          });
          break;
        case "Set":
          values.push("new Set");
          statements.push(`${name}.${Array.from(thing).map((v) => `add(${stringify(v)})`).join(".")}`);
          break;
        case "Map":
          values.push("new Map");
          statements.push(`${name}.${Array.from(thing).map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`).join(".")}`);
          break;
        default:
          values.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach((key) => {
            statements.push(`${name}${safeProp(key)}=${stringify(thing[key])}`);
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(";")}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function getName(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string") {
    return stringifyString(thing);
  }
  if (thing === void 0) {
    return "void 0";
  }
  if (thing === 0 && 1 / thing < 0) {
    return "-0";
  }
  const str = String(thing);
  if (typeof thing === "number") {
    return str.replace(/^(-)?0\./, "$1.");
  }
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? `.${key}` : `[${escapeUnsafeChars(JSON.stringify(key))}]`;
}
function stringifyString(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}

function buildAssetsURL(...path) {
  return joinURL(publicAssetsURL(), useRuntimeConfig().app.buildAssetsDir, ...path);
}
function publicAssetsURL(...path) {
  const publicBase = useRuntimeConfig().app.cdnURL || useRuntimeConfig().app.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
}

const htmlTemplate = (params) => `<!DOCTYPE html>
<html ${params.HTML_ATTRS}>
  <head ${params.HEAD_ATTRS}>
    ${params.HEAD}
  </head>
  <body ${params.BODY_ATTRS}>
    ${params.APP}
  </body>
</html>
`;

const STATIC_ASSETS_BASE = process.env.NUXT_STATIC_BASE + "/" + process.env.NUXT_STATIC_VERSION;
const PAYLOAD_JS = "/payload.js";
const getClientManifest = () => import('./app/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const options = {
    manifest,
    renderToString: () => '<div id="__nuxt"></div>',
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString2 = (ssrContext) => {
    const config = useRuntimeConfig();
    ssrContext.payload = {
      serverRendered: false,
      config: {
        public: config.public,
        app: config.app
      }
    };
    ssrContext.renderMeta = ssrContext.renderMeta ?? (() => Promise.resolve({}));
    return Promise.resolve(result);
  };
  return { renderToString: renderToString2 };
});
const renderer = eventHandler(async (event) => {
  const ssrError = event.req.url?.startsWith("/__nuxt_error") ? getQuery(event) : null;
  let url = ssrError?.url || event.req.url;
  let isPayloadReq = false;
  if (url.startsWith(STATIC_ASSETS_BASE) && url.endsWith(PAYLOAD_JS)) {
    isPayloadReq = true;
    url = url.slice(STATIC_ASSETS_BASE.length, url.length - PAYLOAD_JS.length) || "/";
  }
  const config = useRuntimeConfig();
  const ssrContext = {
    url,
    event,
    req: event.req,
    res: event.res,
    runtimeConfig: { private: config, public: { public: config.public, app: config.app } },
    noSSR: !!event.req.headers["x-nuxt-no-ssr"],
    error: ssrError,
    redirected: void 0,
    nuxt: void 0,
    payload: void 0
  };
  const renderer = await getSPARenderer() ;
  const rendered = await renderer.renderToString(ssrContext).catch((e) => {
    if (!ssrError) {
      throw e;
    }
  });
  if (!rendered) {
    return;
  }
  if (ssrContext.redirected || event.res.writableEnded) {
    return;
  }
  if (ssrContext.nuxt?.error && !ssrError) {
    throw ssrContext.nuxt.error;
  }
  if (ssrContext.nuxt?.hooks) {
    await ssrContext.nuxt.hooks.callHook("app:rendered");
  }
  ssrContext.nuxt = ssrContext.nuxt || {};
  if (process.env.NUXT_FULL_STATIC) {
    ssrContext.nuxt.staticAssetsBase = STATIC_ASSETS_BASE;
  }
  if (isPayloadReq) {
    const data = renderPayload(ssrContext.nuxt, url);
    event.res.setHeader("Content-Type", "text/javascript;charset=UTF-8");
    return data;
  } else {
    const data = await renderHTML(ssrContext.nuxt, rendered, ssrContext);
    event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
    return data;
  }
});
async function renderHTML(payload, rendered, ssrContext) {
  const state = `<script>window.__NUXT__=${devalue(payload)}<\/script>`;
  rendered.meta = rendered.meta || {};
  if (ssrContext.renderMeta) {
    Object.assign(rendered.meta, await ssrContext.renderMeta());
  }
  return htmlTemplate({
    HTML_ATTRS: rendered.meta.htmlAttrs || "",
    HEAD_ATTRS: rendered.meta.headAttrs || "",
    HEAD: (rendered.meta.headTags || "") + rendered.renderResourceHints() + rendered.renderStyles() + (ssrContext.styles || ""),
    BODY_ATTRS: rendered.meta.bodyAttrs || "",
    BODY_PREPEND: ssrContext.teleports?.body || "",
    APP: (rendered.meta.bodyScriptsPrepend || "") + rendered.html + state + rendered.renderScripts() + (rendered.meta.bodyScripts || "")
  });
}
function renderPayload(payload, url) {
  return `__NUXT_JSONP__("${url}", ${devalue(payload)})`;
}
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}

export { renderer as default };
//# sourceMappingURL=renderer.mjs.map
