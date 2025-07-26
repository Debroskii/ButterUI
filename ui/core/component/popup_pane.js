class PopupPane {
    constructor(paneSize = createVector(convertPxX(400), convertPxX(200)), title = "Untitled", content = createDiv('').addClass('popup-pane-content'), additionalArgs = {}) {
        this.size = paneSize;
        this.title = title;
        this.content = content;
        this.DOMReferences = this.constructDOM(additionalArgs);
    }

    constructDOM(additionalArgs) {
        const rootFilter = createDiv('').addClass('popup-pane-filter');
        const root = createDiv('').id(`popup-pane`).addClass('popup-pane');
        root.style('width', `${this.size.x}vw`);
        root.style('height', `${this.size.y}vw`);

        const titleBar = create_TITLEBAR(this.title, additionalArgs.leading || null, additionalArgs.trailing || null);
        titleBar.parent(root);
        root.parent(rootFilter);

        if (this.content) {
            this.content.parent(root);
        }

        return rootFilter
    }

    close() {
        if (this.DOMReferences) {
            this.DOMReferences.style("opacity", "0%")
            setTimeout(() => { this.DOMReferences.remove() }, 1000)
        }
        delete this;
    }
}