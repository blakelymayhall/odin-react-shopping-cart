import App from "./App";
import HomePage from "./components/HomePage";
import StorePage from "./components/StorePage";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "store", element: <StorePage /> },
        ],
    },
    {
        path: "store",
        element: <StorePage />,
    },
];

export default routes;
