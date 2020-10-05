/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import "./src/global.css"

// Disabled because it currently breaks due to gatsby's changes.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const shouldUpdateScroll = ({
//   prevRouterProps: { location },
//   routerProps,
//   getSavedScrollPosition,
// }) => {
//   // =============== What is all of this??? ==============================
//   // This is a simple hack to preserve scroll position for some navigation links
//   // (such as link for going back and bottom navigation link).
//
//   // Get scroll position of the current page the user in
//   const lastPosition = getSavedScrollPosition(location)
//   // undocumented internals.
//   window.sessionStorage.setItem(
//     `@@scroll|${location.pathname}`,
//     JSON.stringify(lastPosition)
//   )
//   console.log(`@@scroll|${location.pathname}`)
//
//   // If state.preserveScroll is true, we'll use the last known
//   // scroll position of the given pathname, and scroll to it.
//   if (routerProps.location.state?.preserveScroll) {
//     const currentPosition = window.sessionStorage.getItem(
//       `@@scroll|${routerProps.location.pathname}`
//     )
//     const position = JSON.parse(currentPosition)
//     window.scrollTo(...(position || [0, 0]))
//
//     console.log(currentPosition)
//     console.log(routerProps.location.pathname)
//     return false
//   }
//
//   return true
// }

export const onServiceWorkerUpdateReady = () => {
  if (window.updateAvailable) {
    window.updateAvailable()
  }
}

export const onClientEntry = () => {
  window.analytics.on("page", function (event, properties, options) {
    const breadcrumb = {
      category: "page",
      level: "info",
      data: options,
    }
    window.Sentry.addBreadcrumb(breadcrumb)
  })

  window.analytics.on("track", function (event, properties, options) {
    const breadcrumb = {
      category: "track",
      level: "info",
      data: properties,
    }
    window.Sentry.addBreadcrumb(breadcrumb)
  })

  window.analytics.on("identify", function (event, properties, options) {
    const user = {
      id: event,
      username: properties.name,
      email: properties.email,
    }
    Sentry.setUser(user)
  })
}
