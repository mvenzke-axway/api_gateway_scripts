//# sorceURL=Examine_ehCache
var script_name = "Examine ehCache";

// This script prints the contents of a particular ehCache to the trace at INFO level.
// It also prints out the current message.key to help debug item not found errors.
// Change the variable cacheName to match the cache you want to examine. For example:
// var cacheName = "OAuth Client Access Token Cache";

var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit, com.vordel.circuit.cache);

with (imp) {
    var cacheName = "YOUR CACHE NAME";  // TODO - change to an actual cache name.
    function invoke(msg) {
        try {
            Trace.info("Listing items in cache:");
            Trace.info("The message.key value is " + msg.get("message.key"));

            var cache = CacheContainer.getInstance().getCache(cacheName);
            var keys = cache.getKeys();

            Trace.info("There are " + keys.size() + " items in cache");

            for (var i = 0; i < keys.size(); i++) {
                var k = keys.get(i);
                Trace.info(k + " = " + cache.get(k));
            }
        } catch (e) {
            Trace.error(script_name + " error: " + e.stack);
            throw new CircuitAbortException(e); // Used to follow the abort path on error.
        }
        return true;
    }
};
