import type { RouterConfig } from "@nuxt/schema"

// Add padding or margin top when scrolling to specific element.
// Source: https://stackoverflow.com/a/76113064/19193225
export default <RouterConfig>{
  scrollBehavior(to) {
    if (to && to.hash) {
      return {
        el: to.hash,
        top: 128,
        behavior: "smooth",
      }
    } else {
      return { top: 0, left: 0, behavior: "smooth" }
    }
  },
}
