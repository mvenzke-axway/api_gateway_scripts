//# sorceURL=Debug Tracing Sample
var script_name = "Debug Tracing Sample";
var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit);

with (imp) {
    function invoke(msg) {
        try {
            // Some useful functions to see if the higher trace levels are enabled.
            // This can be used to avoid running debugging logic when the trace is
            // not in debug mode and nothing would be output.
            if (Trace.isDebugEnabled()) {
                Trace.debug("Debug tracing is enabled!"); // Outputs at DEBUG or DATA
                if (Trace.isVerboseEnabled()) {
                    Trace.data("DATA tracing is also enabled!"); // Outputs at DATA
                }
            } else {
                Trace.error("Debug tracing is not enabled!");
            }
        } catch (e) {
            Trace.error(script_name + " error: " + e.stack);
            throw new CircuitAbortException(e); // Used to follow the abort path on error.
            // Use return false; instead of the above if you want to use the false path on error.
        }
        return true;
    }
};
