import React from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
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
    return (
        <Accordion
            allowMultiple
            backgroundColor="background.dark"
            color="white"
            defaultIndex={[]}
            marginTop="12px"
        >
            <AccordionItem>
                <AccordionButton>
                    <Text fontSize="lg">Related Resources</Text>
                    <Spacer />
                    <AccordionIcon />
                </AccordionButton>
                {relatedResources.map((relatedResource) => (
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
                ))}
            </AccordionItem>
            <AccordionItem>
                <AccordionButton>
                    <Text fontSize="lg">External Resources</Text>
                    <Spacer />
                    <AccordionIcon />
                </AccordionButton>
                {externalResources.map((externalResource) => (
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
                ))}
            </AccordionItem>
            <AccordionItem>
                <AccordionButton>
                    <Text fontSize="lg">Stories of Success</Text>
                    <Spacer />
                    <AccordionIcon />
                </AccordionButton>
                {relatedStories.map((relatedStory) => (
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
                ))}
            </AccordionItem>
        </Accordion>
    );
};

export default ResourcesAccordion;
