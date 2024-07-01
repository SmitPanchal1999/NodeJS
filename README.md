# Tree View Tag/File Structure

This project is a RESTful API for managing a hierarchical tree structure of tags/filenames using NodeJS, Express and MongoDB. It supports various operations such as adding root tags, adding child tags, removing child tags along with their descendants, updating tags, retrieving all tags, and moving child tags within the hierarchy.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Add Root Tag](#add-root-tag)
  - [Add Child Tag](#add-child-tag)
  - [Remove Child Tag](#remove-child-tag)
  - [Update Tag](#update-tag)
  - [Get All Tags](#get-all-tags)
  - [Move Child Tag](#move-child-tag)
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
- **Description**: Adds a new root tag.
- **Body Parameters**:
  - `tagName` (string): The name of the tag.
- **Response**:
  - `200 OK` with the ID of the newly created tag.
  - `500 Internal Server Error` on failure.

### Add Child Tag

- **URL**: `/addChild`
- **Method**: `POST`
- **Description**: Adds a new child tag under a specified parent.
- **Body Parameters**:
  - `parentId` (string): The ID of the parent tag.
  - `tagName` (string): The name of the tag.
  - `order` (number): The order of the tag under the parent.
- **Response**:
  - `200 OK` with the ID of the newly created tag.
  - `500 Internal Server Error` on failure.

### Remove Child Tag

- **URL**: `/removeChild`
- **Method**: `DELETE`
- **Description**: Removes a tag and all its descendants.
- **Body Parameters**:
  - `parentId` (string): The ID of the parent tag.
- **Response**:
  - `200 OK` on successful deletion.
  - `500 Internal Server Error` on failure.

### Update Tag

- **URL**: `/updateChild`
- **Method**: `PUT`
- **Description**: Updates the `tagName` of a specified tag.
- **Body Parameters**:
  - `parentId` (string): The ID of the tag to be updated.
  - `tagName` (string): The new name of the tag.
- **Response**:
  - `200 OK` on successful update.
  - `500 Internal Server Error` on failure.

### Get All Tags

- **URL**: `/getAll`
- **Method**: `GET`
- **Description**: Retrieves all tags in the database.
- **Response**:
  - `200 OK` with the list of tags.
  - `500 Internal Server Error` on failure.

### Move Child Tag

- **URL**: `/moveChild`
- **Method**: `PUT`
- **Description**: Moves a tag from one parent to another within the hierarchy and updates the order accordingly.
- **Body Parameters**:
  - `parentId` (string): The ID of the tag to be moved.
  - `tagName` (string): The name of the tag to be moved.
- **Response**:
  - `200 OK` on successful move.
  - `400 Bad Request` if the move is not valid.
  - `500 Internal Server Error` on failure.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing tags.
- **Mongoose**: ODM for MongoDB.
