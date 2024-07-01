import axios from 'axios';
const baseURL = ''; // Replace with your API base URL
const environmentName = process.env.NODE_ENV
const applicationFile = environmentName === 'development'? '../Assets/Json/application-configuration.json':'../Assets/Json/application-configuration-prod.json'
const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Timeout of 5 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch data from the API
export const getApiData = async () => {
  try {
    const response = await axiosInstance.get('../Assets/Json/api.json');
    return response.data; // Return data from the response
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};





