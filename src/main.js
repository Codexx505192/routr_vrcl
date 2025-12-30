import "./style.css"

const app = document.getElementById("app")

const routes = {
  "/": () => import("./pages/home.html?raw"),
  "/about": () => import("./pages/about.html?raw"),
  "/product": () => import("./pages/product.html?raw")
}

async function loadPage(path) {
  const loader = routes[path] || (() =>
    import("./pages/notfound.html?raw")
  )

  const page = await loader()
  app.innerHTML = page.default
}

function navigate(path) {
  history.pushState(null, "", path)
  loadPage(path)
}

// Клики по ссылкам
document.addEventListener("click", e => {
  const link = e.target.closest("[data-link]")
  if (!link) return

  e.preventDefault()
  navigate(link.getAttribute("href"))
})

// Назад / вперёд
window.addEventListener("popstate", () => {
  loadPage(location.pathname)
})

// Первая загрузка
loadPage(location.pathname)
