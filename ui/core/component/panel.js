class Panel {
    constructor(position, dimensions = null, title = "Untitled", content = createDiv('').addClass('panel-content'), locked = false) {
        this.id = crypto.randomUUID();
        this.position = position;
        this.dimensions = dimensions || createVector(convertPxX(200), convertPxX(400));
        this.dragging = false;
        this.dragOffset = createVector(0, 0);
        this.visible = true;
        this.content = content;
        this.title = title;
        this.DOMReferences = this.constructDOM(this);
        this.snappingInfo = {snapping: false, background: null};
        this.locked = locked;
    }

    constructDOM() {
        const dom = {
            root: createDiv('').id(`panel-${this.id}`).addClass('panel'),
            titleBar: create_PANEL_TITLEBAR(this.title, true, () => this.dispose()),
            content: this.content
        };

        dom.root.style('top', `${convertPxY(this.position.y)}vw`);
        dom.root.style('left', `${convertPxX(this.position.x)}vw`);
        dom.root.style('width', `${this.dimensions.x}vw`);
        dom.root.style('height', `${this.dimensions.y}vw`);

        dom.root.child(dom.titleBar);
        dom.root.child(dom.content);

        dom.titleBar.mousePressed(() => {if(this.locked) return; this.dragging = true; this.dragOffset = createVector(mouseX - this.position.x, winMouseY - this.position.y);});
        dom.root.mouseReleased(() => {
            this.dragging = false;
            if(this.snappingInfo.snapping) {
                const snapX = constrain(Math.round(this.position.x / this.snappingInfo.background.spacing) * this.snappingInfo.background.spacing, 0, windowWidth - convertVwX(this.dimensions.x));
                const snapY = constrain(Math.round(this.position.y / this.snappingInfo.background.spacing) * this.snappingInfo.background.spacing, convertVwX(2), windowHeight - convertVwX(this.dimensions.y));
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

    dispose(list = SCENE.panels) {
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
        }
        if(mouseX > this.position.x && mouseX < this.position.x + convertVwX(1.5) && mouseY > this.position.y && mouseY < this.position.y + convertVwX(1.5)) {
            this.DOMReferences.root.style("box-shadow", "var(--panel-close-outline)");
        } else {
            this.DOMReferences.root.style("box-shadow", "none");
        }
    }

    clampLower(x, y) {
        if (this.position.x < convertVwX(x)) {
            this.position.x = convertVwX(x);
            this.DOMReferences.root.style('left', `${x}vw`);
        }
        if (this.position.y < convertVwX(y)) {
            this.position.y = convertVwX(x);
            this.DOMReferences.root.style('top', `${y}vw`);
        }
        return this;
    }
}