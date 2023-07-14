// import { Box, Container } from "@mui/material";

// document.addEventListener('keydown', (event) => {
//     if (event.shiftKey && event.key == 'Enter') {
//         //if shift + enter key down restart-typing
//         event.preventDefault(); // Prevent default browser behavior
//         window.location.reload();
//         console.log("shift + enter");
//     }
//     if (event.shiftKey && event.key == '?') {
//         //if shift + enter key down restart-typing
//         event.preventDefault(); // Prevent default browser behavior
//         console.log("shift + ?");
//     }
// })

// const KeyShortcut = () => {

//     const keys = [
//         { keyName: "Restart Typing Test", key: { firstKey: "Shift", secondKey: "Enter" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
//         { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } }
//     ]
//     return (
//         <>
//             <Container maxWidth="xl">
//                 <Box className="bg-white m-10 rounded-lg">
//                     <h1 className="p-5 text-3xl text-center border-b-2 border-black text-uppercase">Keyboard Shortcuts</h1>
//                     <div id="listOfKeys" className="mx-5">
//                         {keys.map((k, index) => (
//                             <div id={index} className="p-1 flex justify-between border-gray-300 border-t-2 hover:bg-slate-100">
//                                 <h1>{k.keyName}</h1>
//                                 <div className='flex'>
//                                     <kbd>{k.key.firstKey}</kbd>+<kbd>{k.key.secondKey}</kbd>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </Box>
//             </Container>
//         </>
//     )
// }

// export default KeyShortcut;



import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";

document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key == 'Enter') {
        //if shift + enter key down restart-typing
        event.preventDefault(); // Prevent default browser behavior
        window.location.reload();
        console.log("shift + enter");
    }
    if (event.shiftKey && event.key == '?') {
        //if shift + enter key down restart-typing
        event.preventDefault(); // Prevent default browser behavior
        console.log("shift + ?");
    }
})

const KeyShortcut = () => {
  const [showKeyShortcuts, setShowKeyShortcuts] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key === "?") {
        setShowKeyShortcuts(!showKeyShortcuts);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showKeyShortcuts]);

    const keys = [
        { keyName: "Restart Typing Test", key: { firstKey: "Shift", secondKey: "Enter" } },
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
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } },
        { keyName: "Reload Page", key: { firstKey: "Ctrl", secondKey: "r" } }
    ]

  return (
    <>
      {showKeyShortcuts && (
        <Container maxWidth="xl">
          <Box className="bg-white m-10 rounded-lg absolute z-50">
            <h1 className="p-5 text-3xl text-center border-b-2 border-black text-uppercase">Keyboard Shortcuts</h1>
            <div id="listOfKeys" className="mx-5">
              {keys.map((k, index) => (
                <div key={index} className="p-1 flex justify-between border-gray-300 border-t-2 hover:bg-slate-100">
                  <h1>{k.keyName}</h1>
                  <div className='flex'>
                    <kbd>{k.key.firstKey}</kbd>+<kbd>{k.key.secondKey}</kbd>
                  </div>
                </div>
              ))}
            </div>
          </Box>
        </Container>
      )}
    </>
  );
};

export default KeyShortcut;
