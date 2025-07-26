class RegistryEntry {
    constructor(key, value, label = "", type = RegistryEntryElementType.TEXT, editable = true, args = {}) {
        this.key = key;
        this.value = value;
        this.label = label;
        this.type = type;
        this.editable = editable;
        this.arguments = args;
    }
}

class Registry extends RegistryEntry {
    constructor(id, defaultEntries = new Map()) {
        super(id, defaultEntries, id, RegistryEntryElementType.REGISTRY)
        this.id = id;
        this.entries = defaultEntries;
        this.value = this.entries;
        GlobalRegistry.registries.set(id, this);
    }

    withTextField(key, value, label = "", editable = true) {
        const entry = new RegistryEntry(key, value, label, RegistryEntryElementType.TEXT, editable);
        this.addEntry(entry);
        return this;
    }

    withNumberField(key, value, label = "", editable = true) {
        const entry = new RegistryEntry(key, value, label, RegistryEntryElementType.NUMBER, editable);
        this.addEntry(entry);
        return this;
    }

    withSlider(key, value, label = "", editable = true, args = {min: 0, max: 100, step: 1}) {
        const entry = new RegistryEntry(key, value, label, RegistryEntryElementType.SLIDER, editable, args);
        this.addEntry(entry);
        return this;
    }

    withCheckbox(key, value, label = "", editable = true) {
        const entry = new RegistryEntry(key, value, label, RegistryEntryElementType.BOOLEAN, editable);
        this.addEntry(entry);
        return this;
    }

    withColor(key, value, label = "", editable = true) {
        const entry = new RegistryEntry(key, value, label, RegistryEntryElementType.COLOR, editable);
        this.addEntry(entry);
        return this;
    }

    withRegistry(registry) {
        if(!(registry instanceof Registry)) {
            throw new Error("Argument must be an instance of Registry.");
        }
        this.addEntry(registry);
        return this;
    }

    withSelect(key, value, label = "", editable = true, options = []) {
        const entry = new RegistryEntry(key, value, label, RegistryEntryElementType.SELECT, editable, {options: options});
        this.addEntry(entry);
        return this;
    }

    withDate(key, value, label = "", editable = true) {
        const entry = new RegistryEntry(key, value, label, RegistryEntryElementType.DATE, editable);
        this.addEntry(entry);
        return this;
    }

    withTime(key, value, label = "", editable = true) {
        const entry = new RegistryEntry(key, value, label, RegistryEntryElementType.TIME, editable);
        this.addEntry(entry);
        return this;
    }

    withDateTime(key, value, label = "", editable = true) {
        const entry = new RegistryEntry(key, value, label, RegistryEntryElementType.DATETIME, editable);
        this.addEntry(entry);
        return this;
    }

    withFile(key, value, label = "", editable = true) {
        const entry = new RegistryEntry(key, value, label, RegistryEntryElementType.FILE, editable);
        this.addEntry(entry);
        return this;
    }

    constructContent() {
        return RegistryContentFactory.createRegistry(this, false);
    }

    addEntry(entry) {
        if(this.hasEntry(key)) return
        this.entries.set(entry.key, entry);
    }

    modifyEntry(entry) {
        if(!this.hasEntry(key)) return
        this.entries.set(entry.key, entry);
    }

    getEntry(key) {
        if(!this.hasEntry(key)) {
            throw new Error(`Entry with key ${key} does not exist in registry ${this.id}.`);
        }
        return this.entries.get(key);
    }

    removeEntry(key) {
        if(!this.hasEntry()) return
        this.entries.delete(key);
    }

    hasEntry(key) {
        return this.entries.has(key);
    }
}

class GlobalRegistry {
    static registries = new Map();

    static removeRegistry(id) {
        if(!GlobalRegistry.hasRegistry(id)) {
            throw new Error(`Registry with id ${id} does not exist.`);
        }
        GlobalRegistry.registries.delete(id);
    }

    static getRegistry(id) {
        if(!GlobalRegistry.hasRegistry(id)) {
            throw new Error(`Registry with id ${id} does not exist.`);
        }
        return GlobalRegistry.registries.get(id);
    }

    static hasRegistry(id) {
        return GlobalRegistry.registries.has(id);
    }
}

class RegistryContentFactory {
    static createElement(regEntry) {
        switch (regEntry.type) {
            case RegistryEntryElementType.TEXT:
                return create_TEXT_FIELD_AND_LABEL(regEntry);
            case RegistryEntryElementType.NUMBER:
                return create_NUMBER_FIELD_AND_LABEL(regEntry);
            case RegistryEntryElementType.SLIDER:
                return create_SLIDER_AND_LABEL(regEntry);
            case RegistryEntryElementType.BOOLEAN:
                return create_CHECKBOX_AND_LABEL(regEntry);
            case RegistryEntryElementType.COLOR:
                return create_COLOR_PICKER_AND_LABEL(regEntry);
            case RegistryEntryElementType.REGISTRY:
                return this.createRegistry(regEntry, true);
            case RegistryEntryElementType.SELECT:
                return create_SELECT_AND_LABEL(regEntry);
            case RegistryEntryElementType.DATE:
                return create_DATE_AND_LABEL(regEntry);
            case RegistryEntryElementType.TIME:
                return create_TIME_AND_LABEL(regEntry);
            case RegistryEntryElementType.DATETIME:
                return create_DATETIME_AND_LABEL(regEntry);
            case RegistryEntryElementType.FILE:
                return create_FILE_AND_LABEL(regEntry);
            default:
                throw new Error(`Unsupported registry entry type: ${regEntry.type}`);
        }
    }

    static createRegistry(registry, nested = false) {
        const container = createDiv('').addClass('registry-container').id(`${registry.id}-container`);
        if(nested) container.child(create_REGISTRY_LABEL(registry));
        registry.entries.forEach((entry) => {
            const element = RegistryContentFactory.createElement(entry);
            element.parent(container);
        });
        return container;
    }
}

const RegistryEntryElementType = Object.freeze({
    REGISTRY: 'registry',
    TEXT: 'text',
    NUMBER: 'number',
    SLIDER: 'slider',
    BOOLEAN: 'boolean',
    SELECT: 'select',
    COLOR: 'color',
    DATE: 'date',
    TIME: 'time',
    DATETIME: 'datetime',
    FILE: 'file'
})