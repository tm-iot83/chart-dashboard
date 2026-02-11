# IOT83 Dashboard Builder

A modern, responsive, and interactive dashboard builder built with React, Vite, and DnD Kit. This application allows users to drag widgets from a library and build custom dashboards with real-time chart visualizations.

## Features

- **Drag-and-Drop Interface**: Seamlessly drag widgets from the "Widget List" and drop them into the dashboard area using `@dnd-kit`.
- **Dynamic Chart Rendering**: Automatically renders different types of charts (Line, Bar, Pie, etc.) based on the dropped widget's ID.
- **Editable Dashboard**: Toggle between "Edit" and "View" modes to manage your dashboard layout.
- **Responsive Design**: Built with Tailwind-like utility classes and custom SCSS for a fluid layout.
- **Mock Data Integration**: Pre-configured with mock chart data for immediate visualization testing.

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Drag & Drop**: [@dnd-kit/core](https://dnd-kit.com/)
- **Styling**: SCSS (compiled to CSS)
- **Language**: TypeScript

## Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── charts/          # Chart wrapper and visualization logic
│   ├── widgetBuilder.tsx # Drop zone and dashboard layout
│   └── widgetList.tsx    # Draggable widget items
├── data/                # Mock data for charts and widgets
├── css/                 # Global styles and SCSS files
├── App.tsx              # Main application entry point
└── main.tsx             # React DOM initialization
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd new_latest
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### CSS Compilation

The project uses SCSS. To watch for changes and recompile the CSS, you can run:

```bash
sass --watch src/index.scss src/output.css
```

## License

This project is for internal use at IOT83.
