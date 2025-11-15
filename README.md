# Steam Game Picker API

Uma API simples que recebe uma **SteamID64** e retorna um **jogo aleatório** da biblioteca do usuário.

## Endpoint

GET /jogo-aleatorio?steamid=76561197960435530

### Resposta
```json
{
    "appid": 730,
    "name": "Counter-Strike 2",
    "playtime": 1250
}
```

### Como rodar

```bash
git clone https://github.com/Pandore10/Steam-Game-Picker-API
cd Steam-Game-Picker-API
npm install
cp .env.example .env #Edite o .env com a sua Steam API Key
node index.js
```