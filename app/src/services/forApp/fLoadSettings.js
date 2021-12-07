import axios from "axios";

const loadSettings = async () => {
    const { data } = await axios.get('http://localhost:4000/app-get-settings');
    console.log('message: ', data);
}

export default loadSettings;