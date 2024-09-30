import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import * as apiService from "../services/apiService";
import { Row, Col, CardGroup, Container } from 'react-bootstrap';
import "../styles/main.css";
import { useNavigate } from 'react-router-dom';

const CardComponent = () => {

  const [countriesList, setCountriesList] = useState<any[]>([]);
  const navigate = useNavigate();

  async function getAllCountries()
  {
      const getAllCount: any = await apiService.getAllCountriesList();
      console.log(getAllCount);
  
      setCountriesList(getAllCount);
  }

  useEffect(() => {
    getAllCountries();
  }, [])

  const onSelectedCountryHandler = () => {

  }


  return (
    <Container>
      { countriesList && 
        <Row xl={4} lg={3} md={2} sm={2} xs={1} className="g-4">
     
            { countriesList.map((country: any, index) => (
            
                <Col key={index} >
                  <a href={`/detail?countryName=${country.name?.common}`} style={{ textDecoration: "none" }}>
                    <Card className="p-0 h-100 border-0 card-shadow">
                      <Card.Img variant="top" src={country.flags?.png} style={{ height: "200px" }} />

                      <Card.Body>
                        <Card.Title className="countryName">{country.name?.common}</Card.Title>
                        
                        <Card.Text>
                          <span className="populationValue">Population: </span>
                          { Number(country.population).toLocaleString() }
                        </Card.Text>
                        
                        <Card.Text>
                          <span className="regionValue">Region: </span>
                          {country.region}
                        </Card.Text>
                        
                        <Card.Text>
                          <span className="capitalValue">Capital: </span>
                          {country.capital}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </a>
                </Col>
        
            ))}
       
        </Row>
      
       }
    </Container>
  )
}

export default CardComponent;