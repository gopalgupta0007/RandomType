import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "@mui/material";
import Typing from "../Typing/Typing";


document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key == 'Enter') {
        //if shift + enter key down restart-typing
        event.preventDefault(); // Prevent default browser behavior
        window.location.reload();
        alert("shift+enter hasbeen keydowned");
    }
    if (event.shiftKey && event.key == '?') {
        //if shift + enter key down restart-typing
        event.preventDefault(); // Prevent default browser behavior
        alert("shift + ? hasbeen keydowned");
    }
})


const Home = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet><title>RandomType</title></Helmet>
                <Container maxWidth="xl">
                    <Typing />
                </Container>
            </HelmetProvider>
        </>
    )
}

export default Home;
