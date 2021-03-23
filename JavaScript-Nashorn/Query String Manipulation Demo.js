//# sorceURL=Query String Manipulation Demo
var script_name = "Query String Manipulation Demo";
var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit, org.apache.commons.collections.MultiHashMap);

with (imp) {
    function invoke(msg) {
        try {
            // Get the raw query string from the whiteboard:
            var rawURI = msg.get("http.request.rawURI.query");
            if (rawURI.charAt(0) === '?') {
                rawURI = rawURI.substring(1); // Remove leading question mark.
            }

            // MultiHashMap lets us store multiple values under the same key:
            // Remember that query strings can specify the same key many times.
            // More info at:
            // https://commons.apache.org/proper/commons-collections/javadocs/api-3.2.2/org/apache/commons/collections/MultiHashMap.html
            var pairs = rawURI.split("&");
            var HashMap = Java.type('org.apache.commons.collections.MultiHashMap');
            var params = new HashMap();

            for (var p, i = 0; i < pairs.length; ++i) {
                p = pairs[i].split("=");
                Trace.debug("Setting map: " + p[0] + " = " + p[1]);
                params.put(p[0], p[1]);
            }

            /*********************************
             * Start of sample manipulations *
             *********************************/

            // Note that the values in the Map are still URIencoded.
            // Use decodeURIComponent() to decode values if needed:
            // "y%20space" => "y space"

            // Sample of encoding & inserting some test data:
            var newParam = "parameter_name";
            var newValue = "value that changes after encoding";
            newParam = encodeURIComponent(newParam);
            newValue = encodeURIComponent(newValue);
            params.put(newParam, newValue);

            // Sample of removing parameters of the name "deleteme"
            params.remove("deleteme");

            /*******************************
             * End of sample manipulations *
             *******************************/

            // Rebuild the query string with the modified data.

            var newquery = "";
            var prefix = ""; // There's no & before the first key/value pair.
            for (var key in params) {
                for (var element in params[key]) {
                    newquery += prefix + key + "=" + params[key][element];
                    prefix = "&";
                }
            }
            // Output new.query to the whiteboard with the modified query string.
            // This value can be used in Connect to URL or similar filters as:
            // http://example.com/api?${new.query}
            msg.put("new.query", newquery);
        } catch (e) {
            Trace.error(script_name + " error: " + e.stack);
            throw new CircuitAbortException(e); // Follow the abort path on error.
        }
        return true;
    }
};
