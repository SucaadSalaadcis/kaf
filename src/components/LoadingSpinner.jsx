import GridLoader from "react-spinners/GridLoader";

function LoadingSpinner() {
    return (
        <div className='h-screen flex items-center justify-center'>

            <div>
                <GridLoader
                    color="purple"
                    loading={true}
                    size={20}
                    speedMultiplier={2}

                />
            </div>
        </div>
    )
}

export default LoadingSpinner