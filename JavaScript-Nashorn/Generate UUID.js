//# sorceURL=Generate UUID
var script_name = "Generate UUID";
var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit, java.util.UUID);

// This script generates a new UUID and writes it to the whiteboard property script.uuid

with (imp) {
    function invoke(msg) {
        try {
            var uuid = java.util.UUID.randomUUID().toString();
            Trace.debug("Generated UUID: " + uuid);
            msg.put("script.uuid", uuid);
            return true;
        } catch (e) {
            Trace.error(script_name + " error: " + e.stack);
            throw new CircuitAbortException(e);
        }
        return true;
    }
};
