import reservationService from '../Services/ReservationService.js';

class ReservationController {
  async getReservations(req, res) {
    try {
      const reservations = await reservationService.findAll();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getReservationById(req, res) {
    try {
      const { id } = req.params;
      const reservation = await reservationService.findById(id);
      if (reservation) {
        res.json(reservation);
      } else {
        res.status(404).json({ error: 'Reservation not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createReservation(req, res) {
    try {
      const reservationData = req.body;
      const reservation = await reservationService.create(reservationData);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateReservation(req, res) {
    try {
      const { id } = req.params;
      const reservationData = req.body;
      const reservation = await reservationService.update(id, reservationData);
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteReservation(req, res) {
    try {
      const { id } = req.params;
      const result = await reservationService.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ReservationController();
