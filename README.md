# HeadsUpGuys

HeadsUpGuys platform - Module Builder & Dashboard for interactive resource slides

## Developers!

Daniel Yu 🥑

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

## Authentication Setup for Cognito/Amplify

1. Install the [Amplify CLI](https://docs.amplify.aws/cli/start/install#option-1-watch-the-video-guide)
    - No need to configure the CLI- only need it installed
2. Once the Amplify CLI is installed run `amplify pull --appId <ASK TEAM LEAD FOR APPID> --envName dev` to pull the Cognito backend setup locally, this will make sure Amplify is connecting to the correct user pool
    - Select `AWS access keys` for authentication method
    - accessKeyId: `<ASK TEAM LEAD>`
    - secretAccessKey: `<ASK TEAM LEAD>`
    - region: `ca-central-1`
    - Should see the following message: `Amplify AppID found: XXXXXXXX. Amplify App name is: headsupguys Backend environment dev found in Amplify Console app: headsupguys`
    - Choose your default editor (after this step most of the defaults should be good)
    - type of app building: `javascript`
    - framework: `react`
    - source directory path: `src`
    - distribution directory path: `build`
    - Build Command: `npm run-script build`
    - Start Command: `npm run-script start`
    - Do you plan on modifying this backend? `Y`
3. Run the `amplify pull` command
4. Verify your installation: Under the `src` directory you should see `aws-exports.js` and you should see an `amplify` directory
