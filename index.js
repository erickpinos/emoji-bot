console.log("----------------------------");
console.log("Initializing Emoji bot");
console.log("----------------------------");
const SlackBot = require('slackbots');
const axios = require('axios');
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const SLACK_ADMIN = process.env.SLACK_ADMIN;

const bot = new SlackBot({
	token: SLACK_TOKEN,
	name: 'Emoji bot'
});

// Start Handler
bot.on('start', () => {
	const params = {
		icon_emoji: ':smile:'
	}

    bot.postMessageToUser(SLACK_ADMIN, "I am online", params);

});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
	if(data.type !== 'message') {
		return;
	}

//	console.log(data);
	handleMessage(data.text);

	var initialString = data.text.toLowerCase();
	var punctuationless = initialString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()‘’']/g," ");
	var finalString = punctuationless.replace(/\s{2,}/g," ");

	var words = finalString.split(" ");
	var filteredWords = [];

	for (var i = 0, l = words.length, w; i < l; i++) {
	    w = words[i]
	    if (!/^(#|\d+)/.test(w) && w.length > 2)
	        filteredWords.push(w)
	}

	console.log('filteredWords: ', filteredWords);

	var emojiDict = {
		'bitcoin': 'btc', 
		'blockchain': 'chains', 
		'cardano': 'ada',
		'bitconnect': 'bcc',
		'binance': 'bnb',
		'ethereum': 'eth',
		'ripple': 'xrp',
		'hyperledger': 'hyp',
		'energy': 'sunny',
		'food': 'hamburger',
		'vitalik': 'vitalik',
		'bearish': 'bearish',
		'bullish': 'bullish',
		'party': '',
		'bitshares': 'bts',
		'dashcoin': 'dash',
		'conga': 'congaparrot',
		'district0x': 'dnt',
		'doge': 'doge',
		'dogecoin': 'doge',
		'factom': 'fct',
		'golem': 'gnt',
		'halal': 'halalparrot',
		'hodl': 'hodl',
		'iconomi': 'icn',
		'lisk': 'lsk',
		'litecoin': 'ltc',
		'iota': 'miota',
		'omisego': 'omg',
		'qtum': 'qtum',
		'augur': 'augur',
		'steem': 'steem',
		'stratis': 'stratis',
		'tenx': 'tenx',
		'moon': 'moon',
		'tron': 'trx',
		'tether': 'usdt',
		'ven': 'vechain',
		'veritaseum': 'veri',
		'waves': 'waves',
		'monero': 'xmr',
		'zcash': 'zec',
		'ben': 'ben',
		'eth': 'eth',
		'neo': 'neo',
		'eos': 'eos',
		'ico': 'ico',
		'nem': 'nem',
		'ticket': 'ticket',
		'tickets': 'ticket',
		'excited': 'rocket',
		'cash': 'dollar',
		'mining': 'pick',
		'miami': 'palm_tree',
		'miami': 'sunny',
		'tampa': 'palm_tree',
		'china': 'flag-cn',
		'chinese': 'flag-cn',
		'india': 'flag-in',
		'indian': 'flag-in',
		'lgbt': 'rainbow-flag',
		'lgbtq': 'rainbow-flag',
		'dubai': 'flag-ae',
		'usa': 'flag-us',
		'australia': 'flag-au',
		'australian': 'flag-au',
		'canada': 'flag-ca',
		'canadian': 'flag-ca',
		'colombia': 'flag-co',
		'colombian': 'flag-co',
		'italy': 'flag-it',
		'italian': 'flag-it',
		'netherlands': 'flag-nl',
		'dutch': 'flag-nl',
		'vietnam': 'flag-vn',
		'vietnamese': 'flag-vn',
		'trading': 'chart_with_upwards_trend',
		'hackathons': 'keyboard',
		'nyc': 'statue_of_liberty',
		'tokyo': 'tokyo_tower',
		'drink': 'cup_with_straw',
		'drinks': 'cup_with_straw',
		'coffee': 'coffee',
		'free': 'free',
		'dog': 'dog',
		'unicorn': 'unicorn',	
		'halloween': 'halloween',	
		'pizza': 'pizza',	
		'lightning': 'zap',	
		'beer': 'beer',	
		'congrats': 'tada',
		'congratulations': 'tada',
		'flight': 'airplane',
	};

	var emojis = [];

	for (var key in emojiDict) {
		for (var i = 0; i < filteredWords.length; i++) {
			if (filteredWords[i] == key) {
				var value = emojiDict[key];
				emojis.push(value);
			}
		}
	}

	if(finalString.includes('parrot')) {
		emojis.push('partyparrot');
		emojis.push('fastparrot');
		emojis.push('gothparrot');
		emojis.push('slowparrot');
		emojis.push('congaparrot');
		emojis.push('halalparrot');
		emojis.push('moonwalkingparrot');
		emojis.push('blondesassyparrot');
	}

	if(finalString.includes('new york')) {
		emojis.push('statue_of_liberty');
	}

/*	for (var i = 0, l = filteredWords.length, w; i < l; i++) {
	    if (w == 'cardano') {
	    	emojis.push('ada');
	    }
   	    if (w == 'bitconnect') {
	    	emojis.push('bcc');
	    }
   	    if (w == 'binance') {
	    	emojis.push('bnb');
	    }
   	    if (w == 'ethereum') {
	    	emojis.push('eth');
	    }
   	    if (w == 'ripple') {
	    	emojis.push('xrp');
	    }
   	    if (w == 'hyperledger') {
	    	emojis.push('hyp');
	    }
   	    if (w == 'energy') {
	    	emojis.push('sunny');
	    }
   	    if (w == 'food') {
	    	emojis.push('hamburger');
	    }
	}
*/	
	console.log('emojis: ', emojis);   
    for (var i = 0; i < emojis.length; i++) {
		bot.postReactionToChannel(data.channel, emojis[i], data.ts);
    }
});

// Respond to Data
function handleMessage(message) {
	if(message.includes('test')) {
		runTest();
	}
}


// run the Test
function runTest() {

	const params = {
		icon_emoji: ':smile:'
	}

//	bot.postMessageToChannel('test3', `Test: ${test}`,params);

//	bot.postReactionToChannel('CGT181BFG', 'smile', '1551949933.004400');

}