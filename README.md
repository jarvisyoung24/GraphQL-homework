Book Search Engine
------------------

Description
-----------

The Book Search Engine is a full-stack MERN application that allows users to search for books using the Google Books API, save their favorite books, and manage their accounts. This project is refactored to use GraphQL with Apollo Server for improved performance and scalability.

Key Features

User Authentication: Signup and login functionality.

Book Search: Search for books using the Google Books API.

Save Favorites: Save and manage a personalized list of favorite books.

Responsive Design: Mobile-first approach using Bootstrap.

Technologies Used
-----------------

Frontend: React, TypeScript, Apollo Client, Bootstrap

Backend: Apollo Server (GraphQL), Node.js, Express.js

Database: MongoDB (via MongoDB Atlas)

API: Google Books API

User Story
-----------

As an avid reader,
I want to search for new books to read,
So that I can keep a list of books to purchase.

Acceptance Criteria
-------------------

Search for Books:

Users can search for books via an input field.

Search results display the book title, author(s), description, cover image, and a link to the Google Books page.

Authentication:

Users can sign up for an account or log in.

Logged-in users can save books to their account.

Saved Books:

Users can view their saved books with the option to remove them.

Logout:

Users can log out, clearing the session.

Installation

Prerequisites

Node.js (v14 or later)

npm or yarn

MongoDB (local or hosted, e.g., MongoDB Atlas)

Steps

Clone the repository:

git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name

Install dependencies:

npm install

Configure environment variables:

Create a .env file in the root directory.

Add the following:

MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
GOOGLE_BOOKS_API_KEY=<your_google_books_api_key>

Seed the database (optional):

npm run seed

Start the application:

npm run develop

Usage

Launch the application by navigating to http://localhost:3000 in your browser.

Use the search bar to find books by title or author.

Sign up or log in to save your favorite books.

View and manage your saved books from the dashboard.

Deployment
-----------

The application is deployed to Render with MongoDB hosted on MongoDB Atlas. Follow these steps for deployment:

Set up a MongoDB Atlas cluster and retrieve your connection string.

Create a Render account and link your GitHub repository.

Add the required environment variables in the Render dashboard.

Deploy the application using the "Deploy with Render" button.
