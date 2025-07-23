import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DefaultLayout } from './layouts';
import { Fragment, useEffect } from 'react';
import Login from './pages/Login';
import { loadFromLocalStorage } from './utils/localStorageRequest';
import { getRoutesByRole } from './config/roles';
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from './thunks/accounts';

function App() {
    const dispatch = useDispatch();

    const handleOffline = (value) => {
        dispatch(loginAccount({ username: value?.user?.username, password: '' }));
    };

    const { account, login } = useSelector((state) => state.accounts);

    useEffect(() => {
        const loginData = loadFromLocalStorage('user', handleOffline) ?? null;
        dispatch(loginAccount({ username: loginData?.user?.username, password: loginData?.user?.password }));
    }, [dispatch]);

    //sự kiện khi đóng trình duyệt
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            // event.returnValue = ''; // Hiển thị hộp thoại xác nhận (tùy trình duyệt)

            const blob = new Blob([JSON.stringify({ username: account?.username, password: '' })], {
                type: 'application/json',
            });

            navigator.sendBeacon('http://localhost:6001/api/Users/Login', blob);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [account]);

    const role = account ? account?.role : null;
    const routes = getRoutesByRole(role);

    return (
        <Router>
            <div className="App">
                {!login ? (
                    <Login />
                ) : (
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
                )}
            </div>
        </Router>
    );
}

export default App;
