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
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
  }

  async update(id, userData) {
    try {
      const [updated] = await User.update(userData, { where: { id } });
      if (updated) {
        const updatedUser = await User.findByPk(id);
        return updatedUser;
      }
      throw new Error('User not found');
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await User.destroy({ where: { id } });
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
