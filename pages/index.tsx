import React from "react";
import { Page } from "types/Page";
import { AdminLayout } from "@components";
const Home: Page = () => {
    return <h1>HeadsUpGuys Toolkit</h1>;
};
Home.layout = AdminLayout;
export default Home;
