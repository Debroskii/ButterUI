class SolidColorBackground extends Background {
    constructor(backgroundColor = color(AppTheme.getTheme().getColors().background)) {
        super();
        this.graphic.background(backgroundColor)
    }
}