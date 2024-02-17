import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container } from "@mui/material";
import Typing from "../Typing/Typing";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setFavicons, setThemeOnBody, togglRTIntroAnimation } from "../../Methods/methods";
import { updateTheme } from "../../redux/action/Actions";

const Home = () => {
    const dispatch = useDispatch()
    const author = useSelector(state => state.AuthorReducer.UserData)
    useEffect(() => {
        if (!author.data.setting.theme || author.data.setting.theme === "") {
            dispatch(updateTheme('tomato'))
        } else {
            togglRTIntroAnimation(author.data.setting.intro_animation)
            setThemeOnBody(author.data.setting.theme.replace(/ /g, "_").toLowerCase());
            setFavicons(author.data.setting.theme.replace(/ /g, "_").toLowerCase());
        }
    }, [])
    // console.log(document.body.classList)
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