//# sorceURL=Base64 Encode
var script_name = "Base64 Encode";

// Nashorn syntax JavaScript to base64 encode data
//
// Input:   Data to be base64 encoded  ${raw.data}
// Output:  Base64 encoded data        ${encoded.data}
//
// This does base64 encoding without inserted newlines.  Refer to the JavaDoc for other
// available methods:  https://docs.oracle.com/javase/8/docs/api/java/util/Base64.html
//
// Do not use com.vordel.common.base64 for any value that might be inserted into HTTP
// headers, see:  https://support.axway.com/kb/180683/language/en

var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit, java.util.Base64);

with (imp) {
    function invoke(msg) {
        try {
            var data = msg.get("raw.data");
            var bytes = new java.lang.String(data).getBytes();
            var base64 = Base64.getEncoder().encodeToString(bytes);
            msg.put("encoded.data", base64);
        } catch (e) {
            Trace.error(script_name + " error: " + e.stack);
            throw new CircuitAbortException(e); // Used to follow the abort path on error.
            // Use return false; instead of the above if you want to use the false path on error.
        }
        return true;
    }
};
