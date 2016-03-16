<%@include file="init.jsp"%>

<script>
    var caturl = "<%=caturl%>" || '/php/metadata/csw/index.php';
    var MAPcenterX = parseFloat("<%=centerX%>") || 17.474129;
    var MAPcenterY = parseFloat("<%=centerY%>") || 52.574000;
    var MAPzoom = parseInt("<%=zoom%>") || 5;
</script>

<c:choose>
    <c:when test="<%= !disabled %>">
        <script src="<%= mapconfig %>" type="text/javascript"></script>
        <div hs ng-app="hs" ng-controller="Main" style="position: relative;"></div>
    </c:when>
</c:choose>

