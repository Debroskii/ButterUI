class EventHandler {
    static setup() {
        document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            ContextMenu.open(e.clientX, e.clientY, determineContext())
        });
    }
}