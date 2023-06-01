const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Registrare un nuovo utente
exports.register = async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    // Verificare se l'email esiste già nel database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creare un nuovo utente
    user = new User({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Salvare l'utente nel database
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Accedere come utente
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificare se l'utente esiste
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Verificare la password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Creare un token JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verificare l'utente
exports.profile = async (req, res, next) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      if (!token) {
        return res.status(403).send('A token is required for authentication');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id);
      if (!user) {
        throw new Error();
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(401).send('Invalid Token');
    }
  };
  