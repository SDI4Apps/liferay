<%@include file="init.jsp"%>

<script>var caturl = "<%=caturl%>";</script>

<c:choose>
    <c:when test="<%= !disabled %>">
        <script src="<%= mapconfig %>" type="text/javascript"></script>
        <div hs ng-app="hs" ng-controller="Main" style="position: relative;"></div>
    </c:when>
</c:choose>

