import NavbarComponent from '../components/NavbarComponent';
import SearchBarComponent from '../components/SearchBarComponent';

type Props = {}

const CountriesListPage = (props: Props) => {
  return (
    <>
      <NavbarComponent />
      <SearchBarComponent />
    </>
  )
}

export default CountriesListPage;