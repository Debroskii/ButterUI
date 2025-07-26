let SCENE;
let organizeKeybind;
let reg;

function preload() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  frameRate(TARGET_FRAME_RATE);
  createCanvas(windowWidth, windowHeight);

  Preferences.getInstance().withCheckbox("test-checkbox", true, "Test Checkbox", true)

  AppTheme.setTheme(new Theme()
    .backgroundColor(color(0))
    .textColor(color(255))
    .secondaryTextColor(color(205))
    .surfaceColor(color(255, 30))
    .primaryColor(color(255, 55, 55))
    .borderColor(color(255, 105))
    .borderWidth(0.05)
    .positiveColor(color(55, 205, 105))
  )

  AppTheme.setup();

  reg = new Registry("Test Registry")
    .withSlider("test", 0, "Test Color", true, {min: -100, max: 100, step: 1})
    .withCheckbox("test2", true, "Test Checkbox", true)
    .withTextField("test3", "placeholder", "Test Text Field", true)
    .withNumberField('test4', 0, "Test Number Field", true)
    .withColor("test5", color(255, 0, 0), "Test Color Picker", true)

  ContextMenu.init();
  EventHandler.setup();
  SCENE = new PanelScene("Test Scene", new DotGridBackground(), true)
}

function draw() {
  background(BACKGROUND_COLOR);
  Preferences.getInstance().update()
  KeybindRegistry.update();
  SceneRegistry.update(deltaTime / 1000);
  SceneRegistry.draw();
}

function mousePressed() {
  SceneRegistry.handleInput(SceneInputType.MOUSE_PRESSED);
  ContextMenu.testMousePressedForClosed();
}

function mouseReleased() {
  SceneRegistry.handleInput(SceneInputType.MOUSE_RELEASED);
}

function mouseClicked() {
  SceneRegistry.handleInput(SceneInputType.MOUSE_CLICKED);
}