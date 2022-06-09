function saveSettings(settings) {
  console.log("saveSettings");
  globalThis.DataBaseAPI.saveSettings(settings)
}

export default saveSettings;