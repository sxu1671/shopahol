var currPageURL = window.location.href;
var domain = rootDomain(currPageURL)

if (domain == "amazon") {
    identifier = "purchaseId"
    if (isConfirmation(currPageURL, identifier) == true) {
        var xpath = "//h5[contains(text(), 'Order Number')]";
        iterator = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null)
        node = iterator.iterateNext();
        spanObj = document.evaluate("//span[@class='a-text-bold']", node, null, XPathResult.ANY_TYPE, null);
        spanNode = spanObj.iterateNext();
        orderNum = spanNode.innerText.trim()
        base_url = "https://www.amazon.com/gp/css/summary/edit.html/ref=typ_rev_edit?ie=UTF8&orderID="
        url = base_url.concat(orderNum)
        window.alert(url)
        // httpGetAsync(url)
    }
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

function httpGetAsync(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            var text, parser, xmlDoc;
            text = xmlHttp.responseText.trim()
            // parser = new DOMParser();
            // xmlDoc = parser.parseFromString(text, "text/xml");
            // z = xmlDoc.getElementsByClassName("a-text-bold")[0];

            window.alert(text)
            // callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}