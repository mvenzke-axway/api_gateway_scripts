//# sorceURL=Query String Manipulation Demo
var script_name = "Query String Manipulation Demo";
var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit, org.apache.commons.collections.MultiHashMap);

// This sample shows how to manipulate API Gateway query strings in script.  That said, as always, you should
// avoid using scripts where possible due to the need to re-validate scripts every upgrade.
//
// Note that for simple cases, there are multiple gateway filters that should be used in preference to a script.  
// This script is for when you have to do a lot of complicated property manipulations.
//
// For example, Create REST Request is documented here:
// https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_polref/conversion_common/index.html#create-rest-request-filter
//
// There's also an Extract REST Request Attributes filter:
// https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_polref/attributes_manipulate/index.html#extract-rest-request-attributes-filter
//
// Finally, there are several other validation filters here that can validate your requests:
// https://docs.axway.com/bundle/axway-open-docs/page/docs/apim_policydev/apigw_polref/content_common/index.html#query-string-validation-filter

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
