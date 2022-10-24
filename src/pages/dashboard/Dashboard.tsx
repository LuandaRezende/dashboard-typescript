import { ToobarDetail } from '../../shared/components/toobar-detail/ToobarDetail';
import { BaseLayout } from '../../shared/layouts';

export const Dashboard = () => {
  return (
    <BaseLayout title='Pagina inicial' 
      toolbar={(<ToobarDetail showSaveCloseButton showNewButton showSaveCloseButtonLoading />)}>
        testando uiui
    </BaseLayout>
  );
};