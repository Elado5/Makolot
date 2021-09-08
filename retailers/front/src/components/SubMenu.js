import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <div>
      <div className="sidebarLink" to={item.path} onClick={item.subNav && showSubnav}>
        <hr/>

        <div className="category-section">
          {!subnav && <img alt="dropdown-menu-when-close" className="drop-img-close" src="/images/icons8-chevron-left-96.png" />}
          {subnav && <img alt="dropdown-menu-when-open" className="drop-img-open" src="/images/icons8-expand-arrow-96.png" />}

          <div className="title-icon-section">
            <div className="sidebarLabel">{item.title}</div>
            <img alt="icon-category" className="category-icon" src={item.icon} />
          </div>
        </div>
        <div>
          {item.subNav && subnav ? item.iconOpened
            : item.subNav ? item.iconClosed : null}
        </div>
      </div>
      {subnav &&

        item.subNav.map((item, index) => {
          return (
            <Link className="dropdown-link" to={item.path} key={index}>
              {item.icon}
              <div className="sidebar-label">{item.title}</div>
            </Link>
          );
        })}
    </div>
  );
};
export default SubMenu;