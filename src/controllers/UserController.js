import userService from '../Services/UserService.js';

export class UserController {

  // Get ALL users
  async getUsers(req, res) {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.findById(id);

      if (!user) return res.status(404).json({ error: "User not found" });

      res.json(user);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // CREATE USER
  async createUser(req, res) {
    try {
      const requester = req.user; // who makes the request
      const userData = req.body;

      // LIBRARIAN cannot create ADMIN or LIBRARIAN
      if (requester.role === "LIBRARIAN") {
        if (userData.role && userData.role !== "MEMBER") {
          return res.status(403).json({
            message: "Librarian cannot create ADMIN or LIBRARIAN accounts"
          });
        }
        userData.role = "MEMBER"; // force MEMBER role
      }

      const user = await userService.create(userData);
      res.status(201).json(user);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // UPDATE USER
  async updateUser(req, res) {
    try {
      const requester = req.user;
      const { id } = req.params;
      const userData = req.body;

      const targetUser = await userService.findById(id);

      if (!targetUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // LIBRARIAN cannot modify ADMIN or LIBRARIAN
      if (requester.role === "LIBRARIAN") {
        if (targetUser.role !== "MEMBER") {
          return res.status(403).json({
            message: "Librarian cannot modify ADMIN or LIBRARIAN"
          });
        }

        // LIBRARIAN cannot change the role to ADMIN or LIBRARIAN
        if (userData.role && userData.role !== "MEMBER") {
          return res.status(403).json({
            message: "Librarian cannot promote users to ADMIN or LIBRARIAN"
          });
        }

        userData.role = "MEMBER"; // force MEMBER
      }

      const updated = await userService.update(id, userData);
      res.json(updated);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // DELETE USER
  async deleteUser(req, res) {
    try {
      const requester = req.user;
      const { id } = req.params;

      const targetUser = await userService.findById(id);

      if (!targetUser) {
        return res.status(404).json({ error: "User not found" });
      }

      // LIBRARIAN cannot delete ADMIN or LIBRARIAN
      if (requester.role === "LIBRARIAN" && targetUser.role !== "MEMBER") {
        return res.status(403).json({
          message: "Librarian cannot delete ADMIN or LIBRARIAN"
        });
      }

      const result = await userService.delete(id);
      res.json(result);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new UserController();
