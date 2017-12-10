import React from 'react';
import {Route, Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import routes from 'helpers/routes';

const findRouteName = (url) => { return routes[url]; };

const getPaths = (pathname) => {
  const paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

const BreadcrumbsItem = ({match}) => {
  const routeName = findRouteName(match.url);
  if (routeName) {
    return (
      match.isExact ?
        (
          <BreadcrumbItem active>{routeName}</BreadcrumbItem>
        ) :
        (
          <BreadcrumbItem>
            <Link to={match.url || ''}>
              {routeName}
            </Link>
          </BreadcrumbItem>
        )
    );
  }
  return null;
};

const Breadcrumbs = ({ location: {pathname} }) => {
  const paths = getPaths(pathname);
  const items = paths.map((path, i) => {
    const uniqueKey = `breadcrumb-${i}`;
    return <Route key={uniqueKey} path={path} component={BreadcrumbsItem} />;
  });
  return (
    <Breadcrumb>
      {items}
    </Breadcrumb>
  );
};

export default (props) => {
  return (
    <div>
      <Route path="/:path" component={Breadcrumbs} {...props} />
    </div>
  );
};
