console.log("author start");

let data = {
    UserData:{
        data:{
            mode: "simple",
            text: 50,
            time: 30,
            typing_data: {
                total_wpm: [0],
                total_accuracy: [0],
            },
            setting: {
                font: {
                    family: "Roboto",
                    size: "5xl"
                },
                caret: {
                    style: "_",
                    smooth: true
                },
                sounds: {
                    volume: 1,
                    sounds: "keybord"
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