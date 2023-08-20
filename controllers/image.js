const handleImage = async (req, res, User) => {
  const { id } = req.body;
  try {
    const userDoc = await User.findById(id);

    if (userDoc) {
      userDoc.entries += 1;
      await userDoc.save();
      res.json(userDoc.entries);
    } else {
      res.status(400).json("Unable to get entries");
    }
  } catch (err) {
    res.status(400).json("Unable to get entries");
  }
};

export default { handleImage };
