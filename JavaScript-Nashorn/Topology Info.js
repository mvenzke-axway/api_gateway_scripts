//# sorceURL=Topology Info
var script_name = "Topology Info";
var imp = new JavaImporter(com.vordel.trace, com.vordel.circuit, com.vordel.dwe);

// Gathers topology info and puts it onto the whiteboard.
// Sample output:
// group.name    = QuickStart Group
// instance.name = QuickStart Instance
// group.id      = group-2
// instance.id   = instance-1
// host.name     = example.com
// host.ip       = 10.0.0.1

with (imp) {
    function invoke(msg) {
        try {
            var groupID = Service.getInstance().getGroupID();
            var groupName = Service.getInstance().getGroupName();
            var instanceID = Service.getInstance().getID();
            var instanceName = Service.getInstance().getName();
            var hostName = Service.getInstance().getLocalHostName();
            var hostIP = java.net.InetAddress.getLocalHost().getHostAddress();

            Trace.debug(script_name + ": \n"
                 + "groupName    = " + groupName + "\n"
                 + "instanceName = " + instanceName + "\n"
                 + "groupID      = " + groupID + "\n"
                 + "instanceID   = " + instanceID + "\n"
                 + "hostName     = " + hostName + "\n"
                 + "hostIP       = " + hostIP);

            msg.put("group.name", groupName);
            msg.put("instance.name", instanceName);
            msg.put("group.id", groupID);
            msg.put("instance.id", instanceID);
            msg.put("host.name", hostName);
            msg.put("host.ip", hostIP);
        } catch (e) {
            Trace.error(script_name + " error: " + e.stack);
            throw new CircuitAbortException(e);
        }
        return true;
    }
};
