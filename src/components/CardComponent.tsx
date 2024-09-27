import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import * as apiService from "../services/apiService";
import { Row, Col } from 'react-bootstrap';

const CardComponent = () => {

  const [countriesList, setCountriesList] = useState<any[]>([]);


  async function getAllCountries()
  {
      const getAllCount: any = await apiService.getAllCountriesList();
      console.log(getAllCount);
  
      setCountriesList(getAllCount);
  }

  useEffect(() => {
    getAllCountries();
  }, [])
  
  


  return (
    <>
       { countriesList && 
         <>
           
          { countriesList.map((country: any, index) => (
            <div key={index}>
              <h1>{country.name?.common}</h1>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital}</p>
            </div>
          ))}
          
         </>
      
       }
    </>
  )
}

export default CardComponent;