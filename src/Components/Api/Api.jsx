// src/api/api.jsx

import axios from 'axios';
import ApplicationDevFile from '../Assets/Json/application-configuration.json'
import ApplicationProdFile from '../Assets/Json/application-configuration-prod.json'
const baseURL = ''; // Replace with your API base URL
const environmentName = process.env.NODE_ENV
const applicationFile = environmentName == 'development'? 'application-configuration.json':'application-configuration-prod.json'
console.log('applicationFile',applicationFile)
const axiosInstance = axios.create({
  applicationFile,
  timeout: 5000, // Timeout of 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch data from the API
export const fetchData = async () => {
  try {
    const response = await axiosInstance.get(applicationFile);
    return response.data; // Return data from the response
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Function to send data to the API
export const sendData = async (data) => {
  try {
    const response = await axiosInstance.post('/post', data);
    return response.data; // Return data from the response
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

// You can add more API functions as needed
