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

const ButtonIcon = Object.freeze({
    CLOSE: 'close'
})