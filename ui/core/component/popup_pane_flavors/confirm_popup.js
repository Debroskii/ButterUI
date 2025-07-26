class ConfirmPopup extends PopupPane {
    constructor(title = "Confirm Action", message = "Are you sure?", confirmAction = () => {}, cancelAction = () => {}) {
        super(createVector(convertPxX(300), convertPxX(150)), title, 
            createDiv('').addClass('confirm-popup-content')
            .child(createP(message))
            .child(createDiv('').addClass('confirm-popup-buttons')
                .child(createButton("Cancel").addClass('cancel-button').mousePressed(() => {
                    cancelAction();
                    this.close();
                }))
                .child(createButton("Confirm").addClass('confirm-button').mousePressed(() => {
                    confirmAction();
                    this.close();
                }))
        ));
    }
}