<%@include file="/html/init.jsp"%>

<script>
    var caturl = "<%=caturl%>" || '/php/metadata/csw/index.php';
    var MAPcenterX = parseFloat("<%=centerX%>") || 17.474129;
    var MAPcenterY = parseFloat("<%=centerY%>") || 52.574000;
    var MAPzoom = parseInt("<%=zoom%>") || 5;
</script>

<div hs ng-app="hs" ng-controller="Main" style="position: relative;"></div>
