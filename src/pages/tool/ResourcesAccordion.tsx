import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Link,
    Spacer,
    Text,
} from "@chakra-ui/react";

const ResourcesAccordion = ({
    externalResources,
    relatedResources,
    relatedStories,
}: {
    externalResources: [];
    relatedResources: [];
    relatedStories: [];
}): React.ReactElement => {
    const getIsEmpty = (resourceArray: string[][]) => {
        if (resourceArray.length === 0) {
            return true;
        }
        for (const resource of resourceArray) {
            if (
                resource.length >= 2 &&
                (resource[0] !== "" || resource[1] !== "")
            ) {
                return false;
            }
        }
        return true;
    };

    const isExternalResourcesEmpty = getIsEmpty(externalResources);
    const isRelatedResourcesEmpty = getIsEmpty(relatedResources);
    const isRelatedStoriesEmpty = getIsEmpty(relatedStories);

    return (
        !(
            isExternalResourcesEmpty &&
            isRelatedResourcesEmpty &&
            isRelatedStoriesEmpty
        ) && (
            <Box margin="24px 0px 30px 0px">
                <Text
                    as="u"
                    fontSize="2xl"
                    textDecorationColor="brand.green"
                    textDecorationThickness="2px"
                    textUnderlineOffset="6px"
                >
                    Additional Resources
                </Text>
                <Accordion
                    allowMultiple
                    backgroundColor="background.dark"
                    color="white"
                    defaultIndex={[]}
                    marginTop="12px"
                >
                    {!isRelatedResourcesEmpty && (
                        <AccordionItem>
                            <AccordionButton>
                                <Text fontSize="lg">Related Resources</Text>
                                <Spacer />
                                <AccordionIcon />
                            </AccordionButton>
                            {relatedResources.map((relatedResource) => {
                                return relatedResource[0] !== "" ||
                                    relatedResource[1] !== "" ? (
                                    <Link
                                        key={relatedResource[1]}
                                        href={relatedResource[1]}
                                        isExternal
                                    >
                                        <AccordionPanel
                                            border="0.5px solid black"
                                            backgroundColor="background.mid"
                                            paddingBottom="10px"
                                        >
                                            {relatedResource[0]}
                                        </AccordionPanel>
                                    </Link>
                                ) : null;
                            })}
                        </AccordionItem>
                    )}
                    {!isExternalResourcesEmpty && (
                        <AccordionItem>
                            <AccordionButton>
                                <Text fontSize="lg">External Resources</Text>
                                <Spacer />
                                <AccordionIcon />
                            </AccordionButton>
                            {externalResources.map((externalResource) => {
                                return externalResource[0] !== "" ||
                                    externalResource[1] !== "" ? (
                                    <Link
                                        key={externalResource[1]}
                                        href={externalResource[1]}
                                        isExternal
                                    >
                                        <AccordionPanel
                                            border="0.5px solid black"
                                            backgroundColor="background.mid"
                                            paddingBottom="10px"
                                        >
                                            {externalResource[0]}
                                        </AccordionPanel>
                                    </Link>
                                ) : null;
                            })}
                        </AccordionItem>
                    )}
                    {!isRelatedStoriesEmpty && (
                        <AccordionItem>
                            <AccordionButton>
                                <Text fontSize="lg">Stories of Success</Text>
                                <Spacer />
                                <AccordionIcon />
                            </AccordionButton>
                            {relatedStories.map((relatedStory) => {
                                return relatedStory[0] !== "" ||
                                    relatedStory[1] !== "" ? (
                                    <Link
                                        key={relatedStory[1]}
                                        href={relatedStory[1]}
                                        isExternal
                                    >
                                        <AccordionPanel
                                            border="0.5px solid black"
                                            backgroundColor="background.mid"
                                            paddingBottom="10px"
                                        >
                                            {relatedStory[0]}
                                        </AccordionPanel>
                                    </Link>
                                ) : null;
                            })}
                        </AccordionItem>
                    )}
                </Accordion>
            </Box>
        )
    );
};

export default ResourcesAccordion;
