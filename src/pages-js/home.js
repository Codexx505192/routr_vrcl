export function initHome() {
    const btn = document.getElementById("homeBtn")
    if (btn) {
      btn.onclick = () => alert("Home работает!")
    }
  }
  

  console.log("Home работает!");