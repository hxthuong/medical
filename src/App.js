import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import { Fragment } from 'react';
import Login from './pages/Login';
import { loadFromLocalStorage } from './utils/localStorageRequest';
import { getRoutesByRole } from './config/roles';
import { useDispatch } from 'react-redux';
import { editAccount } from './thunks/accounts';

function App() {
    const dispatch = useDispatch();
    const handleOffline = (value) => {
        let formData = new FormData();
        const request = { ...value, online: false };
        formData.append('Data', JSON.stringify(request));
        formData.append('Files', null);
        dispatch(editAccount(formData));
    };
    const login = loadFromLocalStorage('user', handleOffline) ?? null;
    const role = login && login.user ? login?.user?.role : null;
    const routes = getRoutesByRole(role);

    let Component = (
        <div className="App">
            <Login />
        </div>
    );

    if (login && login.isLogin) {
        Component = (
            <Router>
                <div className="App">
                    <Routes>
                        {routes.map((route, index) => {
                            const Page = route.component;
                            let Layout = !route.layout
                                ? DefaultLayout
                                : route.layout === null
                                ? Fragment
                                : route.layout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout title={route.title}>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        );
    }

    return Component;
}

export default App;
