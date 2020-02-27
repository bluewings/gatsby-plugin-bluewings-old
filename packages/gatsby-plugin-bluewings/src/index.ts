import Row from './components/Grid/Row';
import Column from './components/Grid/Column';
import Context from './components/Context';
import Scrollama from './components/Scrollama';
import JsonTree from './components/JsonTree';
import { Provider as DataProvider } from './utils/context';

const Bluewings: any = {};

Bluewings.Row = Row;
Bluewings.Column = Column;
Bluewings.DataProvider = DataProvider;

export { Bluewings, Context, Scrollama, JsonTree };
