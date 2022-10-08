import Link from '@material-ui/core/Link';
import { Link as RRouterLink } from 'react-router-dom';

function RouterLink({ children, to, ...props }) {
  return (
    <Link component={RRouterLink} to={to} variant="body2" {...props}>
      {children}
    </Link>
  );
}

export default RouterLink;
