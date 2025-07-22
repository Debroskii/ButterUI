class KeybindRegistry {
    static bindings = [new AtomicBoolean(() => false)];

    static register(binding) {
        KeybindRegistry.bindings.push(binding);
    }

    static update() {
        KeybindRegistry.bindings.forEach(binding => {binding.update()});
    }
}