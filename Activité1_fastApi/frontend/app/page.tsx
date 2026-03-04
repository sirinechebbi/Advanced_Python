"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState<any[]>([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const apiUrl = "http://127.0.0.1:8000/articles";

  const loadArticles = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    setArticles(data);
  };

  const addArticle = async () => {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(id),
        name,
        price: Number(price),
      }),
    });

    resetForm();
    loadArticles();
  };

  const updateArticle = async () => {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(id),
        name,
        price: Number(price),
      }),
    });

    resetForm();
    loadArticles();
  };

  const deleteArticle = async (articleId: number) => {
    await fetch(`${apiUrl}/${articleId}`, {
      method: "DELETE",
    });

    loadArticles();
  };

  const editArticle = (article: any) => {
    setId(article.id.toString());
    setName(article.name);
    setPrice(article.price.toString());
    setIsEditing(true);
  };

  const resetForm = () => {
    setId("");
    setName("");
    setPrice("");
    setIsEditing(false);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  return (
    <div className="page">
      <div className="container">

        <h1> Accessoires Telephoniques </h1>

        <div className="form-grid">
          <input
            className="input"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

           <input
          className="input"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

          <input
          className="input"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

       <div className="button-section">
        {isEditing ? (
          <div className="button-group">
            <button onClick={updateArticle}  className="btn btn-green">
              Mettre à jour
            </button>
            <button onClick={resetForm} className=" btn btn-red" >
              Annuler
            </button>
          </div>
        ) : (
          <button onClick={addArticle} className="btn btn-blue" >
            Ajouter
          </button>
        )}
      </div>

        <div className="article-list">
        {articles.map((article) => (
          <div key={article.id} className="article-card">
            <div>
              <h2>{article.name}</h2>
              <p>{article.price} DT</p>
            </div>

            <div className="button-group">
              <button
                onClick={() => editArticle(article)}
               className="btn btn-gray" >
                Modifier
              </button>
              <button
                onClick={() => deleteArticle(article.id)}
               className="btn btn-red" >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
)};