import React from "react";
import { Box, Center, Flex, Spacer, Spinner, Text } from "@chakra-ui/react";
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
import { getIsDesktop } from "src/utils/media/mediaHelpers";
import { Page } from "types/Page";

const fetcher = async (url: string) => {
    const response = await axios({
        method: "GET",
        url,
    });
    return response.data;
};

const relatedToolsFetcher = async (relatedToolsIDs: string[]) => {
    const data = [];
    for (const relatedToolId of relatedToolsIDs) {
        if (relatedToolId !== "") {
            const response = await axios({
                method: "GET",
                url: `/api/tool/${relatedToolId}`,
            });
            if (response.data.status === "published") {
                data.push(response.data);
            }
        }
    }
    return data;
};

const Tool: Page = () => {
    const [isDesktop] = getIsDesktop();
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

    return isDesktop ? (
        <Flex direction="column" minHeight="calc(100vh - 64px)">
            <Header
                id={data._id}
                progress={progress}
                title={data.title}
                type={data.type}
                isDesktop={isDesktop}
            />
            <Flex padding="30px calc(20vw - 120px)">
                <Box flex="0.1 1 auto" width="100%">
                    {data.video && (
                        <Box marginBottom="24px">
                            <ReactPlayer
                                controls
                                url={data.video}
                                width="100%"
                            />
                        </Box>
                    )}
                    <Text>{data.description}</Text>
                    <ResourcesAccordion
                        externalResources={data.externalResources}
                        relatedResources={data.relatedResources}
                        relatedStories={data.relatedStories}
                    />
                    {relatedToolsData.length > 0 && (
                        <Flex
                            backgroundColor="background.dark"
                            color="white"
                            direction="column"
                            marginTop="40px"
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
                                            linkedModuleID={
                                                toolData.linkedModuleID
                                            }
                                            selfCheckGroupID={
                                                toolData.selfCheckGroupID
                                            }
                                            thumbnail={toolData.thumbnail}
                                            title={toolData.title}
                                            isDesktop={isDesktop}
                                        />
                                    );
                                })}
                            </Flex>
                        </Flex>
                    )}
                </Box>
                <StartModuleSection
                    linkedModuleID={data.linkedModuleID}
                    progress={progress}
                    selfCheckGroupID={data.selfCheckGroupID}
                    title={data.title}
                    isDesktop={isDesktop}
                />
                <ModuleProgressSection
                    linkedModuleID={data.linkedModuleID}
                    progress={progress}
                    selfCheckGroupID={data.selfCheckGroupID}
                    isDesktop={isDesktop}
                />
            </Flex>
            <Spacer />
            <Footer isDesktop={isDesktop} />
        </Flex>
    ) : (
        <Flex direction="column" minHeight="calc(100vh - 64px)">
            <Header
                id={data._id}
                progress={progress}
                title={data.title}
                type={data.type}
                isDesktop={isDesktop}
            />
            <ModuleProgressSection
                linkedModuleID={data.linkedModuleID}
                progress={progress}
                selfCheckGroupID={data.selfCheckGroupID}
                isDesktop={isDesktop}
            />
            <Box padding="0px 20px">
                {data.video && (
                    <Box marginTop="30px">
                        <ReactPlayer controls url={data.video} width="100%" />
                    </Box>
                )}
                <Text margin="24px 0px">{data.description}</Text>
                <StartModuleSection
                    linkedModuleID={data.linkedModuleID}
                    progress={progress}
                    selfCheckGroupID={data.selfCheckGroupID}
                    title={data.title}
                    isDesktop={isDesktop}
                />
                <ResourcesAccordion
                    externalResources={data.externalResources}
                    relatedResources={data.relatedResources}
                    relatedStories={data.relatedStories}
                />
                {relatedToolsData.length > 0 && (
                    <Flex
                        backgroundColor="background.dark"
                        color="white"
                        direction="column"
                        marginBottom="30px"
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
                        <Carousel
                            centerMode
                            centerSlidePercentage={85}
                            showArrows={false}
                            showIndicators={false}
                            showStatus={false}
                        >
                            {relatedToolsData.map((toolData) => {
                                return (
                                    <ToolCard
                                        key={toolData._id}
                                        description={toolData.description}
                                        isSingle={relatedToolsData.length === 1}
                                        linkedModuleID={toolData.linkedModuleID}
                                        selfCheckGroupID={
                                            toolData.selfCheckGroupID
                                        }
                                        thumbnail={toolData.thumbnail}
                                        title={toolData.title}
                                        isDesktop={isDesktop}
                                    />
                                );
                            })}
                        </Carousel>
                    </Flex>
                )}
            </Box>
            <Spacer />
            <Footer isDesktop={isDesktop} />
        </Flex>
    );
};

Tool.layout = ToolLayout;

export default Tool;
