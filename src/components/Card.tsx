import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type Item from '@/Types/Item';
import { hexToRgb } from '@/utils/colors';
import { rgbDataURL } from '@/utils/rgbToDataUrl';

type ICardProps = {
  item: Item;
  large?: boolean;
  onClick?(item: Item): any;
};

const Card = ({ item, large = false, onClick }: ICardProps) => {
  const color = hexToRgb(
    (item.bg_colors && item.bg_colors[0]) ||
      (item.item && item.item.bg_colors[0]) ||
      '#0f172a'
  );
  const dataUrl = rgbDataURL(color.r, color.g, color.b);
  const type = Object.prototype.hasOwnProperty.call(item, 'album_id')
    ? 'album'
    : item.type;

  let link = item.link || item.item?.link || '';
  if (type === 'playlist') {
    link = `/playlist/${item.id}`;
  }

  if (type === 'album') {
    link = `/album/${item.id}`;
  }

  const cardContent = (
    <div className="relative scale-95 cursor-pointer  overflow-hidden text-white transition-transform hover:scale-100">
      <Image
        alt={item.song || item.title || item.name}
        layout="intrinsic"
        width={large ? 950 : 350}
        blurDataURL={dataUrl}
        placeholder="blur"
        height={large ? 450 : 350}
        className="rounded-md opacity-80 transition-opacity hover:opacity-100"
        src={item.photo}
      />
      <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-gray-400">
        {item.artist || item.podcast_artist}
      </div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {item.song || item.title || item.name}
      </div>
      <div
        className="absolute top-1 right-1 rounded bg-white p-1 uppercase text-black"
        style={{ fontSize: '9px' }}
      >
        {type}
      </div>
    </div>
  );

  return onClick ? (
    <div onClick={() => onClick(item)}>{cardContent}</div>
  ) : (
    <Link href={link}>{cardContent}</Link>
  );
};

export default Card;
