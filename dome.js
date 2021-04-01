var sites = {
				"Entertainment": {
					"YouTube"				: "https://www.youtube.com/",
					"Crunchyroll"			: "https://www.crunchyroll.com/en-gb",
					"Netflix"				: "https://www.netflix.com/"
				},
				"Development": {
					"GitHub"				: "https://github.com/",
					"CodePen"				: "https://codepen.io/",
					"LeetCode"				: "https://leetcode.com/",
					"Favicon Generator"		: "https://realfavicongenerator.net/"
				},
				"E-Mail": {
					"GMail"					: "https://mail.google.com/mail/u/0/",
					"Private Email"			: "https://privateemail.com/appsuite/",
					"Outlook"				: "https://outlook.office.com/",
					"10 Minute Mail"		: "https://10minutemail.com/"
				},
				"General Utility": { // To find the game ID check the url in the store page or the community page
					//LastPass not working
					"LAN Management"		: "http://192.168.1.1",
					"Google Drive"			: "https://drive.google.com/drive",
					"PC PartPicker"			: "https://pcpartpicker.com/"

				},
				"Read The Docs": {
					"MDN"					: "https://developer.mozilla.org",
					"StackOverFlow"			: "https://stackoverflow.com/",
					"W3 Schools"			: "https://www.w3schools.com/",
					"CSS Tricks"			: "https://css-tricks.com/"
				},
				"Social": {
					"Reddit"				: "https://www.reddit.com/",
					"Discord"				: "https://discord.com/app",
					"LinkedIn"				: "https://www.linkedin.com/in/",
					"Facebook"				: "https://www.facebook.com/messages"
				}
			};

			var search = { // Query variable name is q, hardcoded, looks like a standard already anyways
				"default": "https://duckduckgo.com/",
				"g": "https://google.com/search",
				"s": "https://startpage.com/do/search",
				"r": "https://reddit.com/search"
			};

// ---------- BUILD PAGE ----------
var pivotmatch = 0;
var totallinks = 0;
var prevregexp = "";
function matchLinks(regex = prevregexp) {
	totallinks = 0;
	pivotmatch = regex == prevregexp ? pivotmatch : 0;
	prevregexp = regex;
	pivotbuffer = pivotmatch;
	p = document.getElementById("links");
	while (p.firstChild) {
		p.removeChild(p.firstChild);
	}
	if (regex.charAt(1) == ' ' && search.hasOwnProperty(regex.charAt(0))) {
		document.getElementById("action").action = search[regex.charAt(0)];
		document.getElementById("action").children[0].name = "q";
	} else {
		match = new RegExp(regex ? regex : ".", "i");
		gmatches = false; // kinda ugly, rethink
		for (i = 0; i < Object.keys(sites).length; i++) {
			matches = false;
			sn = Object.keys(sites)[i];
			section = document.createElement("div");
			section.id = sn;
			section.innerHTML = sn;
			section.className = "section";
			inner = document.createElement("div");
			for (l = 0; l < Object.keys(sites[sn]).length; l++) {
				ln = Object.keys(sites[sn])[l];
				if (match.test(ln)) {
					link = document.createElement("a");
					link.href = sites[sn][ln];
					link.innerHTML = ln;
					if (!pivotbuffer++ && regex != "") {
						link.className = "selected";
						document.getElementById("action").action = sites[sn][ln];
						document.getElementById("action").children[0].removeAttribute("name");
					}
					inner.appendChild(link);
					matches = true;
					gmatches = true;
					totallinks++;
				}
			}
			section.appendChild(inner);
			matches ? p.appendChild(section) : false;
		}
		if (!gmatches || regex == "") {
			document.getElementById("action").action = search["default"];
			document.getElementById("action").children[0].name = "q";
		}
	}
	document.getElementById("main").style.height = document.getElementById("main").children[0].offsetHeight+"px";
}

document.onkeydown = function(e) {
	switch (e.keyCode) {
		case 38:
			pivotmatch = pivotmatch >= 0 ? 0 : pivotmatch + 1;
			matchLinks();
			break;
		case 40:
			pivotmatch = pivotmatch <= -totallinks + 1 ? -totallinks + 1 : pivotmatch - 1;
			matchLinks();
			break;
		default:
			break;
	}
	document.getElementById("action").children[0].focus();
}

document.getElementById("action").children[0].onkeypress = function(e) {
	if (e.key == "ArrowDown" || e.key == "ArrowUp") {
		return false;
	}
}

function displayClock() {
	now = new Date();
	clock = (now.getHours() < 10 ? "0"+now.getHours() : now.getHours())+":"
			+(now.getMinutes() < 10 ? "0"+now.getMinutes() : now.getMinutes())+":"
			+(now.getSeconds() < 10 ? "0"+now.getSeconds() : now.getSeconds());
	document.getElementById("clock").innerHTML = clock;
}

window.onload = matchLinks();
document.getElementById("action").onsubmit = function() {
	svalue = this.children[0].value;
	if (svalue.charAt(1) == ' ' && search.hasOwnProperty(svalue.charAt(0))) {
		this.children[0].value = svalue.substring(2);
	}
	return true;
}
displayClock();
setInterval(displayClock, 1000);
