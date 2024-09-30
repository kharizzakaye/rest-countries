import axios from "axios";

async function getAllCountriesList()
{
    const response = await axios.get(
        String(process.env.REACT_APP_BASE_API_URL) + 
        String(process.env.REACT_APP_ENDPOINT_ALL_COUNTRIES)
    );

    return response.data;
}

async function getCountryDetails(name: string)
{
    const response = await axios.get(
        String(process.env.REACT_APP_BASE_API_URL) + 
        `/name/${name}`
    );
    
    return response.data;
}

export {
    getAllCountriesList,
    getCountryDetails,
}