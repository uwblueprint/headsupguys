import ReactMarkdown from "react-markdown";
import ReactDOMServer from "react-dom/server";
import React from "react";
import style from "./markdown-renderer.module.css";
import ReactPlayer from "react-player";

interface MarkdownRendererProps {
    children: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = (props) => {
    const replacePrependedDollars = (text: string) => {
        const splitText = text.split("$");
        let newText = (splitText[0] + "\n" + splitText.slice(1).join(""))
            .replaceAll(/\$/g, "")
            .replace("\n", "");
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                {splitText.map((space, i) => (
                    <>{i > 0 && <pre className="paragraph">{"  "}</pre>}</>
                ))}
                {newText}
            </div>
        );
    };

    return (
        <>
            <ReactMarkdown
                components={{
                    strong: ({ node, className, children, ...rest }) => (
                        <strong>{children}</strong>
                    ),
                    a: ({ node, className, children, ...rest }) => (
                        <>
                            {node.position?.start.offset > 0 &&
                            props.children.split("\n")[
                                node.position?.start.line - 1
                            ][node.position?.start.column - 2] === "$" ? (
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
                    p: ({ node, className, children, ...rest }) => {
                        return (
                            <div className="paragraph">
                                {children.map((child) =>
                                    typeof child === "string"
                                        ? child[child.length - 1] === "$"
                                            ? child.replace("$", "")
                                            : child[0] === "$" ||
                                              child.includes("\n$")
                                            ? child
                                                  .split("\n")
                                                  .map((el) =>
                                                      el.includes("$")
                                                          ? replacePrependedDollars(
                                                                el,
                                                            )
                                                          : el,
                                                  )
                                            : child
                                        : child,
                                )}
                            </div>
                        );
                    },
                }}
                className={style.markdown}
            >
                {props.children}
            </ReactMarkdown>
        </>
    );
};
