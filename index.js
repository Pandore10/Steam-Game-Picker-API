require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.STEAM_API_KEY;
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.json({ "message": "API do Steam Game Picker."});
});

app.get('/jogo-aleatorio', async (req, res) => {
    const { steamid } = req.query;

    if (!steamid || !/^\d{17}$/.test(steamid)) return res.status(400).json({ erro: "SteamID64 não inválida ou ausente."});

    try {
        const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamid}&format=json&include_appinfo=true`);

        if (!response.ok) {
            return res.status(400).json({ erro: "Parametros inválidos."});
        }

        const data = await response.json();

        if (!data.response?.games?.length) return res.status(404).json({ erro: "Nenhum jogo encontrado na biblioteca."});

        const indiceAleatorio = Math.floor(Math.random() * data.response.game_count);
        const jogoEscolhido = data.response.games[indiceAleatorio];
        return res.json({
            "appid": jogoEscolhido.appid,
            "name": jogoEscolhido.name,
            "playtime": jogoEscolhido.playtime_forever,
        });
        
    } catch (error) {
        console.error("Erro da API: ", error.message);
        return res.status(500).json({ erro: "Erro interno do servidor."});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});