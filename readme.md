# Personal Blog Site

This repository contains the code for a **Personal Blog Site** created using **Node.js** for the backend and **HTML/CSS** for the frontend. This project is designed for educational purposes, allowing users to create, update, delete, and view blog posts.

---

## Features

- **Create** a new blog post with a title and body.
- **View** all blog posts on the homepage.
- **Edit** an existing blog post.
- **Delete** a blog post.
- **Dynamic preview** of blog posts while creating or updating.

---

## How to Use

### Prerequisites

- **Node.js**: Install Node.js runtime on your computer. You can download it from the [Node.js Official Website](https://nodejs.org/).
- **Git**: Ensure Git is installed to clone the repository. You can download it from the [Git Official Website](https://git-scm.com/).

### Installation Steps

1. **Clone or download** the repository to your local machine:
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install dependencies** by running the following commands in the terminal:
    ```bash
    npm audit fix
    npm install
    ```

3. **Start the application**:
    ```bash
    node index.js
    ```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the blog site.

---

## Directory Structure

```plaintext
|-- data/                   # Directory containing JSON data for blogs and indexes
|-- public/                 # Directory for static assets like CSS and JS files
|-- views/                  # Contains EJS templates for rendering pages
|-- index.js                # Main server file
|-- package.json            # Node.js dependencies and scripts
```

---

## Functionality

- **Homepage**: Displays a list of blog posts. Click on a post to view its content.
- **Create Blog**: Click "Create New" to add a new blog post.
- **Edit Blog**: Click the edit button to modify an existing post.
- **Delete Blog**: Click the delete button to remove a blog post.

---

## Notes

- The data for the blog posts is stored in the `data/blogs/` folder as JSON files.
- An `index.json` file is used to manage blog IDs and states.
- The project is for educational purposes and should not be used in production without modifications.

---

## License

This project is for educational use. Users can modify and distribute the code as per their requirements, provided proper attribution is given.

---

**Happy Blogging!**
