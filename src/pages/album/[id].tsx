import {
  Button,
  CopyButton,
  Image,
  Modal,
  ScrollArea,
  Text,
} from '@mantine/core';
import type { GetServerSideProps } from 'next';
import React, { useState } from 'react';

import Card from '@/components/Card';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type AlbumItem from '@/Types/AlbumItem';
import { AppConfig } from '@/utils/AppConfig';
import { fetcher } from '@/utils/fetcher';

type IAlbumProps = {
  data: AlbumItem;
};

const Album = ({ data }: IAlbumProps) => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const allLinks = data.album_tracks?.map((item) => item.link);

  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.site_name} | Album`}
          description="Download album from rj"
        />
      }
    >
      <div className="mt-4 flex flex-row items-center justify-between">
        <div className="flex basis-1/2 items-center gap-3">
          <Image width={100} alt={data.album_album} src={data.thumbnail} />
          <div>
            <div className="text-2xl text-white">{data.album_album}</div>
            <div className="text-base text-white">{data.album_artist}</div>
          </div>
        </div>
        <div className="basis-1/3">
          <Button
            fullWidth={true}
            color="red"
            className="bg-red-600 text-white"
            onClick={() => setDownloadModalOpen(true)}
          >
            Download Album
          </Button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6">
        {data.album_tracks?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <Modal
        title={data.album_album}
        opened={downloadModalOpen}
        size={750}
        overflow="inside"
        centered={true}
        onClose={() => setDownloadModalOpen(false)}
      >
        <CopyButton value={allLinks ? allLinks.join('\r\n') : ''}>
          {({ copied, copy }) => (
            <Button
              className="mb-4 bg-blue-600 text-white"
              fullWidth={true}
              onClick={copy}
            >
              {copied ? 'Copied' : 'Copy To Clipboard'}
            </Button>
          )}
        </CopyButton>
        <ScrollArea style={{ height: '500px' }}>
          {allLinks?.map((link, index) => (
            <Text key={index}>{link}</Text>
          ))}
        </ScrollArea>
      </Modal>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const data = await fetcher(`/mp3/?id=${id}`);

  return {
    props: { data },
  };
};

export default Album;
