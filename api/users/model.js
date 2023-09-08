// DO NOT MAKE CHANGES TO THIS FILE
// DO NOT MAKE CHANGES TO THIS FILE
// DO NOT MAKE CHANGES TO THIS FILE
import { nanoid } from "nanoid";

function getId() {
  return nanoid().slice(0, 5);
}

const initializeUsers = () => [
  { id: "1", name: "Xamda Jamac", bio: "xhero" },
  { id: getId(), name: "Yusuf Jamac", bio: "hero" },
  { id: getId(), name: "Hawo Tako", bio: "super hero" },
];

// FAKE IN-MEMORY USERS "TABLE"
let users = initializeUsers();

// DATABASE ACCESS FUNCTIONS
export const find = () => {
  // SELECT * FROM users;
  return Promise.resolve(users);
};

export const findById = (id) => {
  // SELECT * FROM users WHERE id = 1;
  const user = users.find((d) => d.id === id);
  return Promise.resolve(user);
};

export const insert = ({ name, bio }) => {
  // INSERT INTO users (name, bio) VALUES ('foo', 'bar');
  const newUser = { id: getId(), name, bio };
  users.push(newUser);
  return Promise.resolve(newUser);
};

export const update = (id, changes) => {
  // UPDATE users SET name = 'foo', bio = 'bar WHERE id = 1;
  const user = users.find((user) => user.id === id);
  if (!user) return Promise.resolve(null);

  const updatedUser = { ...changes, id };
  users = users.map((d) => (d.id === id ? updatedUser : d));
  return Promise.resolve(updatedUser);
};

export const remove = (id) => {
  // DELETE FROM users WHERE id = 1;
  const user = users.find((user) => user.id === id);
  if (!user) return Promise.resolve(null);

  users = users.filter((d) => d.id !== id);
  return Promise.resolve(user);
};
