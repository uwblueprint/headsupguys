/* eslint-disable prettier/prettier */
import ReactMarkdown from "react-markdown";
import React from "react";
import style from "./markdown-renderer.module.css";
import ReactPlayer from "react-player";

interface MarkdownRendererProps {
    children: string;
    variables?: any; //retype this later
}

const stringConversionObj = {
    "$[": "[",
    "<>[": "[",
};

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    children,
    variables,
}) => {
    return (
        <>
            {children ? (
                children
                    .split("\n")
                    .map((line) => (
                        <>
                            {line === "" ? (
                                <div className="newline" />
                            ) : (
                                <BaseRenderer
                                    variables={variables ? variables : null}
                                    content={line}
                                />
                            )}
                        </>
                    ))
            ) : (
                <div className="newline" />
            )}
        </>
    );
};

const BaseRenderer: React.FC<{ content: string; variables?: any }> = ({
    content,
    variables,
}) => (
    <div className="md-row">
        <ReactMarkdown
            components={{
                a: ({ node, className, children, ...rest }) => (
                    <>
                        {content.includes("$[") ? (
                            <>
                                <div>
                                    <ReactPlayer controls url={rest.href} />
                                </div>
                            </>
                        ) : content.includes("<>[") ? (
                            <>
                                <div>
                                    {variables ? (
                                        variables[rest.href] ? (
                                            typeof variables[rest.href] ===
                                            "string" ? (
                                                variables[rest.href]
                                            ) : (
                                                <ul>
                                                    {variables[rest.href].map(
                                                        (item) => (
                                                            <li>{item}</li>
                                                        ),
                                                    )}
                                                </ul>
                                            )
                                        ) : (
                                            ""
                                        )
                                    ) : (
                                        `<Data for ${rest.href}>`
                                    )}
                                </div>
                            </>
                        ) : (
                            <a href={rest.href}>{children}</a>
                        )}
                    </>
                ),
            }}
            className={style.markdown + " right"}
        >
            {content.replace(
                new RegExp(
                    Object.keys(stringConversionObj)
                        .map((key) => key.replace(/[-^$*+?.()|[\]{}]/g, "\\$&"))
                        .join("|"),
                    "gi",
                ),
                (str) => stringConversionObj[str],
            )}
        </ReactMarkdown>
    </div>
);
