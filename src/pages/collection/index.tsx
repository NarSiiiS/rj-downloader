import {
  Button,
  CopyButton,
  LoadingOverlay,
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

type ICollectionProps = {
  data: Item[];
};

const Collection = ({ data }: ICollectionProps) => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCollectionData = async (title: string) => {
    try {
      const collection: Item[] = await fetcher(`/collection?query=${title}`);
      return collection.map((item) => item.link);
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const openModal = async (item: Item) => {
    setLoading(true);
    setSelectedItem(item);
    setDownloadModalOpen(true);
    const collectionLinks = await getCollectionData(item.title);
    setLinks(collectionLinks);
    setLoading(false);
  };

  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.site_name} | Collection`}
          description="Download collection from rj"
        />
      }
    >
      <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6">
        {data.map((item) => (
          <Card key={item.id} item={item} onClick={openModal} />
        ))}
      </div>
      <Modal
        title={selectedItem?.title}
        opened={downloadModalOpen}
        size={750}
        overflow="inside"
        centered={true}
        onClose={() => setDownloadModalOpen(false)}
      >
        <CopyButton value={links ? links.join('\r\n') : ''}>
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
          <LoadingOverlay
            visible={loading}
            overlayOpacity={1}
            overlayColor="#1A1B1E"
            loaderProps={{ color: 'red' }}
          />
          {links?.map((link, index) => (
            <Text key={index}>{link}</Text>
          ))}
        </ScrollArea>
      </Modal>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(`/podcasts?type=shows`);

  return {
    props: { data },
  };
};

export default Collection;
