import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "../styles/main.css";
import { Button } from 'react-bootstrap';
import { useState } from 'react';

type Props = {}

const NavbarComponent = (props: Props) => {

    const [buttonText, setButtonText] = useState<string>("Dark Mode");
    const [buttonStyling, setButtonStyling] = useState<string>("light");
    const [buttonIcon, setButtonIcon] = useState<string>("Dark Mode");

    const onDisplayModeClick = () => {
        if ( buttonText == "Dark Mode")
        {
            setButtonText("Light Mode");
            setButtonStyling("dark");
        }

        if ( buttonText == "Light Mode")
        {
            setButtonText("Dark Mode");
            setButtonStyling("light");
        }
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary navbar" sticky="top">
            <Container>
                <Navbar.Brand href="#" className="brand">Where in the world?</Navbar.Brand>
                <Button 
                    className={`btn-${buttonStyling}`} 
                    onClick={ onDisplayModeClick }
                >
                    { buttonText }
                </Button>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent;