import exemplaireService from '../Services/ExemplaireService.js';

class ExemplaireController {
  async getExemplaires(req, res) {
    try {
      const exemplaires = await exemplaireService.findAll();
      res.json(exemplaires);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getExemplaireById(req, res) {
    try {
      const { id } = req.params;
      const exemplaire = await exemplaireService.findById(id);
      if (exemplaire) {
        res.json(exemplaire);
      } else {
        res.status(404).json({ error: 'Exemplaire not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createExemplaire(req, res) {
    try {
      const exemplaireData = req.body;
      const exemplaire = await exemplaireService.create(exemplaireData);
      res.status(201).json(exemplaire);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateExemplaire(req, res) {
    try {
      const { id } = req.params;
      const exemplaireData = req.body;
      const exemplaire = await exemplaireService.update(id, exemplaireData);
      res.json(exemplaire);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteExemplaire(req, res) {
    try {
      const { id } = req.params;
      const result = await exemplaireService.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new ExemplaireController();
