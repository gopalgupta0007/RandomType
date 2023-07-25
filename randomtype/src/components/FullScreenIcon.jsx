import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useState } from 'react';

const FullScreenIcon = ({styleProp}) => {
    const [IconVisibility, setIconVisibility] = useState(false);

    var elem = document.documentElement;
    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
        setIconVisibility(!IconVisibility)
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        setIconVisibility(!IconVisibility)
    }
    return (
        <>
            <div id="fullScreen" className="text-white hover:text-gray-200 mb-[20px] mt-12 mr-12 scale-[2] hover:scale-[2.2] transition-transform duration-300"  >
                {(IconVisibility) ? <FullscreenExitIcon sx={styleProp} onClick={closeFullscreen} /> : <FullscreenIcon sx={styleProp} onClick={openFullscreen} />}
            </div>
        </>
    )
}

export default FullScreenIcon;