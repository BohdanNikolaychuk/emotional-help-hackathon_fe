export const createFormErrors = (errors, isTouched ) => {
    if( !errors || !errors.length || !isTouched ) return;

    const errorItems = errors.map((error) =>
        <li key={error} className='input-error'>{error}</li>
    )

    return (
        <div className='input-errors'>
            <span className='input-icon'>!</span>
            <ul className='input-error-list'>
                {errorItems}
            </ul>
        </div>
    );
}

export default createFormErrors;
