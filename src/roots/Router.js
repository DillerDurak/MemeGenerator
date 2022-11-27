import React from "react"
import {Route, Routes} from "react-router-dom"
import About from "../pages/About"
import Main from "../pages/Main"

const Router = () => {

    function fixRouteKeys(routes) {
        return routes.map((route) => {
            return React.cloneElement(route, {key: route.props.path});
        });
    }

    function routes(RouteComponent) {
        const routes = [
            <RouteComponent path={Router.ABOUT} element={<About />} />,
            <RouteComponent path={Router.MAIN} element={<Main />} />
        ];
        return fixRouteKeys(routes);
    }

    return (
        <Routes>
            {routes(Route)}
        </Routes>
    )
}

Router.MAIN = "/";
Router.ABOUT = "/about";

export default Router;