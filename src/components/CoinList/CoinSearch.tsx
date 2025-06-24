'use client';

import { useAppDispatch, useAppSelector } from '@/app/AppStore';
import { searchCoins } from '@/domains/Coin/Coin.api';
import { Flex, Image, MarginBox, Text, URL } from '@/ui';
import { AutoComplete, AutoCompleteProps } from 'antd';
import React, { useEffect, useState } from 'react';

const Title: React.FC<Readonly<{ name?: string; symbol: string; thumb: string }>> = (props) => (
  <Flex>
    <Image src={props.thumb} alt={props.name ?? 'symbol icon'} type={URL} />
    <Text>
      {props.name} ({props.symbol.toUpperCase()})
    </Text>
  </Flex>
);

export default function CoinSearch() {
  const dispatch = useAppDispatch();
  const { searchResults, searchLoading } = useAppSelector((state) => state.coins);
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

  return (
    <MarginBox>
      <AutoComplete style={{ width: '100%' }} options={options} onChange={(e) => setQuery(e)} />
    </MarginBox>
  );
}
