class SinglePaneScene extends Scene {
    constructor(paneSize = createVector(convertPxX(600), convertPxX(800)), title = "", content = createDiv('').addClass('single-pane-content'), background = null, previousScene = null) {
        super(background);
        this.size = paneSize;
        this.title = title;
        this.content = content;
        this.DOMReferences = this.constructDOM();
        this.previousScene = null;
    }

    constructDOM() {
        const root = createDiv('').id(`single-pane-scene`).addClass('single-pane-scene');
        root.style('width', `${this.size.x}vw`);
        root.style('height', `${this.size.y}vw`);

        const titleBar = create_TITLEBAR(this.title, {icon: ButtonIcon.ARROW_BACK, action: () => {if(this.previousScene) SCENE = this.previousScene}});
        titleBar.parent(root);

        if (this.content) {
            this.content.parent(root);
        }

        return { root, titleBar };
    }
}