import axios from "axios";

const TOKEN = "cd0qjsqad3ibhpvq2pk0cd0qjsqad3ibhpvq2pkg";

export default axios.create({
    baseURL: "https://finnhub.io/api/v1",
    params: {
        token: TOKEN
    }
});