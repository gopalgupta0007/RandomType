export const btnGroup = (btnGroupNum, clsName, button) => {
    const buttons = document.querySelectorAll(`.btn-group-${btnGroupNum} .btn`);

    // Remove active class from previous active 
    buttons.forEach(btn => btn.classList.remove(clsName))

    // add active class on click button 
    button.classList.add(clsName);
}

export const no_of_test = (index) => {
    const myArray = [];
    for (let i = 0; i <= index + 1; i++) myArray.push(i);
    return myArray
}

export const togglRTIntroAnimation = (isAnimated) => {
    (isAnimated) ?
        document.getElementById("rtSVG").classList.remove("hidden")
        :
        document.getElementById("rtSVG").classList.add("hidden")
}

export const setThemeOnBody = (themeClsName) => {
    document.body.classList.value = "";
    document.body.classList.add(`${themeClsName}`)
}

export const setFavicons = (themeClsName) => {
    const favicon = document.getElementById("favicon");
    favicon.href = `favicons/${themeClsName}.ico`
    console.log(favicon.href);
}

export const on = (overlayNum) => {
    document.querySelector(".overlay-" + overlayNum).style.display = "block";
}

export const off = (overlayNum) => {
    document.querySelector(".overlay-" + overlayNum).style.display = "none";
}

export function compareTo(text1, text2) {
    console.log(`\'${text1}\' == \'${text2}\'`);
    if ((text1.length === text2.length) && (text1 === text2)) { return true }
    else { return false }
}

export function copyInClipboard(data, success, fail) {
    // Use the Clipboard API to copy the text to the clipboard
    console.log(data);
    navigator.clipboard.writeText(JSON.stringify(data))
        .then(function () {
            console.log("Text copied to clipboard:", data);
            success("Data Copied In Clipboard")
            // add toast alert
        })
        .catch(function (err) {
            console.error("Unable to copy text to clipboard:", err);
            fail("Data Not Copied, something wrong")
            // add toast alert
        });
}

export function getColor(colorCls) {
    switch (colorCls) {
        case "yellow":
            return "rgb(250, 250, 0)";
        case "cherry red":
            return "rgb(247, 2, 42)"
        case "jungle":
            return "rgb(0, 177, 0)"
        case "ibm":
            return "rgb(0, 81, 255)"
        case "indigo blue":
            return "rgb(102, 0, 255)"
        case "tomato":
            return "rgb(255, 0, 0)"
        case "bw":
            return "rgb(255, 255, 255)"
        case "magenta":
            return "rgb(204, 51, 139)"
        case "blush pink":
            return "rgb(254, 130, 140)"
        case "fuchsia":
            return "rgb(255, 0, 255)"
        case "kidman":
            return "rgb(255, 218, 222)"
        case "tangelo":
            return "rgb(255, 149, 0)"
        case "lavender grey":
            return "rgb(189, 187, 215)"
        case "lime":
            return "rgb(0, 255, 0)"
        case "vegetable":
            return "rgb(0, 150, 0)"
        case "aqua":
            return "rgb(10, 255, 255)"
        case "violet":
            return "rgb(160, 0, 255)"
        case "turquoise":
            return "rgb(0, 255, 187)"
        case "blue":
            return "rgb(0, 47, 255)"
        case "mahogany":
            return "rgb(192, 64, 0)"
        default:
            return "rgb(255, 0, 0)"
    }
}

export function setTheme(themeCls) {
    setThemeOnBody(themeCls)
    setFavicons(themeCls)
}

export const getAvg = (arr) => {
    const sum = arr.reduce((acc, num) => acc + num, 0);;
    const arrCount = arr.length;
    console.log(sum / arrCount);
    return sum / arrCount;
}

export function openShortcutList() {
    const keyShortcutList = document.getElementById('keyShortcutList')
    if (keyShortcutList.classList.contains("h-screen")) {
        keyShortcutList.classList.remove("h-screen");
        return 0;
    }
    keyShortcutList.classList.add("h-screen")
}

export function countdownTimerOfGame(countdown = 60, countDownType, setCountdown) {
    if (countDownType === "introCountDown") {
        if (countdown > 0) {
            var interval = setInterval(() => {
                setCountdown((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else {
            off(2)
        }
        return interval;
    } else {
        if (countdown >= 0 && countdown) {
            var interval2 = setInterval(() => {
                setCountdown((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }
        return interval2;
    }
}