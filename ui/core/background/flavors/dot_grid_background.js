class DotGridBackground extends Background {
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
        g.noStroke();
        g.background(this.mainColor);
        g.fill(this.secondaryColor);
        for (let x = 0; x < g.width; x += this.spacing) {
            for (let y = 0; y < g.height; y += this.spacing) {
                g.ellipse(x, y, this.dotRadius * 2, this.dotRadius * 2);
            }
        }
    }
}