import { Box, Container } from "@mui/material";
import { openShortcutList } from "../../Methods/methods";
// import { loadParagraph } from "../Typing/Typing";

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === '?') {
        //if shift + enter key down restart-typing
        openShortcutList()
    }
})


const KeyShortcut = () => {
    const keys = [
        { keyName: "Restart Typing Test", key: { firstKey: "Shift", secondKey: "Enter" } },
        { keyName: "Restart Typing Test", key: { firstKey: "Tab", secondKey: "Enter" } },
        { keyName: "switch button", key: { firstKey: "Tab", secondKey: "Tab" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } }
    ]
    return (
        <>
            <Container maxWidth="xl">
                <Box className="bg-base-color m-10 rounded-lg relative transition">
                    <span onClick={()=>document.getElementById("keyShortcutList").classList.remove("h-screen")} className="absolute right-0 text-4xl mx-0 px-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer active:bg-slate-200 duration-100 transition">&times;</span>
                    <h1 className="p-5 text-3xl text-center border-b-2 border-black text-bnw shortcut-key-heading">Keyboard Shortcuts</h1>
                    <div id="listOfKeys" className="mx-5">
                        {keys.map((k,index) =>( 
                            <div key={index} className="key p-1 flex justify-between text-background-color font-extrabold">
                                <h1>{k.keyName}</h1>
                                <div className='flex text-base-color'>
                                    <kbd>{k.key.firstKey}</kbd><b className="text-background-color">+</b><kbd>{k.key.secondKey}</kbd>
                                </div>
                            </div>
                        ))}
                    </div>
                </Box>
            </Container>
        </>
    )
}

export default KeyShortcut;