'use client';

import { RootState, useAppDispatch, useAppSelector } from '@/app/AppStore';
import CoinSearch from '@/components/CoinList/CoinSearch';
import { getCoinCurrentPrice } from '@/domains/Coin/Coin.store';
import {
  addTrade,
  updateClosePrice,
  updateCoin,
  updateDateTime,
  updateLeverage,
  updateOpenPrice,
  updatePositionSize,
  updatePositionType,
} from '@/domains/Trade/Trade.store';
import { LONG, PositionType, SHORT, Trade } from '@/domains/Trade/Trade.types';
import { Flex, Text } from '@/ui';
import { calculatePnLFromSize } from '@/utils/price.utils';
import { Button, DatePicker, InputNumber, Select, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const { Option } = Select;

const CurrentPrice = ({ id }: { id: string }) => {
  const currentPrice = useAppSelector((state: RootState) => getCoinCurrentPrice(state, id));
  return <Text>{currentPrice}</Text>;
};

const PnlView = ({ initialRecord, type }: { initialRecord: Trade; type: 'realized' | 'unrealized' }) => {
  const [record, setCurrentRecord] = useState<Trade | undefined>(initialRecord);
  const currentPrice = useAppSelector((state: RootState) => getCoinCurrentPrice(state, initialRecord?.coin));

  useEffect(() => {
    setCurrentRecord(initialRecord);
  }, [initialRecord, currentPrice]);

  if (
    !record ||
    !record.openPrice ||
    !currentPrice ||
    !record.type ||
    !record.positionSize ||
    (type === 'realized' && !record.closePrice)
  ) {
    return <></>;
  } else if (type === 'unrealized' && record.closePrice) {
    return <Text $size={11}>{'Trade Closed'}</Text>;
  }

  return (
    <>
      {type === 'realized' && record.closePrice ? (
        <Text>{calculatePnLFromSize(record.openPrice, record.closePrice, record.positionSize, record.type)}</Text>
      ) : (
        <Text>{calculatePnLFromSize(record.openPrice, currentPrice, record.positionSize, record.type)}</Text>
      )}
    </>
  );
};

const TradeTracker = () => {
  const dispatch = useAppDispatch();
  const trades = useAppSelector((state) => state.trades.trades);

  const handleAddTrade = () => {
    dispatch(addTrade());
  };

  const columns = [
    {
      title: 'Coin',
      dataIndex: 'coin',
      minWidth: 200,
      render: (coin: string, record: Trade) => (
        <CoinSearch
          initialValue={coin}
          onSelect={(result) => dispatch(updateCoin({ id: record.id, coin: result?.name }))}
        />
      ),
    },
    {
      title: 'Date',
      dataIndex: 'dateTime',
      render: (date: string, record: Trade) => (
        <DatePicker
          value={dayjs(date)}
          onChange={(date) => dispatch(updateDateTime({ id: record.id, dateTime: date.toString() }))}
          showTime={{ format: 'HH:mm' }}
        />
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (type: PositionType, record: Trade) => (
        <Select
          placeholder={'Type'}
          defaultValue={type}
          style={{ width: 90 }}
          onSelect={(tradeType) => dispatch(updatePositionType({ id: record.id, type: tradeType }))}
        >
          <Option value={LONG}>LONG</Option>
          <Option value={SHORT}>SHORT</Option>
        </Select>
      ),
    },
    {
      title: 'Leverage',
      dataIndex: 'leverage',
      render: (leverage: number | null, record: Trade) => (
        <InputNumber
          style={{ width: 70 }}
          min={0}
          defaultValue={leverage ?? undefined}
          onBlur={(e) => {
            const val = parseFloat((e.target as HTMLInputElement).value);
            if (!isNaN(val)) {
              dispatch(updateLeverage({ id: record.id, leverage: val }));
            }
          }}
        />
      ),
    },
    {
      title: 'Position Size',
      dataIndex: 'positionSize',
      render: (positionSize: number | null, record: Trade) => (
        <InputNumber
          defaultValue={positionSize ?? undefined}
          onBlur={(e) => {
            const val = parseFloat((e.target as HTMLInputElement).value);
            if (!isNaN(val)) {
              dispatch(updatePositionSize({ id: record.id, positionSize: val }));
            }
          }}
        />
      ),
    },
    {
      title: 'Open Price',
      dataIndex: 'openPrice',
      render: (openPrice: string, record: Trade) => (
        <InputNumber
          defaultValue={openPrice ?? undefined}
          onBlur={(e) => {
            const val = parseFloat((e.target as HTMLInputElement).value);
            if (!isNaN(val)) {
              dispatch(updateOpenPrice({ id: record.id, openPrice: val }));
            }
          }}
        />
      ),
    },
    {
      title: 'Close Price',
      dataIndex: 'closePrice',
      render: (closePrice: number | null, record: Trade) => (
        <InputNumber
          defaultValue={closePrice ?? undefined}
          onBlur={(e) => {
            const val = parseFloat((e.target as HTMLInputElement).value);
            if (!isNaN(val)) {
              dispatch(updateClosePrice({ id: record.id, closePrice: val }));
            }
          }}
        />
      ),
    },
    {
      title: 'Current Price',
      dataIndex: 'currentPrice',
      render: (_unPnl: string, record: Trade) => {
        if (!record.coin) {
          return <></>;
        } else if (record.closePrice) {
          return <Text $size={11}>{'Trade Closed'}</Text>;
        }
        return <CurrentPrice id={record.coin} />;
      },
    },
    {
      title: 'Unrealized PnL',
      render: (_unPnl: string, record: Trade) => <PnlView initialRecord={record} type={'unrealized'} />,
    },
    {
      title: 'Realized PnL',
      render: (_unPnl: string, record: Trade) => <PnlView initialRecord={record} type={'realized'} />,
    },
    { title: 'Notes', dataIndex: 'notes' },
  ];

  return (
    <Flex direction={'column'}>
      <Table rowKey="id" columns={columns} dataSource={trades} pagination={false} />
      <Button type="primary" htmlType="submit" onClick={handleAddTrade}>
        Add Trade
      </Button>
    </Flex>
  );
};

export default TradeTracker;
