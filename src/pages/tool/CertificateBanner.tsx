import React from "react";
import { Flex, Heading, Link, Text } from "@chakra-ui/react";

const CertificateBanner = ({
    id,
    isDesktop,
    isOpen,
    progress,
    title,
}: {
    id: string;
    isDesktop: boolean;
    isOpen: boolean;
    progress: number;
    title: string;
}): React.ReactElement => {
    return isOpen ? (
        isDesktop ? (
            <Flex
                _before={{
                    borderColor: "transparent transparent #363535 transparent",
                    borderStyle: "solid",
                    borderWidth: "0px 12px 15px 12px",
                    content: `""`,
                    position: "absolute",
                    marginTop: "-45px",
                    right: "calc(20vw - 108px)",
                }}
                backgroundColor="background.mid"
                color="white"
                direction="column"
                padding="30px calc(20vw - 120px)"
                position="relative"
            >
                <Heading fontSize="sm" marginBottom="12px">
                    Certificate of Completion
                </Heading>
                <Text fontSize="sm">
                    {progress === 100
                        ? `Congrats on completing the ${title} learning module! You can download your certificate of completion `
                        : `Complete the ${title} module to receive a certificate of learning to share with your friends and family.`}
                    {progress === 100 && (
                        <Link
                            color="brand.lime"
                            fontSize="sm"
                            href={`/certificate/${id}`}
                        >
                            here
                        </Link>
                    )}
                    {progress === 100 && `.`}
                </Text>
            </Flex>
        ) : (
            <Flex
                _before={{
                    borderColor: "transparent transparent #363535 transparent",
                    borderStyle: "solid",
                    borderWidth: "0px 12px 15px 12px",
                    content: `""`,
                    position: "absolute",
                    marginTop: "-39px",
                    right: "32px",
                }}
                backgroundColor="background.mid"
                color="white"
                direction="column"
                padding="24px 20px"
                position="relative"
            >
                <Heading fontSize="sm" marginBottom="12px">
                    Certificate of Completion
                </Heading>
                <Text fontSize="sm">
                    {progress === 100
                        ? `Congrats on completing the ${title} learning module! You can download your certificate of completion `
                        : `Complete the ${title} module to receive a certificate of learning to share with your friends and family.`}
                    <Link
                        color="brand.lime"
                        fontSize="sm"
                        href={`/certificate?id=${id}`}
                    >
                        here
                    </Link>
                    {progress === 100 && `.`}
                </Text>
            </Flex>
        )
    ) : null;
};

export default CertificateBanner;
