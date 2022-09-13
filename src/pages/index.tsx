import List from '@/components/List';
import ListTitle from '@/components/ListTitle';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import type Item from '@/Types/Item';
import { AppConfig } from '@/utils/AppConfig';
import { fetcher } from '@/utils/fetcher';

const SectionType = {
  header: 'header',
  slider: 'slider',
  grid: 'grid',
  slider_square: 'slider_square',
} as const;

interface ISection {
  id: string;
  type: typeof SectionType[keyof typeof SectionType];
  title: string;
  items?: Item[];
}

type IHomeProps = {
  sections: ISection[];
};

const Index = ({ sections }: IHomeProps) => {
  const currentSection = (section: ISection) => {
    switch (section.type) {
      case SectionType.header:
        return <ListTitle key={section.id} title={section.title} />;
      case SectionType.slider_square:
      case SectionType.grid:
        return section.items && <List key={section.id} items={section.items} />;
      case SectionType.slider:
        return (
          section.items && (
            <List key={section.id} large={true} items={section.items} />
          )
        );
      default:
        return '';
    }
  };

  return (
    <Main
      meta={
        <Meta title={AppConfig.site_name} description={AppConfig.description} />
      }
    >
      {sections
        .filter(
          (section) =>
            !section.id.includes('recently_played') &&
            !section.id.includes('artists')
        )
        .map((section) => currentSection(section))}
    </Main>
  );
};

export async function getServerSideProps() {
  const homeData: { sections: ISection[] } = await fetcher('/home');
  const sections = homeData?.sections;
  const finalSections: ISection[] = [];
  sections.forEach((section) => {
    if (section.type !== SectionType.slider) {
      finalSections.push(section);
      return;
      // push all slider type to one section
    }
    const sliderItem = finalSections.find(
      (item) => item.type === SectionType.slider
    );
    if (!sliderItem) {
      finalSections.push(section);
      return;
    }
    if (sliderItem.items && section.items) {
      sliderItem.items.push(...section.items);
    } else {
      sliderItem.items = section.items;
    }
  });

  // Pass data to the page via props
  return { props: { sections: finalSections } };
}

export default Index;
