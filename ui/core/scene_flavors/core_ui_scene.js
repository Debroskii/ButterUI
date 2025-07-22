class CoreScene extends Scene {
    constructor(title = "ButterUI", background = null) {
        super(background);
        this.title = title;
        this.DOMReferences = this.constructDOM();
    }

    constructDOM() {
        const dom = {
            bar: createDiv('').addClass('core-scene-bar'),
            title: createP(this.title).addClass('core-scene-title')
        }
        dom.bar.position(0, 0)
        dom.bar.child(dom.title);
        return dom;
    }
}