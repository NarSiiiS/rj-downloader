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
import type Item from '@/Types/Item';
import { AppConfig } from '@/utils/AppConfig';
import { fetcher } from '@/utils/fetcher';

type IPlaylistProps = {
  data: Item;
};

const Playlist = ({ data }: IPlaylistProps) => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const allLinks = data.items?.map((item) => item.link);

  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.site_name} | Playlist`}
          description="Download playlist from rj"
        />
      }
    >
      <div className="mt-4 flex flex-row items-center justify-between">
        <div className="flex basis-1/2 items-center gap-3">
          <Image width={100} alt={data.title} src={data.thumbnail} />
          <div>
            <div className="text-2xl text-white">{data.title}</div>
            <div className="text-sm text-white">
              <span>{data.items_count} Songs</span>
              <span> | </span>
              <span>{data.created_by}</span>
            </div>
          </div>
        </div>
        <div className="basis-1/3">
          <Button
            fullWidth={true}
            color="red"
            className="bg-red-600 text-white"
            onClick={() => setDownloadModalOpen(true)}
          >
            Download Playlist
          </Button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6">
        {data.items?.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
      <Modal
        title={data.title}
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
  const data = await fetcher(`/playlist/?id=${id}`);

  return {
    props: { data },
  };
};

export default Playlist;
