import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "@mui/material";
import Typing from "../Typing/Typing";

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
