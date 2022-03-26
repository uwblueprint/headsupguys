import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { Page } from "types/Page";
import axios from "axios";
import { Auth } from "aws-amplify";
import { Modal } from "@components";

import {
    ModulePreview,
    MarkdownRenderer,
    MultipleChoicePreview,
    MultiSelectPreview,
    ShortAnswerPreview,
} from "@components";
import useSWR from "swr";
import {
    Spinner,
    Container,
    useMediaQuery,
    useDisclosure,
} from "@chakra-ui/react";

const fetcher = async (url) => {
    const response = await axios({
        method: "GET",
        url,
        params: { includeSlide: true },
    });
    return response.data;
};

const Module: Page = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [userInput, setUserInput] = useState({ recentSlide: 0 });
    const router = useRouter();
    const { module } = router.query;
    const [mounted, setMounted] = useState(false);
    const { data, error } = useSWR(`/api/module/${module}`, fetcher);
    const [large] = useMediaQuery("(min-width: 800px)");
    const [user, setUser] = useState<any | null>(null);
    useEffect(() => {
        const getCurrentUser = async () => {
            setUser(await Auth.currentAuthenticatedUser());
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
    const setFields = async () => {
        for (let i = 0; i < data.slides.length; i++) {
            for (let j = 0; j < data.slides[i].sections.length; j++) {
                if (data.slides[i]?.sections[j]?.type === "shortAnswer") {
                    if (userInput?.[i]?.[j]) {
                        changeUserInput(i, j, userInput[i][j]);
                    }
                }
                if (data.slides[i]?.sections[j]?.type === "multipleChoice") {
                    if (userInput?.[i]?.[j]) {
                        changeUserInput(i, j, userInput[i][j]);
                    }
                }
                if (data.slides[i]?.sections[j]?.type === "multiSelect") {
                    if (userInput?.[i]?.[j]) {
                        changeUserInput(i, j, userInput[i][j]);
                    }
                }
            }
        }
    };

    const getUserFields = async () => {
        const response = await axios({
            method: "GET",
            url: "/api/progress/get",
            params: {
                username: user.username,
                module: data._id,
            },
        });
        setUserInput(response.data.input);
        return response.data.input;
    };

    const patchUserFields = async (newUserInput = null) => {
        await axios({
            method: "PATCH",
            url: "/api/progress/patch",
            params: {
                username: user.username,
                module: data._id,
            },
            data: {
                username: user.username,
                module: data._id,
                completion: 100,
                input: newUserInput ? newUserInput : userInput,
            },
        });
    };

    const postUserFields = async () => {
        console.log("Posting user fields", data);
        await axios({
            method: "POST",
            url: "/api/progress/post",
            data: {
                username: user.username,
                module: data._id,
            },
        });
    };

    const saveUserInput = async () => {
        // check if moduleId in db, if so call patch otherwise call post
        user
            ? getUserFields()
                  .then(() => {
                      patchUserFields();
                      setFields();
                  })
                  .catch(() => {
                      postUserFields();
                  })
            : localStorage.setItem(
                  "unsaved",
                  `${data._id}` + ":" + JSON.stringify(userInput),
              );
    };

    const goNextSlide = async () => {
        if (currentSlide < data.slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        }
        userInput.recentSlide = currentSlide + 1;
        saveUserInput();
    };

    const goPrevSlide = async () => {
        if (currentSlide != 0) {
            setCurrentSlide(currentSlide - 1);
        }
        userInput.recentSlide = currentSlide - 1;
        saveUserInput();
    };
    const renderFields = async () => {
        let newInput;
        const unsaved = localStorage.getItem("unsaved");
        setMounted(true);
        if (user) {
            newInput = await getUserFields().catch(() => {
                // If there is no user input in the database look in local storage
                // Set it if it exists otherwise set database entry to empty object
                if (unsaved) {
                    const [id, input] = unsaved.split(/:(.*)/s); // Split by the first colon
                    if (id === data._id) {
                        newInput = JSON.parse(input);
                        setUserInput(newInput);
                    }
                    postUserFields();
                    patchUserFields(newInput);
                }
            });
        } else {
            if (unsaved) {
                const [id, input] = unsaved.split(/:(.*)/s); // Split by the first colon
                if (id === data._id) {
                    newInput = JSON.parse(input);
                    setUserInput(newInput);
                }
            }
        }
        setCurrentSlide(newInput ? newInput.recentSlide : 0);
        setFields();
    };
    if (data && !mounted) {
        renderFields();
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
            <>
                <Modal
                    isOpen={isOpen}
                    onCancel={onClose}
                    header={`Create an Account to Save Your Progress`}
                    confirmText={`Sign Up`}
                    confirmButtonColorScheme={`green`}
                    onConfirm={() => {
                        router.push("/signup");
                    }}
                />
                <ModulePreview
                    preview={false}
                    previous={data.slides[currentSlide].buttons.previous}
                    next={data.slides[currentSlide].buttons.next}
                    save={user ? false : data.slides[currentSlide].buttons.save}
                    print={data.slides[currentSlide].buttons.print}
                    progressValue={
                        ((currentSlide + 1) / data.slides.length) * 100
                    }
                    variant={large ? "desktop" : "mobile"}
                    goNextSlide={() => goNextSlide()}
                    goPrevSlide={() => goPrevSlide()}
                    saveModule={() => {
                        onOpen();
                        saveUserInput();
                    }}
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
                                    onChange={(value) => {
                                        changeUserInput(
                                            currentSlide,
                                            idx,
                                            value,
                                        );
                                    }}
                                    userInput={userInput?.[currentSlide]?.[idx]}
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
                                    userInput={userInput?.[currentSlide]?.[idx]}
                                    onChange={(value) => {
                                        changeUserInput(
                                            currentSlide,
                                            idx,
                                            value,
                                        );
                                    }}
                                />
                            );
                        } else if (section.type === "shortAnswer") {
                            sectionPreview = (
                                <ShortAnswerPreview
                                    key={idx}
                                    preview={false}
                                    question={section.shortAnswer}
                                    userInput={userInput?.[currentSlide]?.[idx]}
                                    onChange={(value) => {
                                        changeUserInput(
                                            currentSlide,
                                            idx,
                                            value,
                                        );
                                    }}
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
            </>
        );
    }
};

export default Module;
