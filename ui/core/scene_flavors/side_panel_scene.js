class SidePaneScene extends PanelScene {
    constructor(title = "ButterUI Panels", background = null, snapping = false, content = createDiv("").addClass("sidebar-content")) {
        super(title, background, snapping)
        this.content = content
        this.sidebarExpanded = true;
    }

    constructDOM() {
        let existingDom = super.constructDOM()
        let sidebar = createDiv('').addClass('sidebar')
        let titlebar = create_TITLEBAR("Sidebar", null, {icon: ButtonIcon.ARROW_BACK, action: () => {
            this.collapse()
        }}).parent(sidebar)
        sidebar.child(this.content)
        existingDom.sidebar = sidebar
        return existingDom;
    }

    collapse() {
        this.DOMReferences.sidebar.style("width", "0vw")
        this.DOMReferences.sidebar.child()[0].children[1].style = "display: none;"
        this.DOMReferences.sidebar.child()[0].children[2].style = "transform: rotate(180deg);"
        this.DOMReferences.sidebar.child()[0].children[2].addEventListener("mousedown", e => {
            this.expand()
        }) 
        this.sidebarExpanded = false;
    }

    expand() {
        this.DOMReferences.sidebar.style("width", "20vw")
        this.DOMReferences.sidebar.child()[0].children[1].style = "display: flex;"
        this.DOMReferences.sidebar.child()[0].children[2].style = "transform: rotate(0);"
        this.DOMReferences.sidebar.child()[0].children[2].addEventListener("mousedown", e => {
            this.collapse()
        })

        for(let panel of this.panels) {
            this.panelMap
        }

        this.sidebarExpanded = true;
    }

    populatePanelMap() {
        super.populatePanelMap()
        if(!this.sidebarExpanded) return;
        for(let x = 0; x < 16; x++) {
            for(let y = 0; y < this.background.graphic.height; y += this.background.spacing) {
                for(let i in this.panelMap[x]) { this.panelMap[x][i] = true }
            }
        }
    }

    update() {
        super.update();
        print(this.sidebarExpanded)
        if(!this.sidebarExpanded) return;
        for(let panel of this.panels) {
            panel.clampLower(20, 0)
        }
    }
}