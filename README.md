# **React boilerplate**
Boilerplate for react's frameworks

***

# Cursor rules:

## Code:
- Prefer YARN instead of NPM or NPX
- Use GraphQL, Relay or Redux
- Use Typescript

## Project stucture:
- Use Prettier format
- Use Tailwind CSS
- Don't let a file get too long pass 200 lines
- All code must be placed in src directory with separate backend and frontend
- Always add a suffix at the end of the files' name and directory to clarify its beloging.
    - First example: a head component file name should be HomePageHeader.component.tsx
    - Second example: a page file name should be HomePage.page.tsx
    - Third example: a grouped components directory should be button.components and inside src/components

# Command lines:.
1. Install node.js

[Node.js](https://nodejs.org/en)

Run: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` in Powershell

2. Install YARN

`npm install --global yarn`

`yarn create react-app react_boilerplate`

3. Install dependencies

`yarn add react-router-dom`

`yarn add tailwindcss postcss autoprefixer`

`npx tailwindcss init -p`

`yarn add typescript @types/react @types/react-dom @types/jest`