# Post

- id
- title
- slug
- image
- createdAt
- status: approved, pending, reject
- hot: boolean
- content
- userId
- categoryId

# Category

- id
- title
- slug
- status: approved, pending
- createAt

# User

- id
- displayName
- email
- password
- avatar
- status: active, pending, ban
- role: admin, mode, user
- permissions: 'ADD_POST', ...
  -createdAt
