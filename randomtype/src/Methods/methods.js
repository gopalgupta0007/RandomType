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