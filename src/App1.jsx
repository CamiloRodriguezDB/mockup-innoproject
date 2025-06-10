import '@db-ui/core/dist/css/enterprise/db-ui-core.vars.css';
import './App.css';

import {
  DbBrand,
  DbFooter,
  DbHeader,
  DbLink,
  DbMainnavigation,
  DbPage
} from '@db-ui/react-elements';

import { navigationItems } from './components/navigation/items';
import { Link, Outlet } from 'react-router-dom';

function App1() {
  return (
    <DbPage>
      <DbHeader slot="header">
        <DbBrand src={`${import.meta.env.BASE_URL}db_logo.svg`} href="/">
          DB Innovation Project: Risk Management Tool
        </DbBrand>
      </DbHeader>

      <DbFooter slot="footer" border>
        DB Engineering and Consulting, Bogotá
      </DbFooter>
    </DbPage>
  );
}

export default App1;
