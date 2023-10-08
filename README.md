Simple json-csv cmd utility tool

Can be installed globally also
```bash
npm i -g .
```

Usage
```bash
node index.js -i data/input.json -o data/output.csv
```
### or via globally installed package
```bash
jsoncsv -i data/input.json -o data/output.csv
```

### Specifying Headers
seperated with comma, each item's title can be specified by seperating with ':' char
```bash
node index.js -i data/input.json -o data/output.csv -h "_id,Title:title,Image:images.0.url"
```

### Specifying Array Data Source
Helps for specifying array field for given input file if the file content is not a json array.
e.g below
```json
{
    "_id": 1,
    "title": "user list",
    "users": [
        { "id": "1", "username": "batman"},
        { "id": "2", "username": "robin"}
    ]
}
```

```bash
node index.js -i data/input.json -o data/output.csv -a users
```

```bash
node index.js -i data/input.json -o data/output.csv -a users -h "ID:id,USERNAME:username"
```