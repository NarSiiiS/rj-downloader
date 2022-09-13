import 'swiper/css';
import 'swiper/css/navigation';

import { useViewportSize } from '@mantine/hooks';
import React from 'react';
import { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '@/components/Card';
import type Item from '@/Types/Item';

type IListProps = {
  items: Item[];
  large?: boolean;
};

function List({ items, large = false }: IListProps) {
  const { width } = useViewportSize();
  const slidesPerView = () => {
    if (width > 768) {
      if (large) {
        return 2;
      }
      return 6;
    }

    if (width > 480) {
      if (large) {
        return 1;
      }
      return 4;
    }

    return large ? 1 : 2;
  };

  return (
    <Swiper
      slidesPerView={slidesPerView()}
      spaceBetween={15}
      loop={false}
      navigation={true}
      modules={[Navigation, Virtual]}
      virtual={true}
      centeredSlides={items.length === 1 && large}
    >
      {items.map((item, index) => (
        <SwiperSlide key={item.id || item.name} virtualIndex={index}>
          <Card item={item} large={large} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default List;
