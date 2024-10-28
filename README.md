# Knowledge Graph Backend API

## Project Overview

This backend serves as the core API for the Knowledge Graph Application, enabling the creation and retrieval of nodes and relationships.

## Tech Stack

1. Node.js (Express) - Web server and routing
2. TypeScript - Typed JavaScript for better readability and maintainability
3. PostgreSQL - Relational database

## Project Structure

```
knowledge-graph-api/
├── src/
│   ├── controllers/   # Logic for handling HTTP requests
│   ├── models/        # Database models and schemas
│   ├── routes/        # Route definitions for API endpoints
│   ├── db.ts          # PostgreSQL connection setup
│   ├── server.ts      # Server configuration and startup
│   ├── types.ts       # Type property declaration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Project dependencies and scripts
```

## Getting Started

### Prerequisites

Make sure you have Node.js (v20+) installed.

## Setup

1. Clone the repository:

```
git clone git@github.com:rOluochKe/GraphFusion-Coding-Test.git
cd GraphFusion-Coding-Test/knowledge-graph-api
```

2. Install dependencies:

```
npm install
```

3. Configure your database:

```
Create .env file as a copy from .env.example and fill in the required fields
```

4. Running the Server:

```
npm run dev
```

The server should be running at `http://localhost:4000`.

## API Endpoints

### Nodes

```
POST /api/v1/nodes - Create a new node

Request body:
{
  "name": "GraphFusion",
  "data": "company"
}

```

### Relationships

```
POST /api/relationships - Create a new relationship

Request body:
{
  "fromNode": 1,
  "toNode": 2,
  "relationshipType": "founder"
}
```

### Nodes and Relationships

```
GET /api/v1/graph - Get nodes and relationships
```
