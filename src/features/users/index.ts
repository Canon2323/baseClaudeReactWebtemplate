// Main export file for users feature
// Following the Vertical Slice pattern - everything users-related is exported from here

// Types
export type * from "./types/user.types";

// Services
export { UserService } from "./services/user.service";
export type { IUserRepository, IUserValidation } from "./services/user.service";

// Stores
export { useUserStore } from "./stores/user.store";
export type { UserStore } from "./stores/user.store";

// Hooks
export { useUser, useUsers } from "./hooks";

// Components
export { UserList } from "./components";
