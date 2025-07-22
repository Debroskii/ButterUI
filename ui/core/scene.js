class Scene {
    constructor(background = null) {
        SceneRegistry.register(this);
        this.background = background;
    }

    update(dt) {
        if(this.background) this.background.update();
    }
    draw() {
        if(this.background) image(this.background.graphic, 0, 0)
    }
    handleInput(inputType) {
        switch (inputType) {
            case SceneInputType.MOUSE_PRESSED:
                this.onMousePressed();
                break;
            case SceneInputType.MOUSE_RELEASED:
                this.onMouseReleased();
                break;
            case SceneInputType.MOUSE_CLICKED:
                this.onMouseClicked();
                break;
            default:
                console.warn(`Unknown input type: ${inputType}`);
        }
    }
    onMousePressed() {}
    onMouseReleased() {}
    onMouseClicked() {}
}

class SceneRegistry {
    static scenes = [];

    static register(scene) {
        if (!(scene instanceof Scene)) {
            throw new Error("Only instances of Scene can be registered.");
        }
        SceneRegistry.scenes.push(scene);
    }

    static update(dt) {
        SceneRegistry.scenes.forEach(scene => scene.update(dt));
    }

    static draw() {
        SceneRegistry.scenes.forEach(scene => scene.draw());
    }

    static handleInput(inputType) {
        SceneRegistry.scenes.forEach(scene => scene.handleInput(inputType));
    }
}

const SceneInputType = Object.freeze({
    MOUSE_PRESSED: 'mousePressed',
    MOUSE_RELEASED: 'mouseReleased',
    MOUSE_CLICKED: 'mouseClicked'   
})