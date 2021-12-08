import axios from "axios";

const loadSettings = async () => {
    const { data } = await axios.get('http://localhost:4000/app-get-settings');
    return data;
}

export default loadSettings;