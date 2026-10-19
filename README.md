# 🐼 PandaBot

He creado un bot de discord llamado PandaBot con la finalidad de practicar y enriquecer mis habilidades. Además de crear facilidades para los usuarios y obtener recomendaciones, ideas, juegos, etc.

Está hecho con [discord.js](https://discord.js.org/) v14 y usa comandos slash (`/`). Algunas funciones usan inteligencia artificial con **Google Gemini**.

---

## ✨ Comandos

### 🤖 Inteligencia Artificial
| Comando | Descripción |
|---|---|
| `/pandai <question>` | Hazle cualquier pregunta a la IA de PandaBot. |
| `/music_ai <mood>` | Te recomienda playlists de Spotify según tu estado de ánimo. |
| `/textai <imagen>` | Describe y extrae el texto de una imagen. |
| `/resumen <cantidad>` | Resume los últimos mensajes del canal (de 5 a 50). |

### 🎮 Juegos
| Comando | Descripción |
|---|---|
| `/game` | Enlaces a juegos para jugar en grupo (Make It Meme, Bomb Party, Gartic Phone). |
| `/install` | Enlaces para instalar Minecraft, Valorant o League of Legends. |
| `/serverstatus <ip_address>` | Muestra si un servidor de Minecraft está online. |

### 🎲 Diversión
| Comando | Descripción |
|---|---|
| `/meme` | Muestra un meme aleatorio. |
| `/frase` | Muestra una frase inspiradora. |
| `/pandagift <buscar>` | Busca un GIF y te envía uno al azar. |

### 🛠️ Útiles
| Comando | Descripción |
|---|---|
| `/clima <ciudad>` | Muestra el clima actual de una ciudad. |
| `/set_alarm <timeset> <unit> <task>` | Te recuerda una tarea después de unos minutos u horas. |
| `/generate_password [longitud]` | Genera una contraseña segura y te la envía por MD. |
| `/short_url <url>` | Acorta un enlace. |

### 📋 Esenciales
| Comando | Descripción |
|---|---|
| `/commands` | Muestra la lista de comandos. |
| `/hola` | PandaBot te saluda por MD. |

> 🚧 **En desarrollo:** `/encuesta` (encuestas con votación).

---

## 📦 Requisitos

- [Node.js](https://nodejs.org/) 20 o superior
- Una aplicación de bot creada en el [Discord Developer Portal](https://discord.com/developers/applications)
- Claves de API para los servicios externos (ver [Variables de entorno](#-variables-de-entorno))

---

## 🚀 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/Stefano-prog/PandaBot.git
   cd PandaBot
   ```

2. **Instala las dependencias**
   ```bash
   npm install discord.js @discordjs/builders dotenv @google/generative-ai spotify-web-api-node axios node-fetch@2
   ```
   > `node-fetch` debe ser la versión 2, porque la 3 no funciona con `require()`.

3. **Crea el archivo `.env`** en la raíz del proyecto (ver la siguiente sección).

4. **Registra los comandos en Discord**
   ```bash
   node deploy-command.js
   ```
   Vuelve a ejecutarlo cada vez que agregues o cambies un comando.

5. **Inicia el bot**
   ```bash
   node index.js
   ```

---

## 🔑 Variables de entorno

Crea un archivo `.env` con estas variables:

```env
TOKEN=
CLIENT_ID=
GEMINI_API_KEY=
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_ID_SECRET=
TENOR_API_KEY=
WEATHER_API_KEY=
```

| Variable | Dónde conseguirla | La usa |
|---|---|---|
| `TOKEN` | Discord Developer Portal → Bot | Todo el bot |
| `CLIENT_ID` | Discord Developer Portal → General Information | `deploy-command.js` |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/) | `/pandai`, `/music_ai`, `/textai`, `/resumen` |
| `SPOTIFY_CLIENT_ID` y `SPOTIFY_CLIENT_ID_SECRET` | [Spotify for Developers](https://developer.spotify.com/dashboard) | `/music_ai` |
| `TENOR_API_KEY` | Google Cloud Console → Tenor API | `/pandagift` |
| `WEATHER_API_KEY` | [OpenWeatherMap](https://openweathermap.org/api) | `/clima` |

Solo `TOKEN` y `CLIENT_ID` son obligatorias para que el bot arranque; las demás solo las necesita el comando que las usa.

> ⚠️ **Nunca subas el archivo `.env` a GitHub.** Ya está incluido en el `.gitignore`.

---

## ⚙️ Configuración en Discord

En el **Developer Portal → Bot**, activa **Message Content Intent**. Sin él, `/resumen` recibe los mensajes vacíos.

Al invitar el bot a tu servidor, dale como mínimo estos permisos:
- Enviar mensajes
- Insertar enlaces (para los embeds)
- Leer el historial de mensajes (para `/resumen`)

---

## 📁 Estructura del proyecto

```
PandaBot/
├── commands/
│   ├── AI_command/   # Comandos con Gemini (pandai, music_ai, textai)
│   ├── Essential/    # commands, hola
│   ├── Games/        # game, install
│   ├── Random/       # meme, frase, pandagift, serverstatus, encuesta
│   └── Useful/       # clima, set_alarm, generate_password, short_url, resumen
├── deploy-command.js # Registra los comandos slash en Discord
└── index.js          # Arranca el bot y carga los comandos automáticamente
```

### ➕ Agregar un comando nuevo
1. Crea un archivo `.js` dentro de alguna carpeta de `commands/` que exporte `data` (un `SlashCommandBuilder`) y `execute(interaction)`.
2. Agrégalo a la lista de `deploy-command.js`.
3. Ejecuta `node deploy-command.js` y reinicia el bot.

`index.js` carga automáticamente todos los archivos de `commands/`, así que no hace falta tocarlo.

---

## 📄 Licencia

© 2025 Stefano Saldarriaga. Todos los derechos reservados. Consulta [SECURITY.md](SECURITY.md) para más detalles.
