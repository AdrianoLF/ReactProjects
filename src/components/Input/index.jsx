import './styles.css'

export const SearchInput = ({ handleInputChange, searchInputValue }) => {
    return (
        <input
            onChange={handleInputChange}
            value={searchInputValue}
            id='input'
            type='search'
            placeholder='Escreva sua busca' >
        </input >
    )
}

