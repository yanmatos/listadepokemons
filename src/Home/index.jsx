import { useEffect, useState } from 'react'

export function Home() {
    const [pokemonList, setPokemonList] = useState([])
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(105)


    useEffect(() => {
        const intersectionObserverPokemon = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                setLimit(state => state + 100)
            }
        })

        intersectionObserverPokemon.observe(document.querySelector('.end'))

        return () => intersectionObserverPokemon.disconnect()

    }, [])


    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
            .then(response => response.json())
            .then(data => setPokemonList(data.results))

    }, [limit])

    const filteredList = search.length > 0
        ? pokemonList.filter(pokemon => pokemon.name.includes(search))
        : []


    return (
        <div>
            <input type="text"
                placeholder='Buscar Pokemon'
                onChange={event => setSearch(event.target.value)}
                value={search}
            />
            {search.length > 0 ? (
                <ul>
                    {filteredList.map(pokemon => {
                        return (
                            <li key={pokemon.name}>
                                {pokemon.name}
                            </li>
                        )

                    })}
                </ul>
            ) : (
                <ul>
                    {pokemonList.map(pokemon => {
                        return (
                            <li key={pokemon.name}>
                                {pokemon.name}
                            </li>
                        )

                    })}
                </ul>
            )
            }
            <div className = 'end'></div>
        </div>
    )
}