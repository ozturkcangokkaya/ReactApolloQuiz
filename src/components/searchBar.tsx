import React, {FC} from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  onKeyUp: Function;
}

const Input = styled.input`
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  border: 1px solid #ccc;
  height: 50px;
  margin-bottom: 20px;
  padding: 0 20px;
  font-size: 16px;
`;

const SearchBar: FC<SearchBarProps> = props => {
  const {onKeyUp} = props;

  return (
    <Input
      placeholder="Search pokemones by name"
      onKeyUp={(e: React.FormEvent<HTMLInputElement>) => onKeyUp(e.currentTarget.value.toLowerCase())}
    />
  )
}

export default SearchBar;