import React, { useEffect, useState } from 'react'
import NavbarComponent from '../components/NavbarComponent';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as apiService from "../services/apiService";

type Props = {}

const CountryDetailsPage = (props: Props) => {

  const navigate = useNavigate();
  const [countryData, setCountryData] = useState<any>(null);

  const onBackHandler = () => {
    navigate("/");
  }

  async function getCountryDetail()
  {
    const queryString = require('query-string');
    const queryParams = queryString.parse(window.location.search);

    const getCountryData: any = await apiService.getCountryDetails(queryParams.countryName);
    setCountryData(getCountryData[0]);
  }
 
  useEffect(() => {
    getCountryDetail();
  }, [])

  return (
    <>
      { countryData && (
        <div>
        <NavbarComponent />
  
        <Container>
          <Button onClick={onBackHandler}>Back</Button>

          <Row>
            <Col lg={6}>
              <Image src={countryData.flags.svg} fluid alt={countryData.flags.alt} />
            </Col>

            <Col lg={6}>
              <Row>
                <p>{countryData.name.common}</p>
                <p>{countryData.name.official}</p>
              </Row>

              <Row>
                <Col md={6}>
                  <p>
                    <span className="fieldTitle">Native Name(s): </span>
                    { Object.values(countryData.name.nativeName).map((item: any) => ( item.common )).join(", ") }
                  </p>

                  <p>
                    <span className="fieldTitle">Capital: </span>
                    { countryData.capital }
                  </p>

                  <p>
                    <span className="fieldTitle">Population: </span>
                    { Number(countryData.population).toLocaleString() }
                  </p>

                  <p>
                    <span className="fieldTitle">Region: </span>
                    { countryData.region }
                  </p>

                  <p>
                    <span className="fieldTitle">Sub-Region: </span>
                    { countryData.subregion }
                  </p>

                  
                </Col>

                <Col md={6}>
                  <p>
                    <span className="fieldTitle">Languages: </span>
                    { Object.values(countryData.languages).join(", ") }
                  </p>
                  
                  <p>
                    <span className="fieldTitle">Currency: </span>
                    { Object.values(countryData.currencies).map((item: any) => `${item.name} (${item.symbol})`).join(", ") }
                  </p>

                  <p>
                    <span className="fieldTitle">Top-level Domain: </span>
                    { countryData.tld.join(", ") }
                  </p>
                </Col>
              </Row>

              <Row>
                <p>
                  <span className="fieldTitle">Border Countries: </span>
                  { 
                    countryData.borders
                     ? countryData.borders.join(", ")
                     : "None"
                  }
                </p>
              </Row>

            </Col>
          </Row>
        </Container>
        </div>
      )}

     
    </>
  )
}

export default CountryDetailsPage;