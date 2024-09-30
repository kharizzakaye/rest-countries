import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CardComponent from './CardComponent';
import * as apiService from "../services/apiService";


type Props = {}

const regionsList = [
    { text: "Africa" },
    { text: "Americas" },
    { text: "Asia" },
    { text: "Europe" },
    { text: "Oceania" },
];


const SearchBarComponent = (props: Props) => { 
    const [countriesList, setCountriesList] = useState<any[]>([]);
    const [unfilteredCountriesList, setUnfilteredCountriesList] = useState<any[]>([]);

    async function getAllCountries()
    {
        const getAllCount: any = await apiService.getAllCountriesList();
        setCountriesList(getAllCount);
        setUnfilteredCountriesList(getAllCount);
    }


    async function onSelectRegionChangeHandler (event: any)
    {
        if ( event.target.value == "Filter by Region")
        {
            getAllCountries();
        }
        else
        {
            const getCountriesByRegion: any = await apiService.getAllCountriesListByRegion(event.target.value);
            setCountriesList(getCountriesByRegion);
        }
    }

    async function onFilterByCountryHandler (event: any)
    {
        const keywordSearch = event.target.value;

        if ( keywordSearch == "" || keywordSearch == null)
        {
            getAllCountries();
        }
        else
        {
            const filteredData = unfilteredCountriesList.filter ( (country: any) => country.name?.common.toLowerCase().includes(keywordSearch.toLowerCase()) )
            setCountriesList(filteredData);
        } 
    }

    
    useEffect(() => {
      getAllCountries();
    }, [])


    return (
        <>
            { countriesList && 

                <Container>
                    <div className="searchbar-container">
                        <Row>
                            <Col lg={3} md={6}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text id="country-search">
                                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search for a country"
                                        aria-label="Search for a country"
                                        aria-describedby="country-search"
                                        onChange={ (event: any) => onFilterByCountryHandler(event) }
                                    />
                                </InputGroup>
                            </Col>
        
                            <Col lg={3} md={6} id="region-dropdown-container">
                                <Form.Select 
                                    aria-label="Filter by Region dropdown"
                                    onChange={(event: any) => onSelectRegionChangeHandler(event)}
                                >
                                    <option>Filter by Region</option>
                                    {
                                        regionsList.map((region: any, index) => (
                                            <option key={index} value={region.text}>{region.text}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Col>
                        </Row>
                    </div>
        
                    <CardComponent countriesData={countriesList} />
              
                </Container>
            }
        </>


        
    )
}

export default SearchBarComponent;