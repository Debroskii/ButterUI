const TARGET_FRAME_RATE = 60;
const BACKGROUND_COLOR = '#000000';

let SIDEBAR_CONTENT
let EXAMPLE_REGISTRY

function setupDemo() {
    EXAMPLE_REGISTRY = new Registry("Example Registry")
        .withCheckbox("example-checkbox", true, "Example Checkbox", true)
        .withNumberField("example-number", 42, "Example Number Field", true)
        .withTextField("example-text", "Hello, World!", "Example Text Field", true)
        .withColor("example-color", color(255, 0, 0), "Example Color Picker", true)
        .withSelect("example-select", "Option 1", "Example Select", true, ["Option 1", "Option 2", "Option 3"])
        .withSlider("example-slider", 50, "Example Slider", true, {min: 0, max: 100, step: 1})
        .withDate("example-date", new Date(), "Example Date", true)
        .withTime("example-time", new Date(), "Example Time", true)
        .withFile("example-file", "", "Example File", true);

    SIDEBAR_CONTENT = createDiv('')
        .addClass('sidebar-demo-container')
        .addClass('sidebar-content')
        .child(createP("Welcome to a Sidebar Scene!")
            .addClass('sidebar-demo-heading'))
        .child(createP('')
            .child(createSpan("The sidebar can contain any HTML content you wish, including "))
            .child(createButton("Registries").addClass("demo-button-reference").mouseClicked(
                () => {
                    new PopupPane(createVector(60, 40), "What is a Registry?", createDiv('')
                        .addClass("registry-explain-demo-content")
                    )
                }
            ))
            .child(createSpan("! You can also add any other HTML elements to the sidebar, such as text, images, or buttons. The sidebar can be expanded or collapsed using the arrow button in the title bar."))
            .child(create_DIVIDER())
            .child(createDiv('').addClass('sidebar-demo-registry-container')
                .child(createP("Here's an example of a Registry view: ").addClass("sidebar-demo-registry-heading"))
                .child(createDiv('').addClass('sidebar-demo-registry').child(EXAMPLE_REGISTRY.constructContent()))
                .child(createButton("Popout Example Registry").addClass("sidebar-demo-registry-popout-button").mouseClicked(() => {
                    SCENE.addPanel(new Panel(SCENE.findNextPosition(), createVector(15, 25), "Example Registry Popout", EXAMPLE_REGISTRY.constructContent()))
                })))
            .child(createDiv('').addClass('sidebar-demo-image-container')
                .child(createP("And here's an example of a Image: ").addClass("sidebar-demo-image-heading"))
                .child(createDiv('').addClass('sidebar-demo-image').child(createImg('./assets/mike-wahousekey.jpg'))))
            .addClass("sidebar-demo-text"))
}