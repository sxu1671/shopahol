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


// function getItems(document) {
//     findItemObjects = "//div[@class='a-fixed-left-grid-inner']"
//     itemObjects = document.evaluate(findItemObjects, document.body, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

//     while (true){
//         item = itemObjects.iterateNext();
//         if (!item) {
//             break;
//         }
//         findImageObject = "//img[@class='yo-critical-feature']"
//         findProdLink = "//div/div[@class='a-row']/a"
//         findPrice = "//span[@class='a-size-small a-color-price']"

//         itemImgObj = document.evaluate(findImageObject, item, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
//         itemLinkObj = document.evaluate(findProdLink, item, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
//         itemPriceObj = document.evaluate(findPrice, item, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

//         imgLink = itemImgObj.singleNodeValue["src"]
//         itemLinkBlock = itemLinkObj.singleNodeValue
//         itemLink = itemLinkBlock["href"]
//         itemName = itemLinkBlock.textContent.trim()
//         itemPrice = itemPriceObj.singleNodeValue.textContent.trim()

//         console.log(imgLink + " " + itemLink + " " + itemName + " " + itemPrice) 

//     }
// }

function getItems(document) {
    var images = [];
    var links = [];
    var names = [];
    var prices = [];

    let countImages = 0;
    let countLinks = 0;
    let countPrices = 0;
    itemObjects = "//div[@class='a-fixed-left-grid-inner']"
    findImageObject = "//img[@class='yo-critical-feature']"
    findProdLink = "//div/div[@class='a-row']/a"
    findPrice = "//span[@class='a-size-small a-color-price']"

    imgObjs = document.evaluate(itemObjects + findImageObject, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    prodLinkObjs = document.evaluate(itemObjects + findProdLink, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    itemPriceObjs = document.evaluate(itemObjects + findPrice, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

    while (true) {
        img = imgObjs.iterateNext();
        if (img) {
            images.push(img["src"])
            countImages++
        } else {
            break;
        }
    }

    while (true) {
        link = prodLinkObjs.iterateNext();
        if (link) {
            links.push(link["href"])
            names.push(link.textContent.trim())
            countLinks++
        } else {
            break;
        }
    }

    while (true) {
        price = itemPriceObjs.iterateNext();
        if (price) {
            prices.push(price.textContent.trim())
            countPrices++
        } else {
            break;
        }
    }

    if (!(countLinks === countImages && countImages === countPrices)) {
        throw new Error("Unequal number of images to names to links")
    }
    
    resultArrays = [names, links, images, prices]
    return transposeArray(resultArrays, countLinks)
}

function transposeArray(array, arrayLength){
    var newArray = [];
    for(var i = 0; i < arrayLength; i++){
        newArray.push([]);
    };

    for(var i = 0; i < array.length; i++){
        for(var j = 0; j < arrayLength; j++){
            newArray[j].push(array[i][j]);
        };
    };

    return newArray;
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