class Preferences extends Registry {
    static _instance = null;

    static getInstance() {
        if(!this._instance) this._instance = new Preferences()
        return this._instance
    }

    constructor() {
        super("user-preferences", getPreferenceCookies());
    }

    withCheckbox(key, value, label = "", editable = true) {
        if(!this.entries.has(key)) super.withCheckbox(key, value, label, editable)
    }

    withColor(key, value, label = "", editable = true) {
        if(!this.entries.has(key)) super.withColor(key, value, label, editable)
    }

    withDateTime(key, value, label = "", editable = true) {
        if(!this.entries.has(key)) super.withDateTime(key, value, label, editable)
    }

    withDate(key, value, label = "", editable = true) {
        if(!this.entries.has(key)) super.withDate(key, value, label, editable)
    }

    withNumberField(key, value, label = "", editable = true) {
        if(!this.entries.has(key)) super.withNumberField(key, value, label, editable)
    }

    withFile(key, value, label = "", editable = true) {
        if(!this.entries.has(key)) super.withFile(key, value, label, editable)
    }

    withTextField(key, value, label = "", editable = true) {
        if(!this.entries.has(key)) super.withTextField(key, value, label, editable)
    }

    withSlider(key, value, label = "", editable = true, args = {min: 0, max: 100, step: 1}) {
        if(!this.entries.has(key)) super.withSlider(key, value, label, editable, args)
    }

    open(currentScene) {
        SCENE = new SinglePaneScene(createVector(convertPxX(800), convertPxX(600)), "Preferences", this.constructContent(), new SolidColorBackground(), currentScene)
    }

    openPopup() {
        let pane = new PopupPane(createVector(convertPxX(500), convertPxX(800)), "Preferences", this.constructContent(), {leading: {icon: ButtonIcon.ARROW_BACK, action: () => { pane.close() }}})
    }

    update() {
        for(let key of this.entries.keys()) {
            let value = this.entries.get(key)
            document.cookie = `p$${key}=${JSON.stringify({value: value, preference: true})}`
        }
    }

    constructContent() {
        const root = super.constructContent()
        const buttonContainer = createDiv('').addClass("preferences-button-container").parent(root)
        const clearDataButton = createButton('Clear Data')
            .addClass("preferences-button")
            .mouseClicked(() => {
                new ConfirmPopup("Clear Data", "Are you sure you want to clear all data?", () => {
                    clearAllCookies();
                }, () => {})
            })
            .parent(buttonContainer)
        const printDataButton = createButton('Print Data')
            .addClass("preferences-button")
            .mouseClicked(() => {
                print(JSON.stringify(Object.fromEntries(getPreferenceCookies()), null, "    "))
            })
            .parent(buttonContainer)
        return root;
    }
}

function parseCookies(cookieString) {
    const cookies = new Map();
    if (!cookieString) {
      return cookies;
    }
    const cookiesArray = cookieString.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      const cookie = cookiesArray[i].trim();
      if (cookie) {
        const [key, value] = cookie.split('=').map(part => part.trim());
        cookies.set(decodeURIComponent(key), decodeURIComponent(value))
      }
    }
    return cookies;
}   

function getPreferenceCookies() {
    let preferences = new Map();
    let cookies = parseCookies(document.cookie)
    for(let key of cookies.keys()) {
        if(key.includes("p$")) {
            let val = cookies.get(key)
            preferences.set(key.replace("p$", ""), JSON.parse(val).value)
        }
    }
    return preferences;
}

function clearAllCookies() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  }