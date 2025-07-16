class ButterDraggable extends ButterClickable {
    constructor(position) {
        super(position);
        this.dragging = false;
    }

    onPress() {
        if(this.isHovered()) this.dragging = true;
    }

    onRelease() {
        this.dragging = false;
    }

    update() {
        if(this.dragging) {
            const mouse = createVector(constrain(mouse.x, 0, width), constrain(mouse.y, 0, height));
            this.position = mouse.copy();
        }
    }
}