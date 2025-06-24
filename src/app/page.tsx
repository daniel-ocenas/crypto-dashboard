import CoinList from '@/components/CoinList/CoinList';
import CoinSearch from '@/components/CoinList/CoinSearch';
import { Flex, MarginBox } from '@/ui';
import ResizableBox from '@/ui/ResizableBox/ResizableBox';

export default function Home() {
  return (
    <Flex direction={'column'} align={'center'} justify={'center'}>
      <MarginBox mx={30} my={30}>
        <CoinSearch />
        <ResizableBox>
          <CoinList />
        </ResizableBox>
      </MarginBox>
    </Flex>
  );
}
