import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

type Props = {}

const regionsList = [
    { text: "Africa" },
    { text: "Americas" },
    { text: "Asia" },
    { text: "Europe" },
    { text: "Oceania" },
];

const SearchBarComponent = (props: Props) => { 

    return (
        <Container className="searchbar-container">
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
                        />
                    </InputGroup>
                </Col>

                <Col lg={3} md={6}>
                    <Form.Select aria-label="Filter by Region dropdown">
                        <option>Filter by Region</option>
                        {
                            regionsList.map((region: any, index) => (
                                <option key={index} value={region.text}>{region.text}</option>
                            ))
                        }
                    </Form.Select>
                </Col>
            </Row>
        </Container>
    )
}

export default SearchBarComponent;