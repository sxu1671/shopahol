var currPageURL = window.location.href;
var domain = rootDomain(currPageURL)

if (domain == "amazon") {
    identifier = "purchaseId"
    window.alert(isConfirmation(currPageURL, identifier));
}

function rootDomain(url) {
    var urlObj = new URL(url)
    var hostName = urlObj.hostname
    var splittedHost = hostName.split(".")
    var root = splittedHost[splittedHost.length - 2]
    return root
}

function isConfirmation(url, identifier) {
    return url.includes(identifier);
}
