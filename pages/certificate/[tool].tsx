import { Page } from "types/Page";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { Box, Button, Flex, Image, useBreakpointValue } from "@chakra-ui/react";
import { ModuleHeader } from "@components/moduleHeader";

const fetcher = async (url: string) => {
    const response = await axios({
        method: "GET",
        url,
    });
    return response.data;
};

const BASE_URL = `http://localhost:3000/`;
// const BASE_URL = `https://headsupguys.vercel.app/`;

const CertificatePage: Page = () => {
    const large = useBreakpointValue({ lg: true });
    const router = useRouter();
    const { tool } = router.query;
    const fetchURL = tool ? `/api/tool/${tool}` : null;
    const { data, error } = useSWR(() => fetchURL, fetcher);

    const handleDownload = () => {};
    const handleShare = () => {};
    const handleBack = () => {};

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
                        mt={large ? "80px" : "40px"}
                        fontFamily={"Inter"}
                        w={"100%"}
                        maxW={"800px"}
                    >
                        <Box fontWeight={"bold"} mb={"20px"}>
                            Congratulations! You’ve finished the{" "}
                            {data?.title || ""} Tool.{" "}
                        </Box>
                        <Box mb={"50px"}>
                            As a testament to your effort and hard work, we’re
                            proud to present this certificate to you.
                        </Box>
                        <Box w="100%">
                            <Flex
                                justifyContent={large ? "flex-start" : "center"}
                            >
                                <Image src="/assets/certificate-preview.svg" />
                            </Flex>
                        </Box>
                        <Box mt={"10px"}>
                            Access your personalized certificate:
                        </Box>
                        <Box
                            my={large ? "60px" : "20px"}
                            w={"100%"}
                            justifyContent={large ? "flex-start" : "center"}
                        >
                            <Flex
                                flexDirection={"column"}
                                alignItems={large ? "flex-start" : "center"}
                            >
                                <Flex
                                    flexDirection={large ? "row" : "column"}
                                    // w={"100%"}
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
                                {/* </Box> */}
                                {/* <Box> */}
                                <Flex
                                    flexDirection={"row"}
                                    w={"100%"}
                                    mt={large ? "80px" : "40px"}
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

export default CertificatePage;
