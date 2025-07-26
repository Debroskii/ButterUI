class Theme {
    constructor() {
        this.colors = { 
            primary: '#6200ea',
            secondary: '#03dac6',
            text: '#000000',
            background: '#ffffff',
            surface: '#f5f5f5',
            negative: '#ff353c',
            borderColor: '#e0e0e0',
            secondaryTextColor: '#757575',
            positiveColor: '#ffffff'
        };
        this.geometry = {
            radius: "0.3vw",
            borderWidth: "0.1vw"
        }
        this.surface = {
            backdrop_blur: 'blur(2px)'
        }
    }

    textColor(c) {
        this.colors.text = c.toString();
        return this;
    }

    borderColor(c) {
        this.colors.borderColor = c.toString();
        return this;
    }

    primaryColor(c) {
        this.colors.primary = c.toString();
        return this;
    }

    secondaryTextColor(c) {
        this.colors.secondaryTextColor = c.toString();
        return this;
    }

    secondaryColor(c) {
        this.colors.secondary = c.toString();
        return this;
    }

    backgroundColor(c) {
        this.colors.background = c.toString();
        return this;
    }

    surfaceColor(c) {
        this.colors.surface = c.toString();
        return this;
    }

    negativeColor(c) {
        this.colors.negative = c.toString();
        return this;
    }

    positiveColor(c) {
        this.colors.positiveColor = c.toString();
        return this;
    }

    radius(r) {
        this.geometry.radius = `${r}vw`;
        return this;
    }

    borderWidth(w) {
        this.geometry.borderWidth = `${w}vw`;
        return this;
    }

    backdropBlur(blur) {
        this.surface.backdrop_blur = `blur(${blur}px)`;
        return this;
    }

    getColors() {
        return this.colors;
    }

    getGeometry() {
        return this.geometry
    }

    getSurface() {
        return this.surface;
    }
}

class AppTheme {
    static theme = new Theme();

    static setTheme(theme) {
        AppTheme.theme = theme;
    }

    static getTheme() {
        return AppTheme.theme;
    }

    static setup() {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', AppTheme.theme.colors.primary);
        root.style.setProperty('--secondary-color', AppTheme.theme.colors.secondary);
        root.style.setProperty('--text-color', AppTheme.theme.colors.text);
        root.style.setProperty('--background-color', AppTheme.theme.colors.background);  
        root.style.setProperty('--surface-color', AppTheme.theme.colors.surface);
        root.style.setProperty('--negative-color', AppTheme.theme.colors.negative);
        root.style.setProperty('--border-radius', AppTheme.theme.geometry.radius);
        root.style.setProperty('--border-width', AppTheme.theme.geometry.borderWidth);
        root.style.setProperty('--backdrop-blur', AppTheme.theme.surface.backdrop_blur);
        root.style.setProperty('--border-color', AppTheme.theme.colors.borderColor);
        root.style.setProperty('--secondary-text-color', AppTheme.theme.colors.secondaryTextColor);
        root.style.setProperty('--positive-color', AppTheme.theme.colors.positiveColor)
    }
}