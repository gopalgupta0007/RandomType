import React from 'react'
import { off, setTheme } from '../../../Methods/methods'
import { updateTheme } from '../../../redux/action/Actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { themeBtn } from '../lists/ListOfSetting';

const IndexTheme = () => {
    const dispatch = useDispatch();
    // const [Data, setData] = useState({});
    const author = useSelector(state => state.AuthorReducer)

    const updateThemeDataInDB = async (theme) => {
        // console.log(setting);
        try {
            console.log(author);
            const updateSettingTyping = await axios.patch(`/users/settings/${author.UserData._id}`,
                { ...author.UserData.data.setting, theme: theme },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            ) // for cookie because we have to use axious method to fetch data
            console.log("updateTyping :=> ", updateSettingTyping);
            // console.log(setting);
        } catch (err) {
            console.log(err);
        }
        // console.log(setting);
    }

    return (
        <div id="overlay4" className='overlay-4 transition '>
            <div id="text4" className='text-center transition mt-40 relative z-50' style={{ width: '75vw', margin: 'auto' }}>
                <div className="bg-base-color m-10 rounded-lg relative transition shadow">
                    <span onClick={() => { off(4) }} className="absolute right-0 top-0 text-4xl mx-0 px-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer active:bg-slate-200 duration-100 transition text-black">&times;</span>
                    <h1 className="p-4 text-4xl text-center border-b-2 border-black text-bnw font-extrabold text-background-color">Themes</h1>
                    <div id="listOfTheme" className="mx-5">
                        {themeBtn.map((theme, index) => (
                            <button 
                                className='w-[100%] border-b-2 border-bg-color font-extrabold'
                                tabIndex={`${index}`}
                                onMouseEnter={() => setTheme(theme.name.replace(/ /g, "_").toLowerCase())}
                                onMouseLeave={() => { setTheme(author.UserData.data.setting.theme.replace(/ /g, "_").toLowerCase()) }}
                                onClick={() => { dispatch(updateTheme(theme.name.replace(/ /g, "_").toLowerCase())); off(4); updateThemeDataInDB(theme.name.replace(/ /g, "_").toLowerCase()) }}
                            >
                                <div className='key p-[3px] px-5 flex justify-between text-background-color font-extrabold'>
                                    <div key={index} className="">
                                        <h1>{theme.name}</h1>
                                    </div>
                                    <div className="dotColor flex gap-x-2 items-center">
                                        <div className={`base-color w-4 h-4 rounded-full border-bnw bg-[${theme.colours.base_color}]`}></div>
                                        <div className={`background-color w-4 h-4 rounded-full border-bnw bg-[${theme.colours.bg_color}]`}></div>
                                        <div className={`root-background-color w-4 h-4 rounded-full border-bnw bg-[${theme.colours.root_bg_color}]`}></div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IndexTheme