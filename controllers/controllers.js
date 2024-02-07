const { pool } = require("../config/db");

const handleGetPosts = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    console.error("Error ejecutando GET request:", error);
    res.status(500).send("Internal Server Error");
  }
};

const handleCreatePost = async (req, res) => {
  const { titulo, url, descripcion } = req.body;

  if (
    typeof titulo !== "string" ||
    typeof url !== "string" ||
    typeof descripcion !== "string"
  ) {
    return res
      .status(400)
      .json({
        error: "Tipos de datos invalidos para los campos; deben ser strings.",
      });
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *",
      [titulo, url, descripcion]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error("Error ejecutando POST request:", error);
    res.status(500).send("Internal Server Error");
  }
};

const handleUpdatePost = async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  if (!likes) {
    return res.status(400).json({ error: "El campo 'likes' es requerido." });
  }

  if (!Number.isInteger(likes)) {
    return res
      .status(400)
      .json({ error: "'Likes' deben ser un numero entero." });
  }

  try {
    const { rows } = await pool.query(
      "UPDATE posts SET likes = $1 WHERE id = $2 RETURNING *",
      [likes, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado." });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error ejecutando PUT request:", error);
    res.status(500).send("Internal Server Error");
  }
};

const handleDeletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const { rowCount } = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: "Post no encontrado." });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error ejecutando DELETE request:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  handleGetPosts,
  handleCreatePost,
  handleUpdatePost,
  handleDeletePost,
};
