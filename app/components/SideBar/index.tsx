'use client';

import StampcrushWhiteLogo from '@/public/stampcrush_logo_white.svg';
import {
  Container,
  EmptyContent,
  LabelContent,
  LogoHeader,
  LogoImgWrapper,
  LogoutButton,
  LogoutContainer,
  SideBarContainer,
  SideBarContent,
} from './style';
import { useEffect, useState } from 'react';
import PiBookOpenTextLight from '@/public/book_open_text.svg';
import PiBuildingsLight from '@/public/buildings.svg';
import PiGiftLight from '@/public/gift.svg';
import PiStampLight from '@/public/stamp.svg';
import PiUserListLight from '@/public/user_list.svg';
import { IoIosLogOut } from '@react-icons/all-files/io/IoIosLogOut';

import { useRouter, usePathname } from 'next/navigation';
import { Option, RouterPath } from '@/app/types';
import { ROUTER_PATH } from '@/app/constants';

const SIDE_BAR_OPTIONS: Option[] = [
  { key: '', value: '' },
  { key: '내 고객 목록', value: ROUTER_PATH.customerList },
  { key: '내 카페 관리', value: ROUTER_PATH.manageCafe },
  { key: '쿠폰 제작 및 변경', value: ROUTER_PATH.modifyCouponPolicy },
  { key: '스탬프 적립', value: ROUTER_PATH.enterStamp },
  { key: '리워드 사용', value: ROUTER_PATH.enterReward },
  { key: '', value: '' },
];

const SIDEBAR_ICONS = [
  <></>,
  <PiUserListLight width={26} height={26} key="user-list" />,
  <PiBuildingsLight width={26} height={26} key="user-list" />,
  <PiBookOpenTextLight width={26} height={26} key="user-list" />,
  <PiStampLight width={26} height={26} key="user-list" />,
  <PiGiftLight width={26} height={26} key="user-list" />,
  <></>,
];

const SideBar = () => {
  const router = useRouter();
  const current = usePathname();
  const [isDesignCoupon, setIsDesignCoupon] = useState(false);
  const [isEarnStamp, setIsEarnStamp] = useState(false);
  const [isUseReward, setIsUseReward] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(
    SIDE_BAR_OPTIONS.findIndex((option) => option.value === current) + 1
  );

  const modifyPolicyCoupon = ROUTER_PATH.modifyCouponPolicy;
  const designCouponRoutes = [
    ROUTER_PATH.templateCouponDesign,
    ROUTER_PATH.customCouponDesign,
  ];
  const enterStamp = ROUTER_PATH.enterStamp;
  const stampRoutes = [ROUTER_PATH.earnStamp];
  const enterReward = ROUTER_PATH.enterReward;
  const rewardRoutes = [ROUTER_PATH.useReward];

  useEffect(() => {
    const foundIndex = SIDE_BAR_OPTIONS.findIndex(({ value }) => {
      if (checkIncludeRoute(value, modifyPolicyCoupon, designCouponRoutes)) {
        setIsDesignCoupon(true);
        return true;
      }

      if (checkIncludeRoute(value, enterStamp, stampRoutes)) {
        setIsEarnStamp(true);
        return true;
      }

      if (checkIncludeRoute(value, enterReward, rewardRoutes)) {
        setIsUseReward(true);
        return true;
      }

      return value === current;
    });

    setCurrentIndex(foundIndex + 1);
  }, [current]);

  const handleLogout = () => {
    alert('로그아웃되었습니다');
  };

  const checkIncludeRoute = (
    value: string,
    route: string,
    routes: string[]
  ) => {
    if (value !== route) return false;
    return routes.some((route) => current!.includes(route));
  };

  const routeSideBar = (index: number) => () => {
    if (current === ROUTER_PATH.registerCafe) {
      alert('카페 등록 후 사용하실 수 있는 서비스입니다. 😄');
      return;
    }
    if (index === 0 || index === SIDE_BAR_OPTIONS.length - 1) return;

    setCurrentIndex(index + 1);

    router.push(SIDE_BAR_OPTIONS[index].value);
  };

  const navigateCustomerList = () => {
    router.push(ROUTER_PATH.customerList);
  };

  return (
    <Container>
      <LogoHeader $currentIndex={currentIndex}>
        <LogoImgWrapper>
          <StampcrushWhiteLogo
            width={150}
            height={30}
            onClick={navigateCustomerList}
          />
        </LogoImgWrapper>
      </LogoHeader>
      <SideBarContainer
        $prevIndex={currentIndex - 1}
        $nextIndex={currentIndex + 1}
      >
        {SIDE_BAR_OPTIONS.map(({ key, value }, index) => {
          if (index === 0 || index === SIDE_BAR_OPTIONS.length - 1)
            return <EmptyContent />;
          return (
            <SideBarContent
              key={key}
              $isSelected={
                value === current ||
                (checkIncludeRoute(
                  value,
                  modifyPolicyCoupon,
                  designCouponRoutes
                ) &&
                  isDesignCoupon) ||
                (checkIncludeRoute(value, enterStamp, stampRoutes) &&
                  isEarnStamp) ||
                (checkIncludeRoute(value, enterReward, rewardRoutes) &&
                  isUseReward)
              }
              $currentIndex={index + 1}
            >
              <LabelContent
                $isSelected={
                  value === current ||
                  (checkIncludeRoute(
                    value,
                    modifyPolicyCoupon,
                    designCouponRoutes
                  ) &&
                    isDesignCoupon) ||
                  (checkIncludeRoute(value, enterStamp, stampRoutes) &&
                    isEarnStamp) ||
                  (checkIncludeRoute(value, enterReward, rewardRoutes) &&
                    isUseReward)
                }
                onClick={routeSideBar(index)}
              >
                {SIDEBAR_ICONS[index]}
                {key}
              </LabelContent>
            </SideBarContent>
          );
        })}
      </SideBarContainer>
      <LogoutContainer $currentIndex={currentIndex}>
        <LogoutButton onClick={handleLogout}>
          <IoIosLogOut size="26px" />
          로그아웃
        </LogoutButton>
      </LogoutContainer>
    </Container>
  );
};

export default SideBar;
