import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import * as apiService from "../services/apiService";
import { Row, Col, CardGroup, Container } from 'react-bootstrap';
import "../styles/main.css";

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
    <Container>
      { countriesList && 
        <Row xl={4} lg={3} md={2} sm={2} xs={1} className="g-4">
     
            { countriesList.map((country: any, index) => (
            
                <Col key={index} >
                  <Card className="p-0 h-100 border-0 card-shadow">
                    <Card.Img variant="top" src={country.flags?.png} style={{ height: "200px" }} />

                    <Card.Body>
                      <Card.Title>{country.name?.common}</Card.Title>
                      <Card.Text>Population: { Number(country.population).toLocaleString() }</Card.Text>
                      <Card.Text>Region: {country.region}</Card.Text>
                      <Card.Text>Capital: {country.capital}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
        
            ))}
       
        </Row>
      
       }
    </Container>
  )
}

export default CardComponent;