# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2740f406-dd23-4a7a-85e3-4dd8cb58bbf1

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2740f406-dd23-4a7a-85e3-4dd8cb58bbf1) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2740f406-dd23-4a7a-85e3-4dd8cb58bbf1) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

### CHANGELOG

- **Animation Bug Fix:** Refactored cursor entrance animations in `src/pages/Index.tsx` to prevent looping on mouse movement. Entrance animations are now tied to component mount/visibility, respecting `prefers-reduced-motion`.
- **Multi-page Conversion:**
  - Implemented `react-router-dom` for multi-page navigation.
  - Created new pages: `/about` (About Me), `/projects` (Projects), and `/hire` (Hire Me) in `src/pages/`.
  - Updated `src/components/layout/Navbar.tsx` to include new navigation links and handle active states.
- **Component Refactoring & Reusability:**
  - Moved project data from `src/components/sections/Projects.tsx` to `src/data/projects.ts`.
  - Extracted reusable `ProjectsGrid` component (`src/components/shared/ProjectsGrid.tsx`) to display projects, used by both Home and Projects pages.
  - Extracted reusable `ContactForm`, `ContactInfo`, and `SocialLinks` components (`src/components/shared/ContactForm.tsx`, `src/components/shared/ContactInfo.tsx`, `src/components/shared/SocialLinks.tsx`) from `src/components/sections/Contact.tsx`.
  - Updated `src/components/sections/Projects.tsx` and `src/components/sections/Contact.tsx` to utilize these new shared components.
- **About Me Page Implementation:**
  - Created `src/components/shared/Timeline.tsx` for the 2021-2025 journey with subtle animations and an alternating image/text layout, including achievements.
  - Redesigned `src/components/shared/SkillsSection.tsx` with enhanced card visuals and hover animations.
  - Redesigned `src/components/shared/AchievementsSection.tsx` to be card-based with images and entrance animations.
  - Populated `src/pages/AboutPage.tsx` with these new components.
  - Removed old tabbed content from `src/components/sections/About.tsx` as its functionality is now dedicated to the `/about` page.
- **Global Enhancements & Polish:**
  - **Navbar Animation:** Navbar now animates immediately on page load, playing once.
  - **Cursor Follow Effect:** The circular cursor-follow element has been restored site-wide, with its original size, speed, easing, and hover interactions.
  - **Floating Effects & Blobs:**
    - Extracted common floating blob logic to `src/components/shared/FloatingBackgroundBlobs.tsx` for reusability.
    - Applied blurred background blobs to ALL pages (`Index.tsx`, `AboutPage.tsx`, `ProjectsPage.tsx`, `HireMePage.tsx`), with varied sizes, shapes, and slow fade/float animations, maintaining existing color themes.
    - Unique image-containing blobs retained on `AboutPage.tsx`.
  - **"Hire Me" Nav Link Background:** Restored the background highlight for the "Hire Me" link in the navbar.
  - **Chatbot Feature:** Added a chatbot UI (`src/components/layout/Chatbot.tsx`) with a floating chat bubble, conversation window, and mock AI responses based on project data.
  - **General Front-End Polish:** Added more light floating effects, blobs, and animated backgrounds to existing sections (`Hero.tsx`, `About.tsx`, `Projects.tsx`, `Contact.tsx`) for overall site polish, ensuring performance and `prefers-reduced-motion` support.
