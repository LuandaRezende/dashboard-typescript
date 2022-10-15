import { ToolbarList } from '../../shared/components/toolbar-list/ToolbarList';
import { BaseLayout } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <BaseLayout title='Pagina inicial' 
      toolbar={(<ToolbarList showInputSearch textNewButton="Nova" />)}>
        testando uiui
    </BaseLayout>
  );
};