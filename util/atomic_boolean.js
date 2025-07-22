class AtomicBoolean {
    constructor(valueSupplier, onChange = () => {}, onTrue = () => {}, onFalse = () => {}) {
        this.valueSupplier = valueSupplier;
        this.previousValue = valueSupplier();
        this.onChange = onChange;
        this.onTrue = onTrue;
        this.onFalse = onFalse;
    }

    get() {
        return this.valueSupplier();
    }

    update() {
        const currentValue = this.valueSupplier();
        if (currentValue !== this.previousValue) {
            this.onChange(currentValue, this.previousValue);
            this.previousValue = currentValue;

            if (currentValue) {
                this.onTrue();
            } else {
                this.onFalse();
            }
        }
    }
}