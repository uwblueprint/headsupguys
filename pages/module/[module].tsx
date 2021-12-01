import React from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { Page } from "types/Page";
import axios from "axios";
import Document from "src/pages/module-builder/Document";

const Module: Page = () => {
    const router = useRouter();
    const { module } = router.query;
    const moduleExists = async () => {
        try {
            const existingModules = await axios({
                method: "GET",
                url: "/api/module/getAll",
            });

            for (const existingModule in existingModules) {
                if (existingModule === module) {
                    return false;
                }
            }

            return true;
        } catch (err) {
            console.log(err);
        }
    };

    if (moduleExists()) {
        return (
            <div>
                <Document
                    state={state}
                    isSidebarOpen={isSidebarOpen}
                    sidebarOpen={sidebarOpen}
                    sidebarClose={sidebarClose}
                />
            </div>
        );
    } else {
        return <Error statusCode={404} />;
    }
};

export default Module;
