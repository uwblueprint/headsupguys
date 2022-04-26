import { Page } from "types/Page";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { ToolLayout } from "@components";
import { Box, Button, Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import { ModuleHeader } from "@components/moduleHeader";
import { createCertificate } from "src/utils/certificates";
import { Auth } from "aws-amplify";
import { useState, useEffect } from "react";

const fetcher = async (url: string) => {
    const response = await axios({
        method: "GET",
        url,
    });
    return response.data;
};

const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://headsupguys.vercel.app/"
        : "http://localhost:3000/";

const CertificatePage: Page = () => {
    const large = useBreakpointValue({ lg: true });
    const router = useRouter();
    const { tool } = router.query;
    const [user, setUser] = useState<any | null>(null);
    const fetchURL = tool ? `/api/tool/${tool}` : null;
    const { data, error } = useSWR(() => fetchURL, fetcher);

    const handleDownload = () => {
        createCertificate(
            user?.attributes?.name || "",
            data?.title || "HeadsUpGuys Tool",
        );
    };
    const handleShare = () => {
        createCertificate(
            user?.attributes?.name || "",
            data?.title || "HeadsUpGuys Tool",
        );
    };
    const handleBack = () => {
        router.push("/");
    };

    useEffect(() => {
        const getCurrentUser = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);
        };
        getCurrentUser();
    }, []);

    return (
        <Flex justifyContent="center">
            <Box mx={"15px"} maxW={"1500px"} w={"100%"}>
                <ModuleHeader
                    links={[
                        {
                            name: "Toolkit",
                            url: `${BASE_URL}`,
                        },
                        {
                            name: data?.title || "",
                            url: `${BASE_URL}tool/${data?._id || ""}`,
                        },
                    ]}
                />
                <Flex flexDirection={"row"} justifyContent={"center"}>
                    <Box
                        mt={large ? "30px" : "20px"}
                        fontFamily={"Inter"}
                        w={"100%"}
                        maxW={"800px"}
                    >
                        <Box fontWeight={"bold"} mb={"20px"}>
                            Congratulations! You’ve finished the{" "}
                            {data?.title || ""} Tool.{" "}
                        </Box>
                        <Box mb={"10px"}>
                            As a testament to your effort and hard work, we’re
                            proud to present this certificate to you.
                        </Box>
                        <Box w="100%">
                            <Flex
                                justifyContent={large ? "flex-start" : "center"}
                            >
                                <Image
                                    src="/assets/certificate-preview.svg"
                                    w="50%"
                                    minW="300px"
                                    maxW="100%"
                                />
                            </Flex>
                        </Box>
                        <Box mt={"10px"}>
                            <Flex
                                justifyContent={large ? "flex-start" : "center"}
                            >
                                Access your personalized certificate:
                            </Flex>
                        </Box>
                        <Box
                            mt={large ? "40px" : "20px"}
                            mb={"10px"}
                            w={"100%"}
                            justifyContent={large ? "flex-start" : "center"}
                        >
                            <Flex
                                flexDirection={"column"}
                                alignItems={large ? "flex-start" : "center"}
                            >
                                <Flex
                                    flexDirection={large ? "row" : "column"}
                                    justifyContent={
                                        large ? "flex-start" : "center"
                                    }
                                    mx={"-10px"}
                                >
                                    <Button
                                        variant="moduleGreen"
                                        w="184px"
                                        h="55px"
                                        my="5px"
                                        mx="10px"
                                        onClick={handleDownload}
                                    >
                                        Download
                                    </Button>
                                    <Button
                                        variant="moduleWhite"
                                        w="184px"
                                        h="55px"
                                        my="5px"
                                        mx="10px"
                                        onClick={handleShare}
                                    >
                                        Share
                                    </Button>
                                </Flex>
                                <Flex
                                    flexDirection={"row"}
                                    w={"100%"}
                                    mt={large ? "40px" : "20px"}
                                    justifyContent={
                                        large ? "flex-end" : "center"
                                    }
                                >
                                    <Button
                                        variant="moduleGreen"
                                        w="184px"
                                        h="55px"
                                        onClick={handleBack}
                                    >
                                        Back to Toolkit
                                    </Button>
                                </Flex>
                            </Flex>
                        </Box>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
};

CertificatePage.layout = ToolLayout;

export default CertificatePage;
