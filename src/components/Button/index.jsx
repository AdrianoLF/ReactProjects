import './styles.css'

export const Button = (props) => {
    const {onClick, buttonDisabled} = props
    return (
        <button
            disabled={buttonDisabled}
            className='button-page'
            onClick={onClick}
        >  Carregar Cards
        </button>
    )
}