import React from 'react'

const Spinner = () => {
    return (
        <div className='spiner_parrent'>
            <div className='spiner'>
                <span className='spinner-border'>
                    <span className='visually-hidden'>Loading...</span>
                </span>
            </div>
        </div>
    )
}

export default Spinner