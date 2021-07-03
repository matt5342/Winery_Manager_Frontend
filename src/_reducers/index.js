import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { authentication } from './authentication.reducer';
import { lots } from './lots.reducer';
import { registration } from './registration.reducer';
import { sections } from './sections.reducer';
import { tanks } from './tanks.reducer';
import { users } from './users.reducer';
import { workOrders } from './workOrders.reducer';

const rootReducer = combineReducers({
    alert,
    authentication,
    lots,
    registration,
    sections,
    tanks,
    users,
    workOrders
});

export default rootReducer;