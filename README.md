# HeadsUpGuys

HeadsUpGuys platform - Module Builder & Dashboard for interactive resource slides

## Developers!

Adil Kapadia
Chinemerem Chigbo
Christine Ng
Daniel Yu 🥑
Nim Wijetunga  
Stephanie Xu
Tony Zhao
Yash Gajaria

## Getting Started

To run the application:

```bash
# Install dependencies
yarn

# Run locally
yarn dev
```

Open localhost:3000 on your browser to see the result!

## General Architecture

[Repo Visualization](https://octo-repo-visualization.vercel.app/?repo=uwblueprint%2Fheadsupguys) 👀

1. [NodeJS](https://nodejs.org/en/) application powered by the [Next.JS](https://nextjs.org/) with TypeScript
   framework.
2. [Chakra UI](https://chakra-ui.com/) along with [Storybook.js](https://storybook.js.org/tutorials/) for frontend components
3. Vercel for deployment, with Github Actions for pre-merge workflows

## Directory Structure

```bash
    .
    ├── .babelrc
    ├── .env # Env vars
    ├── .eslintignore
    ├── .eslintrc # Eslint
    ├── .gitattributes
    ├── .github
    │   └── workflows # Github Deployment workflows
    ├── .gitignore
    ├── .next # Next.js generated files
    ├── .prettierignore
    ├── .prettierrc
    ├── .storybook # Storybook.js config files
    │   ├── main.js
    │   └── preview.js
    ├── LICENSE
    ├── README.md
    ├── __tests__
    │   └── index.spec.ts
    ├── next-env.d.ts
    ├── next.config.js
    ├── package.json
    ├── pages # Pages .../[fileName]
    │   ├── _app.tsx
    │   ├── _document.tsx
    |   ├── api/ # Serverless API routes
    │   ├── index.tsx # Home page
    │   └── protected.tsx # Protected route example
    ├── public # Assets
    │   ├── icons
    │   └── meta.json
    ├── src # Components, styles
    │   ├── components
    │   ├── definitions
    │   └── styles
    ├── test # Jest setup
    │   ├── jest.config.js
    │   └── jest.setup.ts
    ├── tsconfig.json
    └── yarn.lock
```

## Added Plugins

### **Chakra UI**

Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.

[Go To Documentation](https://chakra-ui.com/docs/getting-started)

### **CSS / styled-jsx**

Next.js comes with built-in support for CSS and styled-jsx. Styled-jsx is full, scoped and component-friendly CSS support for JSX (rendered on the server or the client).

[Go To Documentation](https://github.com/vercel/styled-jsx)

### **Fetch**

Next.js has a built-in polyfill for the fetch API. You don&#39;t need to worry about using it on either server or client side.

[Go To Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### **Storybook**

Storybook is an open source tool for developing UI components in isolation for React, Vue, Angular, and more. It makes building stunning UIs organized and efficient.

[Go To Documentation](https://storybook.js.org/docs/react/get-started/introduction)

### **Environment Variables**

Use environment variables in your next.js project for server side, client or both.

[Go To Documentation](https://github.com/vercel/next.js/tree/canary/examples/environment-variables)

### **SWR**

React Hooks library for data fetching from Vercel

[Go To Documentation](https://swr.vercel.app/)

### **ESLint**

A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.

[Go To Documentation](https://eslint.org/docs/user-guide/getting-started)

### **Prettier**

An opinionated code formatter; Supports many languages; Integrates with most editors.

[Go To Documentation](https://prettier.io/docs/en/index.html)

### **lint-staged**

The concept of lint-staged is to run configured linter (or other) tasks on files that are staged in git.

[Go To Documentation](https://github.com/okonet/lint-staged)

### **Jest**

Jest is a delightful JavaScript Testing Framework with a focus on simplicity.

[Go To Documentation](https://jestjs.io/docs/en/getting-started)

### **Github Actions**

GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub.

[Go To Documentation](https://docs.github.com/en/actions)

## License

MIT

This project was generated with [Superplate](https://github.com/pankod/superplate).
