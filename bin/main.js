const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('../data/config')
const fs = require('fs')
const moment = require('moment')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
    console.log(`Client is connected to ${client.guilds.array()}`)
})

let copyTargets = []

client.on('message', message => {
    let processedMessage = getCommandString(message.cleanContent)

    // Case for each command, calls function
    switch (processedMessage.command) {
        case '!uwu':
            logCommand(message.createdTimestamp, message.guild.toString(), message.author.tag, processedMessage.command)
            let uwuText = uwuize(processedMessage.text)
            logMessage(message.createdTimestamp, message.guild.toString(), message.author.tag, uwuText)
            message.channel.send(uwuText)
                .catch(console.error)
            break

        case '!copyme':
            break

        case '!link':
            logCommand(message.createdTimestamp, message.guild.toString(), message.author.tag, processedMessage.command)
            message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=591383548393684992&permissions=280576&scope=bot")
                .catch(console.error)

        default:
            break
    }
})

client.login(config.token)
    .catch(console.error)

// Gets the first word from a string
function getCommandString(input) {
    if (input == '') {
        return {command: 'none', text: 'none'}
    }
    else {
        let parts = input.toLowerCase().split(' ')
        return {command: parts.shift(), text: parts.join(' ')}
    }
}

// TODO make less of an abomination
function uwuize(input) {

    let output = []
    input.toLowerCase().split(' ').forEach(element => {
      if (element[0] != '<') {
        element = element.replace(/what/g, 'wut')
        element = element.replace(/your/g, 'yuwh')
        element = element.replace(/you/g, 'uwu')
        element = element.replace(/kiddo/g, 'kwiddo')
        element = element.replace(/moxie/g, 'mwoxie')
        element = element.replace(/have/g, 'hab')
        element = element.replace(/love/g, 'wuv')
        element = element.replace(/cum/g, 'cummies')

        element = element.replace(/ th/g, ' d')
        element = element.replace(/th /g, 'f ')
        element = element.replace(/lth/g, 'lf')
        element = element.replace(/th/g, 'd')
        element = element.replace(/l/g, 'w')
        element = element.replace(/r/g, 'w')
        element = element.replace(/ing/g, 'in')

        output.push(element)
      }
      else {
        output.push(element)
      }
    });

    return output.join(' ')
}

// TODO error handling
function logCommand(time, guild, user, command) {
    let timestamp = moment(time).format()
    let entry = `${timestamp},${guild},${user},${command}\n`
    fs.appendFile('./data/commands.csv', entry, 'utf8', err => {
        if (err) console.error(err)
    })
}

// TODO error handling
function logMessage(time, guild, user, message) {
    let timestamp = moment(time).format()
    let entry = `${timestamp},${guild},${user},${message}\n`
    fs.appendFile('./data/messages.csv', entry, 'utf8', err => {
        if (err) console.error(err)
    })   
}