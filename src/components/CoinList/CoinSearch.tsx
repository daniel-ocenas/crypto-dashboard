'use client';

import { useAppDispatch, useAppSelector } from '@/app/AppStore';
import { searchCoins } from '@/domains/Coin/Coin.api';
import { CoinSearchResult } from '@/domains/Coin/Coin.types';
import { Flex, Image, Loader, MarginBox, Text, URL } from '@/ui';
import { AutoComplete, AutoCompleteProps, Input } from 'antd';
import React, { useEffect, useState } from 'react';

interface CoinSearchProps {
  initialValue?: string;
  onSelect: (coinSearchResult?: CoinSearchResult) => void;
}

const Title: React.FC<Readonly<{ name?: string; symbol: string; thumb: string }>> = (props) => (
  <Flex>
    <Image src={props.thumb} alt={props.name ?? 'symbol icon'} type={URL} />
    <MarginBox mr={3} />
    <Text>
      {props.name} ({props.symbol.toUpperCase()})
    </Text>
  </Flex>
);

const CoinSearch = ({ initialValue, onSelect }: CoinSearchProps) => {
  const dispatch = useAppDispatch();
  const { searchResults, searchLoading } = useAppSelector((state) => state.coins);
  const [selectedCoin, setSelectedCoin] = useState<CoinSearchResult | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string | undefined>(initialValue);
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState<AutoCompleteProps['options']>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 1) {
        dispatch(searchCoins(query));
      }
    }, 400); // debounce input

    return () => clearTimeout(timeout);
  }, [query, dispatch]);

  useEffect(() => {
    setOptions(
      searchResults.map((result) => {
        return {
          label: <Title name={result.name} symbol={result.symbol} thumb={result.thumb} />,
          value: result.name,
        };
      }),
    );
  }, [searchResults]);

  const onResultSelect = (name: string) => {
    const coinResult = searchResults.find((i) => i.name === name);
    setSelectedCoin(coinResult);
    setInputValue(coinResult?.name);
    onSelect(coinResult);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCoin(undefined);
    setQuery(event.target.value);
  };

  return (
    <MarginBox>
      <Flex direction={'row'}>
        <AutoComplete value={inputValue} style={{ width: '100%' }} options={options} onSelect={onResultSelect}>
          <Input value={inputValue} onChange={onInputChange} variant={selectedCoin ? 'borderless' : 'outlined'} />
        </AutoComplete>
        {searchLoading && <Loader />}
      </Flex>
    </MarginBox>
  );
};

export default CoinSearch;
