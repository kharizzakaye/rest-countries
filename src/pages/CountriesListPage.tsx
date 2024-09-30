import React from 'react'
import NavbarComponent from '../components/NavbarComponent';
import CardComponent from '../components/CardComponent';

type Props = {}

const CountriesListPage = (props: Props) => {
  return (
    <>
      <NavbarComponent />
      <CardComponent />
    </>
  )
}

export default CountriesListPage;