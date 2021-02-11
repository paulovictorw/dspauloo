/*
* Adicione o nome do autor
* Author nya Radya and Nazwa
* Ta MBA é muito esmagador
* Jan acabou de pegar meu nome
* Leia o leia-me para não fazer perguntas
*/
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
/******INÍCIO DA ENTRADA DE ARQUIVO******/
const { color, bgcolor } = require('./lib/color')
const { bahasa } = require('./src/bahasa')
const { negara } = require('./src/kodenegara')
const { help } = require('./src/help')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')

/******INÍCIO DA ENTRADA DO PACOTE NPM******/
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()
const speed = require('performance-now')

/******BEGIN OF JSON INPUT******/
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const _leveling = JSON.parse(fs.readFileSync('./src/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./src/level.json'))
const user = JSON.parse(fs.readFileSync('./src/user.json'))
const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
            + 'VERSION:3.0\n' 
            + 'FN:DsPauloo\n' // full name
            + 'ORG:Dono do Bot;\n' // the organization of the contact
            + 'TEL;type=CELL;type=VOICE;waid=5577998742670:+55 (77) 99874-2670\n' // WhatsApp ID + phone number
            + 'END:VCARD'
prefix = '!'
blocked = []

/******BEGIN OF FUNCTIONS INPUT******/
const getLevelingXp = (userId) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].xp
	}
}

const getLevelingLevel = (userId) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].level
	}
}

const getLevelingId = (userId) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].jid
	}
}

const addLevelingXp = (userId, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].xp += amount
		fs.writeFileSync('./src/level.json', JSON.stringify(_level))
	}
}

const addLevelingLevel = (userId, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].jid === userId) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].level += amount
		fs.writeFileSync('./src/level.json', JSON.stringify(_level))
	}
}

