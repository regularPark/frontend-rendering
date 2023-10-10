import { NextResponse } from 'next/server';
import getCustomerData from '../../mocks/customers';

const customers = [
  {
    id: 1,
    nickname: '레오',
    stampCount: 3,
    rewardCount: 12,
    visitCount: 30,
    maxStampCount: 10,
    firstVisitDate: '2023:01:01',
    isRegistered: true,
    recentVisitDate: '2023:01:01',
  },
  {
    id: 2,
    nickname: '윤생',
    stampCount: 5,
    rewardCount: 1,
    visitCount: 3,
    maxStampCount: 10,
    firstVisitDate: '2023:04:07',
    isRegistered: false,
    recentVisitDate: '2023:08:09',
  },
];

export async function GET() {
  // const customerData = getCustomerData.getCustomers();
  // console.log(customerData, 'customerData');
  // console.log(NextResponse.json(customerData));
  return NextResponse.json(customers);
}
