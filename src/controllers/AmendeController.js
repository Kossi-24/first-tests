import amendeService from '../Services/AmendeService.js';

class AmendeController {
  async getAmendes(req, res) {
    try {
      const amendes = await amendeService.findAll();
      res.json(amendes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAmendeById(req, res) {
    try {
      const { id } = req.params;
      const amende = await amendeService.findById(id);
      if (amende) {
        res.json(amende);
      } else {
        res.status(404).json({ error: 'Amende not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createAmende(req, res) {
    try {
      const amendeData = req.body;
      const amende = await amendeService.create(amendeData);
      res.status(201).json(amende);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAmende(req, res) {
    try {
      const { id } = req.params;
      const amendeData = req.body;
      const amende = await amendeService.update(id, amendeData);
      res.json(amende);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAmende(req, res) {
    try {
      const { id } = req.params;
      const result = await amendeService.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AmendeController();
