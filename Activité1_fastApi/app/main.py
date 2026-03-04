from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Article(BaseModel):
    id: int
    name: str
    price: float

articles=[
    {"id" :1,
    "name":"chargeur type c",
    "price": 16.990},

    {"id":2,
    "name":"Kit bleutooth",
    "price":50.500}
]
@app.get("/")
def read_root():
    return{"message":"Bienvenu sur notre boutique en ligne"}

@app.get("/articles")
def get_articles():
    return articles

@app.post("/articles")
def create_article(article: Article):
    # Vérifier si ID existe déjà
    for a in articles:
        if a["id"] == article.id:
            raise HTTPException(status_code=400, detail="ID déjà utilisé")

    articles.append(article.dict())
    return article


@app.put("/articles/{id}")
def update_article(id: int, updated_article: Article):
    for article in articles:
        if article["id"] == id:
            article["name"] = updated_article.name
            article["price"] = updated_article.price
            return article

    raise HTTPException(status_code=404, detail="Article non trouvé")

@app.delete("/articles/{id}")
def delete_article(id: int):
    for article in articles:
        if article["id"] == id:
            articles.remove(article)
            return {"message": "Article supprimé"}

    raise HTTPException(status_code=404, detail="Article non trouvé")