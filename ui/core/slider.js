class ButterSlider {
    constructor(position, min = 0, max = 1, defaltValue = 0.5, step = 0.1, allowCustomValue = false) {
        this.position = position;
        this.min = min;
        this.max = max;
        this.value = defaltValue; 
        this.step = step;
        this.sliderReference = createSlider(this.min, this.max, this.value, this.step)
            .addClass("butter-slider")
            .style("top", `${this.position.y}px`)
            .style("left", `${this.position.x}px`)
            .mouseMoved(() => this.updateValue());
        if(allowCustomValue) {
            this.textInputReference = createInput(this.value.toString())
                .addClass("butter-slider-input")
                .style("top", `${this.position.y}px`)
                .style("left", `${this.position.x + 150}px`)
                .changed(() => this.updateCustomValue());
        }
    }

    updateValue() {
        if(!mouseIsPressed) return
        this.value = this.sliderReference.value();
        if(this.textInputReference) this.textInputReference.value(this.value.toString())
        console.log(this.value)
    }

    updateCustomValue() {
        const customValue = parseFloat(this.textInputReference.value());
        if(!isNaN(customValue)) {
            this.value = customValue;
            this.sliderReference.value(this.value);
        } else {
            this.textInputReference.value(this.value.toString());
        }
        console.log(this.value)

    }
}