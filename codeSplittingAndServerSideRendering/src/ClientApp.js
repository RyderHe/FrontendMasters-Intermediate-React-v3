import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";

// other stuff that should only happen in the brwoser like analytics

hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);

