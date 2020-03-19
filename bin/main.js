const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('../data/config')
const fs = require('fs')
const moment = require('moment')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
    console.log(`Client is connected to ${client.guilds.array()}`)
    client.user.setActivity("spread my cancer - !link")
})

let bullyTargets = new Set()

client.on('message', message => {
    if (!config.blacklist.includes(message.member.id)){
        let processedMessage = getCommandString(message.cleanContent)

        // Case for each command, calls function
        switch (processedMessage.command) {
            case '!uwu':
                let uwuText = uwuize(processedMessage.text)
                message.channel.send(uwuText)
                    .catch(console.error)
                break

            case '!clap':
                let clapText = clap(processedMessage.text)
                message.channel.send(clapText)
                    .catch(console.error)
                break

            case '!cwap':
                let cwapText = clap(uwuize(processedMessage.text))
                message.channel.send(cwapText)
                    .catch(console.error)
                break

            case '!bully':
                if (config.admins.includes(message.member.id)) {
                    let splitText = processedMessage.text.split(' ')
                    for (const target of splitText) {
                        if (bullyTargets.has(target)) {
                            bullyTargets.delete(target)
                        }
                        else {
                            bullyTargets.add(target)
                        }
                    }
                }
                break

            case '!link':
                message.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=591383548393684992&permissions=280576&scope=bot")
                    .catch(console.error)

            default:
                break
        }
    }
})

client.on('message', message => {
    if (bullyTargets.has(message.member.id)) {
        let uwuText = uwuize(message.member.displayName + ' says: ' + message.cleanContent)
        let bullyText = randomCase(uwuText)
        message.channel.send(bullyText)
            .catch(console.error)
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

function randomCase (input) {
    let result = ""
    for (const c of input) {
        if (Math.random(1) > 0.5) {
            result += c.toUpperCase()
        }
        else {
            result += c.toLowerCase()
        }
    }
    return result
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
        element = element.replace(/cummies/g, 'cum')
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

function clap(input) {
    let output = []
    input.split(' ').forEach(element => {
        output.push(element)
        output.push(':clap:')
    })
    return output.join(' ')
}