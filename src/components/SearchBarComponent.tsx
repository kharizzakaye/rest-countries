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
    const [filterRegionValue, setFilterRegionValue] = useState<string>("");
    const [filterCountryNameValue, setFilterCountryNameValue] = useState<string>("");

    // ALL Filters EMPTY
    async function getAllCountries()
    {
        const getAllCount: any = await apiService.getAllCountriesList();
        setCountriesList(getAllCount);
        setUnfilteredCountriesList(getAllCount);
    }

    // Region NOT EMPTY - country EMPTY
    async function getAllCountriesByRegion(region: string)
    {
        const getCountriesByRegion: any = await apiService.getAllCountriesListByRegion(region);
        setCountriesList(getCountriesByRegion);
    }

    async function onSelectRegionChangeHandler (event: any)
    {
        let filteredData = [];
        
        // Region EMPTY
        if ( event.target.value == "Filter by Region" || event.target.value == "")
        {
            setFilterRegionValue("");

            if ( filterCountryNameValue == "") // ALL Filters EMPTY
            {
                getAllCountries();
            }
            else // Country NOT EMPTY - Region EMPTY
            {
                filteredData = unfilteredCountriesList.filter ( (country: any) => country.name?.common.toLowerCase().includes(filterCountryNameValue.toLowerCase()) );              
                setCountriesList(filteredData);
            }
        }
        else // Region NOT EMPTY
        {
            setFilterRegionValue(event.target.value);
            
            if ( filterCountryNameValue == "") // Region NOT EMPTY - country EMPTY
            {
                getAllCountriesByRegion(event.target.value);
            }
            else // ALL Filters NOT EMPTY
            {
                // filter by region
                const filteredByRegion = unfilteredCountriesList.filter( (data: any) => data.region.toLowerCase().includes(event.target.value.toLowerCase()) );

                // then filter by keyword
                filteredData = filteredByRegion.filter ( (country: any) => country.name?.common.toLowerCase().includes(filterCountryNameValue.toLowerCase()) );

                setCountriesList(filteredData);
            }
        }
    }

    async function onFilterByCountryHandler (event: any)
    {
        const keywordSearch = event.target.value;

        // Country EMPTY
        if ( keywordSearch == "" || keywordSearch == null)
        {
            setFilterCountryNameValue("");

            if (filterRegionValue == "") // ALL Filters EMPTY
            {                                                          
                getAllCountries();
            }
            else // Region NOT EMPTY - country EMPTY
            {
                getAllCountriesByRegion(filterRegionValue);
            }
        }
        else // Country NOT EMPTY
        {
            let filteredData = [];
            setFilterCountryNameValue(keywordSearch);

            if (filterRegionValue == "") // Country NOT EMPTY - Region EMPTY
            {
                filteredData = unfilteredCountriesList.filter ( (country: any) => country.name?.common.toLowerCase().includes(keywordSearch.toLowerCase()) );              
            }
            else // ALL Filters NOT EMPTY
            {
                // filter by region
                const filteredByRegion = unfilteredCountriesList.filter( (data: any) => data.region.toLowerCase().includes(filterRegionValue.toLowerCase()) );

                // then filter by keyword
                filteredData = filteredByRegion.filter ( (country: any) => country.name?.common.toLowerCase().includes(keywordSearch.toLowerCase()) );
            }

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
                                    <option value="">Filter by Region</option>
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