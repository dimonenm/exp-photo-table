import axios from 'axios';

// async function saveSettings(settings) {
//   const { data } = await axios.post('http://localhost:4000/app-set-settings', settings);
//   console.log('message from server: ', data);
// }
function saveSettings(settings) {
  console.log("saveSettings");
  globalThis.DataBaseAPI.saveSettings(settings)
}

export default saveSettings;