# 🌐 Express TypeScript Server

This project is a server-side application built with **Express.js** and **TypeScript**. It provides a robust, type-safe backend framework for developing APIs or web applications.

---

## 🚀 Features

- 🛠 **TypeScript** for enhanced type safety and developer experience.
- ⚡ **Express.js** for fast and minimalist web framework functionality.
- 🔄 Middleware support for JSON parsing and routing.
- 📂 Organized project structure for scalability and maintainability.

---

## 📚 Tech Stack

- **Node.js**: Runtime environment for JavaScript.
- **Express.js**: Minimal and flexible Node.js web application framework.
- **TypeScript**: Superset of JavaScript with static typing.

---
## 📂 Branch Naming Convention

Branches should be named according to their purpose and task:

```plaintext
<prefix>/<USXX>-<task-name>
```

- **Prefix** options:
  - `feature/` – for new features
  - `fix/` – for bug fixes
  - `chore/` – for non-functional tasks
  - `refactor/` – for code restructuring
  
> Example: If your task is `[US001][FE]Create application`, your branch name would be `feature/US001-create-application`.

---

## 💾 Commit Message Convention

Follow a structured commit message format to maintain a clear history:

```plaintext
<prefix>(<USXX>): <commit message>
```

- **Prefix** options:
  - `feat` – for new features
  - `fix` – for bug fixes
  - `chore` – for maintenance tasks
  - `refactor` – for code restructuring
  
> Example: If your branch is `[US009][FE]create header and footer`, your commit message would be `feat(US009): create home page`.

---

## 🔄 Development Workflow

The development process is organized for efficiency and consistency:

1. **Pull** the latest code from the main branch.
2. **Create a new branch** from the main branch.
3. **Code** your assigned task.
4. **Commit** changes and **stash** if needed.
5. **Switch to main branch** and pull any new updates.
6. **Switch back to your working branch** and merge any updates from `main` into it.
7. **Resolve conflicts** if any.
8. **Push** your branch to the remote repository.
9. **Create a pull request** and request reviews.
10. After approval, **squash and merge** the pull request.

```plaintext
┌───────────────────────────────┐
│        Pull from Main         │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│    Create New Branch from     │
│           Main                │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│             Code              │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│     Commit and Stash if       │
│           Needed              │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Switch to Main Branch and   │
│         Pull Updates          │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Switch to Working Branch    │
│    and Merge Updates from     │
│            Main               │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│   Resolve Conflicts if Any    │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│          Push to Remote       │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│      Create Pull Request      │
│   and Request Review from     │
│            Others             │
└──────────────┬────────────────┘
               │
               ▼
┌───────────────────────────────┐
│  After Approval, Squash and   │
│            Merge              │
└───────────────────────────────┘
```

### 📌 Notes for Enhanced Development Progress

- **Consistency**: Adhere strictly to naming and commit conventions to maintain a clear, readable history.
- **Frequent Pulls**: Regularly pull updates from the main branch to avoid large conflicts.
- **Communication**: Keep the team informed about your progress and any blockers to ensure a smooth workflow.
- **Review Requests**: Aim for timely reviews by tagging appropriate reviewers, especially for critical features.

## 📂 Project Structure

```plaintext
.
├── src
│   ├── index.ts         # Entry point of the application
│   ├── routes         # API routes
│   │   └── index.ts   # Example route
│   └── middleware     # (Optional) Custom middleware
├── dist               # Compiled JavaScript files (output directory)
├── tsconfig.json      # TypeScript configuration
├── nodemon.json       # Nodemon configuration
├── package.json       # NPM configuration
└── README.md          # Project documentation
```


Here's a README.md for your Express TypeScript server:

markdown
Sao chép mã
# 🌐 Express TypeScript Server

This project is a server-side application built with **Express.js** and **TypeScript**. It provides a robust, type-safe backend framework for developing APIs or web applications.

---

## 🚀 Features

- 🛠 **TypeScript** for enhanced type safety and developer experience.
- ⚡ **Express.js** for fast and minimalist web framework functionality.
- 🔄 Middleware support for JSON parsing and routing.
- 📂 Organized project structure for scalability and maintainability.

---

## 📚 Tech Stack

- **Node.js**: Runtime environment for JavaScript.
- **Express.js**: Minimal and flexible Node.js web application framework.
- **TypeScript**: Superset of JavaScript with static typing.

---

## 📂 Project Structure

```plaintext
.
├── src
│   ├── app.ts         # Entry point of the application
│   ├── routes         # API routes
│   │   └── index.ts   # Example route
│   └── middleware     # (Optional) Custom middleware
├── dist               # Compiled JavaScript files (output directory)
├── tsconfig.json      # TypeScript configuration
├── nodemon.json       # Nodemon configuration
├── package.json       # NPM configuration
└── README.md          # Project documentation
```
## 🔧 Setup and Installation
1. **Clone the repository**:
```bash
git clone https://github.com/etclubdev/server-et-webapp.git
cd express-ts-server
```
2. **Install dependencies**:
```bash
npm install
```
3. **Start the server in development mode using .env.local**:
```bash
npm run dev:local
```
4. **Start the server in development mode using .env.prod**:
```bash
npm run dev:prod
```
5. **Build for production**:
```bash
npm run build
```
6. **Run the production build**:
```bash
npm start
```
## 📜 Scripts
```bash
npm run dev: //Starts the server in development mode with ts-node and nodemon.
npm run build: //Compiles TypeScript into JavaScript in the dist folder.
npm start: //Runs the compiled JavaScript from the dist folder.
```
