import "./style.css"

const app = document.getElementById("app")

const routes = {
  "/": {
    page: () => import("./pages/home.html?raw"),
    js: () => import("./pages-js/home.js"),
    css: () => import("./pages-css/home.css")
  },
  "/about": {
    page: () => import("./pages/about.html?raw"),
    js: () => import("./pages-js/about.js"),
    css: () => import("./pages-css/about.css")
  },
  "/product": {
    page: () => import("./pages/product.html?raw"),
    js: () => import("./pages-js/product.js"),
    css: () => import("./pages-css/product.css")
  },
  "/test" :{
    page: () => import("./pages/test.html?raw"),
    js: () => import("./pages-js/test.js"),
    css: () => import("./pages-css/test.css")
  },
  "/404": {
    page: () => import("./pages/404.html?raw"),
    js: () => import("./pages-js/404.js"),
    css: () => import("./pages-css/404.css")
  }
}

async function loadPage(path) {
  const route = routes[path]

  if (!route) {
    navigate("/404")
    return
  }
  

  // HTML
  const html = await route.page()
  app.innerHTML = html.default

  // CSS
  if (route.css) await route.css()

  // JS
  if (route.js) {
    const module = await route.js()
    module.init?.()
    module[`init${path === "/" ? "Home" : path.slice(1)}`]?.()
  }
}

function navigate(path) {
  history.pushState(null, "", path)
  loadPage(path)
}

document.addEventListener("click", e => {
  const link = e.target.closest("[data-link]")
  if (!link) return
  e.preventDefault()
  navigate(link.getAttribute("href"))
})

window.addEventListener("popstate", () => {
  loadPage(location.pathname)
})

loadPage(location.pathname)
