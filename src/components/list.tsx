import React, {FC} from 'react';
import styled from 'styled-components';
import Item, {ItemProps} from './Item';

interface ListProps {
  items: ItemProps[];
}
 
const Wrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-gap: 20px;
`;

const List: FC<ListProps> = props => {
  const {items} = props;

  return (
    <Wrapper>
      {items.map((pokemon:ItemProps) => (
				<Item
					key={pokemon.id}
					id={pokemon.id}
					name={pokemon.name}
					image={pokemon.image}
				/>
			))}
    </Wrapper>
  )
}

export default List;