const handleSignin = async (req, res, Login, User, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  try {
    const loginDoc = await Login.findOne({ email });

    if (!loginDoc) {
      throw new Error("wrong credentials");
    }

    const isValid = bcrypt.compareSync(password, loginDoc.hash);

    if (isValid) {
      const userDoc = await User.findOne({ email });
      res.json(userDoc);
    } else {
      throw new Error("wrong credentials");
    }
  } catch (err) {
    res.status(400).json("wrong credentials");
  }
};

export default { handleSignin };
