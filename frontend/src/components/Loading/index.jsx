import { AbsoluteSpinner, Spinner } from './styles';

export const Loading = ({ ...rest }) => {
  return <Spinner {...rest}></Spinner>;
};
export const AbsoluteLoading = ({ ...rest }) => {
  return <AbsoluteSpinner {...rest}></AbsoluteSpinner>;
};
