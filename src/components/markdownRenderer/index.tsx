/* eslint-disable prettier/prettier */
import CSS from 'csstype';
import ReactMarkdown, { ReactNode } from "react-markdown";
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

function alignCommand(content, children): ReactNode {
    let style: CSS.Properties = { textAlign: 'center' };
    let stripped = children.toString();

    if(content.startsWith("||") && content.endsWith("||")) {
        stripped = stripped.slice(2, -2);
    } else if(content.startsWith("//") && content.endsWith("//")) {
        style.textAlign = 'right';
        stripped = stripped.slice(2, -2);
    } else if(content.startsWith("\\\\") && content.endsWith("\\\\")) {
        style.textAlign = 'left';
        stripped = stripped.slice(1, -1);
    }

    return (
        <p style={style}>
            {stripped}
        </p>
    );
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
    children,
    variables,
}) => {
    return (
        <>
            {children ? (
                children
                    .split("\n")
                    .map((line, idx) => (
                        <React.Fragment key={idx}>
                            {line === "" ? (
                                <div className="newline" />
                            ) : (
                                <BaseRenderer
                                    variables={variables ? variables : null}
                                    content={line}
                                />
                            )}
                        </React.Fragment>
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
                strong: ({children}) => (
                    <>
                        {content.startsWith("__") ? (
                            <>
                                <span>{children}</span>
                            </>
                        ) : (
                            <strong>{children}</strong>
                        )}
                    </>
                ),
                p: ({node, className, children, ...rest}) => (
                    <>
                        {!(content.startsWith("||") && content.endsWith("||")) &&
                        !(content.startsWith("//") && content.endsWith("//")) &&
                        !(content.startsWith("\\\\") && content.endsWith("\\\\")) ? (
                            <p>{children}</p>
                        ) : <>
                            {alignCommand(content, children)}
                            </>
                        }
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
