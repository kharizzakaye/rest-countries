import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "../styles/main.css";
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {}

const NavbarComponent = (props: Props) => {

    const [buttonText, setButtonText] = useState<string>("Dark Mode");
    const [buttonStyling, setButtonStyling] = useState<string>("light");

    const lightModeClasses = "light-mode-background"

    const darkModeClasses = "dark-mode-element white-text"

    const onDisplayModeClick = () => {
        if ( buttonText == "Dark Mode")
        {
            setButtonText("Light Mode");
            setButtonStyling("dark-mode-element white-text");
        }

        if ( buttonText == "Light Mode")
        {
            setButtonText("Dark Mode");
            setButtonStyling("light-mode-background light-mode-text");
        }
    }

    return (
        <Navbar 
            expand="lg" 
            className={ buttonText == "Dark Mode" ?  lightModeClasses : darkModeClasses  }
            sticky="top"
        >
            <Container>
                <Navbar.Brand href="/" className={`brand ${buttonStyling}`}>Where in the world?</Navbar.Brand>
                {/* <Button 
                    className={`btn border-0 ${buttonStyling}`} 
                    onClick={ onDisplayModeClick }
                >
                    <FontAwesomeIcon icon={ buttonText == "Dark Mode" ? faMoon : faSun} className="icon-margin"/>
                    { buttonText }
                </Button> */}
            </Container>
        </Navbar>
    )
}

export default NavbarComponent;