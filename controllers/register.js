const handleRegister = async (req, res, Login, User, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }

  const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  try {
    const loginDoc = await Login.create({ email, hash });
    const userDoc = await User.create({ email, name, joined: new Date() });

    res.json(userDoc);
  } catch (err) {
    res.status(400).json("unable to register");
  }
};

export default { handleRegister };
