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
    return res.status(400).json({
      error: "Tipos de datos invalidos para los campos; deben ser strings.",
    });
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *",
      [titulo, url, descripcion]
    );

    res.json({ message: "Post creado exitosamente", post: rows[0] });
    console.log("Post creado exitosamente");
  } catch (error) {
    console.error("Error ejecutando POST request:", error);
    res.status(500).send("Internal Server Error");
  }
};

const handleUpdatePost = async (req, res) => {
  const { id } = req.params;
  const { likes } = req.body;

  if (likes === undefined) {
    return res.status(400).json({ error: "El campo 'likes' es requerido." });
  }

  try {
    let updatedLikes;

    if (typeof likes === "boolean") {
      if (likes == true) {
        updatedLikes = 1;
      } else {
        updatedLikes = -1;
      }
    } else if (typeof likes === "number") {
      updatedLikes = likes;
    } else {
      return res
        .status(400)
        .json({
          error: "El campo 'likes' debe ser un numero o un valor booleano.",
        });
    }

    /*  updatedLikes = Math.max(updatedLikes, 0); */

    const { rows } = await pool.query(
      "UPDATE posts SET likes = likes + $1 WHERE id = $2 RETURNING *",
      [updatedLikes, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Post no encontrado." });
    }

    res.json({ message: "Post actualizado correctamente", post: rows[0] });
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

    res.json({ message: "Post eliminado exitosamente" });
    console.log("Post eliminado exitosamente");
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
