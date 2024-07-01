# Tree View File Structure Project 

This project is a RESTful API for managing a hierarchical tree structure of tags using Express and MongoDB. It supports various operations such as adding root tags, adding child tags, removing child tags along with their descendants, updating tags, retrieving all tags, and moving child tags within the hierarchy.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/tag-management-api.git
    cd tag-management-api
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
    ```
    MONGO_URI=mongodb://your-mongo-db-uri
    ```

4. Start the server:
    ```bash
    npm start
    ```

The server will be running on `http://localhost:3000`.

## API Endpoints

### Add Root Tag

- **URL**: `/addRoot`
- **Method**: `POST`
- **Description**: Adds a new root tag to the database. A root tag is a top-level tag with no parent.
- **Body Parameters**:
  - `tagName` (string): Name of the root tag.
- **Response**:
  - `200 OK` on successful creation, returns the ID of the new tag.
  - `500 Internal Server Error` on failure.

### Add Child Tag

- **URL**: `/addChild`
- **Method**: `POST`
- **Description**: Adds a new child tag under a specified parent tag. The API expects the following body parameters:
  - `parentId` (string): ID of the parent tag under which the child tag will be added.
  - `tagName` (string): Name of the child tag.
  - `order` (number): Position of the child tag relative to its siblings.
- **Response**:
  - `200 OK` on successful creation, returns the ID of the new child tag.
  - `500 Internal Server Error` on failure.

### Remove Child Tag

- **URL**: `/removeChild`
- **Method**: `DELETE`
- **Description**: Removes a tag and all its descendants from the database. The API expects the following body parameter:
  - `parentId` (string): ID of the parent tag whose subtree (including itself) needs to be deleted.
- **Response**:
  - `200 OK` on successful deletion.
  - `500 Internal Server Error` on failure.

### Update Tag

- **URL**: `/updateChild`
- **Method**: `PUT`
- **Description**: Updates the `tagName` of a specified tag. The API expects the following body parameters:
  - `parentId` (string): ID of the tag to be updated.
  - `tagName` (string): New name for the tag.
- **Response**:
  - `200 OK` on successful update.
  - `500 Internal Server Error` on failure.

### Get All Tags

- **URL**: `/getAll`
- **Method**: `GET`
- **Description**: Retrieves all tags from the database.
- **Response**:
  - `200 OK` on successful retrieval, returns an array of all tags.
  - `500 Internal Server Error` on failure.

### Move Child Tag

- **URL**: `/moveChild`
- **Method**: `PUT`
- **Description**: Moves a tag from one parent to another within the hierarchy and updates the order accordingly. The API expects the following body parameters:
  - `tagName` (string): Name of the tag to be moved.
  - `parentId` (string): ID of the new parent tag under which the tag should be moved.
- **Response**:
  - `200 OK` on successful move.
  - `400 Bad Request` if the requested tag or parent doesn't exist or the move is invalid.
  - `500 Internal Server Error` on other failures.

  - **DFS Traversal Explanation**: The `moveChild` API utilizes Depth-First Search (DFS) traversal to find the correct position for the tag within the hierarchy before updating its `parentId` and `order`. DFS recursively explores each branch of the tag hierarchy until it finds the appropriate tag to move.


## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- jQuery
- EJS
- CSS
