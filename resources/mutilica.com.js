// Email obfuscator script 2.1 by Tim Williams, University of Arizona
// Random encryption key feature by Andrew Moulden, Site Engineering Ltd
// This code is freeware provided these four comment lines remain intact
// A wizard to generate this code is at http://www.jottings.com/obfuscator/

const coded = "EMU3vE3@O63FkFEv.EMO"
const key = "DaHwopWhUOglz9ybVXqE0viYMJsfT87kuBLZGrStRCF25xKQINnm6djP4eA31c"
const shift = coded.length

function generate_email() {
    var link = ""
    for (i = 0; i < coded.length; i++) {
        if (key.indexOf(coded.charAt(i)) == -1) {
            ltr = coded.charAt(i)
            link += (ltr)
        } else {
            ltr = (key.indexOf(coded.charAt(i)) - shift + key.length) % key.length
            link += (key.charAt(ltr))
        }
    }
    return link
}