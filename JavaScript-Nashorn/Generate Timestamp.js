//# sorceURL=Generate Timestamp
var script_name = "Generate Timestamp";

// Puts the current timestamp, e.g. 2021-01-01T00:00:00.000Z into the whiteboard property script.time

var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit, java.time.Clock);

with (imp) {
    function invoke(msg) {
        try {
            var time = java.time.Clock.systemUTC().instant().toString();
            Trace.debug("Current time: " + time);
            msg.put("script.time", time);
        } catch (e) {
            Trace.error(script_name + " error: " + e.stack);
            throw new CircuitAbortException(e); // Used to follow the abort path on error.
        }
        return true;
    }
};
