import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { Page } from "types/Page";
import axios from "axios";
import { Auth } from "aws-amplify";
import {
    ModulePreview,
    MarkdownRenderer,
    MultipleChoicePreview,
    MultiSelectPreview,
    ShortAnswerPreview,
} from "@components";
import useSWR from "swr";
import { Spinner, Container, useMediaQuery } from "@chakra-ui/react";

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
    const [userInput, setUserInput] = useState({});
    const router = useRouter();
    const { module } = router.query;
    const { data, error } = useSWR(`/api/module/${module}`, fetcher);
    const [large] = useMediaQuery("(min-width: 800px)");
    const [user, setUser] = useState<any | null>(null);
    useEffect(() => {
        const getCurrentUser = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);
        };

        getCurrentUser().catch(console.error);
    }, []);
    const changeUserInput = (slide, section, value) => {
        setUserInput({
            ...userInput,
            [slide]: {
                ...userInput[slide],
                [section]: value,
            },
        });
    };
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
                preview={false}
                previous={data.slides[currentSlide].buttons.previous}
                next={data.slides[currentSlide].buttons.next}
                save={user ? false : data.slides[currentSlide].buttons.save}
                print={data.slides[currentSlide].buttons.print}
                progressValue={((currentSlide + 1) / data.slides.length) * 100}
                variant={large ? "desktop" : "mobile"}
                goNextSlide={() => goNextSlide()}
                goPrevSlide={() => goPrevSlide()}
            >
                {data.slides[currentSlide].sections.map((section, idx) => {
                    const paddingType = section?.padding.type || "%";
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
                                preview={false}
                                question={section.multipleChoice.question}
                                options={section.multipleChoice.options}
                                variant={large ? "desktop" : "mobile"}
                                columns={section.properties.columns}
                                onChange={(value) =>
                                    changeUserInput(currentSlide, idx, value)
                                }
                                userInput={
                                    userInput[currentSlide]?.[idx]?.value
                                }
                            />
                        );
                    } else if (section.type === "multiSelect") {
                        sectionPreview = (
                            <MultiSelectPreview
                                preview={false}
                                question={section.multiSelect.question}
                                options={section.multiSelect.options}
                                variant={large ? "desktop" : "mobile"}
                                columns={section.properties.columns}
                                userInput={userInput[currentSlide]?.[idx]}
                                onChange={(value) =>
                                    changeUserInput(currentSlide, idx, value)
                                }
                            />
                        );
                    } else if (section.type === "shortAnswer") {
                        sectionPreview = (
                            <ShortAnswerPreview
                                key={idx}
                                preview={false}
                                question={section.shortAnswer}
                                userInput={
                                    userInput[currentSlide]?.[idx]?.value
                                }
                                onChange={(value) =>
                                    changeUserInput(currentSlide, idx, value)
                                }
                            />
                        );
                    }
                    return (
                        <Container
                            key={idx}
                            maxWidth="100%"
                            paddingTop={`${section?.padding.top}${paddingType}`}
                            paddingRight={`${section?.padding.right}${paddingType}`}
                            paddingBottom={`${section?.padding.bottom}${paddingType}`}
                            paddingLeft={`${section?.padding.left}${paddingType}`}
                            children={sectionPreview}
                        ></Container>
                    );
                }, "")}
            </ModulePreview>
        );
    }
};

export default Module;
