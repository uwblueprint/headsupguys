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

// aligns the text accordingly for p + h tags (except h1)
function alignCommand(children, tag): ReactNode {
    const Tag = tag as keyof JSX.IntrinsicElements;
    
    let trimVal;
    let alignStyle;
    if (children?.toString().startsWith("||") && children?.toString().endsWith("||")) {
        trimVal = 2;
        alignStyle = 'center';
    } else if (children?.toString().startsWith("//") && children?.toString().endsWith("//")) {
        trimVal = 2;
        alignStyle = 'right';
    } else if (children?.toString().startsWith("\\") && children?.toString().endsWith("\\")) {
        trimVal = 1; // ReactMarkdown recognizes \\ as \ so only trim 1 character
        alignStyle = 'left';
    } else {
        return (
            <Tag>{children}</Tag>
        );
    }

    children[0] = children[0].slice(trimVal);
    children[children.length - 1] = children[children.length - 1].slice(0, -trimVal);

    return (
        <Tag style={{ textAlign: alignStyle as CSS.Property.TextAlign }}>{children}</Tag>
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
                        {content.includes("__") ? (
                            <>
                                {content.includes("**") ? (
                                    <strong><u>{children}</u></strong>
                                ) : (
                                    <u>{children}</u>
                                )}
                            </>
                        ) : (
                            <strong>{children}</strong>
                        )}
                    </>
                ),
                p: ({children}) => alignCommand(children, 'p'),
                h2: ({children}) => alignCommand(children, 'h2'),
                h3: ({children}) => alignCommand(children, 'h3'),
                h4: ({children}) => alignCommand(children, 'h4'),
                h5: ({children}) => alignCommand(children, 'h5'),
                h6: ({children}) => alignCommand(children, 'h6'),
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