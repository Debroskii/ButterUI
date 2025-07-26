class ContextMenu {
    static position = null;
    static DOMReference = null;
    static isOpen = false;
    static menuItems = [];

    static init() {
        this.position = createVector(-100000, -100000);
        this.DOMReference = createDiv('').addClass('context-menu');
        this.DOMReference.hide();
        this.DOMReference.mousePressed(() => {
            this.close();
        });
    }

    static close() {
        this.DOMReference.hide();
        this.isOpen = false;
        this.menuItems = [];
        this.position.set(-100000, -100000);
    }

    static open(x, y, contextItems) {
        this.position.set(x, y);
        this.DOMReference.position(x, y);
        this.DOMReference.show();
        this.isOpen = true;
        this.menuItems = contextItems;
        
        // Clear existing items
        this.DOMReference.html('');
        for(let item of this.menuItems) {
            const itemDiv = item.createDOM();
            this.DOMReference.child(itemDiv);
        }
    }

    static testMousePressedForClosed() {
        if(!this.isOpen) return;
        if(mouseX < this.position.x || mouseX > this.position.x + this.DOMReference.width ||
           mouseY < this.position.y || mouseY > this.position.y + this.DOMReference.height) {
            this.close();
        }
    }
}

class ContextMenuItem {
    constructor(label, action) {
        this.label = label;
        this.action = action;
    }

    createDOM() {
        const itemDiv = createDiv(this.label).addClass('context-menu-item');
        itemDiv.mousePressed(() => {
            this.action();
            ContextMenu.close();
        });
        return itemDiv;
    }
}

class BoundContextItem {
    constructor(label, action, bindingText) {
        this.label = label;
        this.action = action;
        this.bindingText = bindingText;
    }

    createDOM() {
        const itemDiv = createDiv(`${this.label} (${this.bindingText})`).addClass('context-menu-item');
        itemDiv.mousePressed(() => {
            this.action();
            ContextMenu.close();
        });
        return itemDiv;
    }
}

function determineContext() {
    if(SCENE instanceof PanelScene) {
        return PanelSceneContext;
    } else {
        return DefaultContext;
    }
}

const DefaultContext = Object.freeze([]);
const PanelSceneContext = Object.freeze([
    new ContextMenuItem("New Panel", () => {
        SCENE.addPanel(new Panel(SCENE.findNextPosition(), createVector(convertPxX(200), convertPxX(500)), "Test Registry Panel", reg.constructContent()));
        SCENE.smartOrganize();
    }),
    new ContextMenuItem("Open Popup", () => {
        new ConfirmPopup()
    }),
    new ContextMenuItem("Show Cookies", () => {
        print(document.cookie)
    }),
    new ContextMenuItem("Show Preferences", () => {
        print(Preferences.getInstance().entries)
    }),
    new ContextMenuItem("Reset Cookie", () => {
        clearAllCookies()
    }),
    new ContextMenuItem("Organize Panels", () => {
        SCENE.smartOrganize();
    }),
    new ContextMenuItem("Preferences", () => {
        Preferences.getInstance().openPopup()
    })
])