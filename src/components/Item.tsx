import React, {FC, useState} from 'react';
import styled from 'styled-components';
import {gql} from 'apollo-boost';
import {useLazyQuery} from '@apollo/react-hooks';
import Modal from './modal';

export interface ItemProps {
  image: string;
  name: string;
  id: string;
}

const Container = styled.div`
  padding: 10px;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    border-color: aqua;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: 100%;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
`;

const Name = styled.div`
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
`;

const DetailsImage = styled.img`
  width: 300px;
  height: 300px;
  margin-right: 20px;
  object-fit: contain;
`;

const StatusMsg = styled.div`
  font-size: 18px;
  text-align: center;
`;

const DetailsTitle = styled.h3`
  margin-bottom: 10px;
`;

const GET_POKEMON_DETAILS = gql`
  query PokemonDetails($id: String!){
    pokemon(id: $id){
      maxHP
      maxCP
      resistant
    }
  }
`

const Item: FC<ItemProps> = props => {
  const {id, image, name} = props;
  const [modalState, setModalState] = useState(false);
  const [getPokemonDetails, { loading, error, data }] = useLazyQuery(GET_POKEMON_DETAILS);
  
  const handleClick = (id: string) => {
    getPokemonDetails({ variables: { id: id } })
    setModalState(true);
  }

  return (
    <>
      <Container key={id} onClick={() => handleClick(id)}>
        <ImageContainer>
          <Image src={image} alt={name} />
        </ImageContainer>
        <Name>{name}</Name>
      </Container>

      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        {loading && <StatusMsg>Loading details of <b>{name}...</b></StatusMsg>}
        {error && <StatusMsg>Error! ${error.message}</StatusMsg>}

        {data?.pokemon && (
          <Details>
            <DetailsImage src={image} alt={name} />
            <div>
              <DetailsTitle>{name}</DetailsTitle>
              <div>
                <span role="img" aria-label="Maximum Health">
                  ❤️
                </span>
                MaxHP: {data.pokemon.maxHP}
              </div>
              <div>
                <span role="img" aria-label="Combat Power">
                  ⚔️ 
                </span>
                MaxCP: {data.pokemon.maxCP}
              </div>

              {data.pokemon.resistant.length && (
                data.pokemon.resistant.map((item:string) => (
                  <div key={item}>
                    <span role="img" aria-label="Checkmark">
                      ✅
                    </span>
                    {item} Resistance
                  </div>
                ))
              )}
            </div>
          </Details>
        )}
      </Modal>
    </>
  )
}

export default Item;