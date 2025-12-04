import { Reservation } from '../models/associations.js';

class ReservationService {
  async create(reservationData) {
    try {
      const reservation = await Reservation.create(reservationData);
      return reservation;
    } catch (error) {
      throw new Error(`Error creating reservation: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const reservations = await Reservation.findAll({ include: ['user', 'book'] });
      return reservations;
    } catch (error) {
      throw new Error(`Error fetching reservations: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const reservation = await Reservation.findByPk(id, { include: ['user', 'book'] });
      return reservation;
    } catch (error) {
      throw new Error(`Error fetching reservation: ${error.message}`);
    }
  }

  async update(id, reservationData) {
    try {
      const [updated] = await Reservation.update(reservationData, { where: { id } });
      if (updated) {
        const updatedReservation = await Reservation.findByPk(id, { include: ['user', 'book'] });
        return updatedReservation;
      }
      throw new Error('Reservation not found');
    } catch (error) {
      throw new Error(`Error updating reservation: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await Reservation.destroy({ where: { id } });
      if (deleted) {
        return { message: 'Reservation deleted successfully' };
      }
      throw new Error('Reservation not found');
    } catch (error) {
      throw new Error(`Error deleting reservation: ${error.message}`);
    }
  }
}

export default new ReservationService();
