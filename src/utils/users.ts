type User = { username?: string; email: string; password?: string };

export const users: User[] = [];

export function findUserByEmail(email: string) {
  return users.find((u) => u.email === email);
}

export function addUser(user: User) {
  users.push(user);
}