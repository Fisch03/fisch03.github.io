const warningElement = document.getElementById("IEWarning")

//from https://blog.julitec.com/dev/pr%C3%BCfen-ob-internet-explorer-verwendet-wird-inklusive-ie-11
function getInternetExplorerVersion()
{
    var rV = -1; // Return value assumes failure.

    if (navigator.appName == 'Microsoft Internet Explorer' || navigator.appName == 'Netscape') {
        var uA = navigator.userAgent;
        var rE = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");

        if (rE.exec(uA) != null) {
            rV = parseFloat(RegExp.$1);
        }
        /*check for IE 11*/
        else if (!!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            rV = 11;
        }
    }
    return rV;
}

if(getInternetExplorerVersion() != -1){
    warningElement.style.visibility = "visible"
}

if (!('remove' in Element.prototype)) { //Add the ability to remove elements in IE, otherwise the JS warning wont be removed
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
