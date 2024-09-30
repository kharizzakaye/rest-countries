import React from 'react'
import NavbarComponent from '../components/NavbarComponent';
import CardComponent from '../components/CardComponent';
import SearchBarComponent from '../components/SearchBarComponent';

type Props = {}

const CountriesListPage = (props: Props) => {
  return (
    <>
      <NavbarComponent />
      <SearchBarComponent />
      <CardComponent />
    </>
  )
}

export default CountriesListPage;