# React Explained

Let's break down React in the simplest terms possible, thinking about how it's used in the files you've shared:

## What is React?

Imagine building a website like using Lego blocks. React is a popular JavaScript library (a collection of pre-written code) that helps you create those blocks and put them together to build user interfaces (the visual parts of a website or app).

It's maintained by Facebook (Meta) and a large community.

## Components: The Lego Blocks

React lets you break your UI into small, reusable pieces called **Components**.

- Think of `Header.component.tsx`, `Footer.component.tsx`, and `LanguageSwitcher.component.tsx`. Each file defines a specific piece of the UI (the header, the footer, the language buttons).
- You can then combine these components to build bigger ones. For example, `MainLayout.layout.tsx` uses the Header and Footer components to create the main structure for most pages.
- Components can be simple functions (like most of the ones here) or classes (a more traditional Object-Oriented approach).

## JSX: HTML in JavaScript

Inside React components, you write something that looks like HTML, but it's actually called **JSX** (JavaScript XML).

- Look at `Header.component.tsx`. You see things like `<header>`, `<div>`, `<Link>`, `<button>`. This isn't real HTML, but JSX lets you describe your UI structure in a familiar way.
- The cool part is you can easily mix JavaScript logic within JSX using curly braces `{}`. For example, in `NavigationMenu.component.tsx`, `{item.label[language]}` displays text based on the current language variable.

## State: Component Memory

Components often need to remember things that can change over time, like whether a menu is open or what a user typed into a form. This "memory" is called **State**.

- In `Header.component.tsx`, `const [isMenuOpen, setIsMenuOpen] = useState(false);` creates a piece of state called `isMenuOpen`. It starts as `false`. When the mobile menu button is clicked (`onClick={toggleMenu}`), the `toggleMenu` function calls `setIsMenuOpen(!isMenuOpen)`, which updates the state, causing React to re-render the component and show/hide the mobile menu accordingly.
- The `LanguageContext.context.tsx` uses state (`useState<Language>('en')`) to keep track of the currently selected language ('en' or 'vi').

## Props: Passing Data Down

Often, a parent component needs to give data or instructions to a child component. This is done using **Props** (short for properties).

- In `NavigationMenu.component.tsx`, the component can receive `isMobile` and `onItemClick` as props: `({ isMobile = false, onItemClick })`. When the Header uses `<NavigationMenu isMobile={true} ... />` for the mobile view, it's passing `true` down as the `isMobile` prop.

## Virtual DOM: Efficient Updates

Changing things directly in the web browser's structure (the DOM) can be slow. React uses a clever trick: it keeps a virtual copy of the DOM in memory (the **Virtual DOM**).

- When state or props change, React first updates this virtual copy, figures out the minimum necessary changes, and then efficiently updates the real browser DOM. This makes React apps feel fast and responsive.

## Context: Sharing Data Easily

Sometimes, data (like the current language or user theme) needs to be available to many components deep down the tree without passing props through every single level (this is called "prop drilling").

- React's **Context API** provides a way to share such data. `LanguageContext.context.tsx` creates a `LanguageContext`. The `LanguageProvider` wraps the application (or part of it) and makes the language state and `setLanguage` function available to any component inside it that asks for it using the `useLanguage` hook (like `Header.component.tsx`, `About.page.tsx`, etc.).

## Routing: Navigating Pages

In single-page applications (SPAs), you often want to change the content shown based on the URL without a full page reload. Libraries like **React Router** (used in `App.tsx`) handle this.

- `App.tsx` defines routes (`/`, `/about`, `/graphql`). When the URL matches a path, React Router tells React which page component (`HomePage`, `AboutPage`, `GraphQLPage`) to render inside the `<Outlet />` of the `MainLayout.layout.tsx`.

In essence, React helps you build complex UIs by composing small, manageable, and reusable component "blocks," efficiently updating the screen when data changes. The files you shared demonstrate these core concepts in action: components for UI parts, state for dynamic behavior (like the mobile menu and language), context for global data sharing (language), and routing for navigation.