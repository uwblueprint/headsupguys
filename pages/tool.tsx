import React from "react";
import { Center, Flex, Link, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import { useRouter } from "next/router";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";

import { ToolLayout } from "@components";
import Footer from "src/pages/tool/Footer";
import Header from "src/pages/tool/Header";
import ModuleProgressSection from "src/pages/tool/ModuleProgressSection";
import ResourcesAccordion from "src/pages/tool/ResourcesAccordion";
import StartModuleSection from "src/pages/tool/StartModuleSection";
import ToolCard from "src/pages/tool/ToolCard";
import { getVariant } from "src/utils/media/mediaHelpers";

const fetcher = async (url) => {
    const response = await axios({
        method: "GET",
        url,
    });
    return response.data;
};

const relatedToolsFetcher = async (relatedToolsIDs) => {
    const data = [];
    for (const relatedToolId of relatedToolsIDs) {
        if (relatedToolId !== "") {
            const response = await axios({
                method: "GET",
                url: `/api/tool/${relatedToolId}`,
            });
            data.push(response.data);
        }
    }
    return data;
};

const Tool: React.FC = () => {
    const variant = getVariant();
    const progress = 100;

    const router = useRouter();
    const { id } = router.query;
    const fetchURL = id ? `/api/tool/${id}` : null;
    const { data, error } = useSWR(() => fetchURL, fetcher);
    const { data: relatedToolsData, error: relatedToolsError } = useSWR(
        data ? [data.relatedToolsIDs] : null,
        relatedToolsFetcher,
    );

    if (error || relatedToolsError) {
        return (
            <Center height="200px" width="100%">
                <Text>An error has occurred.</Text>
            </Center>
        );
    }
    if (!data || !relatedToolsData) {
        return (
            <Center height="200px" width="100%">
                <Spinner color="brand.lime" size="xl" />
            </Center>
        );
    }

    return variant === "desktop" ? (
        <Flex direction="column">
            <Header
                id={data._id}
                progress={progress}
                title={data.title}
                type={data.type}
                variant={variant}
            />
            <Flex padding="30px calc(20vw - 120px)">
                <Flex direction="column">
                    <ReactPlayer controls url={data.video} />
                    <Flex direction="column" flex="0.1 1 auto" marginTop="24px">
                        <Text>{data.description}</Text>
                        <Text
                            as="u"
                            fontSize="2xl"
                            marginTop="24px"
                            textDecorationColor="brand.green"
                            textDecorationThickness="2px"
                            textUnderlineOffset="6px"
                        >
                            Additional Resources
                        </Text>
                        <ResourcesAccordion
                            externalResources={data.externalResources}
                            relatedResources={data.relatedResources}
                            relatedStories={data.relatedStories}
                        />
                    </Flex>
                    <Flex
                        backgroundColor="background.dark"
                        color="white"
                        direction="column"
                        marginTop="60px"
                    >
                        <Text
                            as="u"
                            fontSize="2xl"
                            margin="30px 24px 0px 24px"
                            textDecorationColor="brand.green"
                            textDecorationThickness="2px"
                            textUnderlineOffset="6px"
                        >
                            Recommended Tools
                        </Text>
                        <Flex padding="12px 12px 24px 12px" wrap="wrap">
                            {relatedToolsData.map((toolData) => {
                                return (
                                    <ToolCard
                                        key={toolData._id}
                                        description={toolData.description}
                                        linkedModuleID={toolData.linkedModuleID}
                                        selfCheckGroupID={
                                            toolData.selfCheckGroupID
                                        }
                                        thumbnail={toolData.thumbnail}
                                        title={toolData.title}
                                        variant={variant}
                                    />
                                );
                            })}
                        </Flex>
                    </Flex>
                </Flex>
                <StartModuleSection
                    linkedModuleID={data.linkedModuleID}
                    progress={progress}
                    selfCheckGroupID={data.selfCheckGroupID}
                    title={data.title}
                    variant={variant}
                />
                <ModuleProgressSection
                    linkedModuleID={data.linkedModuleID}
                    progress={progress}
                    selfCheckGroupID={data.selfCheckGroupID}
                    variant={variant}
                />
            </Flex>
            <Footer variant={variant} />
        </Flex>
    ) : (
        <Flex direction="column">
            <Header
                id={data._id}
                progress={progress}
                title={data.title}
                type={data.type}
                variant={variant}
            />
            <ModuleProgressSection
                linkedModuleID={data.linkedModuleID}
                progress={progress}
                selfCheckGroupID={data.selfCheckGroupID}
                variant={variant}
            />
            <Flex direction="column" padding="30px 20px">
                <ReactPlayer controls url={data.video} width="100%" />
                <Text marginTop="24px">{data.description}</Text>
            </Flex>
            <StartModuleSection
                linkedModuleID={data.linkedModuleID}
                progress={progress}
                selfCheckGroupID={data.selfCheckGroupID}
                title={data.title}
                variant={variant}
            />
            <Flex direction="column" padding="30px 20px">
                <Text
                    as="u"
                    fontSize="2xl"
                    textDecorationColor="brand.green"
                    textDecorationThickness="2px"
                    textUnderlineOffset="6px"
                >
                    Additional Resources
                </Text>
                <ResourcesAccordion
                    externalResources={data.externalResources}
                    relatedResources={data.relatedResources}
                    relatedStories={data.relatedStories}
                />
            </Flex>
            <Flex
                backgroundColor="background.dark"
                color="white"
                direction="column"
                padding="30px 20px 0px 20px"
            >
                <Text
                    as="u"
                    fontSize="2xl"
                    marginBottom="24px"
                    textDecorationColor="brand.green"
                    textDecorationThickness="2px"
                    textUnderlineOffset="6px"
                >
                    Recommended Tools
                </Text>
                {relatedToolsData.length > 0 && (
                    <Carousel
                        centerMode
                        centerSlidePercentage={85}
                        emulateTouch
                        infiniteLoop
                        showArrows={false}
                        showIndicators={false}
                        showStatus={false}
                    >
                        {relatedToolsData.map((toolData) => {
                            return (
                                <ToolCard
                                    key={toolData._id}
                                    description={toolData.description}
                                    linkedModuleID={toolData.linkedModuleID}
                                    selfCheckGroupID={toolData.selfCheckGroupID}
                                    thumbnail={toolData.thumbnail}
                                    title={toolData.title}
                                    variant={variant}
                                />
                            );
                        })}
                    </Carousel>
                )}
            </Flex>
            <Footer variant={variant} />
        </Flex>
    );
};

Tool.layout = ToolLayout;

export default Tool;
