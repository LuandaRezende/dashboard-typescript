import { Toolbar } from '../../shared/components/toolbar/Toolbar';
import { BaseLayout } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <BaseLayout title='Pagina inicial' 
      toolbar={(<Toolbar showInputSearch textNewButton="Nova" />)}>
        testando uiui
    </BaseLayout>
  );
};