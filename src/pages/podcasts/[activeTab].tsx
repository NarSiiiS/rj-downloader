import { Tabs } from '@mantine/core';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import Card from '@/components/Card';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type Item from '@/Types/Item';
import { AppConfig } from '@/utils/AppConfig';
import { fetcher } from '@/utils/fetcher';

type IPodcastsProps = {
  data: Item[];
};

const ActiveTab = ({ data }: IPodcastsProps) => {
  const router = useRouter();
  const activeTab = router.query.activeTab as string;

  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.site_name} | Podcasts`}
          description="Download podcasts from rj"
        />
      }
    >
      <Tabs
        defaultValue="gallery"
        value={activeTab}
        color="red"
        variant="pills"
        onTabChange={(value) => router.push(`/podcasts/${value}`)}
        styles={(theme) => ({
          tab: {
            '&:hover': {
              background: theme.colors.red?.[7],
              color: theme.white,
            },
          },
        })}
      >
        <Tabs.List grow={true}>
          <Tabs.Tab value="popular">Popular</Tabs.Tab>
          <Tabs.Tab value="dance">Dance</Tabs.Tab>
          <Tabs.Tab value="featured">Featured</Tabs.Tab>
          <Tabs.Tab value="talk">Talk</Tabs.Tab>
          <Tabs.Tab value="shows">Shows</Tabs.Tab>
        </Tabs.List>

        {activeTab && (
          <Tabs.Panel value={activeTab} pt="xs">
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-6">
              {data.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
          </Tabs.Panel>
        )}
      </Tabs>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const activeTab = context.params?.activeTab;
  const data = await fetcher(`/podcasts?type=${activeTab}`);

  return {
    props: { data },
  };
};

export default ActiveTab;
