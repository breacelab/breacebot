const { Command } = require('../structure')
const { MessageEmbed } = require('discord.js')

module.exports = class HelpCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'help',
      category: 'Utilitários',
      aliases: ['ajuda'],
      description: 'Mostra uma lista com os comandos.'
    })
  }

  run ({ channel, guild, config, prefix }) {
    const embed = new MessageEmbed().setColor(config.color)
    embed.setThumbnail(guild.iconURL({ dynamic: true }))

    const filter = this.client.commands.array().filter(c => !c.devOnly && !c.staffOnly)

    filter
      .map(c => c.category)
      .filter((value, index, array) => array.indexOf(value) === index)
      .map(category => {
        embed.addField(category, filter.filter(c => c.category === category).map(c => `\`${prefix}${c.name}\``).join('** - **'))
      })

    channel.send(embed)
  }
}
