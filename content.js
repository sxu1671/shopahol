var currPageURL = window.location.href;
var domain = rootDomain(currPageURL)

if (domain == "amazon") {
    identifier = "purchaseId"
    window.alert(isConfirmation(currPageURL, identifier));
}

function rootDomain(url) {
    splittedUrl = url.split("//")
    url = splittedUrl[splittedUrl.length - 1]
    var rightPeriodIndex;
    for (var i = url.length - 1; i >= 0; i--) {
        if(url[i] == '.') {
            rightPeriodIndex = i;
            var noExtension = url.substr(0,i);
            break;
        }
    }
    var result = noExtension.substring(noExtension.lastIndexOf(".") + 1);
    return result;
}

function isConfirmation(url, identifier) {
    return url.includes(identifier);
}
