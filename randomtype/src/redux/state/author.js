console.log("author start");

// let data = {
let data = {
    UserData: {
        data: {
            mode: "simple",
            text: 50,
            time: 30,
            typing_data: {
                total_wpm: [0],
                total_accuracy: [0],
            },
            setting: {
                font: {
                    family: "roboto",
                    size: "6xl"
                },
                caret: {
                    style: "_",
                    smooth: true
                },
                sounds: {
                    volume: "mid",
                    sound: "keybord"
                },
                theme: "black&white",
                intro_animation: true
            }
        }
    }
}

// localStorage.setItem("DBdata", (localStorage.getItem("DBdata")==null)?btoa(data):localStorage.getItem("DBdata"));
export default data;
console.log("author end");