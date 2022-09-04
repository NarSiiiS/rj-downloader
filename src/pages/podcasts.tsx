import React from 'react';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Podcasts = () => {
  return (
    <Main
      meta={
        <Meta
          title={`${AppConfig.site_name} | Podcasts`}
          description="Download podcasts from rj"
        />
      }
    >
      <div></div>
    </Main>
  );
};

export default Podcasts;
