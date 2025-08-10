class GridBackground extends Background {
    constructor(mainColor = color(0), secondaryColor = color(255, 30), dotRadius = 1, spacing = 20) {
        super();
        this.mainColor = mainColor;
        this.secondaryColor = secondaryColor;
        this.dotRadius = dotRadius;
        this.spacing = spacing;
        this.generateGraphic();
    }

    generateGraphic() {
        let g = this.graphic;
        g.clear();
        g.background(this.mainColor);
        strokeWeight(1);
        for (let x = 0; x < g.width; x += this.spacing) {
            if(x % (this.spacing * 2) == 0) g.stroke(this.secondaryColor);
            else g.stroke(lerpColor(this.secondaryColor, color(this.mainColor.levels[0], this.mainColor.levels[1], this.mainColor.levels[2], this.secondaryColor.levels[3]), 0.25));
            g.line(x, 0, x, g.height);
        }
        for (let y = 0; y < g.height; y += this.spacing) {
            if(y % (this.spacing * 2) == 0) g.stroke(this.secondaryColor);
            else g.stroke(lerpColor(this.secondaryColor, color(this.mainColor.levels[0], this.mainColor.levels[1], this.mainColor.levels[2], this.secondaryColor.levels[3]), 0.25));
            g.line(0, y, g.width, y);
        }
    }
}