import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';

import { Customer, CustomerOrderOption, Option } from '@/app/types';
import {
  Container,
  CustomerContainer,
  EmptyCustomers,
  RegisterTypeTab,
  TabContainer,
} from '../components/CustomerList/style';
import Text from '@/components/Text';

import SelectBox from '@/components/SelectBox';
import Customers from '@/components/CustomerList/Customers';
import { API_BASE_URL } from '@/app/constants';

const inter = Inter({ subsets: ['latin'] });

const CUSTOMERS_ORDER_OPTIONS: CustomerOrderOption[] = [
  {
    key: 'stampCount',
    value: '스탬프순',
  },
  {
    key: 'rewardCount',
    value: '리워드순',
  },
  {
    key: 'visitCount',
    value: '방문횟수순',
  },
  { key: 'recentVisitDate', value: '최근방문순' },
];

const REGISTER_TYPE_OPTION: Option[] = [
  { key: 'all', value: '전체' },
  { key: 'register', value: '회원' },
  { key: 'temporary', value: '임시' },
];

type Props = {
  customers: Customer[];
};

export default function Home({ customers }: Props) {
  const [customerData, setCustomerData] = useState<Customer[]>([]);

  const [registerType, setRegisterType] = useState<Option>({
    key: 'all',
    value: '전체',
  });

  const [orderOption, setOrderOption] = useState({
    key: 'stampCount',
    value: '스탬프순',
  });
  /** TODO: 필터링 기능 구현 */
  // useEffect(() => {
  //   let filteredData = [...customers];

  //   switch (orderOption.key) {
  //     case 'stampCount':
  //       filteredData.sort((a, b) => a.stampCount - b.stampCount);
  //       break;
  //     case 'rewardCount':
  //       filteredData.sort((a, b) => a.rewardCount - b.rewardCount);
  //       break;
  //     case 'visitCount':
  //       filteredData.sort((a, b) => a.visitCount - b.visitCount);
  //       break;
  //     case 'recentVisitDate':
  //       filteredData.sort((a, b) =>
  //         a.recentVisitDate < b.recentVisitDate
  //           ? -1
  //           : a.recentVisitDate > b.recentVisitDate
  //           ? 1
  //           : 0
  //       );
  //       break;
  //   }

  //   switch (registerType.key) {
  //     case 'all':
  //       break;
  //     case 'register':
  //       filteredData.filter((customer) => customer.isRegistered);
  //       console.log(filteredData);
  //       break;
  //     case 'temporary':
  //       filteredData.filter((customer) => !customer.isRegistered);
  //       console.log(filteredData);

  //       break;
  //   }

  //   setCustomerData(filteredData);

  //   console.log(customerData);
  // }, [orderOption, registerType]);

  const registerTypeKey = registerType.key === 'all' ? null : registerType.key;

  const changeRegisterType = (registerType: Option) => () => {
    setRegisterType(registerType);
  };

  return (
    <CustomerContainer>
      <Text variant="pageTitle">내 고객 목록</Text>
      <Container>
        <TabContainer>
          {REGISTER_TYPE_OPTION.map((option) => (
            <RegisterTypeTab
              key={option.key}
              $isSelected={registerType.key === option.key}
              onClick={changeRegisterType(option)}
            >
              {option.value}
            </RegisterTypeTab>
          ))}
        </TabContainer>
        <SelectBox
          options={CUSTOMERS_ORDER_OPTIONS}
          checkedOption={orderOption}
          setCheckedOption={setOrderOption}
        />
      </Container>
      {customers.length === 0 ? (
        <EmptyCustomers>
          <span>NO RESULT 🥲</span> 아직 고객이 없어요! <br />
          카페를 방문한 고객에게 스탬프를 적립해 보세요.
        </EmptyCustomers>
      ) : (
        <Customers registerTypeOption={registerType} customers={customers} />
      )}
    </CustomerContainer>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_BASE_URL}/api/customers`);
  const customers = await res.json();

  return {
    props: {
      customers,
    },
  };
}
