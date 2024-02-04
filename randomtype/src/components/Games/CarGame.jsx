import React, { useEffect, useMemo, useRef, useState } from 'react'
import NavConfig from '../Mode/NavConfig'
import { Box, Container } from '@mui/material'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavGameProgressBar from './NavGameProgressBar';
// import car from "../Games/svg Images/carSVG.svg"
import { ReactComponent as Car } from "../Games/svg Images/carSVG.svg"
// import flag from "../Games/svg Images/flag.svg"
import { ReactComponent as Flag } from "../Games/svg Images/flag.svg"
import useSound from 'use-sound';
import bubble from '../rtsetting/sounds/bubble.mp3';
import lightbell from '../rtsetting/sounds/lightbell.mp3';
import typeErrorsound from '../rtsetting/sounds/typeError.mp3';
import { getNumberOfWords } from '../Typing/Typing';
import normalText from '../Typing/storedText';
import { useSelector } from 'react-redux';
import { off, on, setFavicons, setThemeOnBody } from '../../Methods/methods';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

function compareTo(text1, text2) {
    console.log(`\'${text1}\' == \'${text2}\'`);
    if ((text1.length === text2.length) && (text1 === text2)) { return true }
    else { return false }
}

const CarGame = () => {
    const socket = useMemo(() => io("http://localhost:5000"), [])
    const author = useSelector(state => state.AuthorReducer.UserData);
    const typingTest = useSelector(state => state.TypingTestReducer);
    // const auth = useSelector(state => state.AuthReducer.auth);
    const cargametypingContainer = document.getElementById("cargametypingContainer");
    const elemtRef = useRef(null);
    const [CarLetter, setCarLatter] = useState("");
    const [Room, setRoom] = useState();
    const [isStrenger, setIsStrenger] = useState(true);
    const [countDown, setCountDown] = useState(0);
    const [CarMoveingPoint, setCarMoveingPoint] = useState(0);
    const [CargameIncorrectLetter, setCargameIncorrectLetter] = useState(0);
    const [CarCharIndexNumber, setCarCharIndexNumber] = useState(0);
    const [CargameCountDownTimer, setCargameCountDownTimer] = useState(30);
    const [CarTextplaceholderText, setCarTextPlaceholderText] = useState("");

    const [playCorrectKeySound] = useSound(bubble, { volume: 1 });
    const [playInCorrectKeySound] = useSound(lightbell, { volume: 1 });
    const [playbackspaceSound] = useSound(typeErrorsound, { volume: 1 });
    const [User, setUser] = useState({
        id: socket._id,
        username: author.username,
        roomNo: 0,
        typingGameData: {
            wpm: 0,
            acc: 100
        },
        carMovePoint: 0
    });
    console.log("CarMoveingPoint=>", CarMoveingPoint);
    console.log("User=>", User.carMovePoint);
    const [FriendData, setFriendData] = useState({
        id: "",
        username: "",
        roomNo: 0,
        typingGameData: {
            wpm: 0,
            acc: 0
        },
        carMovePoint: 0
    });
    const [StrengerData, setStrengerData] = useState({
        id: "",
        username: "",
        roomNo: 0,
        typingGameData: {
            wpm: 0,
            acc: 0
        },
        carMovePoint: 0
    });

    useEffect(() => {
        //generate random number and the according to that number of index of array of the paragram will it be selected
        // getParagraph(setplaceholderText, loadParagraph)
        // setCarTextPlaceholderText(getNumberOfWords(loadParagraph(), 50))
        off(3);
        setCarTextPlaceholderText(getNumberOfWords(normalText[Math.floor(Math.random() * 10)].toLowerCase(), 50))
        setThemeOnBody(author.data.setting.theme.replace(/ /g, "_").toLowerCase());
        setFavicons(author.data.setting.theme.replace(/ /g, "_").toLowerCase());
    }, []);

    function compareToTypedLetter(text1, text2 = 'Backspace') {
        // alert("compareToTyped method is runned")
        var words = document.getElementsByClassName("gameletter");
        const car = document.getElementById("user-car");
        if (text2[CarCharIndexNumber] === undefined && text2[CarCharIndexNumber] !== " ") {
            // backspace
            playbackspaceSound();
            words[CarCharIndexNumber].classList.remove("active")
            setCarCharIndexNumber(CarCharIndexNumber - 1)
            words[CarCharIndexNumber - 1].classList.add("with-animation-backword")
            words[CarCharIndexNumber - 1].classList.add("active")
            words[CarCharIndexNumber - 1].classList.remove("pressed")
            words[CarCharIndexNumber - 1].classList.remove("incorrect")
            words[CarCharIndexNumber - 1].classList.remove("correct")
            // console.log(`\'${text1[CarCharIndexNumber - 1]}\'`)
            console.log(compareTo(text1.slice(0, CarCharIndexNumber - 1), text2.slice(0, CarCharIndexNumber + 1)))
            if ((text1[CarCharIndexNumber - 1] === " ") && (compareTo(text1.slice(0, CarCharIndexNumber - 1), text2.slice(0, CarCharIndexNumber + 1)))) {
                setCarMoveingPoint(CarMoveingPoint - 1)
                setUser(prevUser => ({ ...prevUser, carMovePoint: prevUser.carMovePoint - 1 }));
                car.style.transform = `translateX(${1.32 * CarMoveingPoint}vw) scale(.7,.6)`;
            }
        } else if (text1[CarCharIndexNumber] === text2[CarCharIndexNumber]) {
            // correct
            playCorrectKeySound();   // correct key pressed then sound played like typewriter
            // console.log(Letter);
            setCarCharIndexNumber(CarCharIndexNumber + 1);
            (CarCharIndexNumber === 0) ? console.log("start") : words[CarCharIndexNumber].classList.remove("active"); words[0].classList.remove("active");
            if (words[CarCharIndexNumber + 1].classList.contains("with-animation-backword")) {
                words[CarCharIndexNumber + 1].classList.remove("with-animation-backword")
            }
            words[CarCharIndexNumber + 1].classList.add("active");
            words[CarCharIndexNumber].classList.add("correct")
            // only for car move
            if ((text1[CarCharIndexNumber] === " ") && (text2[CarCharIndexNumber] === " ") && (compareTo(text1.slice(0, CarCharIndexNumber + 1), text2.slice(0, CarCharIndexNumber + 1)))) {
                if ((text1[CarCharIndexNumber - 1] !== " ") && (text1[CarCharIndexNumber + 1] !== " ")) {
                    setCarMoveingPoint(CarMoveingPoint + 1)
                    setUser(prevUser => ({ ...prevUser, carMovePoint: prevUser.carMovePoint + 1 }));
                    car.style.transform = `translateX(${1.32 * CarMoveingPoint}vw) scale(.7,.6)`;
                }
            }
            if (text1[0] === text2[CarCharIndexNumber]) { words[CarCharIndexNumber].classList.add("pressed") }
            if (CarTextplaceholderText.length - 1 === CarCharIndexNumber) { window.location.reload() }  // next text are going to show when the user type completely / user typed all given sentances.
        } else {
            // incorrect
            playInCorrectKeySound();
            setCargameIncorrectLetter(CargameIncorrectLetter + 1)
            words[CarCharIndexNumber].classList.remove("active");
            setCarCharIndexNumber(CarCharIndexNumber + 1);
            if (words[CarCharIndexNumber + 1].classList.contains("with-animation-backword")) {
                words[CarCharIndexNumber + 1].classList.remove("with-animation-backword")
            }
            words[CarCharIndexNumber + 1].classList.add("active");
            words[CarCharIndexNumber + 1].classList.add("pressed");
            words[CarCharIndexNumber].classList.add("incorrect")
        }
        if (text2[CarCharIndexNumber - 1]) { words[CarCharIndexNumber].classList.add("pressed") }
    }

    const handleCarGameTyping = (e) => {
        const pressedKey = e.target.value[CarCharIndexNumber];
        if (
            (pressedKey >= 'a' && pressedKey <= 'z')
            || (pressedKey >= 'A' && pressedKey <= 'Z')
            || (pressedKey >= '0' && pressedKey <= '9')
            || [" ", '<', '>', ',', '.', '?', '/', ';', ':', "'", '"', '{', '[', ']', '}', '|', '_', '-', '+', '='].includes(pressedKey)
            || pressedKey == undefined
        ) {
            compareToTypedLetter(CarTextplaceholderText, e.target.value);
            setCarLatter(e.target.value); // store in array pressed letter
        }
    }

    // ___socket.io______________________________________________________________________________

    useEffect(() => {
        socket.on("total_online_player", totalPlayer => console.log(totalPlayer / 2))
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // This line is necessary for Chrome
            if (alert("Are you sure you want to leave? ")) {
                socket.disconnect()
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);


    //   const isStrenger = true;
    useEffect(() => {
        // shere player typing-game-data into the room
        socket.emit("share_data", { User, Room: parseInt(Room), isStrenger })
        socket.on("get_strenger_data", Strenger => {
            isStrenger ? setStrengerData(Strenger) : setFriendData(Strenger)
            console.log("Strenger=====>", Strenger);
        })
    }, [CargameCountDownTimer, User.carMovePoint, StrengerData.carMovePoint])
    
    useEffect(() => {
        if (isStrenger) {
            const strengerCar = document.getElementById("strenger-car");
            strengerCar.style.transform = `translateX(${1.32 * StrengerData.carMovePoint}vw) scale(.7,.6)`;
        }else{
            const strengerCar = document.getElementById("strenger-car");
            strengerCar.style.transform = `translateX(${1.32 * FriendData.carMovePoint}vw) scale(.7,.6)`;
        }
    }, [StrengerData.carMovePoint, FriendData.carMovePoint])
    
    // useEffect(() => {
        // }
    // }, [FriendData.carMovePoint])

    
    useEffect(() => {
        setUser(preData => ({ ...preData, typingGameData: { ...preData.typingGameData, wpm: Math.round(typingTest.word_per_minute) } }))
        setUser(preData => ({ ...preData, typingGameData: { ...preData.typingGameData, acc: Math.round(typingTest.typing_accuracy) } }))
    }, [typingTest.word_per_minute, typingTest.typing_accuracy])
    
    // useEffect(() => {
        //     console.log(User);
        //     socket.on("strenger-joining", strengerData => setStrengerData(strengerData))
        //     // socket.on("take_data", (data) => console.log(data))
        // }, [User, StrengerData])
        // console.log(StrengerData);
        
        
        useEffect(() => {
            let interval;
    if (countDown > 0) {
        interval = setInterval(() => {
            setCountDown((prevSeconds) => prevSeconds - 1);
        }, 1000);
    } else {
        off(2)
    }
    return () => {
        clearInterval(interval);
    };
}, [countDown]);

const playWithFriend = () => {
    // const socket = connectSocketIo()
    // setRoom(0)
    socket.emit("join_room", { name: author.username, Room: parseInt(Room) })
    socket.on("room_full",msg=>toast.warning(msg))
    socket.on("frined_joinded_inRoom", ({ name, Room }) => {
        console.log({ name, Room });
        if (!name || !Room) {
            alert("User Not Found");
        } else {
            on(2);
            setCountDown(3)
            // console.log(roomno);
            setUser((preData) => ({ ...preData, roomNo: Room }))
            setFriendData((preData) => ({ ...preData, username: name }))
            console.log(User);
            console.log(name);
            //start coundown
            socket.emit("initial_share_data", { User, roomno: Room, isStrenger })
            socket.on("friend-joining", friendData => setFriendData(friendData))
        }
    })
    // socket.on("take_data", (data) => console.log(data))
    // socket.emit("join_room", {author.username, Room})
    // socket.on("show_room_id", (data) => alert(data))
}

console.log("FriendData =>>> ", FriendData);

console.log(User);
const playWithStranger = () => {
    // const socket = connectSocketIo()
    setIsStrenger(true)
    console.log(socket.id);
    setUser((preData) => ({ ...preData, id: socket.id }))
    socket.emit("play_with_Stranger", author.username)
    socket.on("connected_room", ({ username, roomno }) => {
        if (!username || !roomno) {
            alert("User Not Found");
        } else {
            on(2);
            setCountDown(5)
            console.log(roomno);
            setUser((preData) => ({ ...preData, roomNo: roomno }))
            setStrengerData((preData) => ({ ...preData, username: username }))
            setRoom(roomno)
            console.log(User);
            console.log(username);
            //start coundown
            socket.emit("initial_share_data", { User, roomno, isStrenger })
            socket.on("strenger-joining", strengerData => setStrengerData(strengerData))
        }
    })
}
console.log(Room);
const focusCargameTyping = () => elemtRef.current.focus();

return (
    <>
        <HelmetProvider>
            <Helmet><title>Car Game || RandomType</title></Helmet>
            <Container maxWidth="xl">
                <NavConfig mode={"car-game-mode"} />
                <div id="overlay2" className='overlay-2 transition'>
                    <div id="text2" className='overlayContent text-center transition mt-40' style={{ fontSize: '10vw' }}>
                        {countDown}
                    </div>
                </div>
                <div id="overlay3" className='overlay-3'>
                    <div id="text3" className='overlayContent text-center glassOnly p-10 shadow'>
                        <span onClick={() => { off(3) }} className="absolute right-0 top-0 text-4xl mx-0 px-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer active:bg-slate-200 duration-100 transition text-black">&times;</span>
                        <h1>Room</h1>
                        <textarea name="name" id="name" className='w-[95%] h-[13%] glass bg_background_color bg-background-color rounded-lg relative top-10 text-sm p-5 text-white resize-none' value={author.username}></textarea>
                        <textarea name="room" id="room" placeholder='Enter Room No.' onChange={(e) => setRoom(e.target.value)} autoFocus={true} cols="30" rows="10" className='w-[95%] h-[13%] glass bg_background_color bg-background-color rounded-lg relative top-10 text-sm p-5 text-white resize-none' value={Room}></textarea>
                        <button className='p-2 text-bnw bghoverActive hover:border-base-color shadow active:scale-95 transition relative bottom-[-80px] text-lg rounded-lg' onClick={() => { off(3); playWithFriend() }} >Join Room</button>
                    </div>
                </div>
                <Box id="display-car-progress" className="mt-2">
                    <NavGameProgressBar Letter={CarLetter} username={author.username} isStrenger={isStrenger} FriendData={FriendData} placeholderText={CarTextplaceholderText} CountDownTimer={CargameCountDownTimer} StrengerData={isStrenger ? StrengerData : FriendData} setCountDownTimer={setCargameCountDownTimer} IncorrectLetter={CargameIncorrectLetter} />
                    <div id='view-carProgress' className='w-11/12 h-52 grid grid-rows-2 gap-0 p-3 bg-white bg-opacity-30 mx-auto mt-1 rounded-xl pl-5'>
                        <div className='flex justify-between pb-3'>
                            <div className='w-full flex items-center border border-0 border-b-2 border-black'>
                                <div className='w-28 text-xl border border-r-2 border-r-white border-0 py-5 font-extrabold'>{isStrenger ? StrengerData.username ? StrengerData.username : 'Strenger' : FriendData.username ? FriendData.username : 'Friend'}</div>
                                <div style={{ width: '200px', height: '200px', fill: '#fff', stroke: 'var(--base_color)', strokeWidth: 6 }} id='strenger-car' className='carMove'>
                                    <Car />
                                </div>
                            </div>
                            <div className='flag' style={{ width: '100px', height: '100px', position: 'relative', bottom: '10px', fill: 'var(--base_color)' }}><Flag /></div>
                        </div>
                        <div className='flex justify-between border border-0 border-t-2 border-white pt-3'>
                            <div className='w-full flex items-center border border-0 border-b-2 border-black'>
                                <div className='w-28 text-xl border border-r-2 border-r-white border-0 py-5 font-extrabold'>{author.username}</div>
                                <div style={{ width: '200px', height: '200px', fill: '#fff', stroke: 'var(--base_color)', strokeWidth: 6 }} id='user-car' className='carMove'>
                                    <Car />
                                </div>
                            </div>
                            <div className='flag' style={{ width: '100px', height: '100px', position: 'relative', bottom: '10px', fill: 'var(--base_color)' }}><Flag /></div>
                        </div>
                    </div>
                </Box>
                <Box id="cargametypingContainer" className="w-11/12 mx-auto mt-1 focus:outline-none h-[22vh] rounded-xl overflow-hidden bg-opacity-40" onClick={() => cargametypingContainer.classList.remove("blur-md")} onBlur={() => cargametypingContainer.classList.add("blur-md")}>
                    <textarea id="cargame-typing" className="rounded-lg bg-blue-300 focus:outline-none resize-none text-3xl w-[100%] h-[100%] caret-transparent text-transparent text-opacity-100 bg-opacity-0 selection:bg-transparent relative z-[-99] transition" style={{ wordBreak: 'break-all', textAlign: 'justify', textJustify: 'inter-word' }} ref={elemtRef} name="cargame-typing" spellCheck="false" onChange={handleCarGameTyping} autoFocus={true} value={CarLetter}></textarea>
                    <div className="cargame-typing-text">
                        <p id="cargame-paragraph" className='rounded-lg bg-orange-300 focus:outline-none resize-none text-3xl w-[100%] h-[100%] caret-transparent select-none relative top-[-30.4vh] bg-opacity-0 pt-16 px-3' style={{ wordBreak: 'break-all', textAlign: 'justify', textJustify: 'inter-word' }} onClick={focusCargameTyping}>
                            {(CarLetter === "" && CarCharIndexNumber === 0) ? <span id='initial-caret2' className="relative ubuntu overflow-hidden transition"><div className="caret absolute w-[.1em] h-[30px] bg-yellow-200 left-0 bottom-0 rounded-sm transition"></div></span> : <span></span>}
                            {
                                CarTextplaceholderText.split("").map((char, index) => (<span key={index} className='gameletter caretline with-animation pt-[-50px] transition-all duration-200 transition'>{char}</span>))
                            }
                        </p>
                    </div>
                </Box>
                <div id='btnGame' className='w-11/12 mx-auto mt-4 flex justify-start gap-x-3'>
                    <button className='btnSetting transition shadow text-bnw scale-100 active:scale-95' style={{ padding: '10px 20px' }} onClick={() => { on(3); setIsStrenger(false) }}>Play With Friend</button>
                    <button className='btnSetting transition shadow text-bnw scale-100 active:scale-95' style={{ padding: '10px 20px' }} onClick={playWithStranger}>Play with Stranger</button>
                </div>
            </Container>
        </HelmetProvider>
    </>
)
}

export default CarGame;