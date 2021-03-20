//# sorceURL=Generate MD5 Hash
var script_name = "Generate MD5 Hash";
var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit, org.apache.commons.codec.digest.DigestUtils);

// This script shows an example of generating an MD5 hash.  Put the item you want a hash of into the 'item'
// variable, it will then output the hash in the whiteboard parameter md5.hash.

with (imp) {
    function invoke(msg) {
        try {
			var item = "This is the data you want an MD5 hash of.";
            var md5 = DigestUtils.md5Hex(String(item));
            Trace.debug(script_name + ": MD5 = " + md5);
            msg.put("md5.hash", md5);
        } catch (e) {
            Trace.error(script_name + " error: " + e.stack);
            throw new CircuitAbortException(e);
        }
        return true;
    }
};