const addLevelingId = (userId) => {
	const obj = {jid: userId, xp: 1, level: 1}
	_level.push(obj)
	fs.writeFileSync('./src/level.json', JSON.stringify(_level))
}

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./Nazwa.json') && client.loadAuthInfo('./Nazwa.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./Nazwa.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Oieeeh @${num.split('@')[0]}\nSeja bem-vindo ao ${mdata.subject}`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Sayonara @${num.split('@')[0]}👋😔`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

		client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			const date = moment.tz('Asia/Jakarta').format('DD,MM,YY')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '⏳ ️Espere um pouco... ⌛',
				success: '✅️ Prontinho! ✅️',
				error: {
					stick: '❌ Falha, ocorreu um erro ao converter a imagem em figurinha! [❗]',
					Iv: '[❗] Link Inválido [❗]'
				},
				only: {
					group: '[❗] Este comando só pode ser usado em grupos! [❗]',
					ownerG: '[❗] Este comando só pode ser usado pelo dono do grupo! [❗]',
					ownerB: '[❗] Este comando só pode ser usado pelo dono do bot! [❗]',
					admin: '[❗] Este comando só pode ser usado por administradores do grupo! [❗]',
					Badmin: '[❗] Este comando só pode ser usado quando o bot se torna administrador! [❗]',
				}
			}
    			const apakah = ['sim','não']
        		const bisakah = ['pode','não pode']
		        const kapankah = ['outro dia','outra semana','outro mês','outro ano']
			const botNumber = client.user.jid
			const ownerNumber = ["557798742670@s.whatsapp.net"] // replace this with your number
			const nomorOwner = [ownerNumber]
			const isGroup = from.endsWith('@g.us')
			const totalchat = await client.chats.all()
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
            let { pushname, verifiedName } = sender
            pushname = pushname || verifiedName // verifiedName is the name of someone who uses a business account
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isLevelingOn = isGroup ? _leveling.includes(groupId) : false
			const NomerOwner = '557798742670@s.whatsapp.net'
                        //const isDaftar = daftar.includes(sender)

			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})	
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			 /******END OF FUNCTIONS INPUT******/
			switch(command) {
	            case 'help':
				case 'menu':
					client.sendMessage(from, help(prefix), text)
			    break
                case 'codegtts':
		client.sendMessage(from, bahasa(prefix, sender), text, {quoted: mek})
                break
               case 'codemapa':
               client.sendMessage(from, negara(prefix, sender), text, {quoted: mek})
                break
				case 'demote':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Faltou mencionar, pra tirar o admin dessa Pessoa 😳')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += ''
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`Esse otário 👉 @${mentioned[0].split('@')[0]}\n perdeu seu cargo de admin do grupo ${groupMetadata.subject}`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break                        
                                 case 'loli':
                                        gatauda = body.slice(1)
                                        reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Existe loli mais linda que essa? 😍💜'})
                                        break                                 
                  case 'promote':
					client.updatePresence(from, Presence.composing) 
                                        /*if (!isDaftar) return reply(mess.only.daftarB)*/
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Faltou mencionar o membro para se tornar admin do grupo 😉')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Pronto, agr vc é administrador do grupo: @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
						}
					    break
					case 'nsfwahegao':
						try {
							if (!isNsfw) return reply('[❗] Nsfw Desativado [❗]')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/ahegao`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Slk 😳'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ Error ❌')
						}
						break
					case 'nsfwecchi':
						try {
							if (!isNsfw) return reply('[❗] Nsfw Desativado [❗]')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/animethighss`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Eitaa 😳🔥'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ Error ❌')
						}
						break
					case 'nsfwecchi2':
						try {
							if (!isNsfw) return reply('[❗] Nsfw Desativado [❗]')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/animefeets`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Que isso gente 😳🔥'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ Error ❌') 
						}
						break
					case 'nsfwhentai':
						try {
							if (!isNsfw) return reply('[❗] Nsfw Desativado [❗]')
							res = await fetchJson(`https://meme-api.herokuapp.com/gimme/animearmpits`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Magnífico, slk 😳🔥'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ Error ❌')
						}
                        break
					case 'nsfwyuri':
						try {
							if (!isNsfw) return reply('[❗] Nsfw Desativado [❗]')
							res = await fetchJson(`https://nekos.life/api/v2/img/yuri`, {method: 'get'})
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'mano do céu 🥵🔥'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ Error ❌')
						}
                        break
					case 'nsfwneko':
						try {
							if (!isNsfw) return reply('[❗] Nsfw Desativado [❗]')
							anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=BotWeA`, {method: 'get'})
							buffer = await getBuffer(anu.result)
							client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Gente do céu 😳🔥'})
						} catch (e) {
							console.log(`Error :`, color(e,'red'))
							reply('❌ Error ❌')
						}
                        break
				  case 'wa.me':
  client.updatePresence(from, Presence.composing) 
      options = {
          text: `「 Seu número 」\n\nSolicitação By : @${sender.split("@s.whatsapp.net")[0]}\n\nLink do whats : https://wa.me/${sender.split("@s.whatsapp.net")[0]}\nLink em API :\nhttps://api.whatsapp.com/send?phone=${sender.split("@")[0]}`,
          contextInfo: { mentionedJid: [sender] }
    }
    client.sendMessage(from, options, text, { quoted: mek } )
                break
              case 'dono':
                  client.sendMessage(from, {displayname: "DsPauloo", vcard: vcard}, MessageType.contact, { quoted: mek})
               client.sendMessage(from, 'Este e o número do meu dono 😉 Qualquer dúvida sobre mim e só falar com ele! 😊',MessageType.text, { quoted: mek} )
				break
			    case 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('1 para ativar, 0 para desativar')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('✅ Nsfw já está Ativado ✅')
						nsfw.push(from)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('✅ Nsfw Ativado ✅️')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❌ Nsfw Desativado ❌️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
              await client.sendMessage(from, options, text)
               break
                                case 'tiktokperfil':
					try {
						if (args.length < 1) return client.sendMessage(from, 'Faltou o usuário!', text, {quoted: mek})
                                                /*if (!isDaftar) return reply(mess.only.daftarB)*/
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `➸ ID : ${user.id}\n➸ USUÁRIO : ${user.uniqueId}\n➸ NOME : ${user.nickname}\n➸ SEGUIDORES : ${stats.followerCount}\n➸ SEGUINDO : ${stats.followingCount}\n➸ POSTS : ${stats.videoCount}\n➸ CURTIDAS : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('[❗] Nome de usuário inválido! [❗]')
					}
                   break
                   case 'mapa':
                   data = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`)
                   /*if (!isDaftar) return reply(mess.only.daftarB)*/
                   hasil = await getBuffer(data.gambar)
                   client.sendMessage(from, hasil, image, {quoted: mek, caption: `Mapa de ${body.slice(5)}`})
					break			
				case 'gtts':
				   client.updatePresence(from, Presence.recording) 
				   if (args.length < 1) return client.sendMessage(from, 'Faltou o code do idioma, do !codegtts', text, {quoted: mek})
                                   /*if (!isDaftar) return reply(mess.only.daftarB)*/
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Faltou o texto', text, {quoted: mek})
					dtt = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 600
					? reply('Ta em dúvida? KKKj')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('[❗] Falhou! [❗]')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
				case 'listadmins':
					client.updatePresence(from, Presence.composing) 
                                        /*if (!isDaftar) return reply(mess.only.daftarB)*/
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista admins do grupo ${groupMetadata.subject}\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'pokemon':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
				case 'naruto':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=Naruto`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `Narutooo!! 💛`})
					break
				case 'dog':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `🐕♥️`})
					break
				case 'hinata':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=Hinata`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `Hinatinha!! 💜`})
					break
				case 'boruto':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=Boruto`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `Borutin!! 💕`})
					break
				case 'minato':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=Minato`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `Minatoo!! 💛`})
					break
				case 'sasuke':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=sasuke`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `Sasukeee!! 💜`})
					break
				case 'sakura':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=sakura`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `Sakuraa!! 💕`})
					break
				case 'miku':
                    client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=anime+miku`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `Miku!! 💙`})
					break
                case 'images':
                                        tels = body.slice(11)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `✅ Imagem enviada com sucesso! ✅\n\Resultado : ${tels}`})
                                        await limitAdd(sender)
                    break
				case 'block':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(8)}@c.us`, "add")
					client.sendMessage(from, `Membro bloqueado ${body.slice(8)}@c.us`, text)
				break
               case 'play':
                reply(mess.wait)
                play = body.slice(5)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
               if (anu.error) return reply(anu.error)
                 infomp3 = `✅ Música Encontrada!! ✅\nTítulo : ${anu.result.title}\nLink : ${anu.result.source}\nTamanho : ${anu.result.size}\n\nEssa era a música q vc queria? 😳👉👈`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                await limitAdd(sender)
                break
				case 'marcar':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
                                        /*if (!isDaftar) return reply(mess.only.daftarB)*/
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `➳ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					if (text.includes('random')){
						conn.sendMessage(id, 'Pfvr, repita o comando com letras minúsculas',MessageType.text, { quoted: m } );
						}
						   if (text.includes("random"))
						   {
							var items = ["ullzang girl", "cewe cantik", "cewe hijab", "remaja cantik", "cewek jepang"];
							var cewe = items[Math.floor(Math.random() * items.length)];
							var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
							
							axios.get(url)
							  .then((result) => {
								var b = JSON.parse(JSON.stringify(result.data));
								var cewek =  b[Math.floor(Math.random() * b.length)];
								imageToBase64(cewek) // Path to the image
								.then(
									(response) => {
							conn.sendMessage(id, 'Espere um pouco...', MessageType.text, { quoted: m } )
							var buf = Buffer.from(response, 'base64'); // Ta-da	
							conn.sendMessage(id, buf ,MessageType.image, { caption: `nih gan`, quoted: m } )
							   
									}
								)
								.catch(
									(error) => {
										console.log(error); // Logs an error if there was one
									}
								)
							
							});
							}
							if (text.includes('Bot')){
								conn.sendMessage(id, 'pfvr repita o comando com letras minúsculas\nExemplo : bot como vc está?',MessageType.text, { quoted: m } );
								}
								if (text.includes("bot")){
								const teks = text.replace(/.bot /, "")
								axios.get(`https://st4rz.herokuapp.com/api/simsimi?kata=${teks}`).then((res) => {
									let hasil = `${res.data.result}\n\n*Simsimi chat*`;
									conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
								})
								}
						
					mentions('ㅤㅤ【 Mencionando todo mundo! 】\n➳'+teks+'ㅤㅤ【 B O T  D I G I T A L 】', members_id, true)
					break
                case 'marcar2':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `➳ ${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, '【 Mencionando todo mundo! 】\n➳'+teks+'ㅤㅤ【 B O T  D I G I T A L 】', text, {quoted: mek})
					break
				case 'bc':
					client.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply(':v')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `「 BROADCAST 」\n\n${body.slice(4)}`})
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 BROADCAST 」*\n\n${body.slice(4)}`)
						}
						reply('✅ Sucesso!! Enviado para todos!! ✅')
					}
					break
		        case 'bcgc':
					client.updatePresence(from, Presence.composing) 
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of groupMembers) {
							client.sendMessage(_.jid, buff, image, {caption: `「 Grupo Bc 」\nGrupo : ${groupName}\n\n${body.slice(6)}`})
						}					 
						reply('')					 
					} else {
						for (let _ of groupMembers) {
							sendMess(_.jid, `「 Grupo Bc 」\nGrupo : ${groupName}\n\n${body.slice(6)}`)
						}
						reply('Grupo de transmissão com sucesso!')
					}
			    case 'simi':
				if (args.length < 1) return reply('Cadê o texto ?')
				teks = body.slice(5)
				anu = await simih(teks) //fetchJson(`https://mhankbarbars.herokuapp.com/api/samisami?text=${teks}`, {method: 'get'})
				//if (anu.error) return reply('Simi ga tau kak')
				reply(anu)
				break
			    case 'simih':
				if (!isGroup) return reply(mess.only.group)
				if (!isGroupAdmins) return reply(mess.only.admin)
				if (args.length < 1) return reply(':v')
				if (Number(args[0]) === 1) {
					if (isSimi) return reply('Simi Ativado')
					samih.push(from)
					fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
					reply('✅ Simi ativado com sucesso ✅️')
				} else if (Number(args[0]) === 0) {
					samih.splice(from, 1)
					fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
					reply('✅ Simi desativado com sucesso ✅️')
				} else {
					reply('1 para ativar, 0 para desativar')
					}
                    break
				  case 'donodogrupo':
               client.updatePresence(from, Presence.composing) 
              options = {
          text: ` : @${from.split("-")[0]}`,
          contextInfo: { mentionedJid: [from] }
           }
           client.sendMessage(from, options, text, { quoted: mek } )
				break
           case 'neko':
           data = await fetchJson('https://waifu.pics/api/sfw/neko')
           hasil = await getBuffer(data.url)
           client.sendMessage(from, hasil, image, {quoted: mek})
           break	
				case 'randomanime':
					gatauda = body.slice(13)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=BotWeA`, {method: 'get'})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, image, {quoted: mek})
		             break
                    case 'leave':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                     setTimeout( () => {
					client.groupLeave (from) 
					}, 2000)
                     setTimeout( () => {
					client.updatePresence(from, Presence.composing) 
					client.sendMessage(from, 'Sayonara 👋😉', text) // ur cods
					}, 0)
				case 'ban':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Marca a pessoa que vc que banir')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Banido com sucesso! ✅ :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Esse otário foi banido 👉 @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					client.sendMessage(mentioned, text)
					}
                  break
                 case 'linkgrupo':
				    client.updatePresence(from, Presence.composing) 
				    if (!isGroup) return reply(mess.only.group)
                                     /*if (!isDaftar) return reply(mess.only.daftarB)*/
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					linkgc = await client.groupInviteCode (from)
					yeh = `https://chat.whatsapp.com/${linkgc}\n\n𝑳𝑰𝑵𝑲 𝑫𝑶 𝑮𝑹𝑼𝑷𝑶 ${groupName}`
					client.sendMessage(from, yeh, text, {quoted: mek, detectLinks: false})
					break
                case 'qrcode':
                buff = await getBuffer(`https://api.qrserver.com/v1/create-qr-code/?data=${body.slice(8)}&size=1080%C3%971080`)
				client.sendMessage(from, buff, image, {quoted: mek})
				break
				case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Só uma foto :v')
					}
					break
			case 'closegrupo':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var nomor = mek.participant
					const close = {
					text: `Grupo fechado pelo admin @${nomor.split("@s.whatsapp.net")[0]}\nAgora apenas admins podem enviar mensagens`,
					contextInfo: { mentionedJid: [nomor] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
					break
                case 'opengrupo':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					open = {
					text: `Grupo aberto pelo admin @${sender.split("@")[0]}\nAgora todos os participantes podem enviar mensagens `,
					contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, false)
					client.sendMessage(from, open, text, {quoted: mek})
					break
				case 'sticker':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
                                                /*if (!isDaftar) return reply(mess.only.daftarB)*/
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`[❗] Falha ao converter ${tipe} para figurinha [❗]`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker)
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
						}
					break

				case 'toimg':
				    client.updatePresence(from, Presence.composing)
                                    /*if (!isDaftar) return reply(mess.only.daftarB)*/
					if (!isQuotedSticker) return reply('Isso e figurinha arrombado? 🤨')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('[❗] Falha ao converter figurinha em imagem [❗]')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '✅ Prontinho! ✅'})
						fs.unlinkSync(ran)
					})	
					break
			      case 'leveling':
                if (!isGroup) return reply(mess.only.group)
                if (!isGroupAdmins) return reply(mess.only.admin)
                if (args.length < 1) return reply('Digite 1 para ativar o recurso')
                if (args[0] === '1') {
                    if (isLevelingOn) return reply('O recurso de nivel esteve ativo Antes')
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                     reply(mess.levelon)
                } else if (args[0] === '0') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                     reply(mess.leveloff)
                } else {
                    reply('  \nDigite 1 para ativar, 0 para desativar\nExemplo: ${prefix}leveling 1')
                }
					break
                                case 'welcome':
					if (!isGroup) return reply(mess.only.group)
                                        /*if (!isDaftar) return reply(mess.only.daftarB)*/
					if (!isGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('digite 1 para ativar')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Ativado com sucesso!')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Ativado o recurso de boas-vindas neste grupo')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, disable)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Desativado o recurso de boas-vindas neste grupo')
					} else {
						reply('digite 1 para ativar, 0 para desativar')
					}
                  break
				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                                        /*if (!isDaftar) return reply(mess.only.daftarB)*/
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply()
					}
					break
				default:

   				         if (body.startsWith(`${prefix}${command}`)) {
                  reply(`Desculpe!! comando não listado ${prefix}menu`)
                                        }
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
