import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "@mui/material";
import Typing from "../Typing/Typing";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import KeyShortcut from "../keyboradShortcut/KeyShortcut";

const Home = () => {
    const author = useSelector(state=>state.AuthorReducer)

    useEffect(() => {
        localStorage.setItem("authorId", JSON.stringify(author))
    }, [author])
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
