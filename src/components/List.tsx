import 'swiper/css';
import 'swiper/css/navigation';

import React from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Card from '@/components/Card';
import type Item from '@/Types/Item';

type IListProps = {
  items: Item[];
};

function List({ items }: IListProps) {
  return (
    <Swiper
      slidesPerView={6}
      spaceBetween={15}
      loop={false}
      navigation={true}
      modules={[Navigation]}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id || item.name}>
          <Card item={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default List;
