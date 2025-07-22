class Panel {
    constructor(position, dimensions = createVector(15, 15), title = "Untitled", content = createDiv('').addClass('panel-content')) {
        this.id = crypto.randomUUID();
        this.position = position;
        this.dimensions = dimensions;
        this.dragging = false;
        this.dragOffset = createVector(0, 0);
        this.visible = true;
        this.content = content;
        this.title = title;
        this.DOMReferences = this.constructDOM(this);
        this.snappingInfo = {snapping: false, background: null};
    }

    constructDOM() {
        const dom = {
            shadow: createDiv('').addClass('panel-snapping-shadow').hide(),
            root: createDiv('').id(`panel-${this.id}`).addClass('panel'),
            titleBar: create_PANEL_TITLEBAR(this.title, true, () => this.dispose()),
            content: this.content
        };

        dom.root.style('top', `${convertPxY(this.position.y)}vw`);
        dom.root.style('left', `${convertPxX(this.position.x)}vw`);
        dom.root.style('width', `${this.dimensions.x}vw`);
        dom.root.style('height', `${this.dimensions.y}vw`);

        dom.shadow.style('top', `${convertPxY(this.position.y)}vw`);
        dom.shadow.style('left', `${convertPxX(this.position.x)}vw`);
        dom.shadow.style('width', `${this.dimensions.x}vw`);
        dom.shadow.style('height', `${this.dimensions.y}vw`);

        dom.root.child(dom.titleBar);
        dom.root.child(dom.content);

        dom.titleBar.mousePressed(() => {this.dragging = true; this.dragOffset = createVector(mouseX - this.position.x, winMouseY - this.position.y);});
        dom.root.mouseReleased(() => {
            this.dragging = false;
            if(this.snappingInfo.snapping) {
                const snapX = Math.round(this.position.x / this.snappingInfo.background.spacing) * this.snappingInfo.background.spacing;
                const snapY = Math.round(this.position.y / this.snappingInfo.background.spacing) * this.snappingInfo.background.spacing;
                this.position.set(snapX, snapY);
                this.DOMReferences.root.style('top', `${convertPxX(snapY)}vw`);
                this.DOMReferences.root.style('left', `${convertPxX(snapX)}vw`);
            }
        });
        
        return dom;
    }

    attachSnappingInfo(snappingInfo) {
        this.snappingInfo = snappingInfo;
        return this;
    }

    setPosition(x, y) {
        this.position.set(x, y);
        this.DOMReferences.root.style('top', `${convertPxX(y)}vw`);
        this.DOMReferences.root.style('left', `${convertPxX(x)}vw`);
        return this;
    }

    dispose(list = [this]) {
        if (this.DOMReferences && this.DOMReferences.root) {
            this.DOMReferences.root.remove();
        }
        this.DOMReferences = null;
        this.content = null;
        list.splice(list.indexOf(this), 1);
        delete this;
    }

    update(dt) {
        if (this.dragging) {
            this.position.x = mouseX - this.dragOffset.x
            this.position.y = mouseY - this.dragOffset.y
            this.DOMReferences.root.style('top', `${convertPxX(constrain(this.position.y, convertVwX(2), windowHeight - convertVwX(this.dimensions.y)))}vw`);
            this.DOMReferences.root.style('left', `${convertPxX(constrain(this.position.x, 0, windowWidth - convertVwX(this.dimensions.x)))}vw`);
            const snapX = Math.round(this.position.x / this.snappingInfo.background.spacing) * this.snappingInfo.background.spacing;
            const snapY = Math.round(this.position.y / this.snappingInfo.background.spacing) * this.snappingInfo.background.spacing;
            this.DOMReferences.shadow.style('top', `${convertPxX(constrain(snapY, convertVwX(2), windowHeight - convertVwX(this.dimensions.y)))}vw`);
            this.DOMReferences.shadow.style('left', `${convertPxX(constrain(snapX, 0, windowWidth - convertVwX(this.dimensions.x)))}vw`);
        }
        
    }
}