import editionService from '../Services/EditionService.js';

class EditionController {
  async getEditions(req, res) {
    try {
      const editions = await editionService.findAll();
      res.json(editions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEditionById(req, res) {
    try {
      const { id } = req.params;
      const edition = await editionService.findById(id);
      if (edition) {
        res.json(edition);
      } else {
        res.status(404).json({ error: 'Edition not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createEdition(req, res) {
    try {
      const editionData = req.body;
      const edition = await editionService.create(editionData);
      res.status(201).json(edition);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateEdition(req, res) {
    try {
      const { id } = req.params;
      const editionData = req.body;
      const edition = await editionService.update(id, editionData);
      res.json(edition);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteEdition(req, res) {
    try {
      const { id } = req.params;
      const result = await editionService.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new EditionController();
