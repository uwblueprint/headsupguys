import ReactMarkdown from "react-markdown";
import React from "react";
import style from "./markdown-renderer.module.css";
import ReactPlayer from "react-player";

interface MarkdownRendererProps {
    children: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
    return (
        <>
            {props.children.split("\n").map((line) => (
                <>
                    {line === "" ? (
                        <div className="newline" />
                    ) : (
                        <BaseRenderer content={line} />
                    )}
                </>
            ))}
        </>
    );
};

const BaseRenderer: React.FC<{ content: string }> = ({ content }) => (
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
                        ) : (
                            <a href={rest.href}>{children}</a>
                        )}
                    </>
                ),
            }}
            className={style.markdown + " right"}
        >
            {content.replace("$[", "[")}
        </ReactMarkdown>
    </div>
);
