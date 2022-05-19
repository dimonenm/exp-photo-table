import axios from "axios";

// const loadSettings = async () => {
//     try {
//         const { data } = await axios.get('http://localhost:4000/app-get-settings');
//         return data;
//     } catch (error) {
//         console.log(`Произошла ошибка fLoadSettings.js:5 `, { error });
//     }
// }
const loadSettings = () => {
    try {
        const { data } = axios.get('http://localhost:4000/app-get-settings');
        return data;
    } catch (error) {
        console.log(`Произошла ошибка fLoadSettings.js:5 `, { error });
    }
}

export default loadSettings;