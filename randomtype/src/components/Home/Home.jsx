import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "@mui/material";
import Typing from "../Typing/Typing";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { togglRTIntroAnimation } from "../../Methods/methods";

const Home = () => {
    const author = useSelector(state => state.AuthorReducer.UserData)
    useEffect(() => {
        togglRTIntroAnimation(author.data.setting.intro_animation)
    }, [])

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
