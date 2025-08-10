function create_PANEL_TITLEBAR(title = "Untitled", closeable = true, closeAction = () => {}) {
    const titleBar = createDiv('').addClass('panel-title-bar');
    if(closeable) {
        const closeButton = create_ICON_BUTTON(ButtonIcon.CLOSE, closeAction);
        titleBar.child(closeButton);
    }
    titleBar.child(createP(title).addClass('panel-title'));
    return titleBar;
}

function create_ICON_BUTTON(buttonIcon, action = () => {}) {
    const button = createButton('').addClass('icon-button').mousePressed(action);
    createDiv(buttonIcon)
        .addClass('button-icon')
        .addClass('material-symbols-rounded')
        .parent(button);
    return button;
}

function create_TITLEBAR(title = "Untitled", leadingBtn = null, trailingBtn = null) {
    const titleBar = createDiv('').addClass('title-bar');
    const leadingButton = !leadingBtn ? createEmpty(createVector(1.5, 1.5)) : create_ICON_BUTTON(leadingBtn.icon, leadingBtn.action);
    const trailingButton = !trailingBtn ? createEmpty(createVector(1.5, 1.5)) : create_ICON_BUTTON(trailingBtn.icon, trailingBtn.action);
    const titleText = createSpan(title).addClass('title-text');

    leadingButton.parent(titleBar);
    titleText.parent(titleBar);
    trailingButton.parent(titleBar);

    return titleBar;
}

function create_TEXT_FIELD_AND_LABEL(regEntry) {
    const label = createSpan(regEntry.label).addClass('value-label').id(`${regEntry.key}-label`);
    const textField = createInput(regEntry.value).addClass('text-field').id(`${regEntry.key}-input`);
    if(!regEntry.editable) colorPicker.attribute("disabled", "null");
    document.getElementById(`${regEntry.key}-input`).addEventListener("change", (e) => { regEntry.value = e.target.value; })
    const container = createDiv('').addClass('entry-container').id(`${regEntry.key}-conteiner`);
    label.parent(container);
    textField.parent(container);
    return container;
}

function create_VALUE_AND_LABEL(regEntry) {
    const label = createSpan(labelText).addClass('value-label').id(`${regEntry.key}-label`);
    const valueSpan = createSpan(value).addClass('value-text').id(`${regEntry.key}-value`);
    if(!regEntry.editable) colorPicker.attribute("disabled", "null");
    const container = createDiv('').addClass('entry-container').id(`${regEntry.key}-container`);
    label.parent(container);
    valueSpan.parent(container);
    return container;
}

function create_DIVIDER() {
    return createDiv('').addClass('divider');
}

function create_NUMBER_FIELD_AND_LABEL(regEntry) {
    const label = createSpan(regEntry.label).addClass('value-label').id(`${regEntry.key}-label`);
    const numberField = createInput(regEntry.value, 'number').addClass('number-field').id(`${regEntry.key}-input`);
    if(!regEntry.editable) colorPicker.attribute("disabled", "null");
    document.getElementById(`${regEntry.key}-input`).addEventListener("change", (e) => { regEntry.value = parseFloat(e.target.value); })
    const container = createDiv('').addClass('entry-container').id(`${regEntry.key}-container`);
    label.parent(container);
    numberField.parent(container);
    return container;
}

function create_CHECKBOX_AND_LABEL(regEntry) {
    const label = createSpan(regEntry.label).addClass('value-label').id(`${regEntry.key}-label`);
    const checkbox = createCheckbox('', regEntry.value).addClass('checkbox').id(`${regEntry.key}-checkbox`);
    if(!regEntry.editable) colorPicker.attribute("disabled", "null");
    document.getElementById(`${regEntry.key}-checkbox`).addEventListener("change", (e) => { regEntry.value = e.target.checked; })
    const container = createDiv('').addClass('entry-container').id(`${regEntry.key}-container`);
    label.parent(container);
    checkbox.parent(container);
    return container;
}

function create_SLIDER_AND_LABEL(regEntry) {
    const label = createSpan(regEntry.label).addClass('value-label').id(`${regEntry.key}-label`);
    const minLabel = createSpan(regEntry.arguments.min).addClass('slider-min-label').id(`${regEntry.key}-min-label`);
    const maxLabel = createSpan(regEntry.arguments.max).addClass('slider-max-label').id(`${regEntry.key}-max-label`);
    const slider = createSlider(regEntry.arguments.min, regEntry.arguments.max, regEntry.value, regEntry.arguments.step).addClass('slider').id(`${regEntry.key}-slider`);
    if(!regEntry.editable) colorPicker.attribute("disabled", "null");
    const sliderContainer = createDiv('').addClass('slider-input-container').id(`${regEntry.key}-slider-input-container`);
    minLabel.parent(sliderContainer);
    slider.parent(sliderContainer);
    maxLabel.parent(sliderContainer);
    document.getElementById(`${regEntry.key}-slider`).addEventListener("input", (e) => { regEntry.value = parseFloat(e.target.value); })
    const container = createDiv('').addClass('entry-container').id(`${regEntry.key}-container`);
    label.parent(container);
    sliderContainer.parent(container);
    return container;
}

