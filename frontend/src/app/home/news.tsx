import React, { useState } from "react";
import { View, SafeAreaView, Text, Image, FlatList, Platform, StatusBar } from "react-native";
import { Link } from "expo-router";
import { useColorScheme } from "react-native";

const PAGE_SIZE = 10; // Number of articles to load per batch

export default function NewsScreen() {
    // All articles (replace with your data fetching logic if needed)
    const allArticles = [
        {
            "source": {
                "id": null,
                "name": "Slashdot.org"
            },
            "author": "BeauHD",
            "title": "DOJ Files To Seize $225 Million In Crypto From Scammers",
            "description": "The DOJ has filed a civil complaint to seize $225.3 million in cryptocurrency linked to pig butchering scams -- long-con frauds where victims are tricked into fake crypto investments. The funds were laundered through a blockchain network, and the DOJ says rec…",
            "url": "https://yro.slashdot.org/story/25/06/19/2312257/doj-files-to-seize-225-million-in-crypto-from-scammers",
            "urlToImage": "https://a.fsdn.com/sd/topics/court_64.png",
            "publishedAt": "2025-06-20T10:00:00Z",
            "content": "The 75-page complaint (PDF) filed in the US District Court for the District of Columbia lays out more detail about the seizure. According to it, the US Secret Service (USSS) and Federal Bureau of Inv… [+1328 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Luc Olinga",
            "title": "Crypto Bros Are Winning Big in Trump’s America",
            "description": "The industry that brought you Bitcoin casinos and NFT grifts is now riding high on regulation, respectability, and record profits thanks to the White House.",
            "url": "https://gizmodo.com/crypto-bros-are-winning-big-in-trumps-america-2000621885",
            "urlToImage": "https://gizmodo.com/app/uploads/2024/09/An-image-of-Bitcoin-cryptocurrency.jpg",
            "publishedAt": "2025-06-29T13:21:42Z",
            "content": "Six months into Donald Trumps return to the White House, one thing is clear: the biggest winners so far arent oil executives or Wall Street bankers. Theyre crypto bros.\r\nYes, the same industry that m… [+4799 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Luc Olinga",
            "title": "Trump Claims He Built Crypto—Just as His Family Cashes In",
            "description": "The U.S. president now says he made crypto great again, just as his family stands to benefit from a booming digital empire.",
            "url": "https://gizmodo.com/trump-claims-he-built-crypto-just-as-his-family-cashes-in-2000621519",
            "urlToImage": "https://gizmodo.com/app/uploads/2024/11/GettyImages-2163296066.jpg",
            "publishedAt": "2025-06-27T19:45:41Z",
            "content": "In a series of bombastic new comments on June 27, President Donald Trump didn’t just embrace the world of cryptocurrency; he claimed to be its founding father. Painting a picture of a failing industr… [+3277 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Luc Olinga",
            "title": "The End of the Stock Market As We Know It",
            "description": "Startups and Wall Street giants alike are racing to turn stocks, bonds, and real estate into crypto-like tokens. We asked an expert to break down what that means for your money.",
            "url": "https://gizmodo.com/the-end-of-the-stock-market-as-we-know-it-2000625351",
            "urlToImage": "https://gizmodo.com/app/uploads/2022/04/db035252532bbc24f6d808a7fd7b6177.jpg",
            "publishedAt": "2025-07-07T21:38:31Z",
            "content": "A revolution is brewing in finance, promising to shatter the old walls of Wall Street and bring assets like stocks, bonds, and even skyscrapers onto the blockchain. Its called tokenization, and it co… [+6037 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": null,
            "title": "Armed police in Romania carry out raids linked to UK tax scam",
            "description": "Luxury cars and wads of cash were seized as part of an investigation into a complex scam targeting HMRC.",
            "url": "https://www.bbc.com/news/articles/cp867gjmn25o",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/7a0b/live/5c733910-5d74-11f0-9518-ad4f6a7be5be.jpg",
            "publishedAt": "2025-07-10T11:18:15Z",
            "content": "Romanian police have targeted a gang suspected of being behind a complex scam in which stolen data was used to fraudulently claim millions in tax repayments from HM Revenue &amp; Customs (HMRC), poli… [+2178 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Luc Olinga",
            "title": "Billionaire Mark Cuban Says AI Gives Workers ‘Superpowers,’ but Crypto Is ‘Not Even Close’ to Its iPhone Moment",
            "description": "In a Q&A with Gizmodo, the billionaire investor explains why AI is about to change your job and why crypto still hasn’t delivered on its promise.",
            "url": "https://gizmodo.com/billionaire-mark-cuban-says-ai-gives-workers-superpowers-but-crypto-is-not-even-close-to-its-iphone-moment-2000623749",
            "urlToImage": "https://gizmodo.com/app/uploads/2025/01/Mark-Cuban-at-the-2024-NBA-Playoffs-1200x675.jpg",
            "publishedAt": "2025-07-04T10:00:27Z",
            "content": "Mark Cuban has always been techs most pragmatic and outspoken billionaire. As an early internet entrepreneur, a prolific investor on Shark Tank, and the owner of the Dallas Mavericks, hes seen multip… [+6413 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": null,
            "title": "Official list of unclaimed estates taken offline after BBC revealed huge fraud",
            "description": "We found evidence criminals were using Bona Vacantia to commit fraud worth millions of pounds.",
            "url": "https://www.bbc.com/news/articles/cwyqw41yeppo",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/0f50/live/72de81c0-5c96-11f0-b5c5-012c5796682d.jpg",
            "publishedAt": "2025-07-09T08:08:39Z",
            "content": "An official list of people who died without leaving a will has been taken offline, after a BBC investigation found evidence a crime gang was using it to commit fraud worth millions of pounds.\r\nThe go… [+3260 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Maurie Backman",
            "title": "Single mom says she was left on the hook for $50K after she thought she’d refinanced her loan with dealership",
            "description": "Autosmart has an “F” rating on Better Business Bureau and other loan-related complaints.",
            "url": "https://finance.yahoo.com/news/single-mom-says-she-left-103400854.html",
            "urlToImage": "https://media.zenfs.com/en/moneywise_327/8ee4a081d94cbf61919b4cf17d1c8ba3",
            "publishedAt": "2025-07-05T10:34:00Z",
            "content": "On June 18, NBC 10 reported that prosecutors are investigating a Burlington County, New Jersey car dealership.\r\nAutosmart on Route 73 in Palmyra was served a search warrant and investigators took lic… [+6339 chars]"
        },
        {
            "source": {
                "id": "fox-news",
                "name": "Fox News"
            },
            "author": "Kim Komando",
            "title": "Top 5 scams spreading right now",
            "description": "Scammers never seem to be running out of new ways to try and get their hands on your money – and lately, they've been getting sophisticated.",
            "url": "https://www.foxnews.com/tech/top-5-scams-spreading-right-now",
            "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2023/08/Funeral-Home-Scams_02.jpg",
            "publishedAt": "2025-06-23T22:11:50Z",
            "content": "Lately, Ive had way too many calls on my shows from people who have lost thousands (sometimes hundreds of thousands) to scams. These are so cleverly evil, its like Oceans Eleven but starring a dude w… [+3402 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": null,
            "title": "New police appeal on 10th anniversary of 'Goldfinger' murder",
            "description": "Police say loyalties in the criminal fraternity have changed since the notorious conman's murder.",
            "url": "https://www.bbc.com/news/articles/c8e4k45yw3eo",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/c989/live/b83e9330-4e0f-11f0-a466-d54f65b60deb.jpg",
            "publishedAt": "2025-06-23T05:27:39Z",
            "content": "Peter Walker\r\nJohn Palmer was convicted at the Old Bailey in 2001 of a timeshare fraud that had about 16,000 victims\r\nDetectives have renewed their appeal for information 10 years after the murder of… [+3617 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Maurie Backman",
            "title": "Florida man, 60, says he lost $1.6M in an elaborate investment scam — fronted by a woman he’d known for years",
            "description": "Proof that even old friends can still be strangers.",
            "url": "https://finance.yahoo.com/news/florida-man-60-says-lost-103100024.html",
            "urlToImage": "https://media.zenfs.com/en/moneywise_327/f93bf0a5be7e0e21f0691402f2a387b3",
            "publishedAt": "2025-07-07T10:31:00Z",
            "content": "Real estate scams are all too common and older people tend to be easy targets. When Jose Luis Fernandez of Sunny Isles Beach, Florida invested money with Ybis Del Carmen of Realty Golden Group, he wa… [+4952 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Green Bay Press Gazette"
            },
            "author": "Vivian Barrett, Green Bay Press-Gazette",
            "title": "Eight people charged in scheme that defrauded Fox Communities Credit Union out of nearly $200,000",
            "description": "Between Oct. 17 and Nov. 19, 2024, Fox Communities Credit Union lost nearly over $192,000 to a large-scale fraud scheme.",
            "url": "https://www.greenbaypressgazette.com/story/news/crime/2025/07/14/eight-people-charged-in-large-scale-credit-union-fraud-scheme/85197110007/",
            "urlToImage": "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo-1200x1200.png",
            "publishedAt": "2025-07-14T22:24:03Z",
            "content": "Eight people have been charged in connection to a large-scale fraud scheme targeting local credit unions.\r\nHere's what to know about the case.\r\nWho is charged?\r\nDeandre Mackontee, 25, of Allouez; Dem… [+7745 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "9to5Mac"
            },
            "author": "Marcus Mendes",
            "title": "Apple hit with class action suit over App Store crypto scam",
            "description": "You know it’s a day that ends in “y” when there’s a new App Store lawsuit. This time, the issue isn’t antitrust or developer rejection complaints, but rather a class action accusing Apple of facilitating the spread of cryptocurrency scams by allowing a fake t…",
            "url": "https://9to5mac.com/2025/06/19/class-action-suit-app-store-crypto-scam/",
            "urlToImage": "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2022/01/app-store-scam.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
            "publishedAt": "2025-06-19T14:13:45Z",
            "content": "You know its a day that ends in y when theres a new App Store lawsuit. This time, the issue isnt antitrust or developer rejection complaints, but rather a class action accusing Apple of facilitating … [+2602 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "AppleInsider"
            },
            "author": "news@appleinsider.com (William Gallagher)",
            "title": "Latest App Store crypto lawsuit tries to blame Apple for bad user decisions",
            "description": "An App Store user is suing Apple because she was duped by a fake cryptocurrency app, neglecting her own role in her choosing to send money to fairly obvious criminals.Representations of cryptocurrenciesNo question, Apple's app review team has had failures bef…",
            "url": "https://appleinsider.com/articles/25/06/19/latest-app-store-crypto-lawsuit-tries-to-blame-apple-for-bad-user-decisions",
            "urlToImage": "https://photos5.appleinsider.com/gallery/58048-118232-53864-108358-bitcoin-xl-xl.jpg",
            "publishedAt": "2025-06-19T15:05:47Z",
            "content": "An App Store user is suing Apple because she was duped by a fake cryptocurrency app, neglecting her own role in her choosing to send money to fairly obvious criminals.\r\nNo question, Apple's app revie… [+5873 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NPR"
            },
            "author": "Ryan Lucas",
            "title": "DOJ announces a record-breaking takedown of health care fraud schemes",
            "description": "The Justice Department announced charges in what officials describe as the largest health care fraud bust in DOJ history.",
            "url": "https://www.npr.org/2025/06/30/nx-s1-5451736/doj-health-care-fraud-medicaid",
            "urlToImage": "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/5564x3130+0+290/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fdb%2F54%2F50d5008045c0b54bb5ddc96aea23%2Fgettyimages-2222936503.jpg",
            "publishedAt": "2025-06-30T20:39:35Z",
            "content": "The Justice Department has charged a Pakistani national who allegedly orchestrated a $650 million fraud scheme that primarily targeted an Arizona Medicaid program offering addiction treatment and oth… [+4912 chars]"
        },
        {
            "source": {
                "id": "fox-news",
                "name": "Fox News"
            },
            "author": "Kurt Knutsson, CyberGuy Report",
            "title": "Social Security Administration phishing scam targets retirees",
            "description": "Social Security phishing scams use urgency and impersonation to steal personal data. Learn how to spot fake SSA emails and implement 10 protective measures.",
            "url": "https://www.foxnews.com/tech/social-security-administration-phishing-scam-targets-retirees",
            "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2025/07/1-look-out-for-this-new-sneaky-social-security-administration-phishing-scam-intro.jpg",
            "publishedAt": "2025-07-06T14:00:14Z",
            "content": "Phishing emails and messages are among the most dangerous cybersecurity threats. One of the most common and harmful examples is the Social Security Administration phishing scam, which targets unsuspe… [+11785 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "9to5Mac"
            },
            "author": "Ben Lovejoy",
            "title": "DuckDuckGo scam blocker detects fake stores, crypto sites, virus alerts, more",
            "description": "The privacy-focused web browser DuckDuckGo has boosted its anti-scam features. It can now detect and block fake ecommerce stores, crypto sites, virus alerts, and more.\n\n\n\nThe new security feature is completely free for all users on both Mac and iOS browsers, …",
            "url": "https://9to5mac.com/2025/06/19/duckduckgo-scam-blocker-detects-fake-stores-crypto-sites-virus-alerts-more/",
            "urlToImage": "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2025/06/DuckDuckGo-scam-blocker-detects-fake-stores-crypto-sites-fake-virus-alerts-more.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1",
            "publishedAt": "2025-06-19T12:44:14Z",
            "content": "The privacy-focused web browser DuckDuckGo has boosted its anti-scam features. It can now detect and block fake ecommerce stores, crypto sites, virus alerts, and more.\r\nThe new security feature is co… [+2806 chars]"
        },
        {
            "source": {
                "id": "business-insider",
                "name": "Business Insider"
            },
            "author": "Hallam Bullock",
            "title": "Businesses are scrambling to keep themselves safe against AI's evolving threats",
            "description": "Watch out for fake job candidates, fake recruiters, and fake sales. America's small business owners are being swamped by scammers.",
            "url": "https://www.businessinsider.com/genai-fraud-trick-common-deepfake-jobs-recruiters-sales-2025-7",
            "urlToImage": "https://i.insider.com/6863bf5485e81483682d19e3?width=1200&format=jpeg",
            "publishedAt": "2025-07-01T16:08:45Z",
            "content": "Juan Algar/Getty Images\r\n<ul><li>This post originally appeared in the Business Insider Today newsletter.</li><li>You can sign up for Business Insider's daily newsletter here.</li></ul>Good morning. E… [+7740 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Womansworld.com"
            },
            "author": "Julianne MacNeill",
            "title": "Social Security Phishing Scam Targets Retirees",
            "description": "Phishing scams have been on the rise for quite some time and now there is a new target: retirees. A Social Security Administration phishing scam has been...",
            "url": "https://www.womansworld.com/life/money/how-to-stay-safe-from-social-security-phishing-scams",
            "urlToImage": "https://s.yimg.com/ny/api/res/1.2/F6bAOQBCLCyE1XFdarA3KQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD03OTg7Y2Y9d2VicA--/https://media.zenfs.com/en/woman_s_world_418/8b59955c364afeb5312bfaa799c0141a",
            "publishedAt": "2025-07-10T17:02:37Z",
            "content": "Phishing scams have been on the rise for quite some time and now there is a new target: retirees. A Social Security Administration phishing scam has been going around, and it can easily fool you if y… [+2939 chars]"
        },
        {
            "source": {
                "id": "fox-news",
                "name": "Fox News"
            },
            "author": "Kurt Knutsson, CyberGuy Report",
            "title": "Elon Musk scam tricks victims on Facebook with Tesla hoax",
            "description": "A Facebook scammer posing as Elon Musk tricked a victim with promises of a Tesla and $250,000, requesting gift cards that become untraceable once the codes are shared.",
            "url": "https://www.foxnews.com/tech/elon-musk-scam-tricks-victims-facebook-tesla-hoax",
            "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2025/06/2-elon-musk-impersonator-scams-victims-with-tesla-apple-gift-card-hoax.jpg",
            "publishedAt": "2025-06-26T14:00:56Z",
            "content": "It started with a Facebook friend request and a message that felt too good to be true. \r\nThen, it quickly turned into an expensive lesson in online deception. \r\nThe woman this happened to in Jensen B… [+10137 chars]"
        },
        {
            "source": {
                "id": "fox-news",
                "name": "Fox News"
            },
            "author": "Kurt Knutsson, CyberGuy Report",
            "title": "5 steps to protect your finances from family scams",
            "description": "Family fraud endangers seniors when relatives exploit their trust, but removing personal data online and monitoring identity can prevent financial harm to aging parents.",
            "url": "https://www.foxnews.com/tech/5-steps-protect-your-finances-from-family-scams",
            "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2025/07/3-5-steps-to-protect-your-parents-from-family-fraud-before-its-too-late.jpg",
            "publishedAt": "2025-07-13T11:00:45Z",
            "content": "Youd like to believe no one in your family could ever scam your parents. But what if the danger isnt a stranger at all? What if its someone they already trust? What if its even your sibling or an est… [+6686 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Kaili Killpack",
            "title": "'Email Is Threatening To Do Bad Things....If He Didn't Pay $2,000 In Bitcoin' – Teen Looks for Help After Father's SSN Is Used For Blackmail",
            "description": "In a recent Reddit post, a 17-year-old shared a disturbing story: his father received an email that included his full Social Security number and demanded...",
            "url": "https://finance.yahoo.com/news/email-threatening-bad-things-didnt-203142050.html",
            "urlToImage": "https://media.zenfs.com/en/benzinga_79/8ef082065110d47c4f74e6ba2be5566e",
            "publishedAt": "2025-07-11T20:31:42Z",
            "content": "Benzinga and Yahoo Finance LLC may earn commission or revenue on some items through the links below.\r\nIn a recent Reddit post, a 17-year-old shared a disturbing story: his father received an email th… [+4242 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Schneier.com"
            },
            "author": "Bruce Schneier",
            "title": "Ghostwriting Scam",
            "description": "The variations seem to be endless. Here’s a fake ghostwriting scam that seems to be making boatloads of money.\nThis is a big story about scams being run from Texas and Pakistan estimated to run into tens if not hundreds of millions of dollars, viciously defra…",
            "url": "https://www.schneier.com/blog/archives/2025/06/ghostwriting-scam.html",
            "urlToImage": null,
            "publishedAt": "2025-06-18T14:37:27Z",
            "content": "The variations seem to be endless. Here’s a fake ghostwriting scam that seems to be making boatloads of money.\r\nThis is a big story about scams being run from Texas and Pakistan estimated to run into… [+498 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Anthropic.com"
            },
            "author": null,
            "title": "AI ate code, now it wants cashflows. Is this finance's Copilot moment?\"",
            "description": "Today, we're introducing a comprehensive solution for financial analysis that transforms how finance professionals analyze markets, conduct research, and make investment decisions with Claude.",
            "url": "https://www.anthropic.com/news/claude-for-financial-services",
            "urlToImage": "https://cdn.sanity.io/images/4zrzovbb/website/232ce3361806a4ceafb2b1f40d0e305a0aa45b11-2400x1260.png",
            "publishedAt": "2025-07-15T22:03:50Z",
            "content": "Today, we're introducing a comprehensive solution for financial analysis that transforms how finance professionals analyze markets, conduct research, and make investment decisions with Claude.\r\nThe F… [+7844 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NPR"
            },
            "author": "Fatma Tanis",
            "title": "Clawing back foreign aid is tied to 'waste, fraud and abuse.' What's the evidence?",
            "description": "As the Senate prepares to vote on a bill to rescind $40 billion in promised foreign aid, critics of the measure say a thorough governmental review of targeted programs did not actually take place.",
            "url": "https://www.npr.org/sections/goats-and-soda/2025/07/16/g-s1-77847/rescission-clawback-foreign-aid-bill-fraud-waste-abuse",
            "urlToImage": "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/5142x2892+0+252/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F4a%2F6c%2Fc667c13b4a0bb493712ce7724de4%2Fgettyimages-2197432945.jpg",
            "publishedAt": "2025-07-16T23:52:24Z",
            "content": "The Trump administration says it has a compelling reason to ask the Senate to claw back $7.9 billion in foreign aid funds that Congress had approved prior to his taking office: evidence of what Presi… [+9456 chars]"
        },
        {
            "source": {
                "id": "fox-news",
                "name": "Fox News"
            },
            "author": "Kurt Knutsson, CyberGuy Report",
            "title": "Chaos ransomware hits Optima Tax Relief, leaks 69GB of data",
            "description": "The Chaos ransomware group breached Optima Tax Relief in a double-extortion attack, stealing sensitive customer case files and corporate documents with personal information.",
            "url": "https://www.foxnews.com/tech/chaos-ransomware-hits-optima-tax-relief-leaks-69gb-data",
            "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2025/06/3-chaos-ransomware-attack-on-optima-tax-relief-leaks-69gb-of-sensitive-client-data-outro.jpg",
            "publishedAt": "2025-06-21T14:00:00Z",
            "content": "Cyberattacks on financial service providers are no longer isolated events. In recent years, tax preparation companies, accounting software vendors and data brokers have all found themselves in the cr… [+8215 chars]"
        },
        {
            "source": {
                "id": "wired",
                "name": "Wired"
            },
            "author": "Lily Hay Newman, Andy Greenberg, Dell Cameron",
            "title": "ICE Rolls Facial Recognition Tools Out to Officers' Phones",
            "description": "Plus: US feds charge alleged masterminds behind infamous forum, Scattered Spider targets airlines, and hackers open a valve at a Norwegian dam.",
            "url": "https://www.wired.com/story/ice-rolls-facial-recognition-tools-out-to-officers-phones/",
            "urlToImage": "https://media.wired.com/photos/685ee3c3c55f1273d9de7f0a/191:100/w_1280,c_limit/Security-Roundup-ICE-Facial-Recognition-Security-1333881327.jpg",
            "publishedAt": "2025-06-28T10:30:00Z",
            "content": "WIRED published ashocking investigation this week based on records, including audio recordings, of hundreds of emergency calls from United States Immigration and Customs Enforcement (ICE) detention c… [+5493 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Luc Olinga",
            "title": "The Trump Family Is Quietly Building a Crypto Empire",
            "description": "The Trump family is building a crypto empire that puts their profits on a collision course with the presidency.",
            "url": "https://gizmodo.com/the-trump-family-is-quietly-building-a-crypto-empire-2000618758",
            "urlToImage": "https://gizmodo.com/app/uploads/2024/08/Eric-Trump-and-Donald-Trump-Jr.-.jpg",
            "publishedAt": "2025-06-22T16:00:31Z",
            "content": "Just a few years ago, Donald Trump called crypto a “scam” and “dangerous.” Today, from the Oval Office, he champions it as the future of finance. This dramatic pivot is backed by a rapidly growing ec… [+4868 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Internet"
            },
            "author": "info@thehackernews.com (The Hacker News)",
            "title": "BaitTrap: Over 17,000 Fake News Websites Caught Fueling Investment Fraud Globally",
            "description": "A newly released report by cybersecurity firm CTM360 reveals a large-scale scam operation utilizing fake news websites—known as Baiting News Sites (BNS)—to deceive users into online investment fraud across 50 countries.\nThese BNS pages are made to look like r…",
            "url": "https://thehackernews.com/2025/07/baittrap-over-17000-fake-news-websites.html",
            "urlToImage": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3htQRh8SymilrkJ7-P94tJquhYqsuNEh6bW0ve9v4yqzXSCOskTl7_wplZhqr5da03EmzVqx-XPYf6wtvZhDD6hwWzcfdkrel-0mYWMU4LCtMXmqlY_YuB34H9vitx4ugCnCFMjCHNIIo0_A8WXfkkCFRVBfPCt2p6srF9AiHuxtOOOoSxzLR3Vk1fl4/s728-rw-e365/baittrap.jpg",
            "publishedAt": "2025-07-08T10:30:00Z",
            "content": "A newly released report by cybersecurity firm CTM360 reveals a large-scale scam operation utilizing fake news websites—known as Baiting News Sites (BNS)—to deceive users into online investment fraud … [+4136 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Cory Santos",
            "title": "Canadian man livid after bank deems $35K worth of charges from all over the world on his credit card are legit",
            "description": "“Passwords, virus protection. I don’t know how things were compromised.\"",
            "url": "https://finance.yahoo.com/news/canadian-man-livid-bank-deems-110000382.html",
            "urlToImage": "https://media.zenfs.com/en/moneywise_327/302cbbba26d31a8f1695b8cb7ab6e5a0",
            "publishedAt": "2025-06-26T11:00:00Z",
            "content": "Your credit card can be a lifeline in tough financial times, but it can also turn into a nightmare in the blink of an eye.\r\nJust ask Andrew St. Hilaire, a small business owner who recently discovered… [+6104 chars]"
        },
        {
            "source": {
                "id": "fox-news",
                "name": "Fox News"
            },
            "author": "Kurt Knutsson, CyberGuy Report",
            "title": "10 signs your personal data is being sold online",
            "description": "A personal data protection guide revealing 10 signs your information is circulating among data brokers and practical strategies to regain control of your digital footprint.",
            "url": "https://www.foxnews.com/tech/10-signs-your-personal-data-being-sold-online",
            "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2025/06/3-10-signs-your-personal-data-is-being-sold-online.jpg",
            "publishedAt": "2025-06-18T14:00:52Z",
            "content": "Your personal data is probably being sold right now. Scam calls, junk emails, and weird login alerts aren't random. They're warning signs that your information is being circulated through data broker… [+10570 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": null,
            "title": "Man accused of hiring £1,500 'hitman' to kill wife",
            "description": "Paul Lewis, 54, and Dominique Saunders, 35, deny conspiracy to murder at Swansea Crown Court",
            "url": "https://www.bbc.com/news/articles/cg5zym26v10o",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/645b/live/14ea2f20-510a-11f0-8268-2df9989f3f1c.jpg",
            "publishedAt": "2025-06-24T17:14:23Z",
            "content": "Stephen Fairclough\r\nA Swansea man accused of conspiring to have his estranged wife murdered paid £1,500 to a friend to hire a \"hitman\", a court has heard.\r\nPaul Lewis, 54, from Fishmarket Quay, Swans… [+4272 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Phandroid - News for Android"
            },
            "author": "Tyler Lee",
            "title": "AI chatbots are stealing student identities to scam financial aid",
            "description": "A new wave of AI chatbots is impersonating students to steal financial aid. Here's how the scam works and how to protect your identity.\nThe post AI chatbots are stealing student identities to scam financial aid appeared first on Phandroid.",
            "url": "https://phandroid.com/2025/06/20/ai-chatbots-are-stealing-student-identities-to-scam-financial-aid/",
            "urlToImage": "https://phandroid.com/wp-content/uploads/2025/06/AI-Artificial-Intelligence.jpg",
            "publishedAt": "2025-06-20T05:27:00Z",
            "content": "A disturbing new scam is taking root in higher education. According to a recent report, sophisticated AI chatbots are now impersonating students to steal financial aid and occupy seats in online cour… [+1199 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Lucas Ropek",
            "title": "Crypto Billionaire Justin Sun Buys Another $100 Million of Trump’s Memecoin",
            "description": "The crypto mogul is getting in deep with the Trump family's digital assets.",
            "url": "https://gizmodo.com/crypto-billionaire-justin-sun-buys-another-100-million-of-trumps-memecoin-2000628350",
            "urlToImage": "https://gizmodo.com/app/uploads/2024/11/Justin-Sun-founder-of-Tron.jpg",
            "publishedAt": "2025-07-12T15:10:52Z",
            "content": "Justin Sun, the founder of the Tron blockchain, announced this week that he had purchased yet another $100 million of Donald Trump’s memecoin, $TRUMP. Sun already owns a substantial amount of the ass… [+2065 chars]"
        },
        {
            "source": {
                "id": "fox-news",
                "name": "Fox News"
            },
            "author": "Kurt Knutsson, CyberGuy Report",
            "title": "120,000 fake sites fuel Amazon Prime Day scams",
            "description": "Amazon Prime Day shoppers face threats from 120,000-plus scam websites as cybercriminals prepare phishing traps and malware ahead of the July sales event.",
            "url": "https://www.foxnews.com/tech/120000-fake-sites-fuel-amazon-prime-day-scams",
            "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2025/07/1-120000-fake-sites-fuel-amazon-prime-day-scams.jpg",
            "publishedAt": "2025-07-05T14:00:03Z",
            "content": "As millions prepare to snag the best deals during Amazon Prime Day, cybercriminals are preparing too, just not in the way you'd hope. \r\nSecurity researchers have uncovered more than 120,000 fake Amaz… [+6429 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": null,
            "title": "French police raid on National Rally HQ prompts outrage from party leaders",
            "description": "Party president Jordan Bardella complains of an \"unprecedented operation\", as prosecutors investigate alleged fraud.",
            "url": "https://www.bbc.com/news/articles/ckg5kd04e1jo",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/99fe/live/61884750-5cc1-11f0-b693-d1a14c177c8c.jpg",
            "publishedAt": "2025-07-09T13:51:41Z",
            "content": "Paul Kirby\r\nFrance's far-right National Rally party has accused authorities of a \"new harassment campaign\", after police raided its headquarters in an inquiry into its campaign finances.\r\nParty presi… [+3010 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "JEFF MARTIN",
            "title": "2 Florida men are accused of stealing millions from trust fund for people with special needs",
            "description": "Two Florida men have been indicted in what prosecutors describe as a scheme to steal more than $100 million from a nonprofit that managed funds for people...",
            "url": "https://www.yahoo.com/news/2-florida-men-accused-stealing-173234605.html",
            "urlToImage": "https://s.yimg.com/ny/api/res/1.2/UzB8aE_vMYkhzJkt_EuIYQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/ap.org/87d58402959ebf1fa67e9c51fac551b3",
            "publishedAt": "2025-06-24T17:32:34Z",
            "content": "Two Florida men have been indicted in what prosecutors describe as a scheme to steal more than $100 million from a nonprofit that managed funds for people with disabilities and special needs.\r\nFedera… [+2391 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Slate Magazine"
            },
            "author": "Kristin Wong",
            "title": "My Nephew Loves to Brag About Committing Fraud. What He’s Done Now Has Gone Too Far.",
            "description": "What's my duty here?",
            "url": "https://slate.com/advice/2025/06/money-advice-nephew-dentist-fraud-property-records-taxes.html",
            "urlToImage": "https://compote.slate.com/images/fb19dd39-e2fa-46c7-b11c-e494c9c09d80.jpeg?crop=1560%2C1040%2Cx0%2Cy0&width=1560",
            "publishedAt": "2025-06-25T15:45:07Z",
            "content": "Pay Dirt is Slates money advice column.Have a question? Send it to Kristin and Ilyce here. (Its anonymous!)\r\nDear Pay Dirt, \r\nMy nephew is quick to brag about finding ways to push the limits to save … [+3620 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NPR"
            },
            "author": "Michel Martin",
            "title": "An Alabama food bank braces for big increase in demand if SNAP cuts take effect",
            "description": "The food assistance program known as SNAP could face significant reductions if President Trump's tax and spending bill passes the House.",
            "url": "https://www.npr.org/2025/07/03/nx-s1-5453708/obbb-big-beautiful-bill-snap-alabama-food-bank",
            "urlToImage": "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/5256x2957+0+230/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F72%2Fa2%2Ff38f61084615b22753610cf023ee%2Fimg-2072-edit.jpg",
            "publishedAt": "2025-07-03T09:03:36Z",
            "content": "An Alabama food bank leader anticipates a major increase in people needing to turn to groups like hers to cover their basic needs if the massive tax and spending legislation backed by President Trump… [+4062 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NPR"
            },
            "author": "Jenna McLaughlin",
            "title": "U.S. senator wants DOGE out of sensitive farmer payment system",
            "description": "Sen. Tammy Baldwin, D-Wis., wants the USDA to revoke high-level access granted to the Department of Government Efficiency to a database that controls payments and loans to farmers and ranchers.",
            "url": "https://www.npr.org/2025/07/15/nx-s1-5468585/doge-usda-farmers",
            "urlToImage": "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/2500x1406+0+260/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F09%2Faf%2F1138a00c4109b63a9454ceb1340e%2Fnpr-dogefarmers-spot1-fin.jpg",
            "publishedAt": "2025-07-15T20:46:24Z",
            "content": "Sen. Tammy Baldwin, a Democrat from Wisconsin, wants the U.S. Department of Agriculture (USDA) to revoke high-level access granted to the Department of Government Efficiency, or DOGE, to a sensitive … [+5063 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Moritz-mander.de"
            },
            "author": null,
            "title": "My Bank Keeps on Undermining Anti-Phishing Education",
            "description": "TLDR: my bank sent out emails with websites which looked a lot like phishing mails, so much so that this similarity could potentially be used against them legally by potential phishing victims\n– Discussion at hackernews (soon)\nChapter 1: You’ve got mail As I …",
            "url": "http://moritz-mander.de/blog/my_bank_keeps_on_undermining_anti-phishing_education/",
            "urlToImage": null,
            "publishedAt": "2025-07-17T12:04:53Z",
            "content": "TLDR: my bank sent out emails with websites which looked a lot like phishing mails, so much so that this similarity could potentially be used against them legally by potential phishing victims\r\n– Dis… [+14096 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NPR"
            },
            "author": "The Associated Press",
            "title": "Funeral home owner who stashed nearly 190 decaying bodies is sentenced to 20 years",
            "description": "The owner of the Return to Nature Funeral Home received the maximum possible sentence for cheating customers and defrauding the federal government out of nearly $900,000 in COVID-19 aid.",
            "url": "https://www.npr.org/2025/06/28/nx-s1-5449615/funeral-home-owner-decaying-bodies-sentenced-colorado",
            "urlToImage": "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/5172x2909+0+269/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F95%2F69%2Ffa19418b4dffbd74a953e5695805%2Fap25178612314489.jpg",
            "publishedAt": "2025-06-28T12:30:43Z",
            "content": "DENVER A Colorado funeral home owner who stashed nearly 190 dead bodies in a decrepit building and sent grieving families fake ashes received the maximum possible sentence of 20 years in prison on Fr… [+3897 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Phys.Org"
            },
            "author": "Bing Han",
            "title": "'Pig butchering' scams have stolen billions from people around the world. Here's what you need to know",
            "description": "At the beginning of 2025, panic about fraud and human trafficking erupted on Chinese social media. It started when a Chinese actor called Wang Xing was tricked into traveling to Thailand for an audition, where he was abducted by criminals and taken to a scam …",
            "url": "https://phys.org/news/2025-07-pig-butchering-scams-stolen-billions.html",
            "urlToImage": "https://scx2.b-cdn.net/gfx/news/hires/2019/scam.jpg",
            "publishedAt": "2025-07-14T20:10:01Z",
            "content": "At the beginning of 2025, panic about fraud and human trafficking erupted on Chinese social media. It started when a Chinese actor called Wang Xing was tricked into traveling to Thailand for an audit… [+6601 chars]"
        },
        {
            "source": {
                "id": "cbc-news",
                "name": "CBC News"
            },
            "author": null,
            "title": "RBC tells customer she's responsible for $14K stolen from account in bank investigator scam",
            "description": "When Melissa Plett got a fraud alert call from a number at the Royal Bank of Canada last month, she didn't suspect she'd lose $14,510 as part of a scam where fraudsters pose as bank investigators. Though victims can seek reimbursement, banks often reject the …",
            "url": "https://www.cbc.ca/news/business/rbc-bank-investigator-scam-1.7577770",
            "urlToImage": "https://i.cbc.ca/1.7577800.1751928224!/fileImage/httpImage/image.jpeg_gen/derivatives/16x9_1180/melissa-plett-saint-armand-quebec-rbc-fraud-victim.jpeg?im=Resize%3D620",
            "publishedAt": "2025-07-08T08:00:00Z",
            "content": "At first, Melissa Plett didn't think there was anything suspicious about a fraud alert call she got last month purportedly from her bank, the Royal Bank of Canada (RBC).\r\nHer phone's call display sho… [+7200 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Salon"
            },
            "author": "Cezary Podkul",
            "title": "How foreign scammers use US banks to fleece Americans",
            "description": "Global behemoths like Wells Fargo and Bank of America have been used in \"pig-butchering\" scams.",
            "url": "https://www.salon.com/2025/06/26/how-foreign-scammers-use-us-banks-to-fleece-americans/",
            "urlToImage": "https://www.salon.com/app/uploads/2025/06/bank-of-america-2217039072.jpg",
            "publishedAt": "2025-06-27T01:02:55Z",
            "content": "ProPublica is a Pulitzer Prize-winning investigative newsroom. Sign up for The Big Story newsletter to receive stories like this one in your inbox.Brian Maloney Jr. was flummoxed when he was served w… [+28558 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "PetaPixel"
            },
            "author": "Pesala Bandara",
            "title": "Sports Star Shared Selfie with iPhone Cable Up His Nose in Cancer Scam",
            "description": "A sports star has pleaded guilty to fraud after sharing a selfie showing an iPhone cable -- made to look like a hospital tube -- inserted up his nose. The photo fooled thousands and was used to scam people by falsely claiming he had cancer.\n[Read More]",
            "url": "https://petapixel.com/2025/07/09/sports-star-shared-selfie-with-iphone-cable-up-his-nose-in-cancer-scam/",
            "urlToImage": "https://petapixel.com/assets/uploads/2025/07/sports-star-conned-selfie-iphone-cable-stuck-nose-hospital-bed-cancer-scam-photo.jpg",
            "publishedAt": "2025-07-09T16:56:28Z",
            "content": "The athlete tricked people into thinking he had cancer with this photograph of an iPhone cable up his nose.\r\nA sports star has pleaded guilty to fraud after sharing a selfie showing an iPhone cable —… [+2077 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": "Jiraporn Sricham and Koh Ewe - BBC News",
            "title": "Thai woman arrested for blackmailing monks with thousands of videos after sex",
            "description": "The woman, known as \"Ms Golf\", allegedly had sexual relations with monks and extorted money from them.",
            "url": "https://www.bbc.com/news/articles/cjelg7q845zo?xtor=AL-72-%5Bpartner%5D-%5Byahoo.north.america%5D-%5Bheadline%5D-%5Bnews%5D-%5Bbizdev%5D-%5Bisapi%5D",
            "urlToImage": "https://s.yimg.com/ny/api/res/1.2/OyeVRBDWoj9mnA9bGWjz.g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDY7Y2Y9d2VicA--/https://media.zenfs.com/en/bbc_us_articles_995/f7e083141b31522aaf8cb1a917b6c654",
            "publishedAt": "2025-07-16T09:03:55Z",
            "content": "Thai police have arrested a woman who allegedly had sexual relations with monks, and then used photos and videos of the acts to extort money from them.\r\nThe woman, who police are calling \"Ms Golf\", h… [+3752 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Tom's Hardware UK"
            },
            "author": "editors@tomshardware.com (Jowi Morales) , Jowi Morales",
            "title": "Australian authorities say top crypto ATM users are scam victims and money mules — most transactions from victims or mules forced to deposit money into the machines",
            "description": "Victims as old as 70 years or more have lost hundreds of thousands through crypto ATMs.",
            "url": "https://www.tomshardware.com/tech-industry/cryptocurrency/australian-authorities-say-top-crypto-atm-users-are-scam-victims-and-money-mules-most-transactions-from-victims-or-mules-forced-to-deposit-money-into-the-machines",
            "urlToImage": "https://cdn.mos.cms.futurecdn.net/EsjqZDe57urzRbiXFvtm6H.jpg",
            "publishedAt": "2025-06-25T15:58:57Z",
            "content": "Australian financial watchdog AUSTRAC, or Australian Transactions Reports and Analysis Centre, said that “scam victims, money mules, and suspected offenders” are the top users of crypto ATMs in the c… [+3263 chars]"
        },
        {
            "source": {
                "id": "the-next-web",
                "name": "The Next Web"
            },
            "author": "Siôn Geschwindt",
            "title": "Europe’s 20 largest startup funding rounds this year (so far)",
            "description": "Despite a cautious VC climate and ongoing geopolitical jitters, European startups are still attracting serious cash.  Covering everything from AI drug discovery and space launches to quantum software and fusion energy, the continent’s startups raised €19bn in…",
            "url": "https://thenextweb.com/news/europes-20-largest-startup-funding-rounds-this-year-so-far",
            "urlToImage": "https://img-cdn.tnwcdn.com/image/tnw-blurple?filter_last=1&fit=1280%2C640&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2023%2F08%2FEUChinaexport.jpg&signature=c4ae5b34e7e91c490699ecc1f970d6ee",
            "publishedAt": "2025-07-01T15:14:23Z",
            "content": "Despite a cautious VC climate and ongoing geopolitical jitters, European startups are still attracting serious cash. \r\nCovering everything from AI drug discovery and space launches to quantum softwar… [+5834 chars]"
        },
        {
            "source": {
                "id": "business-insider",
                "name": "Business Insider"
            },
            "author": "ralexander@insider.com (Reed Alexander)",
            "title": "Citi's 'accelerating' its AI strategy with new leaders. Here's how they're readying the firm for a new future.",
            "description": "Citi is consolidating its AI strategy behind three key leaders. They're also eying a push into the next generation of the technology.",
            "url": "https://www.businessinsider.com/citigroup-jane-fraser-ai-strategy-new-leadership-agentic-ai-2025-6",
            "urlToImage": "https://i.insider.com/6852e70085e81483682c5a7f?width=1200&format=jpeg",
            "publishedAt": "2025-06-18T16:42:59Z",
            "content": "Citigroup's Jane Fraser is on a mission to modernize the global bank. Three executives have been appointed to ensure AI plays a big role in that.\r\nAs part of the push, the firm which has long struggl… [+4066 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Forbes"
            },
            "author": "Steve Weisman, Contributor, \n Steve Weisman, Contributor\n https://www.forbes.com/sites/steveweisman/",
            "title": "British Citizen Charged With $99 Million Wine Fraud",
            "description": "James Wellesley was arraigned on charges related to a Ponzi scheme regarding loans secured by collections of valuable wines",
            "url": "https://www.forbes.com/sites/steveweisman/2025/07/13/british-citizen-charged-with-99-million-wine-fraud/",
            "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/67bb8efc61c2d75143ff2911/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            "publishedAt": "2025-07-13T19:54:00Z",
            "content": "A police mug shot of Italian-born American swindler Charles Ponzi (1882 - 1949) after his arrest for ... More forgery under the name of Charles Bianchi, Montreal, Canada, 1909. Ponzi later served 14 … [+3748 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Talia Kirkland",
            "title": "Murrysville couple lost thousands of dollars after check made to JCPenney was ‘washed’",
            "description": "A couple from Murrysville reported that they mailed their check to pay their monthly bill, but instead of settling their account, they became victims of a...",
            "url": "https://www.yahoo.com/news/murrysville-couple-lost-thousands-dollars-220235176.html",
            "urlToImage": "https://media.zenfs.com/en/wpxi_cox_articles_540/acba93d0e96461a804221cca0161de41",
            "publishedAt": "2025-06-27T22:02:35Z",
            "content": "Murrysville couple lost thousands of dollars after check made to JCPenney was washed\r\nA couple from Murrysville reported that they mailed their check to pay their monthly bill, but instead of settlin… [+2827 chars]"
        },
        {
            "source": {
                "id": "espn",
                "name": "ESPN"
            },
            "author": null,
            "title": "Vikes pass rusher Turner scammed out of $240K",
            "description": "Vikings outside linebacker Dallas Turner was allegedly a victim of a bank fraud scheme that resulted in the theft of $240,000.",
            "url": "https://www.espn.com/nfl/story/_/id/45704105/vikings-dallas-turner-scammed-240k-bank-fraud-case",
            "urlToImage": "https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0707%2Fr1515979_1296x729_16%2D9.jpg",
            "publishedAt": "2025-07-09T21:23:39Z",
            "content": "Minnesota Vikings outside linebacker Dallas Turner was allegedly a victim of a bank fraud scheme that resulted in the theft of $240,000.\r\n\"Through our investigation, several suspects have been identi… [+1514 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Krebs on Security"
            },
            "author": "BrianKrebs",
            "title": "Big Tech’s Mixed Response to U.S. Treasury Sanctions",
            "description": "In May 2025, the U.S. government sanctioned a Chinese national for operating a cloud provider linked to the majority of virtual currency investment scam websites reported to the FBI. But more than a month later, the accused continues to openly operate account…",
            "url": "https://krebsonsecurity.com/2025/07/big-techs-mixed-response-to-u-s-treasury-sanctions/",
            "urlToImage": "https://krebsonsecurity.com/wp-content/uploads/2025/07/xxl4-github.png",
            "publishedAt": "2025-07-03T16:06:05Z",
            "content": "In May 2025, the U.S. government sanctioned a Chinese national for operating a cloud provider linked to the majority of virtual currency investment scam websites reported to the FBI. But a new report… [+9360 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Forbes"
            },
            "author": "Anne Easton, Contributor, \n Anne Easton, Contributor\n https://www.forbes.com/sites/anneeaston/",
            "title": "New Podcast ‘Easy Money: The Charles Ponzi Story’ Examines The Man Who Created The Scam",
            "description": "His name is synonymous with massive fraud. Now, a new podcast. \"Easy Money: The Charles Ponzi Story,\" delves into how and why he created the type of scam that is still perpetrated today.",
            "url": "https://www.forbes.com/sites/anneeaston/2025/07/11/new-podcast-easy-money-the-charles-ponzi-story-examines-the-man-who-created-the-scam/",
            "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/687134af96d4a5573283b757/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            "publishedAt": "2025-07-11T19:00:36Z",
            "content": "(Original Caption) Charles Ponzi, the \"financial wizard\" of Boston who succeeded in amassing a ... More fortune through his endless chain of sales of Foreign Exchange following the World War, later w… [+6867 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "CNET"
            },
            "author": "Danni Santana",
            "title": "Qantas Contacted by Hackers Responsible for Data Breach Affecting Millions of Customers",
            "description": "The cyber incident was discovered on June 30, and is believed to have compromised the data of up to 6 million customers.",
            "url": "https://www.cnet.com/tech/services-and-software/qantas-contacted-by-hackers-responsible-for-data-breach-affecting-millions-of-customers/",
            "urlToImage": "https://www.cnet.com/a/img/resize/eec0611d2ec37bbb55e30a5254500d98b996f84a/hub/2025/07/02/2049f882-468f-4020-b8ac-0fbe56c3aa24/gettyimages-501147980.jpg?auto=webp&fit=crop&height=675&width=1200",
            "publishedAt": "2025-07-09T14:44:00Z",
            "content": "Qantas disclosed a cybersecurity incident on July 2 potentially affecting 6 million customers. \r\nRyan Fletcher/Getty Images\r\nQantas has been contacted by a cyber criminal claiming responsibility for … [+2255 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Indiegamesplus.com"
            },
            "author": "Joel Couture",
            "title": "‘What The Fish’ Tries to Work Despite Fun, Haunted Distractions",
            "description": "What The Fish needs you to compose scam emails and not get all caught up in that delightful fishing game that’s on your desktop. You’re the new outreach coordinator (although I could...\nThe post ‘What The Fish’ Tries to Work Despite Fun, Haunted Distractions …",
            "url": "https://motorola-global-portal-fr.indiegamesplus.com/what-the-fish-review/",
            "urlToImage": "https://s3-igpbucket.s3.eu-west-2.amazonaws.com/wp-content/uploads/2025/06/22013939/what-the-fish-1.jpg",
            "publishedAt": "2025-06-24T11:00:00Z",
            "content": "What The Fish needs you to compose scam emails and not get all caught up in that delightful fishing game that’s on your desktop.\r\nYou’re the new outreach coordinator (although I could have sworn the … [+2176 chars]"
        },
        {
            "source": {
                "id": "fox-news",
                "name": "Fox News"
            },
            "author": "Kurt Knutsson, CyberGuy Report",
            "title": "Medicare data breach exposes 100,000 Americans' info",
            "description": "Cybercriminals accessed Medicare data of more than 100,000 Americans by creating fraudulent accounts, prompting CMS to deactivate accounts and issue new Medicare cards.",
            "url": "https://www.foxnews.com/tech/medicare-data-breach-exposes-100000-americans-info",
            "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2025/07/1-over-100000-americans-had-personal-data-stolen-in-medicare-breach-intro.jpg",
            "publishedAt": "2025-07-12T11:00:37Z",
            "content": "Healthcare data continues to be a top target for cybercriminals. In June alone, two major breaches compromised over 13 million patient records. Now, a newly confirmed Medicare data breach has affecte… [+6417 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Basketball Network"
            },
            "author": "Shane Garry Acedera",
            "title": "\"They went after my pension\"- Horace Grant claims a child support agency used a fake judge to steal his money",
            "description": "Horace made $68 million during his 17-year NBA career.",
            "url": "https://www.basketballnetwork.net/off-the-court/horace-grant-claims-that-child-support-agency-used-fake-judge-to-steal-his-money",
            "urlToImage": "https://media.zenfs.com/en/basketball_network_725/b702714029ec9a10c78d6ed8f667232d",
            "publishedAt": "2025-07-05T12:21:00Z",
            "content": "\"They went after my pension\"- Horace Grant claims a child support agency used a fake judge to steal his money originally appeared on Basketball Network.\r\nFormer Chicago Bulls forward Horace Grant had… [+4284 chars]"
        },
        {
            "source": {
                "id": "abc-news",
                "name": "ABC News"
            },
            "author": "ABC News",
            "title": "WATCH: Trump says deal reached to advance crypto legislation after House setback",
            "description": "After a setback when House Republicans failed to advance a vote on crypto-related legislation, Trump said he struck a deal with GOP lawmakers to move it forward Wednesday.",
            "url": "https://abcnews.go.com/Politics/video/trump-deal-reached-advance-crypto-legislation-after-house-123816257",
            "urlToImage": "https://i.abcnewsfe.com/a/67c0e083-c037-4802-be13-faa67142ab05/250716_abc_social_trump_hpMain_9x16.jpg?w=992",
            "publishedAt": "2025-07-16T22:15:43Z",
            "content": "<ul><li> Trump says it's 'highly unlikely' he'll fire Fed's Powell\r\n</li><li>Israel strikes Syrian military headquarters, IDF says\r\n</li><li>Multiple Louisiana law enforcement leaders charged in immi… [+4593 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Help Net Security"
            },
            "author": "Anamarija Pogorelec",
            "title": "Fraudsters behind €460 million crypto scam arrested in Spain",
            "description": "Spanish authorities arrested five members of a criminal network responsible for laundering €460 million stolen through global cryptocurrency investment fraud schemes. Source: Europol The operation, led by the Guardia Civil with support from Europol and law en…",
            "url": "https://www.helpnetsecurity.com/2025/06/30/spain-crypto-fraud-arrests-2025/",
            "urlToImage": "https://img.helpnetsecurity.com/wp-content/uploads/2025/06/30171152/europol-spain-1200.webp",
            "publishedAt": "2025-06-30T15:17:13Z",
            "content": "Spanish authorities arrested five members of a criminal network responsible for laundering 460 million stolen through global cryptocurrency investment fraud schemes.\r\nSource: Europol\r\nThe operation, … [+1366 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NPR"
            },
            "author": "Jaclyn Diaz",
            "title": "DOJ announces plans to prioritize cases to revoke citizenship",
            "description": "Denaturalization is a tactic heavily used during the McCarthy era and one that was expanded during the Obama administration and grew further during President Trump's first term. It's a tool usually used in only the most serious and rare of cases: dealing with…",
            "url": "https://www.npr.org/2025/06/30/nx-s1-5445398/denaturalization-trump-immigration-enforcement",
            "urlToImage": "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/5616x3159+0+293/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Ff0%2Fb8%2F6db070374d73aed1b097fed50992%2Fgettyimages-2213176750.jpg",
            "publishedAt": "2025-06-30T09:00:00Z",
            "content": "The Justice Department is aggressively prioritizing efforts to strip some Americans of their U.S. citizenship.\r\nDepartment leadership is directing its attorneys to prioritize denaturalization in case… [+10776 chars]"
        },
        {
            "source": {
                "id": "business-insider",
                "name": "Business Insider"
            },
            "author": "ddefrancesco@businessinsider.com (Dan DeFrancesco)",
            "title": "As the Fed waits on the impact of tariffs, some are already feeling it",
            "description": "The Fed is holding firm on interest rates as it waits to see the impact of Trump's tariffs. However, some people are already feeling them.",
            "url": "https://www.businessinsider.com/fed-tariffs-interest-rates-cost-consumer-ups-fedex-powell-2025-6",
            "urlToImage": "https://i.insider.com/6669f21d764df16112592d7f?width=1024&format=jpeg",
            "publishedAt": "2025-06-19T13:32:29Z",
            "content": "Happy Juneteenth! Since the BI Today team is off for the holiday, we're running an abbreviated version of the newsletter.\r\nBut we've still got time for a scoop! Meta's deal with Scale AI has left its… [+3250 chars]"
        },
        {
            "source": {
                "id": "fox-news",
                "name": "Fox News"
            },
            "author": "Kurt Knutsson, CyberGuy Report",
            "title": "How I almost fell for a Microsoft 365 Calendar invite scam",
            "description": "Microsoft 365 and Outlook users are being targeted by a tactic that injects fake billing alerts directly into their calendars.",
            "url": "https://www.foxnews.com/tech/how-i-almost-fell-microsoft-365-calendar-invite-scam",
            "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2025/07/1-how-i-almost-fell-for-a-microsoft-365-calendar-invite-scam.jpg",
            "publishedAt": "2025-07-08T10:00:46Z",
            "content": "Theres a new phishing scam thats sneaking past inbox filters in unexpected ways. Instead of sending suspicious links or obvious malware, this one uses something most people trust: calendar invites. M… [+13112 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Luc Olinga",
            "title": "Trump’s Meme Coin Empire Is About to Explode With Millions of New Tokens",
            "description": "Entities linked to the president can now sell up to nearly $1 billion worth of $TRUMP. The question is: will they?",
            "url": "https://gizmodo.com/trumps-meme-coin-empire-is-about-to-explode-with-millions-of-new-tokens-2000630543",
            "urlToImage": "https://gizmodo.com/app/uploads/2025/06/trump_memecoin-1200x675.jpg",
            "publishedAt": "2025-07-17T10:05:48Z",
            "content": "Millions of Trump meme coins could flood the crypto market starting this week, potentially reshaping the future of one of the most controversial cryptocurrencies in circulation.\r\nEntities affiliated … [+6091 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Wikipedia.org"
            },
            "author": "Contributors to Wikimedia projects",
            "title": "Dutch Childcare Benefits Scandal",
            "description": "Comments",
            "url": "https://en.wikipedia.org/wiki/Dutch_childcare_benefits_scandal",
            "urlToImage": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Belastingdienst_Toeslagen_enveloppen.jpg/1200px-Belastingdienst_Toeslagen_enveloppen.jpg",
            "publishedAt": "2025-07-11T20:38:46Z",
            "content": "The typical red-and-white envelopes used by the Benefits agency, previously part of the Belastingdienst\r\nThe Dutch childcare benefits scandal (Dutch: kinderopvangtoeslagaffaire or toeslagenaffaire, l… [+40556 chars]"
        },
        {
            "source": {
                "id": "abc-news",
                "name": "ABC News"
            },
            "author": "Doc Louallen, Knez Walker, Rachel Rosenbaum, Elizabeth Perkin",
            "title": "Inside the Chrisleys' prison experience: From reality TV to federal custody and back",
            "description": "Todd and Julie Chrisley detail their prison experience, presidential pardon and future plans after their daughter Savannah led the fight for their freedom.",
            "url": "https://abcnews.go.com/US/reality-tv-stars-todd-julie-chrisley-discuss-freedom/story?id=123241866",
            "urlToImage": "https://i.abcnewsfe.com/a/ea2fa9bb-b139-4837-9157-d9645f78fb60/chrisleys-1-abc-er-250626_1750972713005_hpMain_16x9.jpg?w=1600",
            "publishedAt": "2025-06-29T10:07:15Z",
            "content": "In one of their first interview since being released from federal prison, reality TV stars Todd and Julie Chrisley spoke out about their experience behind bars and their controversial presidential pa… [+3176 chars]"
        },
        {
            "source": {
                "id": "techradar",
                "name": "TechRadar"
            },
            "author": "Efosa Udinmwen",
            "title": "Avast launches another free scam protection tool, but this one is powered by AI - here's what it offers",
            "description": "Avast Scam Guardian is a free AI detection tool aimed at protecting online shoppers and crypto users.",
            "url": "https://www.techradar.com/pro/security/avast-launches-another-free-scam-protection-tool-but-this-one-is-powered-by-ai-heres-how-to-use-it",
            "urlToImage": "https://cdn.mos.cms.futurecdn.net/krBVBETP6cmxBcihGXQFy8.jpg",
            "publishedAt": "2025-06-26T08:02:00Z",
            "content": "<ul><li>Avast Scam Guardian uses AI to flag suspicious messages, emails, and websites in real time</li><li>Avast Scam Guardian Pro will also soon offer extra protections like scam call and SMS detect… [+2729 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Forbes"
            },
            "author": "Lars Daniel, Contributor, \n Lars Daniel, Contributor\n https://www.forbes.com/sites/larsdaniel/",
            "title": "$14.6 Billion Scam Busted: 324 Charged In DOJ’s Biggest Health Care Takedown",
            "description": "DOJ charges 324 in a record $14.6B health care fraud bust, seizing millions in cash, crypto, and assets in the largest crackdown of its kind.",
            "url": "https://www.forbes.com/sites/larsdaniel/2025/07/02/146-billion-scam-busted-324-charged-in-dojs-biggest-health-care-takedown/",
            "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/6865603ddfaee9ff22b06207/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            "publishedAt": "2025-07-02T16:43:15Z",
            "content": "Department of Justice\r\nAFP via Getty Images\r\nOn Monday, the U.S. Department of Justice unveiled the results of its largest-ever coordinated health care fraud takedown, charging 324 defendants across … [+2456 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Theregister.com"
            },
            "author": "Connor Jones",
            "title": "UK govt dept website that campaigns against encryption hijacked to advertise ... payday loans",
            "description": "Company at center of findings blamed SEO on outsourcer\nA website developed for the UK Home Office's 2022 \"flop\" anti-encryption campaign has seemingly been hijacked to push a payday loan scheme.…",
            "url": "https://www.theregister.com/2025/06/25/home_office_antiencryption_campaign_website/",
            "urlToImage": "https://regmedia.co.uk/2025/06/25/shutterstock_2422166115.jpg",
            "publishedAt": "2025-06-25T09:26:17Z",
            "content": "A website developed for the UK Home Office's 2022 \"flop\" anti-encryption campaign has seemingly been hijacked to push a payday loan scheme.\r\nThe pwn on the government's No Place to Hide campaign, whi… [+4730 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": null,
            "title": "Steve Rosenberg: Russian minister's death serves as warning to political elite",
            "description": "President Putin sacked his transport minister. Hours later, his body was found in a park with a gunshot wound to the head.",
            "url": "https://www.bbc.com/news/articles/c0l49310z2go",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/dc5b/live/74c04510-5c1d-11f0-9b94-7526494f4760.jpg",
            "publishedAt": "2025-07-08T17:49:07Z",
            "content": "Steve Rosenberg\r\nIt was a dramatic start to the week in Russia.\r\nOn Monday morning, President Vladimir Putin sacked his transport minister, Roman Starovoit.\r\nBy the afternoon Starovoit was dead; his … [+4700 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": "Peter Hoskins - Business reporter, BBC News",
            "title": "Telegram boss says he has fathered more than 100 children",
            "description": "The tech tycoon says all of his offspring will share his estimated $13.9bn fortune.",
            "url": "https://www.bbc.com/news/articles/c77v4x8g7pro?xtor=AL-72-%5Bpartner%5D-%5Byahoo.north.america%5D-%5Bheadline%5D-%5Bnews%5D-%5Bbizdev%5D-%5Bisapi%5D",
            "urlToImage": "https://media.zenfs.com/en/bbc_us_articles_995/ef85593aee37f180eefae835e77e8b16",
            "publishedAt": "2025-06-20T04:42:49Z",
            "content": "The multi-billionaire founder of instant messaging app Telegram, Pavel Durov, says he has fathered more than 100 children.\r\n\"The clinic, where I started donating sperm 15 years ago to help a friend, … [+1809 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Gizmodo.com"
            },
            "author": "Matt Novak",
            "title": "The Rise of AI Is Making Life Even Harder for Real People in Gaza",
            "description": "Gizmodo spoke with desperate Palestinians who were accused of being AI creations.",
            "url": "https://gizmodo.com/the-rise-of-ai-is-making-life-even-harder-for-real-people-in-gaza-2000607395",
            "urlToImage": "https://gizmodo.com/app/uploads/2025/07/AI-in-gaza-1200x675.jpg",
            "publishedAt": "2025-07-05T10:00:32Z",
            "content": "Saeed Ismail is a real person. But no matter how much proof he posts online, people keep calling him fake.\r\nThe 22-year-old has endured almost two years of war in Gaza, as Israel continues an assault… [+18719 chars]"
        },
        {
            "source": {
                "id": "business-insider",
                "name": "Business Insider"
            },
            "author": "litaliano@insider.com (Laura Italiano)",
            "title": "Tornado Cash money launderer tells jury how he pulled off a $1M NFT scam at age 20",
            "description": "A NFT \"rug pull\" netted a 20-year-old scammer $1M. And when that money needed laundering, he went to Tornado Cash, the scammer told a Manhattan jury.",
            "url": "https://www.businessinsider.com/tornado-cash-money-launderer-describes-running-1m-nft-scam-20-2025-7",
            "urlToImage": "https://i.insider.com/687818e785e81483682e2769?width=794&format=jpeg",
            "publishedAt": "2025-07-16T21:58:56Z",
            "content": "A federal jury glimpsed the haphazard, emoji-bedecked world of a 20-year-old NFT scammer on Wednesday during testimony at the Tornado Cash money-laundering trial in Manhattan.\r\nConvicted fraudster An… [+4846 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "nickthomas2@benzinga.com",
            "title": "This LinkedIn Message Could Cost You Your Life Savings—How To Avoid The Crypto Scam The FBI Says is Targeting Professionals",
            "description": "Federal authorities have filed to seize nearly $680,000 in cryptocurrency connected to a sophisticated romance scam that devastated two victims, highlighting...",
            "url": "https://finance.yahoo.com/news/linkedin-message-could-cost-life-173127629.html",
            "urlToImage": "https://media.zenfs.com/en/benzinga_79/63b89c20fb262964408f1bb329404875",
            "publishedAt": "2025-06-22T17:31:27Z",
            "content": "Benzinga and Yahoo Finance LLC may earn commission or revenue on some items through the links below.\r\nFederal authorities have filed to seize nearly $680,000 in cryptocurrency connected to a sophisti… [+7630 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Internet"
            },
            "author": "info@thehackernews.com (The Hacker News)",
            "title": "CBI Shuts Down £390K U.K. Tech Support Scam, Arrests Key Operatives in Noida Call Center",
            "description": "India's Central Bureau of Investigation (CBI) has announced that it has taken steps to dismantle what it said was a transnational cybercrime syndicate that carried out \"sophisticated\" tech support scams targeting citizens of Australia and the United Kingdom.\n…",
            "url": "https://thehackernews.com/2025/07/cbi-shuts-down-390k-uk-tech-support.html",
            "urlToImage": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhij4x7HqcUpwKMIR7eSEl1l6VBq2f6rjzLYJsX1KCO2dxn8aPl_0Gzaymy3uGuXxReP_Avgde0GkEKKSPL5Qg8uPsnxqYmHI5LnG-m1j0bQjVhlJTxY6F4r6d9CkiXM3o8mD5r5oDuwH4KWWDmpPAfzrWPXcZoMlZ7j6-dMBazW2oP_J6ZdNPgHF7dMEW3/s728-rw-e365/tech-scam.jpg",
            "publishedAt": "2025-07-14T08:00:00Z",
            "content": "India's Central Bureau of Investigation (CBI) has announced that it has taken steps to dismantle what it said was a transnational cybercrime syndicate that carried out \"sophisticated\" tech support sc… [+2528 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Theregister.com"
            },
            "author": "Jessica Lyons",
            "title": "Netflix, Apple, BofA websites hijacked with fake help-desk numbers",
            "description": "Don’t trust mystery digits popping up in your search bar\nScammers are hijacking the search results of people needing 24/7 support from Apple, Bank of America, Facebook, HP, Microsoft, Netflix, and PayPal in an attempt to trick victims into handing over person…",
            "url": "https://www.theregister.com/2025/06/20/netflix_apple_bofa_websites_hijacked/",
            "urlToImage": "https://regmedia.co.uk/2016/11/29/shutterstock_netflix.jpg",
            "publishedAt": "2025-06-20T21:10:13Z",
            "content": "Scammers are hijacking the search results of people needing 24/7 support from Apple, Bank of America, Facebook, HP, Microsoft, Netflix, and PayPal in an attempt to trick victims into handing over per… [+3214 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Poppy McPherson and Napat Wesshasartar",
            "title": "Thai teen says he threw himself out of a window to escape Cambodia’s brutal scam farms",
            "description": "BANGKOK (Reuters) -Lured to Cambodia, tortured and forced to defraud strangers online, a Thai teenager said he barely survived after he threw himself from an...",
            "url": "https://www.yahoo.com/news/thai-teen-says-threw-himself-121529848.html",
            "urlToImage": "https://media.zenfs.com/en/reuters.com/5da825e8d645ca3a257a79cac64d65a5",
            "publishedAt": "2025-06-26T12:15:29Z",
            "content": "By Poppy McPherson and Napat Wesshasartar\r\nBANGKOK (Reuters) -Lured to Cambodia, tortured and forced to defraud strangers online, a Thai teenager said he barely survived after he threw himself from a… [+2864 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": null,
            "title": "Thai woman arrested for blackmailing monks with thousands of videos after sex",
            "description": "The women, known as \"Ms Golf\", allegedly had sexual relations with monks and extorted money from them.",
            "url": "https://www.bbc.com/news/articles/cjelg7q845zo",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/a25d/live/b5e4d630-620f-11f0-b5c5-012c5796682d.jpg",
            "publishedAt": "2025-07-16T08:03:40Z",
            "content": "Jiraporn Sricham and Koh EweReporting from\r\nThailand and Singapore\r\nThai police have arrested a woman who allegedly had sexual relations with monks, and then used photos and videos of the acts to ext… [+3695 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "PCWorld"
            },
            "author": "Michael Crider",
            "title": "Firefox is being flooded with crypto wallet scam extensions",
            "description": "Crytocurrency hasn’t just ruined the hunt for an affordable graphics card, or the conversation at that little bar you used to like. Now it’s come for everyone’s favorite alt browser, too. Dozens of fake cryptocurrency wallet extensions—indistinguishable from …",
            "url": "https://www.pcworld.com/article/2836251/firefox-is-being-flooded-with-crypto-wallet-scam-extensions.html",
            "urlToImage": "https://www.pcworld.com/wp-content/uploads/2025/07/Firefox-logo-on-an-abstract-wallpaper-background.jpg?quality=50&strip=all&w=1024",
            "publishedAt": "2025-07-03T14:55:59Z",
            "content": "Skip to contentType your search and hit enter\r\nWhen you purchase through links in our articles, we may earn a small commission. This doesn't affect our editorial independence\r\n.\r\nCrytocurrency hasn’t… [+2241 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Theregister.com"
            },
            "author": "Lindsay Clark",
            "title": "Fujitsu sorry for Post Office horror – but still cashing big UK govt checks",
            "description": "Non-competitive £220M datacenter deal with tax collector tops £510M pile of public money\nFujitsu has been awarded around £510 million ($682 million) in UK public sector contracts since a TV dramatization of the Horizon Post Office scandal – including a recent…",
            "url": "https://www.theregister.com/2025/07/17/fujitsu_govt_contracts/",
            "urlToImage": "https://regmedia.co.uk/2018/09/19/shuttertstock_fujitsu.jpg",
            "publishedAt": "2025-07-17T13:22:05Z",
            "content": "Fujitsu has been awarded around £510 million ($682 million) in UK public sector contracts since a TV dramatization of the Horizon Post Office scandal including a recent £220 million ($294 million) de… [+3119 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Internet"
            },
            "author": "info@thehackernews.com (The Hacker News)",
            "title": "BlueNoroff Deepfake Zoom Scam Hits Crypto Employee with MacOS Backdoor Malware",
            "description": "The North Korea-aligned threat actor known as BlueNoroff has been observed targeting an employee in the Web3 sector with deceptive Zoom calls featuring deepfaked company executives to trick them into installing malware on their Apple macOS devices.\nHuntress, …",
            "url": "https://thehackernews.com/2025/06/bluenoroff-deepfake-zoom-scam-hits.html",
            "urlToImage": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwJcIEkVVfT0uAQTl1EBl8RxZ_IorTAFwekZ8ZmTGcl-y8GQK6w0WJyravHlIykzVos-sUFVpPHa4egQh97guUPftdYCsaafAIa9cYN-L0ZtI0Z0pSCNoIKkfyIZVSfIkywPYRXglIaGZ9sMYwLllhnQieInF7NU2VQ_Ccktv51LhsmvTUl3FqHwYtgKEq/s728-rw-e365/deepfake.jpg",
            "publishedAt": "2025-06-19T11:38:00Z",
            "content": "The North Korea-aligned threat actor known as BlueNoroff has been observed targeting an employee in the Web3 sector with deceptive Zoom calls featuring deepfaked company executives to trick them into… [+6889 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "CoinDesk"
            },
            "author": "Krisztian Sandor, AI Boost",
            "title": "Tether Invests in Blockchain Forensics Firm Crystal Intelligence to Fight Crypto Crime",
            "description": "Tether aims to curb illicit use of its USDT stablecoin as cryptocurrency-related scams and fraud increase.",
            "url": "https://www.coindesk.com/business/2025/07/08/tether-invests-in-blockchain-forensics-firm-crystal-intelligence-to-fight-crypto-crime",
            "urlToImage": "https://cdn.sanity.io/images/s3y3vcno/production/fe0a2adcff0d83083b97a3ad1feaf85ac5007e62-1280x853.jpg",
            "publishedAt": "2025-07-08T12:00:00Z",
            "content": "Tether, the company behind the worlds largest stablecoin USDT (USDT), has made a strategic investment in blockchain analytics firm Crystal Intelligence to increase efforts to root out crypto-related … [+1363 chars]"
        },
        {
            "source": {
                "id": "fox-news",
                "name": "Fox News"
            },
            "author": "Kurt Knutsson, CyberGuy Report",
            "title": "Chatbots are losing customer trust fast",
            "description": "A study analyzing 500,000 customer service interactions shows chatbots struggle with complex issues while human agents excel at matching customer communication styles.",
            "url": "https://www.foxnews.com/tech/chatbots-losing-customer-trust-fast",
            "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2025/07/2-chatbots-are-losing-customer-trust-fast.jpg",
            "publishedAt": "2025-07-13T09:00:00Z",
            "content": "Every day, customers reach out to companies. \r\nThey want to buy something, ask about an order, return a product or fix a payment issue. In the past, that usually meant talking to a real person on the… [+5554 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Grant Surridge",
            "title": "Atlanta couple loses $800K in WhatsApp crypto scam — now they want others to learn from their costly mistake",
            "description": "“You swear to God you’re talking to a real person.\"",
            "url": "https://finance.yahoo.com/news/atlanta-couple-loses-800k-whatsapp-184700701.html",
            "urlToImage": "https://media.zenfs.com/en/moneywise_327/488873f6be85c369fef3d9da9936af9d",
            "publishedAt": "2025-06-27T18:47:00Z",
            "content": "Jerry and Mindy Dunaway were looking forward to spending their retirement traveling, golfing and spending time with their grandkids. They believed they had planned well for their financial future.\r\nH… [+3883 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Mossplanet.news"
            },
            "author": "Moss Planet",
            "title": "Why Does Kars4Kids Sends Most of Its Money to One Town in New Jersey? (2023)",
            "description": "The Charity Exists To Underpin a Deeply Conservative Social Order",
            "url": "https://www.mossplanet.news/p/why-does-kars4kids-sends-most-of",
            "urlToImage": "https://substackcdn.com/image/fetch/$s_!DBOY!,w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa1c12444-f4ce-4790-bed1-47defaf1af6b_900x900.jpeg",
            "publishedAt": "2025-06-28T04:54:44Z",
            "content": "1-877-Kars 4 Kids. You probably know the song, theres a good chance anyone who listened to a radio at some point in the past 30 years is dreadfully familiar as well. Despite the pitch being ostensibl… [+12851 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Forbes"
            },
            "author": "Jaime Catmull, Contributor, \n Jaime Catmull, Contributor\n https://www.forbes.com/sites/jaimecatmull/",
            "title": "Don't Get Scammed: 5 Ways To Outsmart Today's Most Costly Online Fraud",
            "description": "With scammers growing more sophisticated by the day, protecting your identity and money is no longer optional.",
            "url": "https://www.forbes.com/sites/jaimecatmull/2025/06/18/dont-get-scammed-5-ways-to-outsmart-todays-most-costly-online-fraud/",
            "urlToImage": "https://imageio.forbes.com/specials-images/imageserve/685240c899d64204dbe579a4/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
            "publishedAt": "2025-06-18T19:09:52Z",
            "content": "Fraud Alert in red keys on high-tech computer keyboard background with security engraved lock on ... More fake credit cards. Concept of Internet security, data privacy, cybercrime prevention for onli… [+3271 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "BBC News"
            },
            "author": null,
            "title": "From Bitcoin to XRP: Key cryptocurrency terms and what they mean",
            "description": "As Bitcoin's price goes up once again, here's a guide to some of the crypto market's trickiest terms.",
            "url": "https://www.bbc.com/news/articles/cy5w2k5k5ylo",
            "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/0a84/live/96e73740-609e-11f0-ba44-5934558aeaa1.jpg",
            "publishedAt": "2025-07-14T11:27:58Z",
            "content": "Liv McMahon, Joe Tidy &amp; Brandon Drenon\r\nBitcoin's price reaching a new high of $120,000 (£89,000) - buoyed by US President Donald Trump's crypto-friendly stance - has kept the buzzy world of cryp… [+7365 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "AppleInsider"
            },
            "author": "news@appleinsider.com (Sponsored Content)",
            "title": "How to sell your iPhone fast & score a 10% trade-in bonus at Gazelle",
            "description": "Selling your old iPhone can be time-consuming and result in lower-than-desired payments, but Gazelle removes all the friction and gets you an offer with no effort. Here's how.Get an extra 10 percent trade-in bonus on your used iPhone - Image credit: GazelleAp…",
            "url": "https://appleinsider.com/articles/25/06/24/how-to-sell-your-iphone-fast-score-a-10-trade-in-bonus-at-gazelle",
            "urlToImage": "https://photos5.appleinsider.com/gallery/63707-132891-gazelle-iphone-trade-in-deals-xl.jpg",
            "publishedAt": "2025-06-24T14:37:53Z",
            "content": "Selling your old iPhone can be time-consuming and result in lower-than-desired payments, but Gazelle removes all the friction and gets you an offer with no effort. Here's how.\r\nApple's iPhone retains… [+3357 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Infosecurity Magazine"
            },
            "author": "Phil Muncaster",
            "title": "Over Half of “Finfluencer” Victims Have Lost Money, Says TSB",
            "description": "British bank TSB warns of rise of “finfluencers” who dispense dubious financial advice online",
            "url": "https://www.infosecurity-magazine.com/news/finfluencer-victims-tsb/",
            "urlToImage": "https://assets.infosecurity-magazine.com/webpage/og/e39052b5-42ed-4309-bbac-19d938f26a3e.jpg",
            "publishedAt": "2025-07-11T09:15:00Z",
            "content": "A growing number of young people are losing money after acting on the advice of unregulated “finfluencers” they follow on social media, a UK high street bank has warned.\r\nTSB polled around 1800 peopl… [+3466 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "AppleInsider"
            },
            "author": "news@appleinsider.com (Marko Zivkovic)",
            "title": "New UPS text scam targets iPhone users with fake package redelivery info",
            "description": "Cybercriminals and fraudsters are using fake texts, this time from UPS, to gain access to iPhone users' personal information. Here's how to stay safe and keep your data from falling into the wrong hands.Scammers are impersonating UPS and trying to steal iPhon…",
            "url": "https://appleinsider.com/articles/25/06/30/new-ups-text-scam-targets-iphone-users-with-fake-package-redelivery-info",
            "urlToImage": "https://photos5.appleinsider.com/gallery/64204-133709-cropped-scam-xl.jpg",
            "publishedAt": "2025-06-30T21:07:00Z",
            "content": "Cybercriminals and fraudsters are using fake texts, this time from UPS, to gain access to iPhone users' personal information. Here's how to stay safe and keep your data from falling into the wrong ha… [+5914 chars]"
        },
        {
            "source": {
                "id": "cbc-news",
                "name": "CBC News"
            },
            "author": null,
            "title": "Got a weird text message? 'Smishing' scams likely rising because of AI, experts warn",
            "description": "Text message scams appear to be on the rise, according to the Canadian Anti-Fraud Centre. And as they get more sophisticated, experts say they're becoming harder to catch.",
            "url": "https://www.cbc.ca/news/business/smishing-scams-rise-1.7582672",
            "urlToImage": "https://i.cbc.ca/1.7151827.1711065537!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_1180/hand-holding-cell-phone.jpg?im=Resize%3D620",
            "publishedAt": "2025-07-11T15:41:14Z",
            "content": "If it seems like your phone has been blowing up with more spam text messages recently, you're probably right.\r\nThe Canadian Anti-Fraud Centre says so-called \"smishing\" attempts appear to be on the ri… [+5419 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Securityaffairs.com"
            },
            "author": "Pierluigi Paganini",
            "title": "Europol dismantles €460M crypto scam targeting 5,000 victims worldwide",
            "description": "Europol busted a crypto scam ring that laundered €460M from 5,000+ victims. Operation Borrelli involved Spain, the U.S., France, and Estonia. Europol has taken down a massive cryptocurrency fraud ring that scammed over 5,000 people worldwide, laundering aroun…",
            "url": "https://securityaffairs.com/179495/cyber-crime/europol-dismantles-e460m-crypto-scam-targeting-5000-victims-worldwide.html",
            "urlToImage": "https://securityaffairs.com/wp-content/uploads/2016/11/europol-terrorism-data-leak.jpg",
            "publishedAt": "2025-07-01T10:01:58Z",
            "content": "Europol dismantles 460M crypto scam targeting 5,000 victims worldwide\r\nEuropol has taken down a massive cryptocurrency fraud ring that scammed over 5,000 people worldwide, laundering around 460 milli… [+2412 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "ProPublica"
            },
            "author": "by Cezary Podkul",
            "title": "How Foreign Scammers Use U.S. Banks to Fleece Americans",
            "description": "by Cezary Podkul \n \n\n \n \n ProPublica is a nonprofit newsroom that investigates abuses of power. Sign up to receive our biggest stories as soon as they’re published.\n\n \n\n \n\n \n \n\n\n\n \nBrian Maloney Jr. was flummoxed when he was served with a lawsuit against his …",
            "url": "https://www.propublica.org/article/pig-butchering-scam-cybercrime-us-banks-money-laundering",
            "urlToImage": "https://img.assets-c3.propublica.org/images/articles/OG-danpage-ProPublica-Scammers3x2Final.jpg?crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=630&imgixProfile=propublicaAssets&q=90&w=1200&s=be7874a675d0ce0c9f7dcd40d9fc20c1",
            "publishedAt": "2025-06-25T09:00:00Z",
            "content": "ProPublica is a nonprofit newsroom that investigates abuses of power. Sign up to receive our biggest stories as soon as theyre published.\r\n<ul><li>Struggling Gatekeepers: In the face of some $44 bill… [+29864 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Techdirt"
            },
            "author": "Karl Bode",
            "title": "Our National Robocall Nightmare Is Getting Worse Under Donald Trump",
            "description": "According to the latest data on robocalls from the YouMail Robocall Index, the scale of the U.S. robocall problem has grown by another eleven percent year over year. U.S. consumers received just over 4.8 billion robocalls in May. We’ve normalized ceding our p…",
            "url": "https://www.techdirt.com/2025/07/02/our-national-robocall-nightmare-is-getting-worse-under-donald-trump/",
            "urlToImage": "https://www.techdirt.com/wp-content/uploads/2025/06/Screenshot-2025-06-17-062311-1024x554.png",
            "publishedAt": "2025-07-02T20:40:00Z",
            "content": "from the this-is-why-we-can't-have-nice-things dept\r\nAccording to the latest data on robocalls from the YouMail Robocall Index, the scale of the U.S. robocall problem has grown by another eleven perc… [+3489 chars]"
        },
        {
            "source": {
                "id": "business-insider",
                "name": "Business Insider"
            },
            "author": "Emily Stewart",
            "title": "Surprise! You literally owe the tariffs",
            "description": "Americans are being hit with huge tariff bills on their online orders.",
            "url": "https://www.businessinsider.com/americans-huge-tariff-bills-online-orders-china-trump-fedex-2025-6",
            "urlToImage": "https://i.insider.com/685315933d5881a51c1bb4b9?width=1200&format=jpeg",
            "publishedAt": "2025-06-19T08:11:02Z",
            "content": "Kat Omecene thought she was keeping things simple by asking her bridesmaids to buy whatever dresses they wanted for her wedding as long as it matched her color palette, of course. But now, one of the… [+13740 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "NPR"
            },
            "author": "Elena Moore",
            "title": "House Republicans pass Trump's mega bill, sending the package to his desk to be signed",
            "description": "The Republican leaders overcame objections from within their own party, marking a  victory in their quest to fulfill President Trump's campaign promises.",
            "url": "https://www.npr.org/2025/07/03/nx-s1-5454841/house-republicans-trump-tax-bill-medicaid",
            "urlToImage": "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/6000x3375+0+313/resize/1400/quality/100/format/jpeg/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F98%2Fef%2Fb24822fa4b0da1bf97638790c974%2Fap25183660117009.jpg",
            "publishedAt": "2025-07-03T18:32:35Z",
            "content": "President Trump's massive spending and tax cut bill is on the way to his desk for a signature. The bill passed Thursday after Republican leaders in the House of Representatives convinced holdouts in … [+6791 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Tom's Hardware UK"
            },
            "author": "editors@tomshardware.com (Jowi Morales) , Jowi Morales",
            "title": "Authorities saw open Bitcoin ATM to recover scammed money — almost $32,000 seized from machine",
            "description": "A Jasper County citizen was scammed out of $25,000, and the authorities used a power saw to seize the deposited amount from a Bitcoin ATM.",
            "url": "https://www.tomshardware.com/tech-industry/cryptocurrency/authorities-saw-open-bitcoin-atm-to-recover-scammed-money-almost-usd32-000-seized-from-machine",
            "urlToImage": "https://cdn.mos.cms.futurecdn.net/c6Uje2uRvM4S9hwbxnyu6P.jpg",
            "publishedAt": "2025-06-22T12:00:00Z",
            "content": "The Sheriff in Jasper County, Texas, located a little over 100 miles northeast of Houston, used a circular saw to break into a Bitcoin ATM after it was determined it was used for fraud. According to … [+2728 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Yahoo Entertainment"
            },
            "author": "Jessica Glenza",
            "title": "Republican senators’ proposed Medicaid cuts threaten to send red states ‘backwards’",
            "description": "Advocates fear Senate’s version of Trump’s budget bill could leave millions without healthcare and boost corporations",
            "url": "https://www.yahoo.com/news/republican-senators-proposed-medicaid-cuts-110012576.html",
            "urlToImage": "https://media.zenfs.com/en/the_guardian_765/36d165867283c191b6eed6c40f6cc105",
            "publishedAt": "2025-06-23T11:00:12Z",
            "content": "Advocates are urgingSenateRepublicans to reject a proposal to cut billions from American healthcare to extend tax breaks that primarily benefit the wealthy and corporations.\r\nThe proposal would make … [+7909 chars]"
        }
    ]

    // State for currently loaded articles
    const [articles, setArticles] = useState(allArticles.slice(0, PAGE_SIZE));
    const [page, setPage] = useState(1);

    // Load more articles when end is reached
    const loadMore = () => {
        const nextPage = page + 1;
        const nextArticles = allArticles.slice(0, nextPage * PAGE_SIZE);
        if (nextArticles.length > articles.length) {
            setArticles(nextArticles);
            setPage(nextPage);
        }
    };

    return (
        <SafeAreaView
            className="flex-1 bg-white dark:bg-black"
            style={{ paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
            <View className="px-4 py-3 border-b border-gray-200">
                <Text className="text-2xl font-bold text-black dark:text-white">News Feed</Text>
            </View>
            <FlatList
                data={articles}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <Link href={item.url}>
                        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
                            <View className="flex-1 pr-3">
                                <Text className="text-base font-semibold text-black dark:text-white" numberOfLines={2}>
                                    {item.title}
                                </Text>
                                <Text className="text-sm text-gray-500 mt-1" numberOfLines={2}>
                                    {item.description}
                                </Text>
                            </View>
                            {item.urlToImage ? (
                                <Image
                                    source={{ uri: item.urlToImage }}
                                    className="w-16 h-16 rounded-md bg-gray-200"
                                    resizeMode="cover"
                                />
                            ) : (
                                <View className="w-16 h-16 rounded-md bg-gray-200" />
                            )}
                        </View>
                    </Link>
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.8} // Load more when 80% from bottom
            />
        </SafeAreaView>
    );
}