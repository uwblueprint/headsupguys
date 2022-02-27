import React from "react";
import { CloseButton, Flex, Link, Text, useDisclosure } from "@chakra-ui/react";

const Footer = ({ isDesktop }: { isDesktop: boolean }): React.ReactElement => {
    const { isOpen, onClose } = useDisclosure({
        defaultIsOpen: true,
    });

    return isOpen ? (
        isDesktop ? (
            <Flex
                align="center"
                backgroundColor="background.mid"
                bottom="0px"
                color="white"
                justify="space-between"
                padding="24px calc(20vw - 120px)"
                position="sticky"
                width="100%"
            >
                <Text marginRight="12px">
                    Ready to prioritize your health? Find a mental health
                    professional with experience working with men{" "}
                    <Link
                        href="https://headsupguys.org/take-action/find-a-therapist/"
                        isExternal
                    >
                        near you
                    </Link>
                    .
                </Text>
                <CloseButton onClick={onClose} />
            </Flex>
        ) : (
            <Flex
                backgroundColor="background.mid"
                bottom="0px"
                color="white"
                padding="24px 20px"
                position="sticky"
                width="100%"
            >
                <Text marginRight="12px">
                    Ready to prioritize your health? Find a mental health
                    professional with experience working with men{" "}
                    <Link
                        href="https://headsupguys.org/take-action/find-a-therapist/"
                        isExternal
                    >
                        near you
                    </Link>
                    .
                </Text>
                <CloseButton onClick={onClose} />
            </Flex>
        )
    ) : null;
};

export default Footer;
