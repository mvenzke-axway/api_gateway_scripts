//# sorceURL=NAME_OF_SCRIPT
var script_name = "NAME_OF_SCRIPT";
// The items above are used to simplify debugging.  This only exists in the Nashorn engine.
// See also:  https://bugs.openjdk.java.net/browse/JDK-8032068

var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit);

with (imp) {
    function invoke(msg) {
        try {
            // Your code here.
        } catch (e) {
            Trace.error(script_name + " error: " + e.stack);
            throw new CircuitAbortException(e); // Used to follow the abort path on error.
            // Use return false; instead of the above if you want to use the false path on error.
        }
        return true;
    }
};
