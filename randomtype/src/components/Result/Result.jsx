import ResultGraph from "./ResultCharts/ResultGraph";
import ReplayIcon from '@mui/icons-material/Replay';

const Result = () => {
	return (
		<>
			<ResultGraph /><br />
			<div id='re-start-logo' className='text-center mt-5'>
				<ReplayIcon className='cursor-pointer text-white rounded-none hover:rounded-md' sx={{ transform: 'scale(1.5)', "&:hover": { transform: 'scale(2)', backgroundColor: 'red' }, transition: 'transform 300ms' }} onClick={(e) => { e.preventDefault(); window.location.reload(); }} />
			</div>
		</>
	);
}

export default Result;