const express = require("express");
const bodyParser = require("body-parser");

const { Client } = require("pg");
const app = express();
const PORT = 5000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "product",
  password: "password",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Db connected"))
  .catch((e) => console.log("Db connection Failed!", "\n", e));

// Create a new category
app.post("/categories", async (req, res) => {
  // console.log(req.body, "here");
  const { name, isActive } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO Category (Name, IsActive) VALUES ($1, $2) RETURNING *",
      [name, isActive]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new product
app.post("/products", async (req, res) => {
  console.log(req.body, "here");
  const { categoryID, name, price, description, photo, isActive } = req.body;
  try {
    const result = await client.query(
      "INSERT INTO Product (CategoryID, Name, Price, Description, Photo, IsActive) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [categoryID, name, price, description, photo, isActive]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all active products
app.get("/products", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT * FROM Product WHERE IsActive = TRUE"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 

// Update a product by ID
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { categoryID, name, price, description, photo, isActive } = req.body;
  try {
    const result = await client.query(
      "UPDATE Product SET CategoryID = $1, Name = $2, Price = $3, Description = $4, Photo = $5, IsActive = $6 WHERE ProductID = $7 RETURNING *",
      [categoryID, name, price, description, photo, isActive, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a product by ID
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await client.query("DELETE FROM Product WHERE ProductID = $1", [id]);
    res.status(200).send(`Product deleted with ID: ${id}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all categories
app.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM category");
    res.send(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
