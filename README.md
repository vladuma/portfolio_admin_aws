# What is this?
This tool is an API that allows to CRUD portfolio data stored in DynamoDB.
This data is displayed in my portfolio/ online CV on [vladuma.github.io](https://vladuma.github.io/).

# ToDo / Feature list
* Setup project to deploy DynamoDB, S3 bucket V
* Provide API to write to database V
* Provide API to read from the database V
* Provide API to delete/update the database from the portfolio-admin client V
* Provide API to login to the portfolio-admin client

# Write to table
Send POST request to /{stage}/write, with the following body:\
{\
    "tableName": "valid table name",\
    "data": "stringified and valid data"\
}\

# Read from table
Send GET request to /{stage}/read, with a query parameters:
* to read entire table: "tableName" containing a valid database name.
* to read a specific item: "tableName" containing a valid database name & "itemId" with a valid item Id.

# Update table
Send PUT request to /{stage}/update, with the following body:\
{\
    "tableName": "valid table name",\
    "data": "stringified and valid data"\
}.\
The data must have an existing id.

# Delete table
Send DELETE request to /{stage}/delete with the following body:\
{\
    "tableName": "valid table name",\
    "data": "stringified key schema data, i.e. item ID and Name"\
}.\