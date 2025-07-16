class ButterElement {
    constructor() {
        ButterElementRegistry.getInstance().registerElement(this);
    }

    update() {}
    draw() {}
}

class ButterElementRegistry {
    static _instance = null;
    static getInstance() {
        if (!ButterElementRegistry._instance) ButterElementRegistry._instance = new ButterElementRegistry();
        return ButterElementRegistry._instance;
    }

    constructor() {
        this.elements = [];
    }

    registerElement(element) {
        this.elements.push(element);
    }

    unregisterElement(element) {
        this.elements = this.elements.filter(el => el !== element);
    }

    getElements() {
        return this.elements;
    }

    updateAll() {
        this.elements.forEach(element => {
            element.update();
        });
    }

    drawAll() {
        this.elements.forEach(element => {
            element.draw();
        });
    }
}

class ButterClickable extends ButterElement {
    constructor(position) {
        super();
        this.position = position;
        ButterClickableRegistry.getInstance().registerClickable(this);
    }

    isHovered() {}
    onPress() {}
    onRelease() {}
    onClick() {}
}

class ButterClickableRegistry {
    static _instance = null;
    static getInstance() {
        if (!ButterClickableRegistry._instance) ButterClickableRegistry._instance = new ButterClickableRegistry();
        return ButterClickableRegistry._instance;
    }

    constructor() {
        this.clickables = [];
    }

    registerClickable(clickable) {
        this.clickables.push(clickable);
    }

    unregisterClickable(clickable) {
        this.clickables = this.clickables.filter(el => el !== clickable);
    }

    getClickables() {
        return this.clickables;
    }

    mousePressed() {
        this.clickables.forEach(clickable => {
            clickable.onPress();
        });
    }

    mouseReleased() {
        this.clickables.forEach(clickable => {
            clickable.onRelease();
        });
    }

    mouseClicked() {
        this.clickables.forEach(clickable => {
            clickable.onClick();
        });
    }
}