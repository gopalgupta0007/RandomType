import author from "../state/author"
// const AuthorReducer = (state = JSON.parse(localStorage.getItem("authorId")), action) => {
// intially author data store in localStorage
console.log("authorReducer");
// const AuthorReducer = (state=JSON.parse(atob(localStorage.getItem("DBdata"))), action) => {
const AuthorReducer = (state = author, action) => {
    // console.log(state);
    // console.log("reducer is running => ", state);
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                UserData: action.payloadData
            }
        case "SET_MODE_MODE":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        mode: action.payloadMode
                    }
                }
            }
        case "SET_MODE_TEXT":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        text: action.payloadMode
                    }
                }
            }
        case "SET_MODE_TIME":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        time: action.payloadMode
                    }
                }
            }
        case "UPDATE_MESSAGE":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        message: action.payloadMsg
                    }
                }
            }
        case "UPDATE_FONTFAMILY":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        setting: {
                            ...state.UserData.data.setting,
                            font: {
                                ...state.UserData.data.setting.font,
                                family: action.payloadSetting
                            }
                        }
                    }
                }
            }
        case "UPDATE_FONTSIZE":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        setting: {
                            ...state.UserData.data.setting,
                            font: {
                                ...state.UserData.data.setting.font,
                                size: action.payloadSetting
                            }
                        }
                    }
                }
            }
        case "UPDATE_CARETSTYLE":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        setting: {
                            ...state.UserData.data.setting,
                            caret: {
                                ...state.UserData.data.setting.caret,
                                style: action.payloadSetting
                            }
                        }
                    }
                }
            }
        case "TOGGLE_CARET_SMOOTH":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        setting: {
                            ...state.UserData.data.setting,
                            caret: {
                                ...state.UserData.data.setting.caret,
                                smooth: action.payloadSetting
                            }
                        }
                    }
                }
            }
        case "UPDATE_SOUNDVOLUME":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        setting: {
                            ...state.UserData.data.setting,
                            sounds: {
                                ...state.UserData.data.setting.sounds,
                                volume: action.payloadSetting
                            }
                        }
                    }
                }
            }
        case "UPDATE_SOUNDTYPE":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        setting: {
                            ...state.UserData.data.setting,
                            sounds: {
                                ...state.UserData.data.setting.sounds,
                                sound: action.payloadSetting
                            }
                        }
                    }
                }
            }
        case "UPDATE_THEME":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        setting: {
                            ...state.UserData.data.setting,
                            theme: action.payloadSetting
                        }
                    }
                }
            }
        case "RESET_SETTING":
            // let {font, caret, sounds, theme, intro_animation} = action.payloadResetSetting;
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        setting: {
                            ...state.UserData.data.setting,
                            font : action.payloadResetSetting.font,
                            caret : action.payloadResetSetting.caret,
                            sounds : action.payloadResetSetting.sounds,
                            theme : action.payloadResetSetting.theme,
                            intro_animation : action.payloadResetSetting.intro_animation,
                        }
                    }
                }
            }
        case "TOGGLE_ANIMATION":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        setting: {
                            ...state.UserData.data.setting,
                            intro_animation: action.payloadSetting
                        }
                    }
                }
            }
        default: return state;
    }
}

export default AuthorReducer;
