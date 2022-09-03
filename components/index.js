export const NuxtLogo = () => import('../../components/NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = () => import('../../components/Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))
export const Category = () => import('../../components/category/Index.vue' /* webpackChunkName: "components/category" */).then(c => wrapFunctional(c.default || c))
export const Login = () => import('../../components/login/Index.vue' /* webpackChunkName: "components/login" */).then(c => wrapFunctional(c.default || c))
export const NewsCount = () => import('../../components/news/Count.vue' /* webpackChunkName: "components/news-count" */).then(c => wrapFunctional(c.default || c))
export const News = () => import('../../components/news/Index.vue' /* webpackChunkName: "components/news" */).then(c => wrapFunctional(c.default || c))
export const NewsSearch = () => import('../../components/news/Search.vue' /* webpackChunkName: "components/news-search" */).then(c => wrapFunctional(c.default || c))
export const UiAccordion = () => import('../../components/ui/Accordion.vue' /* webpackChunkName: "components/ui-accordion" */).then(c => wrapFunctional(c.default || c))
export const UiButton = () => import('../../components/ui/Button.vue' /* webpackChunkName: "components/ui-button" */).then(c => wrapFunctional(c.default || c))
export const UiCard = () => import('../../components/ui/Card.vue' /* webpackChunkName: "components/ui-card" */).then(c => wrapFunctional(c.default || c))
export const UiDataTable = () => import('../../components/ui/DataTable.vue' /* webpackChunkName: "components/ui-data-table" */).then(c => wrapFunctional(c.default || c))
export const UiDropDownList = () => import('../../components/ui/DropDownList.vue' /* webpackChunkName: "components/ui-drop-down-list" */).then(c => wrapFunctional(c.default || c))
export const UiPassword = () => import('../../components/ui/Password.vue' /* webpackChunkName: "components/ui-password" */).then(c => wrapFunctional(c.default || c))
export const UiProfileIcon = () => import('../../components/ui/ProfileIcon.vue' /* webpackChunkName: "components/ui-profile-icon" */).then(c => wrapFunctional(c.default || c))
export const UiTextField = () => import('../../components/ui/TextField.vue' /* webpackChunkName: "components/ui-text-field" */).then(c => wrapFunctional(c.default || c))
export const UiTooltip = () => import('../../components/ui/Tooltip.vue' /* webpackChunkName: "components/ui-tooltip" */).then(c => wrapFunctional(c.default || c))
export const UiTree = () => import('../../components/ui/Tree.vue' /* webpackChunkName: "components/ui-tree" */).then(c => wrapFunctional(c.default || c))
export const Writing = () => import('../../components/writing/Index.vue' /* webpackChunkName: "components/writing" */).then(c => wrapFunctional(c.default || c))
export const ConsoleLogin = () => import('../../components/console/login/Index.vue' /* webpackChunkName: "components/console-login" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
