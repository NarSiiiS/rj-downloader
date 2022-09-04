import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Next.js Boilerplate Presentation"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
    >
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
        corporis dolor eaque enim numquam, optio perferendis quam quibusdam
        quidem quod rem tempora tenetur ut. Esse itaque perspiciatis provident
        qui quia.
      </p>
    </Main>
  );
};

export default Index;
