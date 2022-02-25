import React from "react";
import {
    Box,
    Flex,
    Icon,
    IconButton,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdChevronRight, MdRefresh } from "react-icons/md";

import RestartModal from "src/pages/tool/RestartModal";

const ModuleProgressSection = ({
    isDesktop,
    linkedModuleID,
    progress,
    selfCheckGroupID,
}: {
    isDesktop: boolean;
    linkedModuleID: string;
    progress: number;
    selfCheckGroupID: string;
}): React.ReactElement => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const handleRestart = () => {
        onClose();
    };

    return progress !== 0 ? (
        <Box>
            <RestartModal
                handleRestart={handleRestart}
                isOpen={isOpen}
                onClose={onClose}
                isDesktop={isDesktop}
            />
            {isDesktop ? (
                <Flex
                    backgroundColor="background.dark"
                    color="white"
                    direction="column"
                    flex="0 0.1 300px"
                    height="360px"
                    marginLeft="30px"
                    minWidth="300px"
                    padding="30px 20px"
                >
                    <Text
                        as="u"
                        fontSize="2xl"
                        textDecorationColor="brand.green"
                        textDecorationThickness="2px"
                        textUnderlineOffset="6px"
                    >
                        Your Module Progess
                    </Text>
                    <Box
                        backgroundColor="background.light"
                        height="12px"
                        margin="20px 0px 5px 0px"
                        width="100%"
                    >
                        <Box
                            backgroundColor="brand.lime"
                            height="12px"
                            width={`${progress}%`}
                        ></Box>
                    </Box>
                    <Text>{`${Math.round(progress)}% Complete`}</Text>
                    <Flex marginTop="24px">
                        <IconButton
                            aria-label="Restart Module"
                            backgroundColor="brand.green"
                            icon={<MdRefresh />}
                            marginRight="12px"
                            onClick={onOpen}
                            size="lg"
                        />
                        <Link href={`/module?id=${linkedModuleID}`}>
                            <Flex
                                align="center"
                                backgroundColor="brand.green"
                                cursor="pointer"
                                height="48px"
                                justify="space-between"
                                padding="10px"
                                width="100%"
                            >
                                <Icon
                                    as={MdChevronRight}
                                    color="brand.green"
                                    height={6}
                                    width={6}
                                />
                                <Text>
                                    {progress === 100
                                        ? "Review Module"
                                        : "Continue Module"}
                                </Text>
                                <Icon
                                    as={MdChevronRight}
                                    height={6}
                                    width={6}
                                />
                            </Flex>
                        </Link>
                    </Flex>
                    <Link href={`/selfCheck?id=${selfCheckGroupID}`}>
                        <Flex
                            align="center"
                            border="1px solid black"
                            cursor="pointer"
                            height="48px"
                            justify="center"
                            marginTop="12px"
                            padding="10px"
                        >
                            <Text fontSize="sm">Take Self-Check</Text>
                        </Flex>
                    </Link>
                </Flex>
            ) : (
                <Flex
                    backgroundColor="background.dark"
                    color="white"
                    direction="column"
                    padding="30px 20px"
                >
                    <Text
                        as="u"
                        fontSize="2xl"
                        textDecorationColor="brand.green"
                        textDecorationThickness="2px"
                        textUnderlineOffset="6px"
                    >
                        Your Module Progess
                    </Text>
                    <Box
                        backgroundColor="background.light"
                        height="12px"
                        margin="20px 0px 5px 0px"
                        width="100%"
                    >
                        <Box
                            backgroundColor="brand.lime"
                            height="12px"
                            width={`${progress}%`}
                        ></Box>
                    </Box>
                    <Text>{`${Math.round(progress)}% Complete`}</Text>
                    <Flex marginTop="24px">
                        <IconButton
                            aria-label="Restart Module"
                            backgroundColor="brand.green"
                            icon={<MdRefresh />}
                            marginRight="12px"
                            onClick={onOpen}
                            size="lg"
                        />
                        <Link href={`/module?id=${linkedModuleID}`}>
                            <Flex
                                align="center"
                                backgroundColor="brand.green"
                                cursor="pointer"
                                height="48px"
                                justify="space-between"
                                padding="10px"
                                width="100%"
                            >
                                <Icon
                                    as={MdChevronRight}
                                    color="brand.green"
                                    height={6}
                                    width={6}
                                />
                                <Text>
                                    {progress === 100
                                        ? "Review Module"
                                        : "Continue Module"}
                                </Text>
                                <Icon
                                    as={MdChevronRight}
                                    height={6}
                                    width={6}
                                />
                            </Flex>
                        </Link>
                    </Flex>
                    <Link href={`/selfCheck?id=${selfCheckGroupID}`}>
                        <Flex
                            align="center"
                            border="1px solid black"
                            cursor="pointer"
                            height="48px"
                            justify="center"
                            marginTop="12px"
                            padding="10px"
                        >
                            <Text fontSize="sm">Take Self-Check</Text>
                        </Flex>
                    </Link>
                </Flex>
            )}
        </Box>
    ) : null;
};

export default ModuleProgressSection;
