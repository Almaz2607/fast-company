import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/ui/navbar";
import Users from "./layouts/users";
import Login from "./layouts/login";
import Main from "./layouts/main";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import QualityProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";

function App() {
    return (
        <div>
            <AuthProvider>
                <Navbar />
                <QualityProvider>
                    <ProfessionProvider>
                        <Switch>
                            <Route
                                path="/users/:userId?/:editUser?"
                                component={Users}
                            />
                            <Route path="/login" component={Login} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
