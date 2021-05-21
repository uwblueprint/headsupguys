import React, { CSSProperties } from "react";
import Image from "next/image";
import { Flex, Center } from "@chakra-ui/react";

export const Footer: React.FC = () => {
    const iconStyle: CSSProperties = {
        fontSize: 22,
        color: "#fff",
        marginRight: "0.25rem",
        marginLeft: "0.25rem",
    };
    return (
        <Center bg="main.100" py={10}>
            <Flex flexDirection="column">
                <a href="https://github.com/pankod" target="_blank">
                    <Image
                        src="/icons/pankod-icon.svg"
                        alt="pankod"
                        width="140"
                        height="28"
                    />
                </a>
                <Flex mt={5}>
                    <a
                        href="https://github.com/pankod"
                        target="_blank"
                        style={iconStyle}
                    >
                        <Image
                            src="/icons/github-icon.svg"
                            alt="github"
                            width="28"
                            height="29"
                        />
                    </a>
                    <a
                        href="https://twitter.com/PankodDev"
                        target="_blank"
                        style={iconStyle}
                    >
                        <Image
                            src="/icons/twitter-icon.svg"
                            alt="twitter"
                            width="28"
                            height="28"
                        />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UCBGOeQkv1XW3ptryLWlQbAQ"
                        target="_blank"
                        style={iconStyle}
                    >
                        <Image
                            src="/icons/youtube-icon.svg"
                            alt="youtube"
                            width="28"
                            height="29"
                        />
                    </a>
                    <a
                        href="https://www.linkedin.com/company/pankod-yazilim-ve-danismanlik/"
                        target="_blank"
                        style={iconStyle}
                    >
                        <Image
                            src="/icons/linkedin-icon.svg"
                            alt="linkedin"
                            width="28"
                            height="32"
                        />
                    </a>
                </Flex>
            </Flex>
        </Center>
    );
};
