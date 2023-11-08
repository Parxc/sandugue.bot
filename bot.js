import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { LIST_OF_GIFS } from './list.js';
import { floor, random } from 'mathjs'

const TOKEN = 'MTE3MTYzNzU1NjIyNDQ2MjkxOQ.GovTwG.GFINRWXPhsohX8gXUgjgBV4mpUrY46C-rhCFow'
const CLIENT_ID = '1171637556224462919'

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

/* SALTO DE PARRAFO */

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
]});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});

client.on('messageCreate', async (message) => {
    const RANDOM_NUMBER = floor(random() * 10)
    const MENSAJE = message.content.toLowerCase()
    const CURRENT_CHANNEL = message.channel

    if (message.author.bot) return;

    console.log(RANDOM_NUMBER)
    if (RANDOM_NUMBER == 5){
        const OBTAINED_NUMBER = floor(random() * LIST_OF_GIFS.length)
        CURRENT_CHANNEL.send(LIST_OF_GIFS[OBTAINED_NUMBER])
    }
    if (MENSAJE.includes('peso pluma')){
        CURRENT_CHANNEL.send('COMPA QUE LE PARECE ESA MORRA LA QUE ANDA BAILANDO SOLA')
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!')
    }
});

client.login(TOKEN);