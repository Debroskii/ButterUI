class PanelScene extends CoreScene {
    constructor(title = "ButterUI Panels", background = null, snapping = false) {
        super(title, background);
        this.snapping = snapping;
        this.panels = [];
        this.panelMap = [];
    }

    addPanel(panel) {
        if (panel instanceof Panel) {
            this.panels.push(panel.attachSnappingInfo({snapping: this.snapping, background: this.background}));
        } else {
            throw new Error("Only instances of a Panel can be added.");
        }
    }

    update(dt) {
        this.panels.forEach(panel => panel.update(dt, {snapping: this.snapping, background: this.background}));
        this.populatePanelMap();
    }

    smartOrganize() {
        if(!this.snapping) return;
        for(let panel of this.panels) {
            let position = createVector(100000 + random(0, 1000), 100000 + random(0, 1000))
            panel.setPosition(position.x, position.y)
        }

        setTimeout(() => {
            for(let panel of this.panels) {
                let nextPosition = this.findNextPosition();
                panel.setPosition(nextPosition.x, nextPosition.y);
                populatePanelMap();
            }
        }, 10)
    }

    populatePanelMap() {
        this.panelMap = [];
        for(let x = 0; x < this.background.graphic.width; x += this.background.spacing) {
            this.panelMap.push([]);
            for(let y = 0; y < this.background.graphic.height; y += this.background.spacing) {
                this.panelMap[x/this.background.spacing].push(this.isPanel(x, y));
            }
        }
    }

    isPanel(x, y) {
        for(let panel of this.panels) {
            return x >= panel.position.x && x <= panel.position.x + convertVwX(panel.dimensions.x) && y >= panel.position.y && y <= panel.position.y + convertVwX(panel.dimensions.y);
        }
        return false;
    }

    findNextPosition() {
        for(let y = 2; y < this.panelMap[0].length; y++) {
            for(let x = 1; x < this.panelMap.length; x++) {
                if(!this.panelMap[x][y]) {
                    return createVector(x * this.background.spacing, y * this.background.spacing);
                }
            }
        }
    }

    showPanelMap() {
        for(let x = 0; x < this.panelMap.length; x++) {
            for(let y = 0; y < this.panelMap[x].length; y++) {
                if(this.panelMap[x][y]) {
                    fill(255, 0, 0, 100);
                    rect(x * this.background.spacing, y * this.background.spacing, this.background.spacing, this.background.spacing);
                }
            }
        }
    }
}