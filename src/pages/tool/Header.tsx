import React from "react";
import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";

import CertificateBanner from "src/pages/tool/CertificateBanner";

const Header = ({
    id,
    progress,
    title,
    type,
    variant,
}: {
    id: string;
    progress: number;
    title: string;
    type: string;
    variant: string;
}): React.ReactElement => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box>
            {variant === "desktop" ? (
                <Flex align="center" height="160px" justify="space-between">
                    <Flex
                        direction="column"
                        height="100%"
                        justify="space-between"
                        padding="24px 0px 30px calc(20vw - 120px)"
                    >
                        <Text fontSize="sm">{`Toolkit > ${type}s > ${title}`}</Text>
                        <Text
                            _after={{
                                content: `""`,
                                height: "24px",
                                position: "absolute",
                                display: "block",
                                left: "-5px",
                                bottom: "-1px",
                                zIndex: "-1",
                                width: "calc(100% - 5px)",
                                backgroundColor: "#86FC2F",
                            }}
                            fontSize="3xl"
                            position="relative"
                            textTransform="uppercase"
                        >
                            {title}
                        </Text>
                    </Flex>
                    <Flex
                        align="flex-end"
                        height="100%"
                        padding="0px calc(20vw - 120px) 20px 10px"
                    >
                        <Image
                            onClick={onToggle}
                            src={
                                progress === 100
                                    ? "assets/certificate-icon-complete.png"
                                    : "assets/certificate-icon-incomplete.png"
                            }
                        ></Image>
                    </Flex>
                    <Image
                        height="160px"
                        objectFit="cover"
                        position="absolute"
                        src="assets/tool-banner.png"
                        width="100%"
                        zIndex="-2"
                    ></Image>
                </Flex>
            ) : (
                <Flex align="center" height="150px" justify="space-between">
                    <Flex
                        direction="column"
                        height="100%"
                        justify="space-between"
                        padding="12px 0px 20px 20px"
                    >
                        <Text fontSize="sm">{`Toolkit > ${type}s > ${title}`}</Text>
                        <Text
                            _after={{
                                content: `""`,
                                height: "24px",
                                position: "absolute",
                                display: "block",
                                left: "-5px",
                                bottom: "-1px",
                                zIndex: "-1",
                                width: "calc(100% - 5px)",
                                backgroundColor: "#86FC2F",
                            }}
                            fontSize="3xl"
                            position="relative"
                            textTransform="uppercase"
                        >
                            {title}
                        </Text>
                    </Flex>
                    <Flex
                        align="flex-end"
                        flexShrink="0"
                        height="100%"
                        padding="20px 20px"
                    >
                        <Image
                            onClick={onToggle}
                            src={
                                progress === 100
                                    ? "assets/certificate-icon-complete.png"
                                    : "assets/certificate-icon-incomplete.png"
                            }
                        ></Image>
                    </Flex>
                    <Image
                        height="150px"
                        objectFit="cover"
                        position="absolute"
                        src="assets/tool-banner.png"
                        width="100%"
                        zIndex="-2"
                    ></Image>
                </Flex>
            )}
            <CertificateBanner
                id={id}
                isOpen={isOpen}
                progress={progress}
                title={title}
                variant={variant}
            />
        </Box>
    );
};

export default Header;