function create_COLOR_PICKER_AND_LABEL(regEntry) {
    const label = createSpan(regEntry.label).addClass('value-label').id(`${regEntry.key}-label`);
    const colorPicker = createInput(regEntry.value.toString("#rrggbb"), 'color').addClass('color-picker').id(`${regEntry.key}-color-picker`);
    colorPicker.value = regEntry.value.toString();
    if(!regEntry.editable) colorPicker.attribute("disabled", "null");
    document.getElementById(`${regEntry.key}-color-picker`).addEventListener("change", (e) => { regEntry.value = color(e.target.value); })
    const container = createDiv('').addClass('entry-container').id(`${regEntry.key}-container`);
    label.parent(container);
    colorPicker.parent(container);
    return container;
}

function create_REGISTRY_LABEL(registry) {
    const label = createSpan(registry.label).addClass('registry-label').id(`${registry.key}-label`);
    const container = createDiv('').addClass('registry-label-container').id(`${registry.key}-label-container`);
    label.parent(container);
    return container;
}

function create_SELECT_AND_LABEL(regEntry) {
    const label = createSpan(regEntry.label).addClass('value-label').id(`${regEntry.key}-label`);
    const select = createSelect().addClass('select').id(`${regEntry.key}-select`);
    if(!regEntry.editable) select.attribute("disabled", "null");
    regEntry.arguments.options.forEach(option => {
        select.option(option, option);
    });
    select.value(regEntry.value);
    document.getElementById(`${regEntry.key}-select`).addEventListener("change", (e) => { regEntry.value = e.target.value; })
    const container = createDiv('').addClass('entry-container').id(`${regEntry.key}-container`);
    label.parent(container);
    select.parent(container);
    return container;
}

function create_TIME_AND_LABEL(regEntry) {
    const label = createSpan(regEntry.label).addClass('value-label').id(`${regEntry.key}-label`);
    const timeInput = createInput(regEntry.value, 'time').addClass('time-input').id(`${regEntry.key}-input`);
    if(!regEntry.editable) timeInput.attribute("disabled", "null");
    document.getElementById(`${regEntry.key}-input`).addEventListener("change", (e) => { regEntry.value = e.target.value; })
    const container = createDiv('').addClass('entry-container').id(`${regEntry.key}-container`);
    label.parent(container);
    timeInput.parent(container);
    return container;
}

function create_DATE_AND_LABEL(regEntry) {
    const label = createSpan(regEntry.label).addClass('value-label').id(`${regEntry.key}-label`);
    const dateInput = createInput(regEntry.value, 'date').addClass('date-input').id(`${regEntry.key}-input`);
    if(!regEntry.editable) dateInput.attribute("disabled", "null");
    document.getElementById(`${regEntry.key}-input`).addEventListener("change", (e) => { regEntry.value = e.target.value; })
    const container = createDiv('').addClass('entry-container').id(`${regEntry.key}-container`);
    label.parent(container);
    dateInput.parent(container);
    return container;
}

function create_FILE_AND_LABEL(regEntry) {
    const label = createSpan(regEntry.label).addClass('value-label').id(`${regEntry.key}-label`);
    const fileInput = createFileInput().addClass('file-input').id(`${regEntry.key}-input`);
    if(!regEntry.editable) fileInput.attribute("disabled", "null");
    document.getElementById(`${regEntry.key}-input`).addEventListener("change", (e) => { regEntry.value = e.target.files; })
    const container = createDiv('').addClass('entry-container').addClass('file-container').id(`${regEntry.key}-container`);
    label.parent(container);
    fileInput.parent(container);
    return container;
}

function createEmpty(dimensions) {
    const emptyDiv = createDiv('').addClass('empty-component');
    emptyDiv.style('width', `${dimensions.x}vw`);
    emptyDiv.style('height', `${dimensions.y}vw`);
    return emptyDiv;
}

const ButtonIcon = Object.freeze({
    CLOSE: 'close',
    ARROW_BACK: 'arrow_back'
})