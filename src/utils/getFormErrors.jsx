const getFormErrors = (...errors) => {
    if( !errors.length ) return;

    const errorItems = errors.map((error) => {
        if( error ) return (
            <p key={error} className='common-form-error'>
                * {error}
            </p>
        )

        return;
    })

    return (
        <div className='common-form-errors'>
            {errorItems}
        </div>
    )
}

export default getFormErrors;
