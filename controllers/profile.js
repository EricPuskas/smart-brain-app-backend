const handleProfile = async (req, res, User) => {
  const { id } = req.params;
  try {
    const userDoc = await User.findById(id);
    if (userDoc) {
      res.json(userDoc);
    } else {
      res.status(400).json("Not found");
    }
  } catch (err) {
    res.status(400).json("error getting user");
  }
};

export default { handleProfile };
