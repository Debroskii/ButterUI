let testPanelScene;
let organizeKeybind;

function preload() {}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  frameRate(TARGET_FRAME_RATE);
  createCanvas(windowWidth, windowHeight);
  testPanelScene = new PanelScene("ButterUI Panels", new DotGridBackground(), true);
  testPanelScene.addPanel(new Panel(createVector(0, 20), createVector(convertPxX(200), convertPxX(200))));
  testPanelScene.addPanel(new Panel(createVector(40, 20), createVector(convertPxX(200), convertPxX(200))));
  organizeKeybind = KeybindRegistry.register(new AtomicBoolean(() => keyIsDown(79), () => {}, () => {testPanelScene.smartOrganize()}))
}

function draw() {
  background(BACKGROUND_COLOR);
  KeybindRegistry.update();
  SceneRegistry.update(deltaTime / 1000);
  SceneRegistry.draw();
  testPanelScene.showPanelMap();
}

function mousePressed() {
  SceneRegistry.handleInput(SceneInputType.MOUSE_PRESSED);
}

function mouseReleased() {
  SceneRegistry.handleInput(SceneInputType.MOUSE_RELEASED);
}

function mouseClicked() {
  SceneRegistry.handleInput(SceneInputType.MOUSE_CLICKED);
}