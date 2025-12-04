import { User } from '../models/associations.js';

class UserRepository {
  async create(userData) {
    try {
      return await User.create(userData);
    } catch (error) {
      throw new Error(`Database error creating user: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      return await User.findAll(options);
    } catch (error) {
      throw new Error(`Database error fetching users: ${error.message}`);
    }
  }

  async findById(id, options = {}) {
    try {
      return await User.findByPk(id, options);
    } catch (error) {
      throw new Error(`Database error fetching user: ${error.message}`);
    }
  }

  async findByEmail(email, options = {}) {
    try {
      return await User.findOne({ where: { email }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching user by email: ${error.message}`);
    }
  }

  async update(id, userData, options = {}) {
    try {
      const [affectedRows] = await User.update(userData, { where: { id }, ...options });
      if (affectedRows > 0) {
        return await User.findByPk(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Database error updating user: ${error.message}`);
    }
  }

  async delete(id, options = {}) {
    try {
      return await User.destroy({ where: { id }, ...options });
    } catch (error) {
      throw new Error(`Database error deleting user: ${error.message}`);
    }
  }

  async count(options = {}) {
    try {
      return await User.count(options);
    } catch (error) {
      throw new Error(`Database error counting users: ${error.message}`);
    }
  }
}

export default new UserRepository();
