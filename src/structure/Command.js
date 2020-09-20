const { MessageEmbed } = require('discord.js')

module.exports = class Command {
  constructor (client, options) {
    this.client = client

    this.name = options.name
    this.aliases = options.aliases || []
    this.description = options.description || 'Comando sem descrição.'
    this.usage = options.usage || 'Comando sem modo de uso.'
    this.category = options.category || 'Geral'
    this.devOnly = options.devOnly || false
    this.staffOnly = options.staffOnly || false
  }

  preLoad (ctx) {
    const embed = new MessageEmbed()

    if (this.devOnly && !this.client.config.owners.includes(ctx.author.id)) {
      embed.setDescription('Este comando se encontra disponível apenas para meus donos.')
      return ctx.channel.send(embed)
    }

    if (this.staffOnly && !ctx.member.roles.has(this.client.config.botGuild.roles.staff)) {
      embed.setDescription('Apenas membros da equipe pode usar esse comando.')
      return ctx.channel.send(embed)
    }

    try {
      this.run(ctx)
    } catch (error) {
      console.error(error)
    }
  }

  run () {}
}
