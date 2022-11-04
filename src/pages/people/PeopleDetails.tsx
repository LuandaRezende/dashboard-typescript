import { useParams } from 'react-router-dom';

export const PeopleDetails: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
    
  return (
    <p>detalhe de pessoas  {id}</p>
  );
};