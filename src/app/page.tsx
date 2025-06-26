import CoinList from '@/components/CoinList/CoinList';
import TradeTracker from '@/components/TradeTracker/TradeTracker';
import { Flex, MarginBox } from '@/ui';
import ResizableBox from '@/ui/ResizableBox/ResizableBox';

export default function Home() {
  return (
    <MarginBox mx={30} my={30}>
      <Flex direction={'column'} align={'center'} justify={'space-evenly'} wrap={'wrap'}>
        <Flex direction={'row'}>
          <MarginBox mt={16} />
          <ResizableBox>
            <CoinList />
          </ResizableBox>
        </Flex>
        <MarginBox mt={64} />
        <Flex>
          <TradeTracker />
        </Flex>
      </Flex>
    </MarginBox>
  );
}
