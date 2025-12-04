import userRepository from '../Repository/UserRepository.js';

class UserService {
  async create(userData) {
    try {
      return await userRepository.create(userData);
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await userRepository.findAll();
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      return await userRepository.findById(id);
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async update(id, userData) {
    try {
      return await userRepository.update(id, userData);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await userRepository.delete(id);
      if (deleted) {
        return { message: 'User deleted successfully' };
      }
      throw new Error('User not found');
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default new UserService();
