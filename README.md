# Contact List Management

## Description

A simple contact list management web application that allows users to:

- Fetch a list of contacts from the JSONPlaceholder API
- Display the contact information in a table
- Add new contacts to the list with validation
- Delete contacts from the list

## Technologies Used

- React
- TypeScript
- Ant Design
- Tailwind CSS
- JSONPlaceholder

## Requirements

- Node.js (>= v14)
- npm (>= v6) or yarn (>= v1)

## Installation

1. Clone the repository:

```shell
   git clone https://github.com/matt-cha/pacer-code-test
   cd pacer-code-test
```

2. Install dependencies:

```shell
npm install
```

3. Run the development server:

```shell
npms run dev
```

## Application Purpose

This application is designed for basic contact management. Users can interact with the contact list by:

- Adding new users
- Deleting existing users
- Viewing contacts

## How to Use

1. Upon loading, the app fetches data from the JSONPlaceholder API and displays it in a table.
2. Fill in the name, email, and phone number in the form fields.
3. Click the "Add Contact" button.
4. If the data is valid (all fields are required, email must be in the correct format, phone must be a valid number), the contact will be added to the table.
5. Click the "Delete" button on the row of the contact you want to remove.
