import { Reservation } from '../models/associations.js';

class ReservationRepository {
  async create(reservationData) {
    try {
      return await Reservation.create(reservationData);
    } catch (error) {
      throw new Error(`Database error creating reservation: ${error.message}`);
    }
  }

  async findAll(options = {}) {
    try {
      return await Reservation.findAll(options);
    } catch (error) {
      throw new Error(`Database error fetching reservations: ${error.message}`);
    }
  }

  async findById(id, options = {}) {
    try {
      return await Reservation.findByPk(id, options);
    } catch (error) {
      throw new Error(`Database error fetching reservation: ${error.message}`);
    }
  }

  async findByUser(userId, options = {}) {
    try {
      return await Reservation.findAll({ where: { userId }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching reservations by user: ${error.message}`);
    }
  }

  async findByBook(bookId, options = {}) {
    try {
      return await Reservation.findAll({ where: { bookId }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching reservations by book: ${error.message}`);
    }
  }

  async findByStatus(status, options = {}) {
    try {
      return await Reservation.findAll({ where: { status }, ...options });
    } catch (error) {
      throw new Error(`Database error fetching reservations by status: ${error.message}`);
    }
  }

  async findActiveByUser(userId, options = {}) {
    try {
      return await Reservation.findAll({
        where: {
          userId,
          status: 'PENDING'
        },
        ...options
      });
    } catch (error) {
      throw new Error(`Database error fetching active reservations by user: ${error.message}`);
    }
  }

  async update(id, reservationData, options = {}) {
    try {
      const [affectedRows] = await Reservation.update(reservationData, { where: { id }, ...options });
      if (affectedRows > 0) {
        return await Reservation.findByPk(id);
      }
      return null;
    } catch (error) {
      throw new Error(`Database error updating reservation: ${error.message}`);
    }
  }

  async delete(id, options = {}) {
    try {
      return await Reservation.destroy({ where: { id }, ...options });
    } catch (error) {
      throw new Error(`Database error deleting reservation: ${error.message}`);
    }
  }

  async count(options = {}) {
    try {
      return await Reservation.count(options);
    } catch (error) {
      throw new Error(`Database error counting reservations: ${error.message}`);
    }
  }

  async countByUser(userId, options = {}) {
    try {
      return await Reservation.count({ where: { userId }, ...options });
    } catch (error) {
      throw new Error(`Database error counting reservations by user: ${error.message}`);
    }
  }
}

export default new ReservationRepository();
