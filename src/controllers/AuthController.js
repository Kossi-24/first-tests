import AuthService from '../Services/AuthService.js';

export const register = async (req, res) => {
  try {
    const { nom, email, password, role } = req.body;
    const user = await AuthService.register({ nom, email, password, role });
    // ne pas renvoyer le password
    const { password: _, ...rest } = user;
    res.status(201).json(rest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login({ email, password });
    const { password: _, ...rest } = user;
    res.json({ user: rest, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
