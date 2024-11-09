
# Respond.io Frontend Technical Assessment - Flow Chart Application

This is a frontend technical assessment project for [Respond.ai](https://respond.io/), implementing a flow chart based on a dataset provided in `data.json` within the `public` folder.

The application allows users to create, view, edit, and delete nodes in a flow chart interface, with additional functionality for managing node details and attachments through a drawer interface.

### Live Demo
You can view the live version of the app on Vercel: [https://respond-io-tau.vercel.app/](https://respond-io-tau.vercel.app/)

## Getting Started

To set up the project locally, follow these steps:

1. **Install dependencies**  
   Run:
   ```bash
   pnpm install
   ```

2. **Run the development server**  
   Start the development server with:
   ```bash
   pnpm run dev
   ```

## Technologies and Tools Used

The following tools and packages were used in this project:

- **Vue 3**: The progressive JavaScript framework for building user interfaces.
- **Vue Flow**: A library for rendering flow-based diagrams and interactive node graphs.
    - `@vue-flow/core`, `@vue-flow/background`, `@vue-flow/controls`, and `@vue-flow/minimap` packages were used to create and customize flow charts.
- **Pinia**: A lightweight state management library for Vue 3.
- **Dagre**: A layout engine used to automatically arrange nodes in the flow chart.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Heroicons**: Icons used for UI elements.

### Additional Development Tools

- **Vite**: A fast build tool for modern web projects.
- **Vitest**: Testing framework for running unit tests.
- **ESLint & Prettier**: For maintaining code quality and formatting.
- **PostCSS & Autoprefixer**: Tools for CSS processing.

## Project Overview

The app starts by calling the `initializeStore` function, which loads and transforms the data for use with Vue Flow, enabling the flow chart to render properly.

### Features

#### Node Creation
- **Create New Node**: Adds a new node to the flow chart with customizable fields:
    - **Title**: Text field for the node title.
    - **Description**: Text field for the node description.
    - **Type of Node**: Dropdown to select the type of node:
        - **Send Message** (`sendMessage`)
        - **Add Comments** (`addComment`)
        - **Business Hours** (`businessHours`)

#### Node Display in Canvas
- **Canvas View**: Each node in the canvas displays:
    - Icons
    - Truncated Title and Description for easy readability

#### Node Details - Drawer View
- **Node Details Drawer**: Each node has a dedicated drawer displaying its properties and attachments. The drawer can be accessed via URL (using the node ID) or by clicking the node on the canvas.
    - **Editable Fields**:
        - Title and Description fields are editable directly within the drawer.
        - The user can delete the node from this view.
    - **Node Type-Specific Fields**:
        - **Send Message**:
            - Displays attachments as tile/box previews, allowing users to upload new attachments.
            - Displays and updates text fields.
        - **Add Comments**:
            - Displays existing comments in an editable text field.
        - **Business Hours**:
            - Displays business hours.
            - Provides a Date Time Picker for updating business hours.
    - **Special Nodes**:
        - The `success` and `failure` nodes are display-only and not accessible for editing.

### Utilities
The project includes utility functions such as `processFlow.js` and `transformFlowData.js` to streamline data processing and transformation for Vue Flow.

### Validation
Simple input validation has been added for the modal to ensure data integrity.

## Potential Improvements

1. **TypeScript Integration**  
   Adding TypeScript would improve type safety, especially when using complex libraries like Vue Flow.

2. **Unit Testing**  
   Additional unit tests could be implemented to ensure component reliability and functionality.

## Scripts

- `pnpm run dev`: Starts the development server.
- `pnpm run build`: Builds the application for production.
- `pnpm run preview`: Previews the production build.
- `pnpm run test:unit`: Runs unit tests using Vitest.
- `pnpm run lint`: Runs ESLint to check for syntax and style issues.
- `pnpm run format`: Formats code using Prettier.

---
