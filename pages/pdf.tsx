import React, { useState } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { Page } from "types/Page";
import { Button, Container, Heading } from "@chakra-ui/react";
import { createCertificate } from "src/utils/certificates";
// TESTING PAGE TO BE DELETED BEFORE MERGE
const PDF: Page = () => {
    return (
        <Container>
            <Heading>PDF Test</Heading>
            <Button
                onClick={() => {
                    createCertificate("Tony Zhao", "uw blueprint tool");
                }}
            >
                Generate
            </Button>
        </Container>
    );
};

export default PDF;
