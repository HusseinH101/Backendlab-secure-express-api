const flash = document.getElementById("flash-message")

if (flash) {
    setTimeout(() => {
        flash.remove()
    }, 5000)
}