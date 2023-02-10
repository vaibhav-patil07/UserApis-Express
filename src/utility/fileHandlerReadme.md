# FileHandler

This class provides two static methods for reading and writing a json file.

1.readFileAync

| Parameter  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `path`     | `string` | **Required**. Path of the file              |
| `encoding` | `string` | **Required**. encoding for reading the file |

This function returns a Promise object which on success gives file data in json format.

2.writeFileAync

| Parameter  | Type     | Description                                 |
| :--------- | :------- | :------------------------------------------ |
| `path`     | `string` | **Required**. Path of the file              |
| `encoding` | `string` | **Required**. encoding for writing the file |
| `data`     | `string` | **Required**. data to write in file         |

This function returns a Promise object which on success gives data written to the file.
