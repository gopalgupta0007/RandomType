export const btnGroup = (btnGroupNum, clsName, button) => {
    const buttons = document.querySelectorAll(`.btn-group-${btnGroupNum} .btn`);

    // Remove active class from previous active 
    buttons.forEach(btn => btn.classList.remove(clsName))

    // add active class on click button 
    button.classList.add(clsName);
}

export const togglRTIntroAnimation = (isAnimated) => {
    (isAnimated) ?
        document.getElementById("rtSVG").classList.remove("hidden")
        :
        document.getElementById("rtSVG").classList.add("hidden")
}

export const setThemeOnBody = (themeClsName) =>{
    document.body.classList.value = "";
    document.body.classList.add(`${themeClsName}`) 
}

export const setFavicons = (themeClsName) =>{
    const favicon =  document.getElementById("favicon");
    favicon.href=`favicons/${themeClsName}.ico`
    console.log(favicon.href);
}