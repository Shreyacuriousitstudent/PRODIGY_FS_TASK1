import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
});

export const registerUser = async (userData) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await api.post('/login', userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

fetch("http://localhost:5001/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "test", password: "12345" }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error("API Error:", err));
  