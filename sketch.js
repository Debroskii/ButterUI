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
  setupDemo();

  Preferences.getInstance().withCheckbox("test-checkbox", true, "Test Checkbox", true)

  AppTheme.setTheme(THEME)
  AppTheme.setup();

  reg = new Registry("Test Registry")
    .withSlider("test", 0, "Test Color", true, {min: -100, max: 100, step: 1})
    .withCheckbox("test2", true, "Test Checkbox", true)
    .withTextField("test3", "placeholder", "Test Text Field", true)
    .withNumberField('test4', 0, "Test Number Field", true)
    .withColor("test5", color(255, 0, 0), "Test Color Picker", true)
    .withSelect("test6", "h", "Test Select", true, ["a", "b", "c", "d", "h"])
    .withDate("test7", new Date(), "Test Date", true)
    .withTime("test8", new Date(), "Test Time", true)
    .withFile("test9", "", "Test File", true)

  ContextMenu.init();
  EventHandler.setup();
  SCENE = new SinglePaneScene(createVector(50, 20), "Butter UI", createImg('/assets/butter.png').style("height", "18vw"), new SolidColorBackground(color(246, 227, 178)))
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