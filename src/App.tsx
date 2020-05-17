import React, {useState} from 'react';
import styled from 'styled-components';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import List from './components/list';
import SearchBar from './components/searchBar';
import {ItemProps} from './components/Item';

const GET_POKEMONS = gql`
	{
		pokemons(first: 48){
			id
			name
			image
		}
	}
`;

const AppContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InfoMessage = styled.h3`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  margin: 0;
`;

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const {loading, error} = useQuery(GET_POKEMONS, {
    onCompleted: data => setPokemons(data.pokemons)
  });

  if (loading) return <InfoMessage>Loading Pokemons...</InfoMessage>;
  if (error) return <InfoMessage>Error! ${error.message}</InfoMessage>;

	return (
    <AppContainer>
      <SearchBar onKeyUp={setSearchValue} />
      <List items={pokemons.filter((pokemon:ItemProps) => pokemon.name.toLowerCase().includes(searchValue))} />
    </AppContainer>
	)
}

export default App;
