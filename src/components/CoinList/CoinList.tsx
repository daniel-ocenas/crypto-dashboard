'use client';

import { RootState, useAppDispatch } from '@/app/AppStore';
import { SCoinListWrapper } from '@/components/CoinList/CoinList.styled';
import { fetchCoins } from '@/domains/Coin/Coin.api';
import { Flex, Image, MarginBox, Text, URL } from '@/ui';
import { getChangeColor } from '@/utils/color.utils';
import { nFormatter } from '@/utils/number.utils';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CoinList = () => {
  const dispatch = useAppDispatch();
  const { coins, loading, error } = useSelector((state: RootState) => state.coins);

  useEffect(() => {
    dispatch(fetchCoins());

    // Set up polling every 30s
    const interval = setInterval(() => {
      dispatch(fetchCoins());
    }, 10 * 1000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <SCoinListWrapper>
      {coins.map((coin) => (
        <MarginBox key={coin.id} mb={8}>
          <Flex direction={'row'} wrap={'wrap'}>
            <Flex direction={'column'} justify={'flex-start'}>
              <Flex direction={'row'}>
                <Image src={coin.image} alt={coin.name} type={URL} width={20} height={20} />
                <MarginBox mr={8} />
                <Text color={'black'}>{coin.name}</Text>
              </Flex>
              <Flex direction={'row'}>
                <Text color={'black'} $size={12}>
                  {`Cap: ${nFormatter(coin.market_cap)}`}
                </Text>
                <MarginBox mr={8} />
                <Text color={'black'} $size={12}>
                  {`Vol: ${nFormatter(coin.total_volume)}`}
                </Text>
              </Flex>
            </Flex>
            <Flex direction={'column'} align={'flex-end'}>
              <Text color={'black'}>${coin.current_price.toFixed(2)}</Text>
              <Flex direction={'row'}>
                <Text color={'black'} $size={12}>
                  {`Change 24h:`}{' '}
                </Text>
                <Text color={getChangeColor(coin.price_change_percentage_24h)} $size={12}>
                  {`${coin.price_change_percentage_24h.toFixed(2)}%`}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </MarginBox>
      ))}
    </SCoinListWrapper>
  );
};

export default CoinList;
