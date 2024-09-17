import SpinnerGif from '../assets/spinner3.gif';

const Spinner = () => {
    return (
        <>
        <img src={SpinnerGif}  alt="loading" className='d-block m-auto' style={{width:"200px"}}/>
        </>
    )
}

export default Spinner;