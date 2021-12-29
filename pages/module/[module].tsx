import React, { useState } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { Page } from "types/Page";
import axios from "axios";
import {
    ModulePreview,
    MarkdownRenderer,
    MultipleChoicePreview,
    MultiSelectPreview,
} from "@components";
import useSWR from "swr";
import { Spinner } from "@chakra-ui/react";

const fetcher = async (url) => {
    const response = await axios({
        method: "GET",
        url,
        params: { includeSlide: true },
    });
    return response.data;
};

const Module: Page = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const router = useRouter();
    const { module } = router.query;
    const { data, error } = useSWR(`/api/module/${module}`, fetcher);

    function goNextSlide() {
        if (currentSlide < data.slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    }

    function goPrevSlide() {
        if (currentSlide != 0) {
            setCurrentSlide(currentSlide - 1);
        }
    }

    if (error) {
        return <Error statusCode={404} />;
    } else if (!data) {
        return (
            <div style={{ height: "100vh" }}>
                <Spinner
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="-webkit-translate(-50%, -50%)"
                    color="brand.lime"
                    size="xl"
                />
            </div>
        );
    } else {
        return (
            <ModulePreview
                previous={data.slides[currentSlide].buttons.previous}
                next={data.slides[currentSlide].buttons.next}
                save={data.slides[currentSlide].buttons.save}
                print={data.slides[currentSlide].buttons.print}
                progressValue={(currentSlide / data.slides.length) * 100}
                variant="mobile"
                goNextSlide={() => goNextSlide()}
                goPrevSlide={() => goPrevSlide()}
            >
                {data.slides[currentSlide].sections.map((section) => {
                    let sectionPreview;
                    if (section.type === "staticContent") {
                        sectionPreview = (
                            <MarkdownRenderer>
                                {section.markdown}
                            </MarkdownRenderer>
                        );
                    } else if (section.type === "multipleChoice") {
                        sectionPreview = (
                            <MultipleChoicePreview
                                question={section.multipleChoice.question}
                                options={section.multipleChoice.options}
                                variant="mobile"
                                columns={section.properties.columns}
                            />
                        );
                    } else if (section.type === "multiSelect") {
                        sectionPreview = (
                            <MultiSelectPreview
                                question={section.multiSelect.question}
                                options={section.multiSelect.options}
                                variant="mobile"
                                columns={section.properties.columns}
                            />
                        );
                    }
                    return sectionPreview;
                }, "")}
            </ModulePreview>
        );
    }
};

export default Module;
