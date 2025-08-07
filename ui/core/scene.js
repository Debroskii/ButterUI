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

class Butter {
    static init() {
        let txt = `
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Limelight&display=swap');

            :root {
            --outline: var(--border-width) solid var(--border-color);
            --panel-close-outline: inset 0 0 0vw var(--border-width) var(--negative-color);
            --font: monospace, sans-serif;
            --heading-font: monospace, sans-serif;
            }

            html, body {
            margin: 0;
            padding: 0;
            overflow-y: hidden;
            background-color: var(--background);
            }

            * {
            font-family: var(--font);
            font-weight: 400;
            }

            .material-symbols-rounded {
            font-variation-settings:
                'FILL' 0,
                'wght' 700,
                'GRAD' -25,
                'opsz' 24
            }

            canvas {
            display: block;
            }

            .panel {
            position: absolute !important;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            border: var(--outline);
            border-radius: var(--border-radius);
            backdrop-filter: var(--backdrop-blur);
            transition: box-shadow 0.1s ease-in-out;
            }

            .panel-title-bar {
            width: inherit;
            height: 1.5vw;
            display: flex;
            align-items: center;
            border-bottom: var(--outline);
            }

            .registry-container {
            width: inherit !important;
            overflow-y: scroll;
            overflow-x: hidden;
            }

            .registry-container::-webkit-scrollbar {
            display: none;
            }

            .icon-button {
            width: 1.5vw;
            height: 1.5vw;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            user-select: none;
            }

            .button-icon {
            width: 1.3vw;
            height: 1.3vw;
            font-size: 1.3vw !important;
            text-align: center;
            color: var(--text-color);
            user-select: none;
            }

            .panel-title {
            font-family: var(--heading-font);
            color: var(--text-color);
            font-size: 0.8vw;
            user-select: none;
            margin-left: 0.5vw;
            }

            .core-scene-bar {
            z-index: 1;
            backdrop-filter: var(--backdrop-blur);
            width: 100vw;
            height: 2vw;
            border-bottom: var(--outline);
            display: flex;
            align-items: center;
            justify-content: center;
            }

            .core-scene-title {
            color: var(--text-color);
            font-family: var(--heading-font);
            font-size: 1vw;
            font-weight: 600;
            user-select: none;
            }

            .context-menu {
            /* background: white; */
            display: flex;
            flex-direction: column;
            border-radius: var(--border-radius);
            border: var(--outline);
            color: var(--text-color);
            font-size: 0.6vw;
            z-index: 2;
            backdrop-filter: var(--backdrop-blur);
            }

            .context-menu-item {
            background: none;
            padding: 0.5vw;
            transition: all 0.1s ease-in-out;
            user-select: none;
            }

            .context-menu-item:hover {
            background: var(--surface-color);
            user-select: none;
            }

            .value-label {
            color: var(--text-color);
            font-size: 0.62vw;
            margin-left: 0.75vw;
            }

            .slider-min-label {
            color: var(--secondary-text-color);
            font-size: 0.55vw;
            }

            .slider-max-label {
            color: var(--secondary-text-color);
            font-size: 0.55vw;
            }

            .slider {
            -webkit-appearance: none;
            appearance: none;
            background: var(--text-color);
            border-radius: 3vw;
            height: 0.3vw;
            width: 3vw;
            margin: 0.5vw;
            }

            .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 0.6vw;
            height: 0.6vw;
            border-radius: 50%;
            background: var(--primary-color);
            cursor: pointer;
            }

            .entry-container {
            display: flex;
            flex-direction: row;
            width: inherit;
            height: 2vw;
            justify-content: space-between;
            align-items: center;
            }

            .slider-input-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            height: 2vw;
            margin-right: 0.75vw;
            }

            .checkbox {
            width: 1vw;
            height: 1vw;
            padding: 0vw;
            margin-right: 0.75vw;
            accent-color: var(--primary-color);
            }

            .text-field {
            width: 4vw;
            height: 1vw;
            background: none;
            border: none;
            color: var(--text-color);
            backdrop-filter: var(--backdrop-blur);
            overflow-x: scroll;
            margin-right: 0.75vw;
            font-size: 0.7vw;
            }

            .number-field {
            width: 4vw;
            height: 1vw;
            background: none;
            border: none;
            color: var(--text-color);
            backdrop-filter: var(--backdrop-blur);
            overflow-x: scroll;
            margin-right: 0.75vw;
            font-size: 0.7vw;
            }

            .color-picker {
            margin-right: 0.75vw;
            width: 2vw;
            height: 2vw;
            background: none;
            }

            .registry-label-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: inherit;
            height: 2vw;
            justify-content: center;
            }

            .registry-label {
            color: var(--text-color);
            font-size: 0.9vw;
            font-weight: 600;
            margin-top: 0.5vw;
            }

            .single-pane-scene {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            backdrop-filter: var(--backdrop-blur);  
            border: var(--outline);
            border-radius: var(--border-radius);
            }

            .title-bar {
            height: 2vw;
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
            border-bottom: var(--outline);
            }

            .title-text {
            color: var(--text-color);
            font-family: var(--heading-font);
            font-size: 1vw;
            font-weight: 600;
            }

            .title-bar .icon-button {
            margin-left: 0.3vw;
            margin-right: 0.3vw;
            }

            .popup-pane {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            backdrop-filter: var(--backdrop-blur);  
            border: var(--outline);
            border-radius: var(--border-radius);
            }

            .popup-pane .title-bar {
            width: 100%;
            height: 2vw;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: var(--outline);
            }

            .popup-pane-filter {
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            backdrop-filter: var(--backdrop-blur);
            position: absolute !important;
            z-index: 1;
            transition: opacity 0.3s ease-in-out;
            }

            .confirm-popup-content {
            display: flex;
            width: inherit;
            height: inherit;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
            color: var(--text-color);
            font-size: 0.8vw;
            overflow-x: hidden;
            overflow-y: scroll;
            }

            .confirm-popup-content::-webkit-scrollbar {
            display: none;
            }

            .confirm-popup-buttons {
            display: flex;
            width: inherit;
            height: 3vw;
            align-items: center;
            justify-content: space-between;
            }

            .confirm-popup-buttons button {
            margin-left: 2vw;
            margin-right: 2vw;
            width: 8vw;
            height: 2vw;
            background: none;
            color: var(--text-color);
            border: var(--outline);
            border-radius: var(--border-radius);
            transition: background 0.2s ease-in-out;
            }

            .cancel-button:hover {
            background: var(--negative-color) !important;
            }

            .confirm-button:hover {
            background: var(--positive-color) !important;
            }

            .preferences-button-container {
            width: inherit;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-top: 1vw;
            }

            .preferences-button {
            padding: 0.5vw;
            border: var(--outline);
            border-radius: var(--border-radius);
            background: none;
            color: var(--text-color);
            font-size: 0.8vw;
            transition: all 0.1s ease-in-out;
            margin: 0.5vw;
            }

            .preferences-button:hover {
            background: var(--text-color);
            color: var(--background);
            }    
        `

        let styleElement = document.createElement("style")
        styleElement.textContent = txt
        document.head.appendChild(styleElement)
    }
}