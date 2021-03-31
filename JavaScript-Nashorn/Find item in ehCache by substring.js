//#sorceURL=Find_item_in_ehCache_by_substring
var script_name = "Find item in ehCache by substring";

// Change the variable cacheName to match the cache you want to examine. For example:
// var cacheName = "OAuth Client Access Token Cache";

// The search_body variable should be true if you want to search cached content.body
// objects in the cache (which are not strings).  It will convert the com.vordel.mime.Body
// subtype to a string for searching, which may be expensive.  When set to false, the code
// assumes that the cache contains java.lang.String objects, instead.

var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit, com.vordel.circuit.cache, java.io);

with (imp) {
    var cacheName = "Test Cache";
    function invoke(msg) {
        try {
            var substring = "test message"; // Substring to search for.
            var search_body = true; // True if cache contains body objects.
            var cache = CacheContainer.getInstance().getCache(cacheName);

            Trace.info("Searching " + cacheName + " for a value containing: " + substring);
            Trace.debug("Cache is: " + cache);

            var keys = cache.getKeys();
            for (var i = 0; i < keys.size(); i++) {
                var key = keys.get(i);
                var value = cache.get(key).value;

                if (search_body) {
                    Trace.debug("Converting cached body to string value.");
                    // Convert a com.vordel.mime.Body to a string.
                    value = bodyCachedToString(value);
                }

                if (value.indexOf(substring) !== -1) {
                    Trace.debug("Found substring in value = " + value);
                    return true;
                }
            }
        } catch (e) {
            Trace.error(script_name + " error: " + e.stack);
            throw new CircuitAbortException(e); // Used to follow the abort path on error.
        }
        return false;
    }

    function bodyCachedToString(bodyCached) {
        //#sorceURL=bodyCachedToString

        // Converts a com.vordel.mime.Body type to a java.lang.String
        var body = bodyCached.getAsBody();
        var baos = new ByteArrayOutputStream();

        body.write(baos, 0);

        var ct = body.getContentType();
        var encoding = ct.get("charset");

        if (encoding != null) {
            bodyAsString = new java.lang.String(baos.toByteArray(), encoding);
        } else {
            bodyAsString = new java.lang.String(baos.toByteArray());
        }
        return bodyAsString;
    }
};
